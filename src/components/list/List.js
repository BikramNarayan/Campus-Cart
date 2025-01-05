import "./list.css";
import React from "react";
import Userinfo from "./userInfo/Userinfo";
import Chatlist from "./chatList/ChatList";
const List = () => {
  return (
    <div className="list">
      <Chatlist />
    </div>
  );
};

export default List;
