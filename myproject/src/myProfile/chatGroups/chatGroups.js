import React from "react";
import "./chatGroups.css";

const ChatGroups = (props) => {
  return (
    <>
      <div className="groups">
        <div className="avatar">
          <img src={props.src} />
        </div>
        <div className="data">
          <div className="userName">
            <span>{props.login}</span>
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
