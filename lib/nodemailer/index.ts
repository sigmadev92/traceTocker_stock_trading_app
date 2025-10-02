import nodemailer from "nodemailer";
import { WELCOME_EMAIL_TEMPLATE } from "./template";
export const transporter = nodemailer.createTransport({
  auth: {
    user: process.env.NODEMAILER_MAIL,
    pass: process.env.NODEMAILER_PASS,
  },
  service: "gmail",
});

export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replace("{{name}}", name).replace(
    "{{intro}}",
    intro
  );

  const mailOptions = {
    from: process.env.NODEMAILER_MAIL,
    to: email,
    subject: "Welcome to TraceTocker",
    text: "Thanks for Joining us",
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOptions);
};
