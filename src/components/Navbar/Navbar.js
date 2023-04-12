import React, { useEffect, useState } from "react";
import { UilSearch } from "@iconscout/react-unicons";
import Logo from "../../img/logo.png";
import Home from "../../img/home.png";
import Noti from "../../img/noti.png";
import Comment from "../../img/comment.png";
import { UilSetting } from "@iconscout/react-unicons";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.scss";
import { useDispatch } from "react-redux";
import { postData } from "../../rtk/slices/authSlice";
import axios from "axios";
function Navbar({  userSearch, setSearch, addConv }) {
  const user = JSON.parse(localStorage.getItem("chatuser"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  return (
    <div className="navbar">
      <div className="n-left">
        <img src={Logo} />
        <div className="search">
          <input
            type="search"
            placeholder="#Explore"
            onChange={(e) => setSearch(e.target.value)}
          />
          <UilSearch />
        </div>
        {userSearch.length > 0 && (
          <div className="userSearch">
            <ul>
              {userSearch.map((u) => (
                <li>
                  {u.username}
                  <button className="button" onClick={() => addConv(u)}>
                    Contact
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="n-right">
        <Link
          to={"/login"}
          onClick={() => {
            navigate("/");
            localStorage.clear();
            dispatch(
              postData({
                authData: null,
                loading: false,
                error: false,
                updateLoading: false,
              })
            );
          }}
        >
          <img src={Home} />
        </Link>
        <Link>
          <UilSetting />
        </Link>
        <Link>
          <img src={Noti} />
        </Link>
        <Link>
          <img src={Comment} />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
