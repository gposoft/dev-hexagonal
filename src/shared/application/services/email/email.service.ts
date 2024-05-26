import nodemailer from "nodemailer";
import { OnProcess } from "../../../../system/tools";
import { envConfig } from "../../../../system/config";



export interface EmailSendProps {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export class EmailOutlookService {
  private user: string;
  private password: string;

  constructor() {
    this.user = envConfig.email.outlook.user;
    this.password = envConfig.email.outlook.password;
  }

  async send({ from, to, subject, html }: EmailSendProps, onProcess: OnProcess): Promise<void> {
    const transporter = nodemailer.createTransport({
      service: "outlook",
      auth: {
        user: this.user,
        pass: this.password,
      },
    });

    transporter.sendMail({ from, to, subject, html }, (error, info) => {
      if (error) {
        onProcess({ status: "error", error: error.message });
      } else {
        console.log("Correo enviado: " + info.response);
        onProcess({ status: "success", message: `Código enviado a ${to}` });
      }
    });
  }
}
