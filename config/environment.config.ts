import dotenv from "dotenv";

dotenv.config();

const ENV = {
  GMAIL_PASS: process.env.GMAIL_PASS,
  GMAIL_USER: process.env.GMAIL_USER,
};

export default ENV;
