import React from "react";
import { Form, Input, Button, message, Card, Row, Col, DatePicker } from "antd";
import { useNavigate } from "react-router-dom";
import { post } from "../../utils/axios/axios";
import dayjs from "dayjs";

const AddUser = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const handleSubmit = async (values) => {
    try {
      const payload = {
        ...values,
        dateOfBirth: values.dateOfBirth
          ? dayjs(values.dateOfBirth).format("YYYY-MM-DD")
          : null,
      };

      await post("users", payload);
      message.success("Tạo user thành công!");
      form.resetFields();
      navigate("/users");
    } catch (err) {
      console.error(err);
      message.error(err?.response?.data?.message || "Tạo user thất bại!");
    }
  };

  return (
    <div style={{ padding: "40px", marginTop: "60px", height: "680px" }}>
      <Card
        title={
          <span style={{ fontSize: "24px", fontWeight: 500 }}>Thêm User</span>
        }
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
                label="Tên"
                name="name"
                rules={[{ required: true, message: "Vui lòng nhập tên" }]}
              >
                <Input placeholder="Nguyen Chien" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: "Vui lòng nhập email" },
                  { type: "email", message: "Email không hợp lệ" },
                ]}
              >
                <Input placeholder="nguyenchien@gmail.com" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Password"
                name="password"
                rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
              >
                <Input.Password placeholder="123456" />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[{ required: true, message: "Vui lòng nhập SĐT" }]}
              >
                <Input placeholder="032073462" />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Ngày sinh"
                name="dateOfBirth"
                rules={[{ required: true, message: "Vui lòng chọn ngày sinh" }]}
              >
                <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
              </Form.Item>
            </Col>

            <Col span={12}>
              <Form.Item
                label="Địa chỉ"
                name="address"
                rules={[{ required: true, message: "Vui lòng nhập địa chỉ" }]}
              >
                <Input placeholder="Hà Nội" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Tạo User
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default AddUser;
