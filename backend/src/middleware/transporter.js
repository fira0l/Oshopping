const nodemailer = require('nodemailer');

// Configure nodemailer
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 587,
  auth: {
    user: "ecada490cd5e2b",
    pass: "34e7d6f2f0e504"
  }
});

module.exports = transporter;