import { z } from "zod";
import Email from "../utils/email";
import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";

const contactSchema = z.object({
  fullName: z.string(),
  email: z.string().email(),
  message: z.string().min(5, "Message Should be at least 5 character long"),
});

export async function contactMail(req: Request, res: Response) {
  const contactMessage = contactSchema.parse(req.body);

  const mailOption = {
    from: `${contactMessage.fullName} < ${contactMessage.email} >`,
    to: process.env.MY_MAIL,
    subject: "Contact mail",
    text: contactMessage.message,
  };

  const mail = new Email(mailOption);
  // awaiting for making sure server send the right response to the client
  // other wise server send "success" status immediately before email is even delivered
  // or failed to deliver
  // by awaiting server take time and then send the response to the client
  await mail.receiveContact();

  res.status(StatusCodes.OK).json({ status: "success" });
}
