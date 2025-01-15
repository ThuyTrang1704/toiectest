import React, { useEffect, useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useAPIConText } from "../../lib/context/APIContextProvider";

function Login() {
  const { authenticateUser } = useAPIConText();
  const [form] = Form.useForm();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("rememberedUser");
    const savedPassword = localStorage.getItem("rememberedPassword");
    const remember = localStorage.getItem("remember");

    if (remember === "true" && savedUser && savedPassword) {
      form.setFieldsValue({
        username: savedUser,
        password: savedPassword,
        remember: true,
      });
    }
  }, [form]);

  const onFinish = (values) => {
    if (values.remember) {
      localStorage.setItem("rememberedUser", values.username);
      localStorage.setItem("rememberedPassword", values.password);
      localStorage.setItem("remember", "true");
    } else {
      localStorage.removeItem("rememberedUser");
      localStorage.removeItem("rememberedPassword");
      localStorage.removeItem("remember");
    }

    authenticateUser({ email: values.username, password: values.password });
  };

  const onFinishFailed = (errorInfo) => {
    const element = document.querySelector(
      `[name="${errorInfo.errorFields[0].name[0]}"]`
    );
    element.focus();
    alert("Nhập không đúng quy tắc");
  };

  return (
    <Form
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      form={form}
      name="basic"
      initialValues={{ remember: true }}
      className={`${localStorage.getItem("user") ? "hidden" : ""} bg-transparent rounded-md h-[500px] w-full bg-blue-500`}
    >
      <h1 className="font-bold text-center text-[40px]">Đăng nhập</h1>
      <Form.Item
        hasFeedback={status}
        validateStatus={status ? "error" : ""}
        name="username"
        rules={[
          { required: true, message: "Không được để trống!" },
          { max: 30, message: "Ít hơn 30 từ" },
          { min: 5, message: "Nhiều hơn 5 từ" },
          { whitespace: true, message: "Không được có khoảng trắng" },
        ]}
      >
        <Input
          id="username"
          placeholder="Tên đăng nhập"
          prefix={<UserOutlined />}
          type="text"
          className="h-[40px]"
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[
          { required: true, message: "Không được để trống!" },
          { min: 5, message: "Nhiều hơn 5 từ" },
          { whitespace: true, message: "Không được có khoảng trắng" },
        ]}
      >
        <Input.Password
          placeholder="Mật khẩu"
          prefix={<LockOutlined />}
          className="h-[40px]"
        />
      </Form.Item>
      <Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>
            <h6 className="text-[10px]">Nhớ mật khẩu</h6>
          </Checkbox>
        </Form.Item>
        <Link className="ml-[50px] text-[10px] text-blue-700" to="/forgotpassword">
          Quên mật khẩu
        </Link>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="bg-black" type="primary" block>
          Login
        </Button>
        Or{" "}
        <Link to={"/signup"} className="text-blue-700">
          register now!
        </Link>
      </Form.Item>
    </Form>
  );
}

export default Login;
