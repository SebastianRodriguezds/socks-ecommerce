const nodemailer = require("nodemailer");

// const sendEmail = async ({ to, subject, text }) => {
//     const transporter = nodemailer.createTransport({
//         host: process.env.SMTP_HOST,
//         port: process.env.SMTP_PORT,
//         auth: {
//             user: process.env.SMTP_USER,
//             pass: process.env.SMTP_PASS,
//         },
//     });

//     await transporter.sendMail({
//         from: process.env.SMTP_USER,
//         to,
//         subject,
//         text,

//     });
// };

const sendEmail = async ({ to, subject, text }) => {
  if (process.env.NODE_ENV === "development") {
    console.log("to:", to);
    console.log("subjec:", subject);
    console.log("text:", text);
    return;
  }
}
module.exports = sendEmail;