import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import img from "../../img/cover.jpg";
import "./Chat.scss";
import InputEmoji, { async } from "react-input-emoji";
import Message from "../../components/Message/Message";
import Conversation from "../../components/Conversation/Conversation";
import axios from "axios";
import { io } from "socket.io-client";

function Chat() {
  const user = JSON.parse(localStorage.getItem("chatuser")) || null;
  const [conversations, setConversations] = useState();
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const scrollRef = useRef();
  const socket = useRef();

  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [userSearch, setUserSearch] = useState([]);
  const [convId, setConvId] = useState([]);
  const [convChat, setConvChat] = useState();

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("https://whats-server.onrender.com/api/conversations/" + user._id);
        setConversations(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  });

  useEffect(() => {
    socket.current = io("https://socket-whats.onrender.com");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user && user._id);
    socket.current.on("getUsers", (users) => {
      // setOnlineUsers(
      //   user.followings.filter((f) => users.some((u) => u.userId === f))
      // );
    });
  }, [user]);

  ///////////////////////////////////

  // , [user._id, convId]

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("https://whats-server.onrender.com/api/messages/" + currentChat._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  //////////////////////////////

  // Navbar

  useEffect(() => {
    const getUsers = async () => {
      try {
        const res = await axios.get("https://whats-server.onrender.com/api/users/username");
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUsers();
  }, []);
  useEffect(() => {
    const s = async () => {
      const user =
        users &&
        users.filter(
          (u) =>
            u.username &&
            search === u.username.slice(0, search.length) &&
            search !== ""
        );
      setUserSearch(user);
    };
    s();
  }, [search]);

  const addConv = async (e) => {
    setConvId(e);
    console.log("convId", convId);
    const allconv = [];
    (await conversations) &&
      conversations.map((conv) => {
        allconv.push(conv.members[1]);
      });
    const check = allconv.includes(e._id);
    console.log(check);
    const data = await {
      senderId: user._id,
      receiverId: e._id,
    };
    if (!check && e._id !== null) {
      try {
        const res = await axios.post("https://whats-server.onrender.com/api/conversations/", data);
        console.log(res);
      } catch (err) {
        console.log(err);
      }
    }
  };

  ///////////////

  useEffect(() => {
    const friendId =
      currentChat && currentChat.members.find((m) => m !== user._id);

    const getUser = async () => {
      try {
        const res = await axios("https://whats-server.onrender.com/api/users?userId=" + friendId);
        setConvChat(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [currentChat]);

  return (
    <>
      <Navbar setSearch={setSearch} userSearch={userSearch} addConv={addConv} />
      <div className="chat">
        <div className="chat-left">
          <h2>Chats</h2>
          {conversations &&
            conversations.map((c) => (
              <div onClick={() => setCurrentChat(c)}>
                <Conversation
                  conversation={c}
                  currentUser={user}
                  convId={convId}
                />
              </div>
            ))}
        </div>
        <div className="chat-right">
          {currentChat ? (
            <>
              <div className="chat-header">
                <div className="follower">
                  <img src={img} />
                  <h2>{convChat && convChat.username}</h2>
                </div>
                <hr
                  style={{
                    width: "95%",
                    border: "0.1px solid rgb(236, 236, 236)",
                    marginTop: "20px",
                  }}
                ></hr>
              </div>
              <div className="chat-body">
                {messages &&
                  messages.map((message) => (
                    <div ref={scrollRef}>
                      <Message
                        message={message}
                        own={message.sender === user._id && true}
                      />
                    </div>
                  ))}
              </div>
              <div className="chat-sender">
                <div>+</div>

                <InputEmoji
                  onChange={(e) => setNewMessage(e)}
                  value={newMessage}
                />
                {/* <textarea></textarea> */}
                <div className="send-button button" onClick={handleSubmit}>
                  Send
                </div>
              </div>
            </>
          ) : (
            <span className="noConversationText">
              Open a conversation to start a chat.
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default Chat;
