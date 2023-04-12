import React from "react";
import { format } from "timeago.js";

function Message({ message, own }) {
  return (
    <div className={own ? "message own" : "message"}>
      <span>{message.text}</span> <span>{format(message.createdAt)}</span>
    </div>
  );
}

export default Message;
