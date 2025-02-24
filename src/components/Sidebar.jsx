import {
  FolderOpenOutlined,
  HomeOutlined,
  ProductOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link, useLocation, useNavigate } from "react-router";

function Sidebar({ collapsed }) {
  let location = useLocation();
  // let navigate = useNavigate();

  return (
    <Menu
      className="h-full"
      style={{
        padding: 1,
        maxWidth: 150,
        height: "100vh",
      }}
      selectedKeys={[location.pathname]}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      items={[
        { key: "/", icon: <HomeOutlined />, label: <Link to={"/"}>Home</Link> },

        {
          key: "/products",
          icon: <ProductOutlined />,
          label: <Link to={"/products"}>Products</Link>,
        },
        {
          key: "/categories",
          icon: <FolderOpenOutlined />,
          label: <Link to={"/categories"}>Catigories</Link>,
        },
      ]}
    />
  );
}

export default Sidebar;
