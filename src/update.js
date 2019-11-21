'use strict';

const nodemailer = require('nodemailer');

let mailTransport;


module.exports.appointmentUpdateEmail = async (data) => {
  const APP_NAME = 'Book It!';
  
  const mailOptions = {
    from: `${APP_NAME} <noreply@bookit.com>`,
    subject: 'Your appointment has been Updated',
    text: `Hey ${data.firstName}! Your appointment has been changed to ${data.date} at ${data.time} with ${data.staffMember}!`,
    to: data.email
  };

  await _getMailTransport().sendMail(mailOptions);

  console.info(`Book It Appointment Update ${data.email}`);
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
