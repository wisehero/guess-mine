import { join } from "path";
import express from "express";
import { Server, Socket } from "socket.io";
import morgan from "morgan";

const PORT = 4000;
const app = express();
app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(morgan("dev"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res, next) => {
  return res.render("home");
});

const handleListening = () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);

const io = new Server(server);

io.on("connection", (socket) => {
  socket.on("newMessage", ({ message }) => {
    socket.broadcast.emit("messageNotif", {
      message,
      nickname: socket.nickname || "Anon",
    });
  });
  socket.on("setNickname", ({ nickname }) => {
    socket.nickname = nickname;
  });
});
