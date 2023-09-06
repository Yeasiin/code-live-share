import nodemailer from "nodemailer";
import AppError from "./appError";
import { StatusCodes } from "http-status-codes";

type MailConfigType = {
  from: string;
  to: string;
  subject?: string;
  text: string;
};

export default class Email {
  mailConfig: MailConfigType;
  constructor(mailConfig: MailConfigType) {
    this.mailConfig = mailConfig;
  }

  _newTransport() {
    if (process.env.NODE_ENV === "production") {
      return nodemailer.createTransport({
        host: process.env.BREVO_HOST,
        port: +process.env.BREVO_PORT,
        auth: {
          user: process.env.BREVO_USER,
          pass: process.env.BREVO_PASSWORD,
        },
      });
    } else {
      return nodemailer.createTransport({
        host: process.env.MAIL_HOST as string,
        port: +process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
      });
    }
  }

  async _send(mailOptions: {
    from: string;
    to: string;
    subject: string;
    text: string;
  }) {
    try {
      await this._newTransport().sendMail(mailOptions);
    } catch (error) {
      throw new AppError(
        "Failed to deliver Email",
        StatusCodes.FAILED_DEPENDENCY
      );
    }
  }

  async receiveContact(mailOption?: MailConfigType) {
    if (mailOption) {
      this.mailConfig = mailOption;
    }
    const mailOptions = {
      from: this.mailConfig.from,
      to: this.mailConfig.to,
      subject: this.mailConfig.subject ?? "No Subject",
      text: this.mailConfig.text,
    };

    await this._send(mailOptions);
  }
}
