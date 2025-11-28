import { useNavigate } from "react-router-dom";
import { BsSearch, BsJustify } from "react-icons/bs";
import { GrNotification } from "react-icons/gr";
import { MdOutlineMessage } from "react-icons/md";
import { useState } from "react";
import "./header.css";

function Header({ toggleSidebar }) {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle-btn" onClick={toggleSidebar}>
          <BsJustify size={24} />
        </button>

        <div className="logo">
          <img src="/img/logo_tripware2.png" alt="Tripware" />
          <span className="logo-text">TripWare</span>
        </div>
      </div>

      <div className="search-container">
        <div className="search-box">
          <BsSearch className="search-icon" />
          <input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="header-right">
        <div className="icon-wrapper">
          <GrNotification size={22} />
          <span className="badge red">4</span>
        </div>

        <div className="icon-wrapper">
          <MdOutlineMessage size={22} />
          <span className="badge green">3</span>
        </div>

        <div className="profile-dropdown" onClick={() => navigate("/profile")}>
          <img
            src="/img/logo_Tripware.png"
            alt="User"
            className="profile-img"
          />
          <div className="profile-info">
            <span className="profile-name">N.Chien</span>
            <span className="profile-role">Quản trị viên</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
