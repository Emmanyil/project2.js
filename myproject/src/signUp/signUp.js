import React, { useState } from "react";
import { EyeOutlined, EyeInvisibleOutlined } from "@ant-design/icons";
import { Provider, connect } from "react-redux";

import {
  validateEmail,
  borderEmailDischarge,
  borderPasswordDischarge,
  validatePassword,
  signUpValidate,
} from "./signUpValidate/signUpValidate";
import {actionRegister, store} from "./actionRegister/actionRegister"
import "./signUp.css";

const Register1 = (props) => {
  const [registerEmail, setEmail] = useState("");
  const [registerPassword, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [login, setLogin] = useState("");

  return (
    <div className="register">
      <div className="register-form">
        <div className="login-title">
          <h2>Создать свой аккаунт</h2>
          <p>Пожалуйста, создайте свой аккаунт</p>
        </div>

        <div className="block-input">
          <span>E-mail:</span>
          <input
            value={registerEmail}
            type="email"
            id="registerEmail"
            name="email"
            pattern={validateEmail(registerEmail)}
            onClick={() => borderEmailDischarge()}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="pattern-email">
          <p></p>
          <div>
            <p>Неверный формат почты</p>
          </div>
        </div>

        <div className="block-input">
          <span>Логин:</span>
          <input
            value={login}
            type="text"
            id="loginCreate"
            name="login"
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>

        <div className="block-input">
          <span>Пароль:</span>
          <div className="password-block">
            <input
              value={registerPassword}
              type="password"
              id="registerPassword"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="not-see" onClick={props.registerEye}>
              <EyeInvisibleOutlined />
            </div>
            <div className="see" onClick={props.registerEye}>
              <EyeOutlined />
            </div>
          </div>
        </div>

        <div className="block-input">
          <span>Повторите пароль:</span>
          <div className="confirmPassword-block">
            <input
              value={confirmPassword}
              type="password"
              id="confirmPassword"
              onClick={() => borderPasswordDischarge()}
              pattern={validatePassword(registerPassword, confirmPassword)}
              name="confirmPassword"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="not-see-confirm" onClick={props.registerConfirmEye}>
              <EyeInvisibleOutlined />
            </div>
            <div className="see-confirm" onClick={props.registerConfirmEye}>
              <EyeOutlined />
            </div>
          </div>
        </div>

        <div className="pattern-password">
          <p></p>
          <div>
            <p>Неверный формат</p>
          </div>
        </div>

        <div className="block-input-btn">
          <p></p>
          <button
            onClick={() =>
              signUpValidate(
                registerEmail,
                registerPassword,
                confirmPassword,
                login,
                props
              )
            }
            disabled={
              !registerEmail || !registerPassword || !confirmPassword || !login
            }
          >
            Регистрация
          </button>
        </div>
      </div>
    </div>
  );
};

const Register = (props) => (
  <Provider store={store}>
    <ConnectedRegisterForm
      registerEye={props.registerEye}
      registerConfirmEye={props.registerConfirmEye}
    />
  </Provider>
);

const ConnectedRegisterForm = connect(null, { register: actionRegister })(
  Register1
);
export default Register;
