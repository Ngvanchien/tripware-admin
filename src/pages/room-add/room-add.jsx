import React, { useState } from "react";
import {
  Form,
  Input,
  InputNumber,
  Upload,
  Button,
  message,
  Card,
  Row,
  Col,
} from "antd";
import { useNavigate } from "react-router-dom";
import { postFormData } from "../../utils/axios/axios";

const AddRoom = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const handleUploadChange = ({ fileList: newList }) => {
    setFileList(newList);
  };

  const handleSubmit = async (values) => {
    if (fileList.length === 0) {
      return message.error("Vui lòng chọn ít nhất một hình ảnh.");
    }

    if (values.primaryImageIndex >= fileList.length) {
      return message.error(
        "Chỉ số ảnh đại diện vượt quá số lượng ảnh đã chọn."
      );
    }

    const formData = new FormData();

    const fields = [
      "accommodationId",
      "roomName",
      "roomType",
      "capacity",
      "pricePerNight",
      "sizeM2",
      "description",
      "primaryImageIndex",
    ];

    fields.forEach((field) => {
      formData.append(field, values[field]?.toString() || "");
    });

    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      await postFormData("rooms", formData);
      message.success("Tạo phòng thành công!");
      form.resetFields();
      setFileList([]);
      navigate("/room");
    } catch (err) {
      console.error(err);
      message.error(err?.response?.data?.message || "Tạo phòng thất bại!");
    }
  };

  return (
    <div style={{ padding: "40px", marginTop: "60px" }}>
      <Card
        title="Thêm Room"
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Accommodation ID"
                name="accommodationId"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Tên phòng"
                name="roomName"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Loại phòng"
                name="roomType"
                rules={[{ required: true }]}
              >
                <Input placeholder="vip, standard, family..." />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Sức chứa"
                name="capacity"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Giá mỗi đêm"
                name="pricePerNight"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Diện tích (m2)"
                name="sizeM2"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Mô tả"
            name="description"
            rules={[{ required: true }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>

          <Form.Item
            label="Ảnh đại diện (index)"
            name="primaryImageIndex"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} style={{ width: "100%" }} />
          </Form.Item>

          <Form.Item label="Ảnh phòng" required>
            <Upload
              listType="picture-card"
              multiple
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
            >
              {fileList.length >= 8 ? null : "Tải ảnh"}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tạo phòng
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddRoom;
