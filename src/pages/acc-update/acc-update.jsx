import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Select,
  Row,
  Col,
  message,
  Card,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { putJSON } from "../../utils/axios/axios";

const { Option } = Select;

const UpdateAccommodation = () => {
  const { id } = useParams();
  const [data, setData] = useState();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_URL_PUBLIC}/accommodations/${id}`
        );
        setData(res.data?.data);
      } catch (err) {
        console.error(err);
        message.error("Không lấy được dữ liệu chỗ ở!");
      }
    };
    fetchData();
  }, [id]);

  useEffect(() => {
    if (data) form.setFieldsValue(data);
  }, [data]);

  const onFinish = async (values) => {
    try {
      console.log("DATA SEND:", values);
      await putJSON(`accommodations/${id}`, values);
      message.success("Cập nhật chỗ ở thành công!");
      navigate("/accommodation");
    } catch (err) {
      console.error(err);
      message.error("Cập nhật thất bại!");
    }
  };

  return (
    <div style={{ width: "80%", marginTop: "80px", marginLeft: "100px" }}>
      <Card
        title="Cập nhật Accommodation"
        variant="default"
        styles={{
          header: {
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          },
        }}
        style={{
          backgroundColor: "rgb(232, 248, 248);",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
          padding: "20px",
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="name"
                label="Tên Accommodation"
                rules={[{ required: true }]}
              >
                <Input placeholder="Sunrise Hotel" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item name="type" label="Loại" rules={[{ required: true }]}>
                <Select placeholder="hotel, homestay, resort...">
                  <Option value="hotel">Hotel</Option>
                  <Option value="resort">Resort</Option>
                  <Option value="homestay">Homestay</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="locationId"
                label="Location ID"
                rules={[{ required: true }]}
              >
                <InputNumber style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="starRating"
                label="Số sao"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={5} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="address"
            label="Địa chỉ"
            rules={[{ required: true }]}
          >
            <Input placeholder="123 Beach Street, Miami" />
          </Form.Item>

          <Form.Item name="amenities" label="Tiện ích">
            <Input placeholder="Pool, Gym, Spa..." />
          </Form.Item>

          <Form.Item name="basePrice" label="Giá cơ bản (USD)">
            <InputNumber style={{ width: "100%" }} step={0.5} />
          </Form.Item>

          <Form.Item
            name="status"
            label="Trạng thái"
            rules={[{ required: true }]}
          >
            <Select>
              <Option value="available">Available</Option>
              <Option value="unavailable">Unavailable</Option>
              <Option value="maintenance">Maintenance</Option>
            </Select>
          </Form.Item>

          <Form.Item name="description" label="Mô tả">
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateAccommodation;
