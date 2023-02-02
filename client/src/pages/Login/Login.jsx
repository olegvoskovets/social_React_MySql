import { Button, Divider, Form, Input, message, Typography } from "antd";
import {
  FacebookFilled,
  GoogleOutlined,
  TwitterOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/auth";

const Login = () => {
  //const { login } = useContext(AuthContext);
  // const { login } = useSelector((state) => state.authReducer.authSlice);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  });
  const [err, setErr] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const SocialLogin = (name) => {
    message.success("Вхід через " + name);
  };

  const handleLogin = async () => {
    dispatch(login(inputs));
    navigate("/");
    // try {
    //   await login(inputs);
    //   navigate("/");
    // } catch (err) {
    //   setErr(err.response.data);
    // }
  };

  return (
    <div className="login">
      <Form className="loginForm">
        <Typography.Title className="loginTitle">Login</Typography.Title>
        <Form.Item
          rules={[
            {
              required: true,
              type: "text",
              message: "Не вірнe ім'я ",
            },
          ]}
          label="user name"
          name={"username"}
        >
          <Input
            placeholder="Enter your email"
            type="text"
            name="username"
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
          name={"myPassword"}
        >
          <Input.Password
            placeholder="Enter your password"
            name="password"
            onChange={handleChange}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit" onClick={handleLogin}>
          Login
        </Button>
        <Divider style={{ borderColor: "green" }}>or Login with</Divider>
        <div className="socialLogin">
          <GoogleOutlined
            className="pointer"
            name="google"
            onClick={() => SocialLogin("Google")}
            style={{ color: "red" }}
          />
          <FacebookFilled
            className="pointer"
            onClick={() => SocialLogin("Facebook")}
            style={{ color: "blue" }}
          />
          <TwitterOutlined
            className="pointer"
            onClick={() => SocialLogin("Twitter")}
            style={{ color: "cyan" }}
          />
        </div>
        <div className="info">
          Ще не рееструвались?{" "}
          <Link to={"/register"}>
            <span>Register</span>
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Login;
