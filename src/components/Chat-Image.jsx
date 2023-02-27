import React from "react";
import "../styles/Chat-Image.scss";
import close from "../assets/close-img.svg";

const ChatImage = ({ ...props }) => {
  return (
    <div className="chatimg">
      <div className="chatimg__header">
        <div className="chatimg__details">
          <p className="chatimg__nameInit">P</p>

          <div className="chatimg__name">
            <p className="chatimg__text">Jatin Palande</p>
            <p className="chatimg__time">12:00</p>
          </div>
        </div>

        <img src={close} alt="" />
      </div>

      <img src={props.img} alt="" />
    </div>
  );
};

export default ChatImage;
