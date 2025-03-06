import { Button, Drawer, Form, Input, message, Select } from "antd";
import { useEffect, useState } from "react";
import useAuthStore from "../../store/my-store";
import api from "../api/api";

function EditRentsTwo({
  onFinish,
  isOpenDrawerEditRents,
  setIsOpenDrawerEditRents,
  edit,
  setEdit,
}) {
  // console.log(edit);

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    users: [],
    stocks: [],
  });

  useEffect(() => {
    api.get("/api/stocks").then((res) => {
      setData((data) => {
        return {
          ...data,
          stocks: res.data.items,
        };
      });
    });

    api.get("/api/users").then((res) => {
      setData((data) => {
        return {
          ...data,
          users: res.data.items,
        };
      });
    });
  }, []);
  if (!edit) {
    return <></>;
  }

  return (
    <>
      <Drawer
        title={"Ijara Qo'shish"}
        open={isOpenDrawerEditRents}
        closeIcon={null}
        onClose={() => {
          setIsOpenDrawerEditRents(false);
        }}
        destroyOnClose
      >
        <Form
          layout="vertical"
          initialValues={{
            ...edit,
            leasedAt: edit.leasedAt.slice(0, 10),
            returningDate: edit.leasedAt.slice(0, 10),
          }}
          onFinish={(values) => {
            console.log(values);

            setLoading(true);
            api
              .put(`/api/rents/${edit.id}`, values)
              .then((res) => {
                console.log(res.data);
                message.success("Add Succes");
                setIsOpenDrawerEditRents(false);
                onFinish();
              })
              .catch((err) => {
                console.log(err);

                message.error("Xatolik");
              })
              .finally(() => {
                setLoading(false);
              });
          }}
        >
          <Form.Item
            label="Kitobxon"
            name={"userId"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={data.users.map((u) => {
                return {
                  label: `${u.firstName} ${u.lastName}`,
                  value: u.id,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            label="Kitob zaxirasi"
            name={"stockId"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              options={data.stocks.map((s) => {
                return {
                  label: s.book.name,
                  value: s.id,
                };
              })}
            />
          </Form.Item>
          <Form.Item
            label="Topshirilgan sana"
            name={"leasedAt"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="date" />
          </Form.Item>
          <Form.Item
            label="Qaytarilgan sana"
            name={"returningDate"}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input type="date" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Qo'shish
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}

export default EditRentsTwo;
