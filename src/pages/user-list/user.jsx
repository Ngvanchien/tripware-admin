import React, { useState, useEffect } from "react";
import { Table, Tag, Spin, Button, Modal, message, Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { get, deleteMethod, patch } from "../../utils/axios/axios";
import {
  UnorderedListOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import "./user.css";

const { confirm } = Modal;

export default function ListUser() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const allUsers = [];

      for (let page = 0; page <= 10; page++) {
        const res = await get(`users?page=${page}`);
        const items = res?.data?.items || [];

        if (!Array.isArray(items) || items.length === 0) break;

        allUsers.push(...items);
      }

      setData(allUsers);
    } catch (err) {
      console.error(err);
      message.error("Không lấy được danh sách người dùng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    confirm({
      title: "Xác nhận xóa người dùng",
      content: "Bạn có chắc chắn muốn xóa người dùng này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteMethod(`users/${id}`);
          setData((prev) => prev.filter((u) => u.id !== id));
          message.success("Đã xóa thành công!");
        } catch (err) {
          console.error(err);
          message.error("Xóa thất bại!");
        }
      },
    });
  };

  const changeStatus = async (id, newStatus) => {
    try {
      await patch(`users/status/${id}?status=${newStatus}`);

      setData((prev) =>
        prev.map((u) => (u.id === id ? { ...u, status: newStatus } : u))
      );

      message.success(`Đã đổi trạng thái thành ${newStatus.toUpperCase()}`);
    } catch (err) {
      console.error(err);
      message.error("Đổi trạng thái thất bại!");
    }
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id", width: 40 },

    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      width: 120,
      render: (name) => name || "—",
    },

    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 180,
      render: (email) => email || "—",
    },

    {
      title: "SĐT",
      dataIndex: "phone",
      key: "phone",
      width: 80,
      render: (p) => p || "—",
    },

    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      width: 150,
      render: (a) => a || "—",
    },

    {
      title: "Ngày sinh",
      dataIndex: "dateOfBirth",
      key: "dateOfBirth",
      width: 100,
      render: (d) => (d ? new Date(d).toLocaleDateString("vi-VN") : "—"),
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 140,
      render: (status, record) => {
        const safeStatus = status || "unknown";

        const color =
          safeStatus === "active"
            ? "green"
            : safeStatus === "banned"
            ? "red"
            : safeStatus === "suspended"
            ? "orange"
            : "default";

        const items = [
          { key: "active", label: "ACTIVE" },
          { key: "suspended", label: "SUSPENDED" },
          { key: "banned", label: "BANNED" },
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
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 80,
      render: (_, record) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Button
            size="small"
            type="primary"
            icon={<EditOutlined />}
            style={{ width: 28, padding: 0 }}
            onClick={() => navigate(`/update-user/${record.id}`)}
            title="Chỉnh sửa"
          />

          <Button
            size="small"
            type="default"
            icon={<UnorderedListOutlined />}
            style={{ width: 28, padding: 0 }}
            onClick={() => navigate(`/user-detail/${record.id}`)}
            title="Xem chi tiết"
          />

          <Button
            size="small"
            danger
            type="primary"
            icon={<DeleteOutlined />}
            style={{ width: 28, padding: 0 }}
            onClick={() => handleDelete(record.id)}
            title="Xóa"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="user-page">
      <div className="page-header">
        <h2>Danh sách người dùng</h2>
        <Button
          type="primary"
          size="large"
          onClick={() => navigate("/add-user")}
          style={{ background: "#2893dbff", borderColor: "#45c9d2ff" }}
        >
          + Thêm người dùng
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
