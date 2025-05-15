const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,      // "sandbox.smtp.mailtrap.io"
  port: process.env.SMTP_PORT,      // 2525
  auth: {
    user: process.env.EMAIL_USERNAME, // "85a0dbb37fcc0c"
    pass: process.env.EMAIL_PASSWORD, // "24fe9e53d0123a"
  },
});

const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: '"Your App" <no-reply@example.com>',
      to,
      subject,
      text,
    });
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

module.exports = { sendEmail };