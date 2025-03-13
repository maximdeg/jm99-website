import transporter from "../config/transporter.config.js";
import ENV from "@/config/environment.config.js";
import companyEmailHTML from "./emailTemplates/companyEmailHTML.js";
import thankYouHTML from "./emailTemplates/thankYouHTML.js";

class Email {
  constructor(
    private to: string,
    private userEmail: string,
    private url: string,
    private firstName: string,
    private from: string
  ) {
    this.to = to;
    this.userEmail = userEmail;
    this.url = url;
    this.firstName = firstName;
    this.from = ENV.GMAIL_USER as string;
  }

  async sendEmailToClient() {
    try {
      const options = {
        to: this.to,
        subject: `Hola gracias por contactar JM99 Computer Requirements`,
        html: thankYouHTML(this.url, this.firstName),
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
        subject: `Pagina web: ${this.userEmail}`,
        html: companyEmailHTML(this.url, this.firstName),
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
