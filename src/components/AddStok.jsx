import { Button, Drawer, Form, Input, message, Select, Spin } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import useAuthStore from "../store/my-store";
import Loader from "./loader/Loader";

function AddStok({ isOpenDrawer, setIsOpenDrawer }) {
  const authState = useAuthStore();

  const [books, setBooks] = useState();

  useEffect(() => {
    axios
      .get("https://library.softly.uz/api/books", {
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

  //   const newBooks = books.map((b) => {
  //     return { id: b.id };
  //   });
  //   console.log(newBooks);

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
                message.success("Qo'shildi");
              });
          }}
        >
          <Form.Item name={"bookId"} label="Kitob">
            <Select
              showSearch
              placeholder="Kitob Qo'shish"
              options={books?.items.map((b) => {
                return {
                  label: b.name,
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
