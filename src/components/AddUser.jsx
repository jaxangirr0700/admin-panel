import React, { useState } from "react";
import useAuthStore from "../store/my-store";
import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";

function AddUser({ isOpenDrawer, setIsOpenDrawer }) {
  const authState = useAuthStore();

  return (
    <>
      <Button
        type="primary"
        onClick={() => {
          setIsOpenDrawer(true);
        }}
      >
        Add user
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
          onFinish={(values) => {
            console.log(values);
            const newValues = { ...values, phone: values.phone.toString() };
            console.log(newValues);

            axios
              .post(`https://library.softly.uz/api/users`, newValues, {
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
          <Form.Item
            label={"Ism"}
            name={"firstName"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            label={"Familiya"}
            name={"lastName"}
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            label={"Telefon raqam"}
            name={"phone"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>{" "}
          <Form.Item
            label={"Jinsi"}
            name={"gender"}
            rules={[{ required: true }]}
          >
            <Radio.Group
              block
              options={[
                {
                  label: "Erkak",
                  value: "male",
                },
                {
                  label: "Ayol",
                  value: "female",
                },
              ]}
              optionType="button"
              defaultValue={"male"}
              buttonStyle="solid"
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

export default AddUser;
