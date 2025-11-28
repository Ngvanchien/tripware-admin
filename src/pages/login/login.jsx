import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { message } from "antd";
import "./login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      message.error("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      await login({ username, password });
      message.success("Đăng nhập thành công!");
      navigate("/");
    } catch (error) {
      message.error("Sai tên đăng nhập hoặc mật khẩu!");
    }
  };

  return (
    <div className="login-container">
      <section className="login-section">
        <div className="login-wrapper">
          <div className="login-card">
            <div className="card-body">
              <div className="login-logo">
                <img src="/img/logo_Tripware.png" alt="Tripware Logo" />
                <h2 className="brand-name">Tripware Admin</h2>
                <p className="brand-tagline">Powerful Admin Dashboard</p>
              </div>

              <form className="login-form" onSubmit={handleSubmit}>
                <div className="input-group">
                  <label htmlFor="username">Tên đăng nhập</label>
                  <div className="input-wrapper">
                    <span className="input-icon"></span>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.trim())}
                      placeholder="admin"
                      required
                    />
                  </div>
                </div>

                <div className="input-group">
                  <label htmlFor="password">Mật khẩu</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="remember-me">
                  <input type="checkbox" id="remember" />
                  <label htmlFor="remember">Ghi nhớ đăng nhập</label>
                </div>

                <button type="submit" className="login-btn">
                  Đăng nhập
                </button>

                <p className="register-link">
                  Chưa có tài khoản? <a href="/register">Đăng ký ngay</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Login;
