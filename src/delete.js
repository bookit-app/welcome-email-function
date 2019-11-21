'use strict';

const nodemailer = require('nodemailer');

let mailTransport;

module.exports.appointmentDeleteEmail = async (data) => {
  const APP_NAME = 'Book It!';

  
  const mailOptions = {
    from: `${APP_NAME} <noreply@bookit.com>`,
    subject: 'Your appointment is Cancelled!',
    text: `Hey ${data.firstName}! Your appointment at ${data.businessName} on ${data.date} at ${data.time} has been cancelled!`,
    to: data.email
  };

  await _getMailTransport().sendMail(mailOptions);

  console.info(`Book It Appointment Cancellation ${data.email}`);
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
