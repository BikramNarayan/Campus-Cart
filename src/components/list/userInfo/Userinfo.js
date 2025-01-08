import "./userinfo.css";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
const Userinfo = () => {
  const { user, isAuthenticated, isLoading } = useAuth0();
  // const handleClick = () => {
  //   console.log(user);
  // };
  return (
    <div className="userinfo">
      <div className="user">
        <img src={user.picture ? user.picture : "./avatar.png"} alt="" />
        <h2>
          {(user?.name || user?.nickname)?.length > 13
            ? `${(user?.name || user?.nickname)
                .split(" ")
                .reduce((result, word) => {
                  if (result.length + word.length <= 16) {
                    return result.length === 0 ? word : `${result} ${word}`;
                  }
                  return result;
                }, "")}...`
            : user?.name || user?.nickname}
        </h2>
      </div>
      <div className="icons">
        <img src="./more.png" alt="" />
        {/* <img src="./video.png" alt="" /> */}
        <img src="./edit.png" alt="" />
      </div>
    </div>
  );
};

export default Userinfo;
