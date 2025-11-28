import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Table, Tag, Spin, Image, Button, message, Modal } from "antd";
import {
  EditOutlined,
  UnorderedListOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { deleteMethod, get } from "../../utils/axios/axios";
import "./accommodation.css";

const { confirm } = Modal;

const Accommodation = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const fetchData = async () => {
    setLoading(true);
    try {
      const allAcc = [];
      const startPage = 0;
      const endPage = 10;
      for (let i = startPage; i <= endPage; i++) {
        const res = await get(`accommodations?page=${i}`);
        const items = res?.data?.items || [];
        allAcc.push(...items);
      }
      setData(allAcc);
    } catch (err) {
      console.error(err);
      message.error("Không lấy được danh sách chỗ ở!");
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
      content: "Bạn có chắc muốn xóa chỗ ở này không?",
      okText: "Xóa",
      okType: "danger",
      cancelText: "Hủy",
      onOk: async () => {
        try {
          await deleteMethod(`accommodations/${id}`);
          message.success("Đã xóa thành công!");
          setData((prev) => prev.filter((item) => item.id !== id));
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
      width: 120,
      render: (imgs) =>
        imgs?.length ? (
          <Image
            src={imgs[0]}
            width={90}
            height={60}
            style={{ objectFit: "cover", borderRadius: 6 }}
            preview={false}
          />
        ) : (
          <div className="no-image">No Image</div>
        ),
    },

    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
      width: 130,
      sorter: (a, b) => (a.name || "").localeCompare(b.name || ""),
    },

    {
      title: "Loại",
      dataIndex: "type",
      key: "type",
      width: 90,
      render: (t) => <Tag color="blue">{t ? t.toUpperCase() : "N/A"}</Tag>,
      filters: [
        { text: "Hotel", value: "hotel" },
        { text: "Cruise", value: "cruise" },
      ],
      onFilter: (value, record) => record.type === value,
    },

    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
      ellipsis: true,
    },

    {
      title: "Tiện nghi",
      dataIndex: "amenities",
      key: "amenities",
      ellipsis: true,
    },

    {
      title: "Rating",
      dataIndex: "starRating",
      key: "starRating",
      width: 90,
      render: (v) => <Tag color="gold">{v} ★</Tag>,
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      width: 120,
      filters: [
        { text: "Available", value: "available" },
        { text: "Unavailable", value: "unavailable" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (s) => (
        <Tag
          color={
            s === "available"
              ? "green"
              : s === "unavailable"
              ? "red"
              : "default"
          }
        >
          {s?.toUpperCase()}
        </Tag>
      ),
    },

    {
      title: "Hành động",
      key: "action",
      fixed: "right",
      width: 150,
      render: (_, record) => (
        <div className="action-buttons">
          <Button
            size="small"
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/update-accommodation/${record.id}`)}
            title="Chỉnh sửa"
          />

          <Button
            size="small"
            type="default"
            icon={<UnorderedListOutlined />}
            onClick={() => navigate(`/accommodation-detail/${record.id}`)}
            title="Xem chi tiết"
          />

          <Button
            size="small"
            danger
            type="primary"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.id)}
            title="Xóa"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="accommodation-page">
      <div className="page-header">
        <h2>Danh sách chỗ ở</h2>

        <div className="header-buttons">
          <Button
            type="primary"
            size="large"
            style={{ background: "#2893dbff", borderColor: "#45c9d2ff" }}
            onClick={() => navigate("/add-accommodation")}
          >
            + Thêm chỗ ở mới
          </Button>
        </div>
      </div>

      <div className="table-container">
        <Spin spinning={loading} tip="Đang tải dữ liệu...">
          <Table
            columns={columns}
            dataSource={data}
            rowKey="id"
            pagination={{ pageSize: 10, showSizeChanger: true }}
            scroll={{ x: 1400 }}
            bordered
          />
        </Spin>
      </div>
    </div>
  );
};

export default Accommodation;
