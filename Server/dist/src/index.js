"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("../connection/connection");
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Import your routes here
const adminrouter_1 = __importDefault(require("../route/admin/adminrouter"));
const studentrouter_1 = __importDefault(require("../route/student/studentrouter"));
const tutorrouter_1 = __importDefault(require("../route/tutor/tutorrouter"));
const mobileOtpRouter_1 = __importDefault(require("../route/otp/mobileOtpRouter"));
const payment_1 = __importDefault(require("../route/Razorpay/payment"));
app.use("/admin", adminrouter_1.default);
app.use("/student", studentrouter_1.default);
app.use("/tutor", tutorrouter_1.default);
app.use("/otp", mobileOtpRouter_1.default);
app.use("/Razorpay", payment_1.default);
app.use(express_1.default.static(path_1.default.join(__dirname, "../../../Client/dist")));
app.get("*", function (req, res) {
    res.sendFile(path_1.default.join(__dirname, "../../../Client/dist/index.html"));
});
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: '*',
        credentials: true,
        methods: ["GET", "POST"],
    },
});
const onlineUsers = new Map();
io.on("connection", (socket) => {
    socket.on("add-user", (userId) => {
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
