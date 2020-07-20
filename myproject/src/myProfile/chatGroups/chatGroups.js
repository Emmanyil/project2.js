import React, { Schema, Component } from "react";
// import "antd/dist/antd.css";
import "./chatGroups.css";

const ChatGroups = (props) => {
  return (
    <>
      <div className="groups">
        <div className="avatar">
          <img src="https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg" />
        </div>
        <div className="data">
          <div className="userName">
            <span>{props.nickname}</span>
            <span className="date">00:00</span>
          </div>
          <div className="last-message">
            <span>{props.message}</span>
            <div className="unread-messages">5</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatGroups;
