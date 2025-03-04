import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/my-store";
import Loader from "../loader/Loader";
import AddUser from "../AddAndEdits/AddUser";
import EditUser from "../AddAndEdits/EditUser";
import api from "../api/api";

function UsersPage() {
  const pageSize = 10;
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const authState = useAuthStore();

  // console.log(authState.token);

  const [users, setUsers] = useState();
  const [currentPage, setCurrentPage] = useState();
  const [user, setUser] = useState();
  const [isOpenDrawerEdit, setIsOpenDrawerEdit] = useState(false);

  function fetchUser() {
    api
      .get(`/api/users`, {
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
        // console.log(res.data.items);

        setUsers(res.data);

        // message.success("Success");
      })
      .catch((err) => {
        console.log(err);
        message.error("Xatolik");
      });
  }
  useEffect(() => {
    fetchUser();
  }, [isOpenDrawer, currentPage, isOpenDrawerEdit]);
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
            onFinish={fetchUser}
            isOpenDrawer={isOpenDrawer}
            setIsOpenDrawer={setIsOpenDrawer}
          />
          <EditUser
            onFinish={fetchUser}
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
          {
            key: "phone",
            title: "Telefon",
            dataIndex: "phone",
          },

          {
            key: "gender",
            title: "Jinsi",
            dataIndex: "gender",
            render: (g) => {
              if (g === "male") {
                return "Erkak";
              } else if (g === "female") {
                return "Ayol";
              } else {
                return "Noma'lum";
              }
            },
          },
        ]}
        dataSource={users.items.map((user) => {
          return { ...user, key: user.id };
        })}
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
