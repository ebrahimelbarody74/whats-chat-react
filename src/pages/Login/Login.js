import React, { useEffect, useState } from "react";
import "./Login.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../img/logo.png";
import axios from "axios";
import { useDispatch } from "react-redux";
import { postData } from "../../rtk/slices/authSlice";
function Login() {
  const [user, setUser] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    // const res = await axios.post("api/auth/login", data);
    // try {
    //   setUser(res.data);
    //   localStorage.setItem("chatuser", JSON.stringify(res.data));
    //   if (res.status === 200) {
    //     navigate("/");
    //   }
    // } catch (err) {
    //   console.log(err);
    // }
    dispatch(postData(data))
      .then(function (res) {
        if (res.meta.requestStatus === "fulfilled") {
          localStorage.setItem("chatuser", JSON.stringify(res.payload));
          navigate("/home");
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <div className="login">
      <div className="box">
        <div className="left">
          <div className="img">
            <img src={logo} />
          </div>
          <div className="info">
            <h1>Orico Chat</h1>
            <h6>Explore the ideas throughout the world</h6>
          </div>
        </div>
        <div className="right">
          <form>
            <h3>Login</h3>
            <input
              type="text"
              name="email"
              placeholder="email ... "
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="password ... "
              onChange={(e) => setPassword(e.target.value)}
            />
            <Link to="/register">Don't have an account Sign up</Link>
            <button className="button" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
