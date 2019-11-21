'use strict';

const nodemailer = require('nodemailer');

let mailTransport;

module.exports.welcomeEmail = async (data) => {
  const APP_NAME = 'Book It!';

  const mailOptions = {
    from: `${APP_NAME} <noreply@bookit.com>`,
    subject: 'Welcome to Book It!',
    text: `Hey ${data.email}! An account with your email was created for the Book It app. Welcome to the community and we hope you enjoy using the app. For additional information refer <<Link to user Guide when we get one>>.`,
    to: data.email
  };

  await _getMailTransport().sendMail(mailOptions);

  console.info(`Book It Account Creation for user ${data.email}`);
};

function _getMailTransport() {
  if (!mailTransport) {
    mailTransport = nodemailer.createTransport({
      auth: {
        pass: process.env['email-password'],
        user: process.env['email-account']
      },
      service: 'gmail'
    });
  }

  return mailTransport;
}
