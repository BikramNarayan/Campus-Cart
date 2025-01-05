import "./chat.css";
import React, { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
const Chat = () => {
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [textMessage, setTextMessage] = useState("");
  const handleEmoji = (e) => {
    setTextMessage(textMessage + e.emoji);
    setEmojiOpen(false);
  };
  const endRef = useRef(null);
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="chat">
      <div className="center">
        <div className="message-sender">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              sequi.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message-own">
          <div className="texts">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQUPIfiGgUML8G3ZqsNLHfaCnZK3I5g4tJabQ&s"
              alt=""
            />
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet
              ipsum animi mollitia tempora harum tenetur consequatur ab. Eaque,
              odit necessitatibus!
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message-sender">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              sequi.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message-own">
          <div className="texts">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              sequi.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message-sender">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              sequi.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message-own">
          <div className="texts">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              sequi.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message-sender">
          <img src="./avatar.png" alt="" />
          <div className="texts">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              sequi.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="message-own">
          <div className="texts">
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat,
              sequi.
            </p>
            <span>1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div className="bottom">
        <div className="icons">
          <img src="./img.png" alt="" />
          <img src="./camera.png" alt="" />
          <img src="./mic.png" alt="" />
        </div>
        <input
          type="text"
          className="input-message"
          value={textMessage}
          placeholder="Type a message"
          onChange={(e) => setTextMessage(e.target.value)}
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
        <button className="send">Send </button>
      </div>
    </div>
  );
};

export default Chat;
