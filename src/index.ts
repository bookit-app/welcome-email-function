'use strict';

import nodemailer from 'nodemailer';
import { MailOptions } from 'nodemailer/lib/json-transport';
import Mail from 'nodemailer/lib/mailer';

let mailTransport: Mail;

const welcomeEmail = async (data: any, context: any) => {
  // TODO: Maybe refactor this to use an email template rather than hard-coding this
  const APP_NAME = 'Book It!';

  const mailOptions: MailOptions = {
    from: `${APP_NAME} <noreply@bookit.com>`,
    subject: 'Welcome to Book It!',
    text: `Hey ${data.email}! An account with your email was created for the Book It app. Welcome to the community and we hope you enjoy using the app. For additional information refer <<Link to user Guide when we get one>>.`,
    to: data.email
  };

  await _getMailTransport().sendMail(mailOptions);

  // tslint:disable-next-line: no-console
  console.info(`Book It Account Creation for user ${data.email}`);
};

function _getMailTransport(): Mail {
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
export { welcomeEmail };
