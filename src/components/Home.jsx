import React, { useState } from "react";
import useAuthStore from "../store/my-store";
import MainSection from "./MainSection";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import LoginPage from "./pages/LoginPage";
function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const authState = useAuthStore();
  // console.log(authState.isAuthenticate);

  if (!authState.isAuthenticate) {
    return <LoginPage />;
  } else {
    return (
      <div className="h-screen bg-gray-100">
        <Navbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex h-full">
          <Sidebar collapsed={collapsed} />
          <MainSection />
        </div>
      </div>
    );
  }
}

export default Home;
