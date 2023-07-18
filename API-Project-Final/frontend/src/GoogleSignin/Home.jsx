import React, { useState } from "react";
import Chat from "../Page/Chat";
import { Col, Row, Layout, Button } from "antd";
const { Header } = Layout;
export default function Home() {
  const logout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <div>
      <Header
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "center",
        }}
      >
        <h2 style={{ fontSize: "20px" }}>Welcome to Chat Application !</h2>
        <Button type="primary" onClick={logout}>
          Logout
        </Button>
      </Header>
      <Chat />
    </div>
  );
}
