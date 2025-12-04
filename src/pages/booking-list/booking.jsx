import React, { useState, useEffect } from "react";
import { Table, Tag, Spin, Button, Modal, message } from "antd";
import { useNavigate } from "react-router-dom";
import { get, deleteMethod } from "../../utils/axios/axios";
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
      width: 110,
      filters: [
        { text: "Pending", value: "pending" },
        { text: "Confirmed", value: "confirmed" },
        { text: "Cancelled", value: "cancelled" },
      ],
      onFilter: (v, r) => r.status === v,
      render: (s) => {
        const color =
          s === "pending" ? "orange" : s === "confirmed" ? "green" : "red";

        return <Tag color={color}>{s.toUpperCase()}</Tag>;
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
