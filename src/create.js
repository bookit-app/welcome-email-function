'use strict';

const nodemailer = require('nodemailer');

let mailTransport;

module.exports.appointmentCreateEmail = async (data) => {
  const APP_NAME = 'Book It!';

  
  const mailOptions = {
    from: `${APP_NAME} <noreply@bookit.com>`,
    subject: 'Your appointment is Booked!',
    text: `Hey ${data.firstName}! Your appointment at ${data.businessName} on ${data.date} at ${data.time} with ${data.staffMember} has been Booked!`,
    to: data.email
  };

  await _getMailTransport().sendMail(mailOptions);

  console.info(`Book It Appointment Creation ${data.email}`);
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
