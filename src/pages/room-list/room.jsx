import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Tag, Spin, Image, Button, message, Modal } from "antd";
import {
  EditOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { deleteMethod, get } from "../../utils/axios/axios";
import "./room.css";

const { confirm } = Modal;

const Room = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const allRooms = [];
      for (let i = 0; i <= 10; i++) {
        const res = await get(`rooms?page=${i}`);
        const items = res?.data?.items || [];
        allRooms.push(...items);
      }
      setData(allRooms);
    } catch (err) {
      console.error(err);
      message.error("Không lấy được danh sách phòng!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = (id) => {
    confirm({
      title: "Xác nhận xóa",
      content: "Bạn có chắc muốn xóa phòng này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteMethod(`rooms/${id}`);
          setData((prev) => prev.filter((i) => i.id !== id));
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
      title: "Ảnh",
      dataIndex: "imageUrls",
      key: "image",
      width: 110,
      render: (imgs) =>
        imgs?.length ? (
          <Image
            src={imgs[0]}
            width={90}
            height={60}
            style={{ objectFit: "cover", borderRadius: 4 }}
            preview={false}
          />
        ) : (
          <div className="no-image">No Img</div>
        ),
    },

    {
      title: "Tên phòng",
      dataIndex: "roomName",
      key: "roomName",
      width: 170,
      sorter: (a, b) => (a.roomName || "").localeCompare(b.roomName || ""),
    },

    {
      title: "Loại",
      dataIndex: "roomType",
      key: "roomType",
      width: 90,
      filters: [
        { text: "Standard", value: "standard" },
        { text: "Deluxe", value: "deluxe" },
        { text: "Suite", value: "suite" },
      ],
      onFilter: (v, r) => r.roomType === v,
      render: (t) => <Tag color="blue">{t?.toUpperCase()}</Tag>,
    },

    {
      title: "Accommodation",
      dataIndex: "accommodation",
      key: "accommodation",
      width: 180,
      render: (acc) =>
        acc ? (
          <div>
            <b>{acc.name}</b>
            <div style={{ fontSize: 11, color: "#666" }}>
              ({acc.type?.toUpperCase()})
            </div>
          </div>
        ) : (
          "N/A"
        ),
    },

    { title: "Sức chứa", dataIndex: "capacity", key: "capacity", width: 80 },

    {
      title: "Giá/Đêm",
      dataIndex: "pricePerNight",
      key: "pricePerNight",
      width: 110,
      render: (v) =>
        v?.toLocaleString("vi-VN", { style: "currency", currency: "VND" }),
      sorter: (a, b) => a.pricePerNight - b.pricePerNight,
    },

    {
      title: "Diện tích(m²)",
      dataIndex: "sizeM2",
      key: "sizeM2",
      width: 100,
      sorter: (a, b) => a.sizeM2 - b.sizeM2,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 110,
      filters: [
        { text: "Available", value: "available" },
        { text: "Booked", value: "booked" },
        { text: "Maintenance", value: "maintenance" },
      ],
      onFilter: (v, r) => r.status === v,
      render: (s) => {
        const color =
          s === "available" ? "green" : s === "booked" ? "red" : "orange"; // maintenance

        return <Tag color={color}>{s?.toUpperCase()}</Tag>;
      },
    },

    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 100,
      render: (_, record) => (
        <div className="action-buttons">
          <Button
            size="small"
            type="primary"
            style={{ width: 28, padding: 0 }}
            icon={<EditOutlined />}
            onClick={() => navigate(`/update-room/${record.id}`)}
            title="Chỉnh sửa"
          />

          <Button
            size="small"
            type="default"
            style={{ width: 28, padding: 0 }}
            icon={<UnorderedListOutlined />}
            onClick={() => navigate(`/room-detail/${record.id}`)}
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
    <div className="room-page">
      <div className="page-header">
        <h2>Danh sách phòng</h2>
        <Button
          type="primary"
          size="large"
          style={{ background: "#2893dbff", borderColor: "#45c9d2ff" }}
          onClick={() => navigate("/add-room")}
        >
          + Thêm phòng mới
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
};

export default Room;
