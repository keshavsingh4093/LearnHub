import nodemailer from "nodemailer";
import "dotenv/config";

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: process.env.AUTH_MAIL_USER,
        pass: process.env.AUTH_MAIL_USER_PASS,
    },
});

export { transporter };
