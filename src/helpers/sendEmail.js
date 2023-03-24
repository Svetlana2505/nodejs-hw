import sgMail from "@sendgrid/mail";
import * as dotenv from "dotenv";
dotenv.config();

const { SENDGRID_API_KEY } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const mail = { ...data, from: "svetikred77@gmail.com" };
  await sgMail.send(mail);
};

export default sendEmail;
