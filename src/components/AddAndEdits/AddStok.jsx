import { Button, Drawer, Form, message, Select } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Loader from "../loader/Loader";
import useAuthStore from "../../store/my-store";

function AddStok({ isOpenDrawer, setIsOpenDrawer, pageSize, currentPage }) {
  const authState = useAuthStore();

  const [books, setBooks] = useState();

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/books", {
        params: {
          pageSize: 20,
          page: currentPage,
        },
        headers: {
          Authorization: `Bearer ${authState.token}`,
        },
      })
      .then((res) => {
        // console.log(res.data);

        setBooks(res.data);
        // console.log(books);
      })
      .catch((err) => {
        console.log(err);
        message.error("Books not");
      });
  }, []);
  if (!books?.items) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <Loader />
      </div>
    );
  }

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setIsOpenDrawer(true);
        }}
      >
        + Qo'shish
      </Button>
      <Drawer
        title={"Kitobxon qo'shish"}
        open={isOpenDrawer}
        closeIcon={null}
        onClose={() => {
          setIsOpenDrawer(false);
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          onFinish={(values) => {
            console.log(values);

            axios
              .post(`https://library.softly.uz/api/stocks`, values, {
                headers: {
                  Authorization: `Bearer ${authState.token}`,
                },
              })
              .then((res) => {
                console.log(res);
                setIsOpenDrawer(false);
                // console.log(res);

                message.success("Qo'shildi");
              });
          }}
        >
          <Form.Item name={"bookId"} label="Kitob">
            <Select
              showSearch
              placeholder="Kitob Qo'shish"
              options={books?.items.map((b) => {
                // console.log(b);

                return {
                  label: `${b.name}   ${b.id}`,
                  value: b.id,
                };
              })}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Qo'shish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default AddStok;
