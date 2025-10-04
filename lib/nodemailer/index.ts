import nodemailer from "nodemailer";
import {
  NEWS_SUMMARY_EMAIL_TEMPLATE,
  WELCOME_EMAIL_TEMPLATE,
} from "./template";
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

export const sendDailyNewsSumamry = async ({
  email,
  date,
  newsContent,
}: {
  email: string;
  date: string;
  newsContent: string;
}): Promise<void> => {
  const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE.replace(
    "{{date}}",
    date
  ).replace("{{newsContent}}", newsContent);

  const mailOPtions = {
    from: `"TraceTocker News" <tracetoker@alphasystems.net>`,
    to: email,
    subject: `Market news Summary today - ${date}`,
    text: `Today's market news summary from TraceTocker`,
    html: htmlTemplate,
  };

  await transporter.sendMail(mailOPtions);
};
