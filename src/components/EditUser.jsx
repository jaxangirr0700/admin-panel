import { Button, Drawer, Form, Input, InputNumber, message, Radio } from "antd";
import axios from "axios";
import React from "react";
import useAuthStore from "../store/my-store";

function EditUser({ isOpenDrawerEdit, setIsOpenDrawerEdit, user }) {
  const authState = useAuthStore();

  return (
    <>
      <Drawer
        title={"Kitobxon o'zgartirish"}
        open={isOpenDrawerEdit}
        closeIcon={null}
        onClose={() => {
          setIsOpenDrawerEdit(false);
        }}
        destroyOnClose
      >
        <Form
          initialValues={{
            firstName: user?.firstName,
            lastName: user?.lastName,
            phone: user?.phone,
            gender: user?.gender,
          }}
          onFinish={(values) => {
            console.log(values);
            const newValues = { ...values, phone: values.phone.toString() };
            console.log(newValues);

            axios
              .put(
                `https://library.softly.uz/api/users/${user.id}`,
                newValues,
                {
                  headers: {
                    Authorization: `Bearer ${authState.token}`,
                  },
                }
              )
              .then(() => {
                // console.log(res);
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

export default EditUser;
