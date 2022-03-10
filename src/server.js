import { join } from "path";
import express from "express";
import { Server, Socket } from "socket.io";

const PORT = 4000;
const app = express();

app.set("view engine", "pug");
app.set("views", join(__dirname, "views"));
app.use(express.static(join(__dirname, "static")));
app.get("/", (req, res, next) => {
  return res.render("home");
});

const handleListening = () => {
  console.log(`✅ Server running: http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);
const io = new Server(server);
