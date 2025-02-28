import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/my-store";
import { message, Switch, Table } from "antd";
import AddUser from "../AddUser";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import Loader from "../loader/Loader";

function RentsPage() {
  const [loading, setLoading] = useState(false);
  const authState = useAuthStore();
  const [rents, setrents] = useState();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get(`https://library.softly.uz/api/rents`, {
        params: {
          size: 10,
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setrents(res.data);
      })
      .catch((err) => {
        console.log(err);
        message.error("RentsPage Error");
      });
  }, [currentPage]);
  if (!rents?.items) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between px-2 py-1">
        <h1 className="font-bold text-2xl">RentPage</h1>
        <AddUser />
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
        dataSource={rents.items.map((r) => {
          return { ...r, key: r.id };
        })}
        pagination={{
          pageSize: 10,
          current: currentPage,
          total: rents.totalCount,
        }}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
        }}
      />
    </div>
  );
}

export default RentsPage;
