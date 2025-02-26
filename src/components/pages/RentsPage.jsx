import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/my-store";
import { Switch, Table } from "antd";
import AddUser from "../AddUser";

function RentsPage() {
  const [loading, setLoading] = useState(false);
  const authState = useAuthStore();
  const [rents, setrents] = useState();

  useEffect(() => {
    axios
      .get(`https://library.softly.uz/api/rents`, {
        params: {
          size: 20,
          page: 1,
        },
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.items);
        setrents(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  if (!rents) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex justify-between px-2 py-1">
        <h1 className="font-bold text-2xl">RentPage</h1>
        {/* <AddUser /> */}
      </div>
      <Table
        bordered
        loading={rents ? false : true}
        columns={[
          {
            key: "id",
            title: "Id",
            dataIndex: "id",
          },
          {
            key: "leasedAt",
            title: "Berilgan sana",
            dataIndex: "leasedAt",
            render: (value) => {
              return new Date(value).toLocaleString("ru", {
                month: "short",
                day: "numeric",
                year: "numeric",
              });
            },
          },
          {
            key: "returnedAt",
            title: "Qaytdi",
            dataIndex: "returnedAt",
            render: (value) => {
              // if (!value) {
              //   return <span>Hali Qaytarilmagan</span>;
              // }
              // return new Date(value).toLocaleString("ru", {
              //   month: "short",
              //   day: "numeric",
              //   year: "numeric",
              // });
              return (
                <Switch
                  onChange={(checked) => {
                    axios.put();
                  }}
                  // loading={true}
                  checked={value ? true : false}
                ></Switch>
              );
            },
          },
          {
            key: "user",
            title: "Kitobhon",
            dataIndex: "user",
            render: (item) => {
              return (
                <div>
                  <p>{item.id}</p>
                  <p>{item.lastName}</p>
                </div>
              );
            },
          },
        ]}
        dataSource={rents}
      />
    </div>
  );
}

export default RentsPage;
