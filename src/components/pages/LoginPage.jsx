import { Button, Card, Form, Input, message } from "antd";
import axios from "axios";
import React, { useState } from "react";
import useAuthStore from "../../store/my-store";

function LoginPage() {
  const [loading, setLoading] = useState(false);
  const authState = useAuthStore();
  //   console.log(authState);

  return (
    <div className="flex items-center justify-center h-full m-auto mt-20">
      <Card className="shadow-lg w-96 shadow-black">
        <Form
          initialValues={{
            username: "lib2",
            password: "lib22",
          }}
          onFinish={(values) => {
            // console.log(values);
            setLoading(true);
            axios
              .post(`https://library.softly.uz/auth/signin`, values)
              .then((res) => {
                authState.login(res.data);
                setLoading(false);
                message.success("Success");
                localStorage.setItem("auth", JSON.stringify(res.data));
              });
          }}
        >
          <Form.Item
            label={"Login"}
            name={"username"}
            rules={[
              {
                required: true,
                message: "to'g'ri yozing",
              },
              {
                min: 3,
                message: "to'g'ri yozing",
              },
            ]}
          >
            <Input />
          </Form.Item>{" "}
          <Form.Item
            label={"Password"}
            name={"password"}
            rules={[
              {
                required: true,
                massage: "to'g'ri yozing",
              },
              {
                max: 12,
                message: "10 tadan ko'p bo'lmasin",
              },
              {
                min: 3,
                message: "Kamida 3 ta",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            onClick={() => {}}
          >
            Submit
          </Button>
        </Form>
      </Card>

      {/* {user?.user.username} */}
    </div>
  );
}

export default LoginPage;
