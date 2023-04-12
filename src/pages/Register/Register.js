import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.scss";
import axios from "axios";
function Register() {
  const [firstname, setFristname] = useState();
  const [lastname, setLastname] = useState();
  const [username, setUsername] = useState();
  const [password, setpassword] = useState();
  const [email, setEmail] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      // firstname,
      // lastname,
      username,
      email,
      password,
      confirmPassword: password,
    };
    const res = await axios.post("/api/auth/register", data);
    try {
      localStorage.setItem("chatuser", JSON.stringify(res.data));
      if (res.status === 200) {
        navigate("/home");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="register">
      <div className="box">
        <div className="left">
          <div className="img">
            <img src="data:image/png;base64,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" />
          </div>
          <div className="info">
            <h1>Orico Chat</h1>
            <h6>Explore the ideas throughout the world</h6>
          </div>
        </div>
        <div className="right">
          <form>
            <h3>Register</h3>
            <input
              type="text"
              name="fristname"
              placeholder="Frist Name ... "
              onChange={(e) => setFristname(e.target.value)}
            />
            <input
              type="text"
              name="lastname"
              placeholder="Last Name ... "
              onChange={(e) => setLastname(e.target.value)}
            />
            <input
              type="text"
              name="username"
              placeholder="Username ... "
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              name="email"
              placeholder="email ... "
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="password ... "
              onChange={(e) => setpassword(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="password ... "
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Link to="/login">Already have an account Login</Link>
            <button className="button" onClick={handleSubmit}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
