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
  console.log(edit);

  const authState = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    users: [],
    stocks: [],
  });

  useEffect(() => {
    api
      .get("/api/stocks", {
        params: {
          "filters[busy]": false,
        },
      })
      .then((res) => {
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
            userId: edit?.userId,
            stockId: edit?.stockId,
            leasedAt: "44",
            returningDate: "",
          }}
          onFinish={(values) => {
            console.log(values);

            setLoading(true);
            api
              .post(`/api/rents`, values)
              .then((res) => {
                console.log(res.data);
                setIsOpenDrawerEditRents(false);

                message.success("Succes Add ");

                onFinish();
              })
              .catch((e) => {
                setLoading(false);
                message.error(e.response.data.message);
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
