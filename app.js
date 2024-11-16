const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        // methods: ["GET", "POST"],
    },
});

const namespace = 'local';
const ws = io.of(`/${namespace}`);
ws.on("connection", (socket) => {
    const userId = socket.handshake.auth.userId;
    console.log(`User Connected: ${socket.id} - ${userId}`);

    socket.on("join_room", (roomNo) => {
        console.log(`User joined room: ${roomNo}`);
        socket.join(roomNo);
    });

    socket.on("send_message", (data) => {
        console.log(`User messaged: ${data.room} ${data.text}`);
        //! not going check
        socket.to(data.room).emit("receive_message", data);
    });
});

ws.on("disconnection", (socket) => {
    console.log(`User DisConnected: ${socket.id}`);
});

server.listen(3001, () => {
    console.log("SERVER IS RUNNING");
});