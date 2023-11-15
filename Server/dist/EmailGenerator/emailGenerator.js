"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const nodemailer_1 = __importDefault(require("nodemailer"));
const mailgen_1 = __importDefault(require("mailgen"));
const generateEmail = (instructorEmail, coursename, msg) => {
    // Your email and password should be defined here or fetched from a secure configuration.
    const EMAIL = instructorEmail;
    const course = coursename;
    const msgs = msg;
    const config = {
        service: "gmail",
        auth: {
            user: "muhzinsidhiq333@gmail.com",
            pass: "iiue xtwn lkkf jfps",
        },
    };
    const transporter = nodemailer_1.default.createTransport(config);
    const MailGenerator = new mailgen_1.default({
        theme: "default",
        product: {
            name: "Admin",
            link: "https://mailgen.js/",
        },
    });
    const response = {
        body: {
            name: "Tuto E-learning",
            intro: "Your course is approved ",
            table: {
                data: [
                    {
                        item: course,
                        description: msgs,
                    },
                ],
            },
            outro: "Looking for more courses from you",
        },
    };
    const mail = MailGenerator.generate(response);
    const message = {
        from: "muhzinsidhiq333@gmail.com",
        to: EMAIL,
        subject: "course confirmation",
        html: mail,
    };
    transporter
        .sendMail(message)
        .then(() => {
        return {
            status: 201,
            message: "You should receive an email",
        };
    })
        .catch(() => {
        return {
            status: 500,
        };
    });
};
exports.default = generateEmail;
