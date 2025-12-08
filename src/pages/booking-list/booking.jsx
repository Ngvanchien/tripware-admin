import React, { useState, useEffect } from "react";
import { Table, Tag, Spin, Button, Modal, message, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { get, deleteMethod, patch } from "../../utils/axios/axios";
import {
  UnorderedListOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./booking.css";
const { confirm } = Modal;

export default function Booking() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const allBookings = [];

      for (let page = 0; page <= 10; page++) {
        const res = await get(`bookings?page=${page}`);
        const items = res?.data?.items || [];
        if (items.length === 0) break;
        allBookings.push(...items);
      }

      setData(allBookings);
    } catch (err) {
      console.error(err);
      message.error("Không lấy được danh sách booking!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const changeStatus = async (id, newStatus) => {
    try {
      await patch(`bookings/status/${id}?status=${newStatus}`);

      setData((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
      );

      message.success(`Đã đổi trạng thái thành ${newStatus.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      message.error("Đổi trạng thái thất bại!");
    }
  };

  const handleDelete = (id) => {
    confirm({
      title: "Xác nhận xóa booking",
      content: "Bạn có chắc muốn xóa booking này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteMethod(`bookings/${id}`);
          setData((prev) => prev.filter((b) => b.id !== id));
          message.success("Đã xóa thành công!");
        } catch (err) {
          console.error(err);
          message.error("Xóa thất bại!");
        }
      },
    });
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 50 },

    {
      title: "Booking Code",
      dataIndex: "bookingCode",
      key: "bookingCode",
      width: 250,
      render: (code) => <span>{code}</span>,
    },

    {
      title: "Người đặt",
      dataIndex: "user",
      key: "user",
      width: 150,
      render: (u) =>
        u ? (
          <div>
            <span>{u.name}</span>
            <div style={{ fontSize: 12, color: "#666" }}>{u.phone}</div>
          </div>
        ) : (
          "N/A"
        ),
    },

    {
      title: "Check-in",
      dataIndex: "checkIn",
      key: "checkIn",
      width: 120,
      render: (d) => new Date(d).toLocaleDateString("vi-VN"),
      sorter: (a, b) => new Date(a.checkIn) - new Date(b.checkIn),
    },

    {
      title: "Check-out",
      dataIndex: "checkOut",
      key: "checkOut",
      width: 120,
      render: (d) => new Date(d).toLocaleDateString("vi-VN"),
      sorter: (a, b) => new Date(a.checkOut) - new Date(b.checkOut),
    },

    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      key: "totalPrice",
      width: 130,
      render: (v) =>
        v?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
      sorter: (a, b) => a.totalPrice - b.totalPrice,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status, record) => {
        const safeStatus = status || "unknown";

        const color =
          safeStatus === "pending"
            ? "orange"
            : safeStatus === "confirmed"
            ? "blue"
            : safeStatus === "checked_in"
            ? "purple"
            : safeStatus === "completed"
            ? "green"
            : safeStatus === "cancelled"
            ? "red"
            : "default";

        const items = [
          { key: "pending", label: "PENDING" },
          { key: "confirmed", label: "CONFIRMED" },
          { key: "checked_in", label: "CHECKED IN" },
          { key: "completed", label: "COMPLETED" },
          { key: "cancelled", label: "CANCELLED" },
        ];

        return (
          <Dropdown
            menu={{
              items,
              onClick: (e) => changeStatus(record.id, e.key),
            }}
            trigger={["click"]}
          >
            <Tag
              color={color}
              style={{
                cursor: "pointer",
                fontSize: 12,
                padding: "4px 10px",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              {safeStatus.toUpperCase()}{" "}
              <span style={{ marginLeft: 4 }}>▾</span>
            </Tag>
          </Dropdown>
        );
      },
    },

    {
      title: "Thanh toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      width: 120,
      render: (s) => {
        const color = s === "paid" ? "green" : "red";
        return <Tag color={color}>{s.toUpperCase()}</Tag>;
      },
    },

    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            size="small"
            type="primary"
            style={{ width: 28, padding: 0 }}
            icon={<EditOutlined />}
            onClick={() => navigate(`/update-booking/${record.id}`)}
            title="Chỉnh sửa"
          />
          <Button
            size="small"
            type="default"
            style={{ width: 28, padding: 0 }}
            icon={<UnorderedListOutlined />}
            onClick={() => navigate(`/booking-detail/${record.id}`)}
            title="Xem chi tiết"
          />

          <Button
            size="small"
            danger
            type="primary"
            style={{ width: 28, padding: 0 }}
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            title="Xóa"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="booking-page">
      <div className="page-header">
        <h2>Danh sách booking</h2>
        <Button
          type="primary"
          size="large"
          style={{ background: "#2893dbff", borderColor: "#45c9d2ff" }}
          onClick={() => navigate("/add-room")}
        >
          + Thêm booking mới
        </Button>
      </div>

      <Spin spinning={loading} tip="Đang tải dữ liệu...">
        <Table
          columns={columns}
          dataSource={data}
          rowKey="id"
          pagination={{ pageSize: 10, showSizeChanger: true }}
          scroll={{ x: 1200 }}
          bordered
        />
      </Spin>
    </div>
  );
}
