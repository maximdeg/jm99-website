import dotenv from "dotenv";

// Load .env.local file (Next.js standard convention)
dotenv.config({ path: '.env.local' });

const ENV = {
  GMAIL_PASS: process.env.GMAIL_PASS,
  GMAIL_USER: process.env.GMAIL_USER,
  CLAID_API_KEY: process.env.CLAID_API_KEY,
};

export default ENV;
