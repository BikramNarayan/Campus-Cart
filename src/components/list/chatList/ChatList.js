import { useAuth0 } from "@auth0/auth0-react";
import "./chatList.css";
import React, { useEffect, useState } from "react";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { firestore } from "../../../firebase";
const Chatlist = () => {
  const [add, setAdd] = useState(true);
  const { user } = useAuth0();
  const [chats, setChats] = useState([]);

  useEffect(() => {
    const unsub = onSnapshot(
      doc(firestore, "userchats", user.sub),
      async (res) => {
        const items = res.data().chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(firestore, "user", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();
          return { ...item, user };
        });
        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        console.log(chats);
      }
    );
    return () => {
      unsub();
    };
  }, [user.sub]);
  // console.log("chats " + chats);
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.png" alt="" />
          <input type="text" placeholder="Search" />
        </div>
        <img
          src={add ? "./plus.png" : "./minus.png"}
          alt=""
          className="add"
          onClick={() => setAdd((add) => !add)}
        />
      </div>
      {chats.map((e) => {
        return (
          <div className="item" key={e.chatId}>
            <img src={e.user.picture || "./avatar.png"} alt="" />
            <div className="texts">
              <span>{e.user.name}</span>
              <p>{e.lastMessage}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chatlist;
