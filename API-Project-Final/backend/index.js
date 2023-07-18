  const http = require("http");
  const express = require("express");
  const socketio = require("socket.io");
  const mongoose = require("mongoose");
  
  const app = express();
  const server = http.createServer(app);
  const io = socketio(server, {
    cors: {
      origin: "*",
    },
  });
  
  mongoose.connect("mongodb+srv://Joseph2505:Joseph2505@cluster0.g0qxwrd.mongodb.net/", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
  const userSchema = new mongoose.Schema({
    name: String,
    firstname: String,
    email: String,
  });
  
  const User = mongoose.model("User", userSchema);
  
  const onlineUsers = {};
  let onlineCount = 0;
  
  io.on("connection", (socket) => {
    socket.on("user connected", () => {
      console.log("a user connected");
    });
  
    socket.on("user joined", ({ email, name, firstname }) => {
      console.log(`User with email ${email} joined the chat`);
      if (!onlineUsers[email]) {
        onlineCount++;
        onlineUsers[email] = socket.id;
  
        // Vérifie si l'utilisateur existe déjà dans la base de données
        User.findOne({ email })
          .then((existingUser) => {
            if (!existingUser) {
              // L'utilisateur n'existe pas, enregistre-le dans la base de données
              const newUser = new User({ email, name, firstname });
              return newUser.save();
            } else {
              // L'utilisateur existe déjà, met à jour ses informations
              existingUser.name = name;
              existingUser.firstname = firstname;
              return existingUser.save();
            }
          })
          .then(() => {
            io.emit("user joined", name, onlineCount);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        socket.emit("username exists");
      }
    });
  
    socket.on("chat message", (message) => {
      console.log(`message: ${message}`);
      const email = Object.keys(onlineUsers).find(
        (key) => onlineUsers[key] === socket.id
      );
      const username = email ? email.split("@")[0] : "";
      io.emit("chat message", { username, message });
    });
  
    socket.on("disconnect", () => {
      const email = Object.keys(onlineUsers).find(
        (key) => onlineUsers[key] === socket.id
      );
      if (email) {
        console.log(`User with email ${email} disconnected`);
        onlineCount--;
        io.emit("user left", email, onlineCount);
        delete onlineUsers[email];
      }
    });
  });
  
  server.listen(3000, () => {
    console.log("listening on *:3000");
  });
  