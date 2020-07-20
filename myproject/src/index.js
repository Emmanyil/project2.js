import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

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

const registerEye = () => {
  const password = document.getElementById("registerPassword");
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

const registerConfirmEye = () => {
  const password = document.getElementById("confirmPassword");
  const notSee = document.querySelector(".not-see-confirm");
  const see = document.querySelector(".see-confirm");

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

const state = {
  users: [
    { id: 1, email: "1", password: "1", nickname: "1" },
    { id: 2, email: "2", password: "2", nickname: "2" },
    { id: 3, email: "3", password: "3", nickname: "3" },
  ],
  message: [
    { id: 1, message: "Hello", idSendUser: "2", idGotUser: "1" },
    { id: 1, message: "Привет", idSendUser: "3", idGotUser: "1" },
  ],
};

ReactDOM.render(
  <App
    loginEye={loginEye}
    registerEye={registerEye}
    registerConfirmEye={registerConfirmEye}
    users={state.users}
    message={state.message}
  />,
  document.getElementById("root")
);
