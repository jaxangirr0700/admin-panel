import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/my-store";
import AddUser from "../AddUser";
import { Loading3QuartersOutlined, LoadingOutlined } from "@ant-design/icons";
import EditUser from "../EditUser";
import Loader from "../loader/Loader";

function UsersPage() {
  const pageSize = 10;
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const authState = useAuthStore();

  // console.log(authState.token);

  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [user, setUser] = useState();
  const [isOpenDrawerEdit, setIsOpenDrawerEdit] = useState(false);

  useEffect(() => {
    axios
      .get(`https://library.softly.uz/api/users`, {
        params: {
          size: pageSize,
          page: currentPage,
          // totalCount: total,
        },
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);

        setUsers(res.data);

        // message.success("Success");
      })
      .catch((err) => {
        console.log(err);
        message.error("Xatolik");
      });
  }, [isOpenDrawer, currentPage]);
  if (!users) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between px-2 py-1">
        <h1 className="font-bold text-2xl">Kitobhonlar</h1>
        <div className="gap-3 flex">
          <AddUser
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
          />
          <EditUser
            isOpenDrawerEdit={isOpenDrawerEdit}
            setIsOpenDrawerEdit={setIsOpenDrawerEdit}
            user={user}
          />
        </div>
      </div>
      <Table
        bordered
        loading={users.items ? false : true}
        columns={[
          {
            key: "id",
            title: "Raqami",
            dataIndex: "id",
            render: (id) => {
              return (
                <div
                  onClick={() => {
                    const user2 = users.items.find((u) => {
                      return u.id == id;
                    });
                    setUser(user2);
                    setIsOpenDrawerEdit(true);
                  }}
                >
                  {" "}
                  {id}
                </div>
              );
            },
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
        dataSource={users.items.map((user) => ({ ...user, key: user.id }))}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: users.totalCount,
        }}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
          // console.log(currentPage);
        }}
      />
    </div>
  );
}

export default UsersPage;
