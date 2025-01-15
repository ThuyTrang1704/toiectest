import React, { useEffect, useState } from "react";
import { Button, Form, Input, Radio, Space } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { FormProvider } from "antd/es/form/context";
import { Select } from "antd";
import {
  confimPassword,
  spaceBetween,
  spaceLeft,
  special,
  structureMail,
  uppercase,
} from "../../lib/utils/Validation";
import axios from "axios";
import { useAPIConText } from "../../lib/context/APIContextProvider";
function Signup() {
  const { registerAPI } = useAPIConText();
  const [role, setRole] = useState(2);
  const [status, setStatus] = useState(false);
  const [user, setUser] = useState(null);
  const [password, setPassword] = useState(null);
  const [email, setEmail] = useState(null);
  const [form] = Form.useForm();
  const onFinish = async (values) => {
    const user = {
      email: values.emailsignup,
      name: values.usernamesignup,
      password: values.passwordsignup,
      passwordConfirm: values.confimpasswordsignup,
      roleId: role,
    };
    registerAPI(user);
    setStatus(false);
  };
  const onFinishFailed = (errorInfo) => {
    const element = document.querySelector(
      `[name="${errorInfo.errorFields[0].name[0]}"]`
    );
    form.getFieldError;
    setStatus(true);
    element.focus();
  };
  useEffect(() => {
    const element = document.querySelector("#emailsignup");
    element.focus();
  }, []);
  return (
    <FormProvider>
      <Form
        onFinishFailed={onFinishFailed}
        form={form}
        onFinish={onFinish}
        name="basic"
        initialValues={{ remember: true }}
        className={`rounded-md min-h-[500px] w-[500px] p-6`}
        autoComplete="off"
      >
        <h1 className="font-bold text-center text-[50px]">Đăng ký</h1>
        <Form.Item
          hasFeedback={status}
          validateStatus={status ? "error" : ""}
          
          name="emailsignup"
          className=" "
          rules={[
            { required: true, message: "Không được để trống" },
            { min: 5, message: "Nhiều hơn 5 từ" },
            { whitespace: true, message: "Không được có khoảng trắng" },
            {
              validator: (_, value) => {
                if (!structureMail(value))
                  return Promise.reject("excample@gmail.com");
                if (uppercase(value))
                  return Promise.reject("Không được viết hoa");
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            id="emailsignup"
            name="emailsignup"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
              console.log(email);
            }}
            prefix={<UserOutlined />}
            className=""
            type="text"
          ></Input>
        </Form.Item>
        <Form.Item
          hasFeedback={status}
          validateStatus={status ? "error" : ""}
          name="usernamesignup"
          className=" "
          rules={[
            { required: true, message: "Không được để trống" },
            { min: 5, message: "Nhiều hơn 5 từ" },
            { whitespace: true, message: "Không được có khoảng trắng" },
            { enum: ["@"], message: "Có ký tự đặc biệt @" },
            {
              validator: (_, value) => {
                if (spaceBetween(value))
                  return Promise.reject("Có khoảng trắng");
                if (spaceLeft(value)) return Promise.reject("Có khoảng trắng");
                if (uppercase(value))
                  return Promise.reject("Không được viết hoa");
                // if (!special(value))
                //   return Promise.reject("Phải có ký tự đặt biệt");
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            id="usernamesignup"
            onChange={(e) => {
              setUser(e.target.value);
              console.log(user);
            }}
            name="usernamesignup"
            placeholder="Tên đăng nhập"
            prefix={<UserOutlined />}
            className=""
            type="text"
          ></Input>
        </Form.Item>
        <Form.Item
          hasFeedback={status}
          validateStatus={status ? "error" : ""}
          className=""
          name="passwordsignup"
          onChange={(e) => {
            setPassword(e.target.value);
            console.log(password);
          }}
          rules={[
            { required: true, message: "Không được để trống" },
            { min: 5, message: "Nhiều hơn 5 từ" },
            { whitespace: true, message: "Không được có khoảng trắng" },
            {
              validator: (_, value) => {
                if (!special(value))
                  return Promise.reject("Phải có ký tự đặc biệt");
                if (!uppercase(value))
                  return Promise.reject("Phải có 1 từ viết hoa");
                if (spaceBetween(value)) return Promise.reject("Khoảng trắng");
                if (spaceLeft(value))
                  return Promise.reject("Khoảng trắng đầu hàng");
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            name="passwordsignup"
            placeholder="Mật khẩu"
            prefix={<LockOutlined />}
            type="password"
          ></Input>
        </Form.Item>
        <Form.Item
          hasFeedback={status}
          validateStatus={status ? "error" : ""}
          className=""
          name="confimpasswordsignup"
          validateFirst={true}
          rules={[
            { required: true, message: "Không được để trống" },
            { min: 5, message: "Nhiều hơn 5 từ" },
            { whitespace: true, message: "Không được có khoảng trắng" },
            { enum: ["@"], message: "Có ký tự đặc biệt @" },
            {
              validator: (_, value) => {
                if (!special(value))
                  return Promise.reject("Phải có ký tự đặc biệt");
                if (!uppercase(value))
                  return Promise.reject("Phải có 1 từ viết hoa");
                if (spaceBetween(value)) return Promise.reject("Khoảng trắng");
                if (spaceLeft(value))
                  return Promise.reject("Khoảng trắng đầu hàng");

                if (!confimPassword(value, password))
                  return Promise.reject("Không trùng mật khẩu");
                return Promise.resolve();
              },
            },
          ]}
        >
          <Input
            name="confimpasswordsignup"
            placeholder="Xác nhận mật khẩu"
            prefix={<LockOutlined />}
            type="password"
          ></Input>
        </Form.Item>
        
        <Form.Item>
          <Button htmlType="submit" className="bg-black" type="primary" block>
            Đăng ký
          </Button>
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Button type="dashed" className="border-blue-600 font-bold">
              <Link to={"/login"} className="text-[10px]">
                Quay lại đăng nhập
              </Link>
            </Button>
          </Form.Item>
        </Form.Item>
      </Form>
    </FormProvider>
  );
}
export default Signup;
