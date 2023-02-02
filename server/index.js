import cors from "cors";
import express from "express";
import http from "http";
import mongoose from "mongoose";
import path from "path";
import { Server } from "socket.io";
import { fileURLToPath } from "url";
import router from "./api/routes.js";
import sockets from "./socket/sockets.js";
import dotenv from "dotenv";
dotenv.config();
await mongoose.connect(process.env.DB_URL);

const app = express();
const PORT = process.env.PORT;

const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://chai-chat-client.onrender.com"],
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
app.use("/", router);

io.on("connection", sockets);

httpServer.listen(PORT, () => {
  console.log("Server is running at https://chai-chat.onrender.com");
});
