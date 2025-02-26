import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/my-store";
import AddUser from "../AddUser";

function UsersPage() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);

  const authState = useAuthStore();
  // console.log(authState.token);

  const [users, setUsers] = useState();

  useEffect(() => {
    axios
      .get(`https://library.softly.uz/api/users`, {
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
        setUsers(res.data.items);
        // message.success("Success");
      })
      .catch((err) => {
        console.log(err);
        message.error("Xatolik");
      });
  }, [isOpenDrawer]);
  if (!users) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex justify-between px-2 py-1">
        <h1 className="font-bold text-2xl">Kitobhonlar</h1>
        <AddUser
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
        />
      </div>
      <Table
        bordered
        loading={users ? false : true}
        columns={[
          {
            key: "id",
            title: "Raqami",
            dataIndex: "id",
          },
          {
            key: "firstname",
            title: "Ism",
            dataIndex: "firstName",
          },
          {
            key: "lastName",
            title: "Familiya",
            dataIndex: "lastName",
          },
        ]}
        dataSource={users.map((user) => ({ ...user, key: user.id }))}
      />
    </div>
  );
}

export default UsersPage;
