import React from "react";
import "./dashboard.css";

const DashBoard = () => {
  return (
    <div className="dashboard-container">
      {/* Header title */}
      <h2 className="dashboard-title">Dashboard Overview</h2>

      {/* Statistic cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Users</h3>
          <p className="stat-number">1,254</p>
        </div>

        <div className="stat-card">
          <h3>Total Bookings</h3>
          <p className="stat-number">342</p>
        </div>

        <div className="stat-card">
          <h3>Available Rooms</h3>
          <p className="stat-number">87</p>
        </div>

        <div className="stat-card">
          <h3>Revenue (Month)</h3>
          <p className="stat-number">$12,680</p>
        </div>
      </div>

      {/* Charts section */}
      <div className="charts-section">
        <div className="chart-box">Chart 1 (fake)</div>
        <div className="chart-box">Chart 2 (fake)</div>
      </div>

      {/* Table section */}
      <div className="table-section">
        <h3>Recent Bookings</h3>

        <table className="dashboard-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Customer</th>
              <th>Room</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td>#0012</td>
              <td>John Doe</td>
              <td>Room 202</td>
              <td>2025-11-27</td>
              <td>
                <span className="badged success">Completed</span>
              </td>
            </tr>

            <tr>
              <td>#0013</td>
              <td>Sarah Smith</td>
              <td>Room 108</td>
              <td>2025-11-26</td>
              <td>
                <span className="badged warning">Pending</span>
              </td>
            </tr>

            <tr>
              <td>#0014</td>
              <td>Michael Lee</td>
              <td>Room 305</td>
              <td>2025-11-25</td>
              <td>
                <span className="badged danger">Cancelled</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashBoard;
