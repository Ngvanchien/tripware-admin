import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import MainLayout from "./components/main-layout";
import DashBoard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import { useEffect } from "react";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const initialPath = location.pathname;
    if (!accessToken && initialPath !== "/login") {
      navigate("/login", { replace: true });
    } else if (accessToken && initialPath === "/") {
      navigate("/", { replace: true });
    }
  }, [location.pathname, navigate]);
  return (
    <div className="app">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<MainLayout />}>
          <Route path="/" element={<DashBoard />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
