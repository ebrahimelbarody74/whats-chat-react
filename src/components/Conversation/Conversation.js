import React, { useEffect, useState } from "react";
import img from "../../img/cover.jpg";
import axios from "axios";
import "./Conversation.scss";

function Conversation({ conversation, currentUser, convId }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios(
          "https://whats-server.onrender.com/api/users?userId=" + friendId
        );
        setUser(res.data);
        localStorage.setItem("chatconv", JSON.stringify(res.data));
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentUser, conversation, convId]);

  return (
    <>
      <div className="chat-list">
        <div className="img">
          <img src={img} />
        </div>
        <div className="info">
          <h2>{user?.username}</h2>
          <span>Online</span>
        </div>
      </div>
      <hr />
    </>
  );
}

export default Conversation;
