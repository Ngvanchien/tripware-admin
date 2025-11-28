// src/components/Sidebar/Sidebar.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BiGridAlt,
  BiBarChartAlt2,
  BiBuildingHouse,
  BiBed,
  BiBookContent,
  BiUser,
  BiShieldAlt2,
  BiEnvelope,
  BiLogIn,
  BiPurchaseTag,
  BiCalendarCheck,
  BiMenuAltLeft, // ⭐ ICON MENU
} from "react-icons/bi";
import "./index.css";

const Sidebar = ({ isCollapsed, onToggle }) => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <BiBarChartAlt2 />, label: "Dashboard", path: "/" },
    {
      icon: <BiBuildingHouse />,
      label: "Accommodation",
      path: "/accommodation",
    },
    { icon: <BiBed />, label: "Room", path: "/room" },
    { icon: <BiCalendarCheck />, label: "Booking", path: "/booking" },
    { icon: <BiUser />, label: "User", path: "/users" },
    { icon: <BiPurchaseTag />, label: "Promotion", path: "/promotions" },
    { icon: <BiShieldAlt2 />, label: "Permission", path: "/role-group" },
  ];

  const pageItems = [
    { icon: <BiUser />, label: "Profile", path: "/profile" },
    { icon: <BiEnvelope />, label: "Contact", path: "/contact" },
    { icon: <BiLogIn />, label: "Login", path: "/login" },
  ];

  return (
    <aside className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
      <button className="menu-toggle" onClick={onToggle}>
        <BiMenuAltLeft size={24} />
      </button>

      <nav className="sidebar-nav">
        <ul>
          {menuItems.map((item, idx) => (
            <li key={idx} className="nav-item">
              <button className="nav-link" onClick={() => navigate(item.path)}>
                <span className="icon">{item.icon}</span>
                {!isCollapsed && <span className="label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>

        {!isCollapsed && (
          <div className="nav-section-title">
            <span>Pages</span>
          </div>
        )}

        <ul>
          {pageItems.map((item, idx) => (
            <li key={idx} className="nav-item">
              <button className="nav-link" onClick={() => navigate(item.path)}>
                <span className="icon">{item.icon}</span>
                {!isCollapsed && <span className="label">{item.label}</span>}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
