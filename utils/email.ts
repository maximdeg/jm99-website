import nodemailer from "nodemailer";
import companyEmailHTML from "@/utils/emailTemplates/companyEmailHTML.js";
import thankYouHTML from "@/utils/emailTemplates/thankYouHTML.js";
import dotenv from "dotenv";

const transporter = nodemailer.createTransport({
  service: "gmail",
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
});

class Email {
  private from: string;
  constructor(
    private firstName: string,
    private to: string,
    private message: string
  ) {
    this.firstName = firstName;
    this.to = to;
    this.message = message;
    this.from = process.env.GMAIL_USER as string;
  }

  async sendEmailToClient() {
    try {
      const options = {
        to: this.to,
        subject: `Hola gracias por contactar JM99 Computer Requirements`,
        html: thankYouHTML(this.firstName),
        from: this.from,
      };

      let response = await transporter.sendMail(options);
      return response;
    } catch (error) {
      console.error("Error al enviar mail:", error);
      throw error;
    }
  }

  async sendEmailToCompany() {
    try {
      const options = {
        to: this.from,
        subject: `Pagina web: ${this.firstName} mando un mensaje`,
        html: companyEmailHTML(this.firstName, this.to, this.message),
        from: this.from,
      };

      let response = await transporter.sendMail(options);

      return response;
    } catch (error) {
      console.error("Error al enviar mail:", error);
      throw error;
    }
  }
}

export default Email;
