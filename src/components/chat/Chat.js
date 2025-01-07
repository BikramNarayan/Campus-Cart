import "./chat.css";
import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import chatIdStore from "../../lib/chatIdStore";
import { firestore } from "../../firebase";
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion,
  getDoc,
} from "@firebase/firestore";
import { useAuth0 } from "@auth0/auth0-react";
import useReceiverStore from "../../lib/receiverStore";

const Chat = () => {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const { chatId } = chatIdStore();
  const [textMessage, setTextMessage] = useState("");
  const { user } = useAuth0();
  const { receiver } = useReceiverStore();
  const { chatIdPhoto } = chatIdStore();
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!chatId) return;

    const unsub = onSnapshot(doc(firestore, "chats", chatId), (doc) => {
      if (doc.exists()) {
        const chatData = doc.data();
        // Access the "message" array instead of "messages"
        const messageArray = chatData.message || [];

        // Sort messages by timestamp
        const sortedMessages = [...messageArray].sort(
          (a, b) => a.timestamp - b.timestamp
        );

        setMessages(sortedMessages);
      }
    });

    return () => unsub();
  }, [chatId]);
  const handleEmoji = (e) => {
    setTextMessage(textMessage + e.emoji);
    setEmojiOpen(false);
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    const date = new Date(timestamp);
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));

    if (diffInMinutes < 1) return "just now";
    if (diffInMinutes < 60) return `${diffInMinutes} min ago`;
    if (diffInMinutes < 1440)
      return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return date.toLocaleDateString();
  };

  const handleSendMessage = async () => {
    console.log("krunga send ruko abhi");
    if (!textMessage.trim() || !chatId || !user?.sub || !receiver) return;
    try {
      const chatRef = doc(firestore, "chats", chatId);
      const userChatRef = doc(firestore, "userchats", user.sub);
      const receiverChatRef = doc(firestore, "userchats", receiver);

      // Add message to chat document
      await updateDoc(chatRef, {
        message: arrayUnion({
          sender: user.sub,
          text: textMessage,
          timestamp: Date.now(),
        }),
      });

      // Update user's chat
      const userChatSnapshot = await getDoc(userChatRef);
      if (userChatSnapshot.exists()) {
        const userData = userChatSnapshot.data();
        const userChats = userData.chats || [];
        const chatIndex = userChats.findIndex((c) => c.chatId === chatId);

        if (chatIndex !== -1) {
          userChats[chatIndex] = {
            ...userChats[chatIndex],
            lastMessage: textMessage,
            updatedAt: Date.now(),
          };

          await updateDoc(userChatRef, {
            chats: userChats,
          });
        }
      }

      // Update receiver's chat
      const receiverChatSnapshot = await getDoc(receiverChatRef);
      if (receiverChatSnapshot.exists()) {
        const receiverData = receiverChatSnapshot.data();
        const receiverChats = receiverData.chats || [];
        const receiverChatIndex = receiverChats.findIndex(
          (c) => c.chatId === chatId
        );

        if (receiverChatIndex !== -1) {
          receiverChats[receiverChatIndex] = {
            ...receiverChats[receiverChatIndex],
            lastMessage: textMessage,
            updatedAt: Date.now(),
          };

          await updateDoc(receiverChatRef, {
            chats: receiverChats,
          });
        }
      }

      setTextMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  return (
    <div className="chat">
      <div className="center">
        {messages.map((message, index) => {
          const isOwn = message.sender === user?.sub;
          return (
            <div
              key={index}
              className={isOwn ? "message-own" : "message-sender"}
            >
              {!isOwn && <img src={chatIdPhoto || "./avatar.png"} alt="" />}
              <div className="texts">
                <p>{message.text}</p>
                <span>{formatTime(message.timestamp)}</span>
              </div>
            </div>
          );
        })}
        <div ref={endRef}></div>
      </div>

      {chatId && (
        <div className="bottom">
          <div className="icons">
            {/* Image features commented for later */}
          </div>
          <input
            type="text"
            className="input-message"
            value={textMessage}
            placeholder="Type a message"
            onChange={(e) => setTextMessage(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <div className="emoji">
            <img
              src="./emoji.png"
              alt=""
              onClick={() => setEmojiOpen(!emojiOpen)}
            />
            <div className="emojiDialog">
              <EmojiPicker open={emojiOpen} onEmojiClick={handleEmoji} />
            </div>
          </div>
          <button className="send" onClick={handleSendMessage}>
            Send
          </button>
        </div>
      )}
    </div>
  );
};

export default Chat;
