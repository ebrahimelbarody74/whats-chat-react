import React from "react";
import { format } from "timeago.js";
import Moment from "react-moment";

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <span>{message.text}</span>{" "}
      <span>
        <Moment format="hh:mm">{message.createdAt}</Moment>
      </span>
    </div>
  );
}

export default Message;
