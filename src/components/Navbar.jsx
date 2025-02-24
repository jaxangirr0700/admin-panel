import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { Link } from "react-router";
import useAuthStore from "../store/my-store";

function Navbar({ collapsed, setCollapsed }) {
  const authState = useAuthStore();
  return (
    <nav className="bg-slate-800 h-16 text-white flex justify-between items-center">
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
      <div className="flex gap-3 items-center justify-center mr-5 ">
        <span>{authState.user.username}</span>
        <Button
          type="primary"
          onClick={() => {
            authState.logout();
          }}
        >
          logout
        </Button>
      </div>
    </nav>
  );
}
export default Navbar;
