import nodemailer from "nodemailer";
import ENV from "./environment.config";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: ENV.GMAIL_USER,
    pass: ENV.GMAIL_PASS,
  },
});

export default transporter;
