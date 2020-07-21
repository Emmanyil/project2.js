import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

const state = {
  users: [
    { id: 1, email: "1", password: "1", login: "1" },
    { id: 2, email: "2", password: "2", login: "2" },
    { id: 3, email: "3", password: "3", login: "3" },
  ],
  message: [
    {
      id: 1,
      message: "Hello",
      idSendUser: "2",
      idGotUser: "1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    },
    {
      id: 2,
      message: "Привет",
      idSendUser: "3",
      idGotUser: "1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    },
    {
      id: 1,
      message: "Hello",
      idSendUser: "2",
      idGotUser: "1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    },
    {
      id: 2,
      message: "Привет",
      idSendUser: "3",
      idGotUser: "1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    },
    {
      id: 1,
      message: "Hello",
      idSendUser: "2",
      idGotUser: "1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    },
    {
      id: 2,
      message: "Привет",
      idSendUser: "3",
      idGotUser: "1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    },
    {
      id: 1,
      message: "Hello",
      idSendUser: "2",
      idGotUser: "1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    },
    {
      id: 2,
      message: "Привет",
      idSendUser: "3",
      idGotUser: "1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    },
    {
      id: 1,
      message: "Hello",
      idSendUser: "2",
      idGotUser: "1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    },
    {
      id: 2,
      message: "Привет",
      idSendUser: "3",
      idGotUser: "1",
      image:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg",
    },
  ],
};

ReactDOM.render(
  <App users={state.users} message={state.message} />,
  document.getElementById("root")
);
