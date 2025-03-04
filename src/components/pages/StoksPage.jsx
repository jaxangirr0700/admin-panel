import { message, Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../../store/my-store";
import AddStok from "../AddAndEdits/AddStok";
import { CheckCircleFilled, CheckCircleTwoTone } from "@ant-design/icons";

function StoksPage() {
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [stoks, setStoks] = useState();
  const authState = useAuthStore();
  // console.log(authState.token);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;
  const [bookId, setBookId] = useState(null);

  useEffect(() => {
    axios
      .get(`https://library.softly.uz/api/stocks`, {
        params: {
          size: pageSize,
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setStoks(res.data);
        // message.success("Success");
      })
      .catch((err) => {
        console.log(err);
        message.error("Xatolik");
      });
  }, [isOpenDrawer, currentPage]);
  if (!stoks) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div className="flex justify-between px-2 py-1">
        <h1 className="font-bold text-2xl">Kitoblar (Stocks)</h1>
        <AddStok
          isOpenDrawer={isOpenDrawer}
          setIsOpenDrawer={setIsOpenDrawer}
          pageSize={pageSize}
          currentPage={currentPage}
          bookId={bookId}
        />
      </div>
      <Table
        scroll={100}
        bordered
        loading={stoks ? false : true}
        columns={[
          {
            key: "id",
            title: "Raqami",
            dataIndex: "id",
          },
          {
            key: "name",
            title: "Kitob",
            dataIndex: "book",
            render: (book) => {
              setBookId(book?.id);
              return (
                <p>
                  {book?.id}.{book?.name}
                </p>
              );
            },
          },
          {
            key: "busy",
            title: "Bandlik",
            dataIndex: "busy",
            render: (value) => {
              // console.log(value);

              return value ? (
                <CheckCircleFilled twoToneColor={"#eb2f96"} />
              ) : (
                <CheckCircleTwoTone twoToneColor="#52c41a" />
              );
            },
          },
          {
            key: "Yasalgan",
            title: "Yasalgan",
            dataIndex: "book",
            render: (value) => {
              return <p>{value?.createdAt.toString("ru")}</p>;
            },
          },
          {
            key: "Yangilangan",
            title: "Yangilangan",
            dataIndex: "book",
            render: (value) => {
              return <p>{value?.updatedAt}</p>;
            },
          },
        ]}
        dataSource={stoks.items.map((i) => {
          return { ...i, key: i.id };
        })}
        pagination={{
          pageSize: pageSize,
          current: currentPage,
          total: stoks.totalCount,
        }}
        onChange={(pagination) => {
          setCurrentPage(pagination.current);
        }}
      />
    </div>
  );
}
// .map((user) => ({ ...stoks, key: user.id }))

export default StoksPage;
