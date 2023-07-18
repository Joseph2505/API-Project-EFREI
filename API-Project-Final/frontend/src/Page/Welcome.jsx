import { Button } from "antd";
import React from "react";
import "./Welcome.css";
import logo from "../assets/logo-efrei.png";

const Welcome = ({ handleClick }) => {
  return (
    <div className="welcome-container">
      <img src={logo} alt="Efrei Logo" className="efrei-logo" />
      <div className="welcome-header">
        <h1>Welcome to NRJ Chat</h1>
        <p>Chat with your friends</p>
      </div>
      <div>
        <Button type="primary" onClick={handleClick}>
          Sign in With Google
        </Button>
      </div>
    </div>
  );
};

export default Welcome;