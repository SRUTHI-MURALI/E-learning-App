import "dotenv/config";
import "../connection/connection";
import express from "express";
import http from "http";
import cors from "cors";
import { Server as SocketIOServer, Socket } from "socket.io";
import path from 'path'
import morgan from "morgan"

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Import your routes here
import adminrouter from "../route/admin/adminrouter";
import studentrouter from "../route/student/studentrouter";
import tutorrouter from "../route/tutor/tutorrouter";
import otprouter from "../route/otp/mobileOtpRouter";
import razorpayroute from "../route/Razorpay/payment";

app.use("/admin", adminrouter);
app.use("/student", studentrouter);
app.use("/tutor", tutorrouter);
app.use("/otp", otprouter);
app.use("/Razorpay", razorpayroute);
app.use(express.static(path.join(__dirname,"../../../Client/dist")));
app.use(morgan("dev"))
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname,"../../../Client/dist/index.html"));
});

const server = http.createServer(app);

const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const onlineUsers: Map<string, string> = new Map();

io.on("connection", (socket: Socket) => {
  socket.on("add-user", (userId: string) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});

server.listen(3001, () => {
  console.log("Socket server is running on port 3001");
});
