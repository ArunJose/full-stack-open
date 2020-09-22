import React from "react";
import "./Notification.css";

const Notification = ({ notification }) => {
  if (notification === null) {
    return null;
  }
  const style = { color: notification.color };
  return (
    <div className="notification" style={style}>
      {notification.message}
    </div>
  );
};

export default Notification;
