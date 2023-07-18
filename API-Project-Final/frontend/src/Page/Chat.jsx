import React, { useState, useEffect } from "react";
import { Input, Button, List, notification, Avatar, Badge } from "antd";
import io from "socket.io-client";
import { auth, provider } from "../GoogleSignin/config"; // Update the path to your config file
import "./Chat.css";
const socket = io("http://localhost:3000");

function Chat() {
  const [name, setName] = useState("");
  const [firstname, setFirstname] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { email, displayName } = user;
        setName(displayName);
        setEmail(email);
        socket.emit("user connected", { email, name: displayName });
      }
    });

    socket.on("user joined", (username, onlineCount) => {
      setOnlineUsers((users) => [...users, { username }]);
      setChatMessages((messages) => [
        ...messages,
        { username: "", message: `${username} joined the chat!` },
      ]);
    });

    socket.on("user left", (username, onlineCount) => {
      setOnlineUsers((users) => users.filter((user) => user.username !== username));
      setChatMessages((messages) => [
        ...messages,
        { username: "", message: `${username} left the chat!` },
      ]);
    });

    socket.on("chat message", ({ username, message }) => {
      setChatMessages((messages) => [...messages, { username, message }]);
    });

    socket.on("username exists", () => {
      setError("Username already exists. Please choose a different username.");
      notification.open({
        message: "Username already exists",
        description:
          "Username already exists. Please choose a different username.",
      });
    });

    return () => {
      socket.off("user joined");
      socket.off("user left");
      socket.off("chat message");
      socket.off("username exists");
    };
  }, []);

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleFirstnameChange = (event) => {
    setFirstname(event.target.value);
  };

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleNameSubmit = () => {
    if (name.trim() !== "" && firstname.trim() !== "" && email.trim() !== "") {
      socket.emit("user joined", { email, name, firstname });
    } else {
      notification.open({
        message: "Incomplete Information",
        description: "Please provide your name, firstname, and email.",
      });
    }
  };

  const handleMessageSubmit = () => {
    if (message.trim() !== "") {
      socket.emit("chat message", message);
      setMessage("");
    } else {
      notification.open({
        message: "Incomplete Information",
        description: "Please provide a message.",
      });
    }
  };

  const handleNameUpdate = () => {
    if (name.trim() !== "" && firstname.trim() !== "" && email.trim() !== "") {
      socket.emit("user updated", { email, name, firstname });
    } else {
      notification.open({
        message: "Incomplete Information",
        description: "Please provide your name, firstname, and email.",
      });
    }
  };

  const handleGoogleSignIn = () => {
    auth.signInWithPopup(provider)
      .then((result) => {
        const { email, displayName } = result.user;
        setName(displayName);
        setEmail(email);
        socket.emit("user connected", { email, name: displayName });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleGoogleSignOut = () => {
    auth.signOut()
      .then(() => {
        setName("");
        setFirstname("");
        setEmail("");
        socket.emit("disconnect");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="ChatApp">
      <div style={{ height: "90vh", overflow: "hidden" }}>
        {email ? (
          <div>
            <div className="UsernameInput">
              <Input
                placeholder="Enter your name"
                value={name}
                onChange={handleNameChange}
              />
              <Input
                placeholder="Enter your firstname"
                value={firstname}
                onChange={handleFirstnameChange}
              />
              <Button type="primary" onClick={handleNameSubmit}>
                Join Chat
              </Button>
            </div>
            <div className="OnlineUsers">
              <h4>Online Users ({onlineUsers.length}):</h4>
              <List
                itemLayout="horizontal"
                dataSource={onlineUsers}
                renderItem={(user) => (
                  <List.Item>
                    <List.Item.Meta
                      title={
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "space-around",
                          }}
                        >
                          <Avatar src="https://i.pravatar.cc/150?img=3" />
                          {user.username}
                          <Badge status="success" style={{ marginLeft: 4 }} />
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
            <Button onClick={handleNameUpdate}>Update Name</Button>
            <Button onClick={handleGoogleSignOut}>Logout</Button>
          </div>
        ) : (
          <Button onClick={handleGoogleSignIn}>Sign In with Google</Button>
        )}
      </div>

      <div
        style={{
          border: "4px solid gray",
          height: "90vh",
          overflow: "hidden",
          position: "relative",
          backgroundColor: "#EEEEEE",
          borderRadius: "0.5rem",
        }}
      >
        <div className="ChatMessages">
          <List
            dataSource={chatMessages}
            renderItem={(item) => (
              <List.Item>
                {item.username && <strong>{item.username}: </strong>}
                {item.message}
              </List.Item>
            )}
          />
        </div>
        <div
          className="MessageInput"
          style={{
            display: "flex",
            marginTop: "auto",
            position: "absolute",
            left: "0",
            bottom: "0",
            width: "100%",
            gap: "0.5rem",
          }}
        >
          <Input
            placeholder="Enter message"
            value={message}
            allowClear
            onChange={handleMessageChange}
          />
          <Button type="primary" onClick={handleMessageSubmit}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
