import React, { useState } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import { actionLogin } from "./actionLogin/actionLogin";
import "./signIn.css";

const loginEye = () => {
  const password = document.getElementById("password");
  const notSee = document.querySelector(".not-see");
  const see = document.querySelector(".see");

  if (password.type === "password") {
    password.type = "text";
    see.style.display = "inline-block";
    notSee.style.display = "none";
  } else {
    password.type = "password";
    notSee.style.display = "inline-block";
    see.style.display = "none";
  }
};

const LoginForm = (props) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <div className="login-form">
        <div className="login-title">
          <h2>Войти в аккаунт</h2>
          <p>Пожалуйста, войдите в свой аккаунт</p>
        </div>

        <div className="login-icon icon">
          <UserOutlined />
          <input
            id="login"
            value={login}
            placeholder="Логин"
            type="text"
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="password-icon icon">
          <LockOutlined />
          <input
            id="password"
            value={password}
            placeholder="Пароль"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="not-see" onClick={loginEye}>
            <EyeInvisibleOutlined />
          </div>
          <div className="see" onClick={loginEye}>
            <EyeOutlined />
          </div>
        </div>

        <div className="error">
          <p>Неверный логин или пароль, попробуйте заново.</p>
        </div>

        <button
          id="btn"
          className="login-button"
          onClick={() => props.onLogin(login, password)}
          disabled={!login || !password}
        >
          Войти
        </button>

        <div className="register-put-password">
          <Link to="/sign_up">Зарегестрироваться</Link>
          <Link to="/put_password">Забыли пароль?</Link>
        </div>
      </div>
    </div>
  );
};

const Login = (props) => <ConnectedLoginForm />;

const ConnectedLoginForm = connect(null, { onLogin: actionLogin })(LoginForm);

export default Login;
