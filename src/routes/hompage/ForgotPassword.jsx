import React, { useState } from "react";
import { notification, Button, Form, Input } from "antd";
import { MailOutlined } from "@ant-design/icons"; // Importing the Mail icon
import { Link } from "react-router-dom";
import axios from "axios";

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Send email as a query parameter in the URL
      const response = await axios.post(`http://localhost:8085/api/user/forgot-password?email=${values.email}`);
      console.log(response.data);

      // Show success notification
      notification.success({
        message: "Email sent successfully",
        description: "Please check your email to reset your password.",
        placement: "top",
      });
    } catch (error) {
      console.error("Có lỗi xảy ra khi gửi yêu cầu reset mật khẩu", error.response);
      notification.error({
        message: "Có lỗi xảy ra",
        description: error.response ? error.response.data.message : "Không thể kết nối đến máy chủ, vui lòng thử lại sau.",
        placement: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form
      onFinish={handleSubmit}
      layout="vertical"
      name="forgotPassword"
      className="bg-transparent rounded-md w-full max-w-xs mx-auto p-6" // Centered and styled
    >
      <h1 className="font-bold text-center text-[30px] mb-6">Quên mật khẩu</h1>
      
      <Form.Item
        label="Email"
        name="email"
        rules={[
          { required: true, message: "Vui lòng nhập email!" },
          { type: "email", message: "Email không hợp lệ!" },
        ]}
      >
        <Input
          id="email"
          placeholder="Nhập email của bạn"
          prefix={<MailOutlined />} // Using an email icon here
          className="h-[40px]"
        />
      </Form.Item>
      
      <Form.Item>
        <Button
          htmlType="submit"
          className="bg-black text-white w-full h-[40px] flex justify-center items-center"
          loading={loading}
          type="primary"
        >
          Gửi yêu cầu
        </Button>
      </Form.Item>

      <Form.Item className="text-center">
        <Link className="text-blue-700" to="/login">
          Quay lại trang đăng nhập
        </Link>
      </Form.Item>
    </Form>
  );
};

export default ForgotPassword;
