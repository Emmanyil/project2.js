import React, { useState } from "react";
import "./chatMessages.css";

const ChatMessage = (props) => {
  // debugger
  return (
    <>
      <div className="loginPartner">{props.message[0].idSendUser}</div>
      <div className="messagePartner">
        <div className="message">jkdflgdfl/gkdf;</div>
        <div className="sendMessage">
          <input />
          <button>Send</button>
        </div>
      </div>
    </>
  );
};

export default ChatMessage;
