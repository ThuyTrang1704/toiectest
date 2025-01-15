import React, { useState, useEffect } from "react";
import { Button, Form, Input, notification } from "antd";
import { LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Extract the token from the URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const resetToken = urlParams.get("token");
    if (resetToken) {
      setToken(resetToken);  // Store the token
    } else {
      navigate("/login");  // Redirect if no token is found
    }
  }, [location, navigate]);

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      // Send reset password request to backend
      const response = await axios.post("http://localhost:8085/api/user/reset-password", {
        token: token,
        newPassword: values.password,
      });
      notification.success({
        message: "Password Reset Successful",
        description: "Your password has been reset. You can now log in with your new password.",
        placement: "top",
      });
      navigate("/login");  // Redirect to login after successful reset
    } catch (error) {
      notification.error({
        message: "Error",
        description: error.response ? error.response.data.message : "An error occurred. Please try again.",
        placement: "top",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
      <h1 className="font-bold text-center text-[40px] mb-4">Reset Password</h1>
      <Form
        name="reset-password"
        onFinish={handleSubmit}
        layout="vertical"
      >
        <Form.Item
          name="password"
          label="New Password"
          rules={[
            { required: true, message: "Please enter your new password!" },
            { min: 6, message: "Password must be at least 6 characters!" },
          ]}
        >
          <Input.Password
            placeholder="Enter your new password"
            prefix={<LockOutlined />}
            className="h-[40px]"
          />
        </Form.Item>

        <Form.Item
          name="confirmPassword"
          label="Confirm Password"
          dependencies={['password']}
          rules={[
            { required: true, message: "Please confirm your new password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('The two passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password
            placeholder="Confirm your new password"
            prefix={<LockOutlined />}
            className="h-[40px]"
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading} className="bg-black">
            Reset Password
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ResetPassword;
