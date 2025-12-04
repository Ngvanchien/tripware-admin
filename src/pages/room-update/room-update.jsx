import React, { useState, useEffect } from "react";
import {
  Form,
  Input,
  InputNumber,
  Button,
  Row,
  Col,
  Select,
  message,
  Card,
} from "antd";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { putJSON } from "../../utils/axios/axios";

const { Option } = Select;

const UpdateRoom = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_APP_URL_PUBLIC}/rooms/${id}`
        );
        setData(res.data?.data);
      } catch (err) {
        console.error(err);
        message.error("Không lấy được dữ liệu phòng!");
      }
    };
    fetchRoom();
  }, [id]);

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        accommodationId: data.accommodation?.id,
      });
    }
  }, [data]);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      const payload = {
        accommodationId: values.accommodationId,
        roomName: values.roomName,
        roomType: values.roomType,
        capacity: values.capacity,
        pricePerNight: values.pricePerNight,
        sizeM2: values.sizeM2,
        status: values.status,
        description: values.description,
      };

      console.log("SEND CLEAN PAYLOAD:", payload);

      await putJSON(`rooms/${id}`, payload);

      message.success("Cập nhật phòng thành công!");
      navigate("/room");
    } catch (err) {
      console.error(err);
      message.error("Cập nhật phòng thất bại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ width: "80%", marginTop: "80px", marginLeft: "100px" }}>
      <Card
        title="Cập nhật Room"
        variant="default"
        styles={{
          header: {
            fontSize: "20px",
            fontWeight: "bold",
            textAlign: "center",
          },
        }}
        style={{
          backgroundColor: "rgba(255, 255, 255, 1)",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0,0,0,0.2)",
          padding: "20px",
        }}
      >
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="accommodationId"
                label="Accommodation ID"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="roomName"
                label="Tên phòng"
                rules={[{ required: true }]}
              >
                <Input placeholder="VD: Deluxe Ocean View" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="roomType"
                label="Loại phòng"
                rules={[{ required: true }]}
              >
                <Input placeholder="Deluxe, Standard, Family..." />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="capacity"
                label="Sức chứa"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="pricePerNight"
                label="Giá mỗi đêm"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                name="sizeM2"
                label="Diện tích (m2)"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} step={0.5} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

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

          <Form.Item
            name="description"
            label="Mô tả"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={3} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UpdateRoom;
