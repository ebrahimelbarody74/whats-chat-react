import "./App.css";
import Login from "./pages/Login/Login";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import Register from "./pages/Register/Register";
import Chat from "./pages/Chat/Chat";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function App() {
  const user = JSON.parse(localStorage.getItem("chatuser")) || false;
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route path="/" element={user ? <Chat /> : <Login />} />
        <Route path="home" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={user ? <Chat /> : <Register />} />
      </Routes>
    </div>
  );
}

export default App;
