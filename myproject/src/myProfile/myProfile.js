import React, { useState } from "react";
import { TeamOutlined, FormOutlined, SearchOutlined } from "@ant-design/icons";
import "./myProfile.css";

import ChatGroups from "./chatGroups/chatGroups";
import ChatMessages from "./chatMessages/chatMessages";

const MyProfile = (props) => {
  const [text, setText] = useState("");

  const chatGroups = props.message.map((el) => (
    <ChatGroups
      key={el.id}
      src={el.image}
      login={el.idSendUser}
      message={el.message}
    />
  ));

  return (
    <div className="container">
      <div className="my-profile">
        <div className="chat-sidebar">
          <div className="create-chat">
            <div>
              <div>
                <TeamOutlined />
                <span className="span">Список чатов</span>
              </div>
              <FormOutlined />
            </div>
            <div className="search-input">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Поиск..."
              />
              <SearchOutlined />
            </div>
          </div>
          <div className="chat-groups">{chatGroups}</div>
        </div>

        <div className="chat-messages">
          <ChatMessages message={props.message} />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
