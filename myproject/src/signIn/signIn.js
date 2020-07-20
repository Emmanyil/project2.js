import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Provider, connect } from "react-redux";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";

import { actionLogin, store } from "./actionLogin/actionLogin";

import "./signIn.css";

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
          <div className="not-see" onClick={props.loginEye}>
            <EyeInvisibleOutlined />
          </div>
          <div className="see" onClick={props.loginEye}>
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

const Login = (props) => (
  <Provider store={store}>
    <ConnectedLoginForm loginEye={props.loginEye} />
  </Provider>
);

const ConnectedLoginForm = connect(null, { onLogin: actionLogin })(LoginForm);

export default Login;
