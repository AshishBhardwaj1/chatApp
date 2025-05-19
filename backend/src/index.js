const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const app = express();

dotenv.config();
connectDB();
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: { origin: "*" }
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/messages", require("./routes/messageRoutes"));

// Socket.io setup
io.on("connection", socket => {
  console.log("User connected: " + socket.id);

  socket.on("sendMessage", ({ senderId, receiverId, content }) => {
    socket.to(receiverId).emit("receiveMessage", { senderId, content });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
  });
});

const PORT = process.env.PORT || 5000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
