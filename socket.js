const { createServer } = require("node:http");
const { Server, Socket } = require("socket.io");

const httpServer = createServer();
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        // origin: "http://localhost:3000",
    },
});

function emitAuthorizationError (socket) {
    socket.emit("AUTHORIZATION_ERROR", {
        content: {
            statusCode: 401,
            error: "Unauthorized",
            message: "invalid token",
        },
        type: "AUTHORIZATION_ERROR",
    });
}

const namespace = 'local';
const ws = io.of(`/${namespace}`);

ws.on('connection', async (socket) => {
    console.log(`SOCKET '${socket.id}' CONNECTED`);
    try {
        // await client.hSet('user.keys', userId, socket.id);
    } catch (error) {
        console.error("ERROR DURING SOCKET CONNECTION EVENT:\n", error);
    }
});

ws.on('disconnection', async () => {
    try {
        // await client.hDel('user.keys', userId);
        console.log(`SOCKET '${socket.id}' DISCONNECTED`);
    } catch (error) {
        console.error("ERROR DURING SOCKET DISCONNECT EVENT:\n", error);
    }
});