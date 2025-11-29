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

const AddAccommodation = () => {
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState([]);
  const navigate = useNavigate();

  const handleUploadChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
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
      "name",
      "type",
      "locationId",
      "address",
      "starRating",
      "description",
      "amenities",
      "basePrice",
      "primaryImageIndex",
    ];

    fields.forEach((field) => {
      formData.append(field, values[field]?.toString() || "");
    });

    fileList.forEach((file) => {
      formData.append("images", file.originFileObj);
    });

    try {
      await postFormData("accommodations", formData);
      message.success("Tạo chỗ ở thành công!");
      form.resetFields();
      setFileList([]);
      navigate("/accommodation");
    } catch (err) {
      console.error(err);
      message.error(err?.response?.data?.message || "Tạo thất bại!");
    }
  };

  return (
    <div style={{ padding: "40px", marginTop: "60px" }}>
      <Card
        title="Thêm Accommodation"
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
          boxShadow: "0 0 15px rgba(0, 0, 0, 0.2)",
          height: "auto",
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tên acccommodation"
                name="name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Loại" name="type" rules={[{ required: true }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="ID địa điểm"
                name="locationId"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Đánh giá (1-5)"
                name="starRating"
                rules={[{ required: true }]}
              >
                <InputNumber min={1} max={5} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Giá cơ bản"
                name="basePrice"
                rules={[{ required: true }]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Tiện nghi"
            name="amenities"
            rules={[{ required: true }]}
          >
            <Input placeholder="Ví dụ: Nhà hàng, Gym, Hồ bơi" />
          </Form.Item>

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

          <Form.Item label="Ảnh chỗ ở" required>
            <Upload
              listType="picture-card"
              fileList={fileList}
              onChange={handleUploadChange}
              beforeUpload={() => false}
              multiple
            >
              {fileList.length >= 8 ? null : (
                <div>
                  <div style={{ marginTop: 8 }}>Tải ảnh</div>
                </div>
              )}
            </Upload>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tạo Accommodation
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddAccommodation;
