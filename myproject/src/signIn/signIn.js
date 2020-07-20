import React, { useState } from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Link } from "react-router-dom";
import { Provider, connect } from "react-redux";
import jwtDecode from "jwt-decode";
import thunk from "redux-thunk";
import {
  UserOutlined,
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
} from "@ant-design/icons";
// import { GraphQLClient } from "graphql-request";

import "./signIn.css";

const promiseReducer = (state = {}, { type, name, status, payload, error }) => {
  if (type === "PROMISE") {
    return {
      ...state,
      [name]: {
        status,
        payload,
        error,
      },
    };
  }
  return state;
};

const actionPromise = (name, promise) => {
  const actionPending = () => ({
    type: "PROMISE",
    name,
    status: "PENDING",
    payload: null,
    error: null,
  });
  const actionResolved = (payload) => ({
    type: "PROMISE",
    name,
    status: "RESOLVED",
    payload,
    error: null,
  });
  const actionRejected = (error) => ({
    type: "PROMISE",
    name,
    status: "REJECTED",
    payload: null,
    error,
  });
  return async (dispatch) => {
    dispatch(actionPending());
    try {
      let payload = await promise;
      dispatch(actionResolved(payload));
      return payload;
    } catch (error) {
      dispatch(actionRejected(error));
    }
  };
};

const delay = (ms) => new Promise((ok) => setTimeout(() => ok(ms), ms));

const store1 = createStore(promiseReducer, applyMiddleware(thunk));
store1.subscribe(() => console.log(store1.getState()));

store1.dispatch({
  type: "PROMISE",
  name: "login",
  status: "RESOLVED",
  payload: "hi",
});

store1.dispatch({
  type: "PROMISE",
  name: "chatList",
  status: "REJECTED",
  error: "bye",
});

function actionToken(token) {
  return {
    type: "TOKEN",
    token,
  };
}

const getGQL = (url, headers = {}) => (query = "", variables = {}) =>
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
    body: JSON.stringify({ query, variables }),
  })
    .then((res) => res.json())
    .then((a) => {
      a.data.login ? window.location.assign("/my_profile") : alert("Не верно введен email или пароль!");
    });

const actionLoginPromise = (email, password) => {
  let promise = getGQL("http://localhost:3330/graphql")(
    `query l($email:String, $password:String){
        login(email:$email, password:$password)
      }`,
    { email, password }
  );
  return actionPromise("email", promise);
};

const actionLogin = (email, password) => {
  return async (dispatch) => {
    let token = await dispatch(actionLoginPromise(email, password));
    if (token) dispatch(actionToken(token));
  };
};

// function actionRegisterPromise(email, password, nickname) {
//   let promise = getGQL("http://localhost:3330/graphql")(
//     `mutation reg($email:String, $password:String, $nickname:String){
//       createUser({email:$email, password:$password, nickname:$nickname}){ email }
//     }`,
//     { email, password, nickname }
//   );
//   return actionPromise("register", promise);
// }

// function actionRegister(email, password, nickname) {
//   return async (dispatch) => {
//     let user = await dispatch(actionRegisterPromise(email, password, nickname));
//     if (user) {
//       dispatch(actionLogin(email, password, nickname));
//     }
//   };
// }

const actionTimeouts = () => {
  return async (dispatch) => {
    let result = await dispatch(actionPromise("delay1", delay(1000)));
    console.log(result);
    result = await dispatch(actionPromise("delay" + result, delay(result * 2)));
    console.log(result);
  };
};

store1.dispatch(actionTimeouts());

store1.dispatch(actionPromise("delay1000", delay(1000)));
store1.dispatch(actionPromise("delay2000", delay(2000)));

// store1.dispatch(actionLogin("1", "1"));

// const store = createStore((state, { type, token }) => {
//   if (!state) return {};
//   if (type === "LOGOUT") return { jwt: "" };
//   if (type === "LOGIN")
//     return {
//       pending: true,
//       jwt: "",
//     };
//   if (type === "TOKEN")
//     return {
//       jwt: token,
//       data: jwtDecode(token),
//     };
//   return state;
// });

// function actionLogin(email, password) {
//   getGQL("http://localhost:3330/graphql")(
//     `query l($email:String, $password:String){
//         login(email:$email, password:$password)
//       }`,
//     { email, password }
//   ).then((data) => store.dispatch(actionToken(data.data.login)));
//   return {
//     type: "LOGIN",
//   };
// }

// function actionToken(token) {
//   return {
//     type: "TOKEN",
//     token,
//   };
// }

// store.subscribe(() => console.log(store.getState()));
// store.dispatch(actionLogin("1", "1"));

// var authToken;

// const getServerIn = (url) => () => {
//   const email = document.getElementById("email").value;
//   const password = document.getElementById("password").value;
//   fetch(url, {
//     method: "POST",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ email: email, password: password }),
//   })
//     .then((res) => res.json())
//     .then((json) => (authToken = json.token))
//     .then(() => {
//       console.log(authToken);
//       if (!authToken) alert("Вы не верно ввели свои данные!");
//       else {
//         //   window.location.assign("/my_profile");
//         fetch("/a", {
//           method: "GET",
//           headers: {
//             Authorization:  authToken,
//           },
//         })
//           .then((res) => res.json())
//       }
//     });
// };
// const getServerIn1 = getServerIn("/users/authenticate");

// const eye = () => {
//   const password = document.getElementById("password");
//   const notSee = document.querySelector(".not-see");
//   const see = document.querySelector(".see");

//   if (password.type === "password") {
//     password.type = "text";
//     see.style.display = "inline-block";
//     notSee.style.display = "none";
//   } else {
//     password.type = "password";
//     notSee.style.display = "inline-block";
//     see.style.display = "none";
//   }
// };

const LoginForm = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="login">
      <div className="login-form">
        <div className="login-title">
          <h2>Войти в аккаунт</h2>
          <p>Пожалуйста, войдите в свой аккаунт</p>
        </div>

        <div className="email-icon icon">
          <UserOutlined />
          <input
            id="email"
            value={email}
            placeholder="E-mail"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
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

        <button
          id="btn"
          className="login-button"
          onClick={() => props.onLogin(email, password)}
          disabled={!email || !password}
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
  <Provider store={store1}>
    <ConnectedLoginForm loginEye={props.loginEye} />
    {/* <LoginPending /> */}
    {/* <Login onLogin={(login, password) => console.log(login, password)} /> */}
  </Provider>
);

const ConnectedLoginForm = connect(null, { onLogin: actionLogin })(LoginForm);

export default Login;
