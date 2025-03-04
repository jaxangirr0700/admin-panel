import {
  LeftCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Dropdown } from "antd";
import { Link } from "react-router";
import useAuthStore from "../store/my-store";

function Navbar({ collapsed, setCollapsed }) {
  const authState = useAuthStore();
  return (
    <nav className="bg-slate-800 h-20 text-white flex justify-between items-center">
      <div className="flex items-center gap-2 ">
        <Button
          type="link"
          onClick={() => {
            setCollapsed(!collapsed);
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Link to={"/"}>Logo</Link>

        {/* <Button type="primary">Login</Button> */}
      </div>
      <Dropdown
        menu={{
          items: [
            {
              key: 1,
              label: "Sozlamalar",
              icon: <LeftCircleOutlined />,
            },
            {
              key: 2,
              label: "Logout",
              onClick: () => {
                authState.logout();
              },
              icon: <LeftCircleOutlined />,
              danger: true,
            },
          ],
        }}
      >
        <div className="pr-3 flex gap-2 items-center ">
          {" "}
          <Avatar size={"large"} icon={<UserAddOutlined />} />
          <div className="flex flex-col">
            <span>Kutubhonachi Test</span>{" "}
            <span>@{authState.user.username}</span>
          </div>
        </div>
      </Dropdown>
    </nav>
  );
}
export default Navbar;
