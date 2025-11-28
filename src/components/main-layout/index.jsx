import { Outlet } from "react-router-dom";
import Header from "../header/header";
import Sidebar from "../sidebar";
import { useState } from "react";
import "./index.css";

const MainLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="main-layout">
      <div className="main-header">
        <Header />
      </div>

      <div className="main-content-container">
        <Sidebar
          isCollapsed={isCollapsed}
          onToggle={() => setIsCollapsed(!isCollapsed)}
        />

        <div className={`main-content ${isCollapsed ? "expanded" : ""}`}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
