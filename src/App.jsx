import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import "./App.css";
import MainLayout from "./components/main-layout";
import DashBoard from "./pages/dashboard/dashboard";
import Login from "./pages/login/login";
import { useEffect } from "react";
import Accommodation from "./pages/acc-list/accommodation";
import AddAccommodation from "./pages/acc-add/add-acc";
import UpdateAccommodation from "./pages/acc-update/acc-update";
import Room from "./pages/room-list/room";
import AddRoom from "./pages/room-add/room-add";
import UpdateRoom from "./pages/room-update/room-update";
import RoomDetail from "./pages/room-detail/room-detail";

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
          <Route path="/accommodation" element={<Accommodation />} />
          <Route path="/add-accommodation" element={<AddAccommodation />} />
          <Route
            path="/update-accommodation/:id"
            element={<UpdateAccommodation />}
          />
          <Route path="/room" element={<Room />} />
          <Route path="/add-room" element={<AddRoom />} />
          <Route path="/update-room/:id" element={<UpdateRoom />} />
          <Route path="/room-detail/:id" element={<RoomDetail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
