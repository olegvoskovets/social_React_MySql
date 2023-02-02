import { Button, Divider, Form, Input, message, Typography } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { register } from "../../store/auth";
import { useDispatch } from "react-redux";
import "./register.scss";

const Register = () => {
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });
  const [err, setErr] = useState(null);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegistracion = () => {
    dispatch(register(inputs));
  };

  return (
    <div className="register">
      <Form className="registerForm">
        <Typography.Title className="registerTitle">Register</Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Будь ласка введіть  ім'я користувача",
            },
          ]}
          label="User name"
          name={"username"}
        >
          <Input
            placeholder="Enter your name"
            type="text"
            name="username"
            onChange={handleChange}
          />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
              type: "email",
              message: "Не вірний email ",
            },
          ]}
          label="Email"
          name={"email"}
        >
          <Input
            placeholder="Enter your email"
            type="text"
            name="email"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Будь ласка введіть свій пароль ",
            },
          ]}
          label="Password"
          name={"password"}
        >
          <Input.Password
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
              message: "Будь ласка введіть своє ім'я ",
            },
          ]}
          label="Name"
          name={"name"}
        >
          <Input
            placeholder="Enter your name"
            type="text"
            name="name"
            onChange={handleChange}
          />
        </Form.Item>
        {err && <div style={{ color: "red" }}>{err}</div>}
        <Button
          type="primary"
          htmlType="submit"
          block
          onClick={handleRegistracion}
        >
          <Link to={"/login"}>Зарееструватись</Link>
        </Button>
        {/* <Divider style={{borderColor:"green"}}>or Login with</Divider>
        <div className="socialLogin">
        <GoogleOutlined className='pointer' name='google' onClick={()=>SocialLogin('Google')} style={{color:'red'}}/>
        <FacebookFilled className='pointer'onClick={()=>SocialLogin('Facebook')}style={{color:'blue'}}/>
        <TwitterOutlined className='pointer'onClick={()=>SocialLogin('Twitter')}style={{color:'cyan'}}/>
        </div> */}
        <div className="info">
          Вже зареестровані?
          <Link to={"/login"}>
            <span>Login</span>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Register;
