const nodemailer = require('nodemailer');

const {
  EMAIL_IN_PROD_MODE,
  SMTP_HOST,
  SMTP_PORT,
  SMTP_USER,
  SMTP_PASSWORD,
} = require('../config');
const { EMAIL_TYPES } = require('../constants');
const { renderTemplate } = require('./templates');

const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port: SMTP_PORT,
  secure: EMAIL_IN_PROD_MODE ? true : false, // upgrade later with STARTTLS
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASSWORD,
  },
});

const sendEmail = ({ data = { token: '', email: '', nickname: '' }, type }) => {
  // data: {token, email, nickname} // WIP
  const message = {
    from: EMAIL_IN_PROD_MODE ? SMTP_USER : 'info@omarpecos.com',
    to: data.email,
    subject: EMAIL_TYPES[type].subject,
    // text: 'Plaintext version of the message',
    html: renderTemplate(EMAIL_TYPES[type].template, data),
  };

  return transporter.sendMail(message);
};

module.exports = { sendEmail };
