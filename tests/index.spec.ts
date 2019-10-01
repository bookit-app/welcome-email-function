'use strict';

import * as chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
chai.use(chaiAsPromised);

import nodemailer from 'nodemailer';
import { stub } from 'sinon';
import { welcomeEmail } from '../src';

describe('welcome-email-function: unit tests', () => {
  let createTransportStub: any;

  before(() => {
    createTransportStub = stub(nodemailer, 'createTransport');
    createTransportStub.returns({ sendMail: async () => console.log(true) });
  });

  it('should generate an email', done => {
    process.env['email-password'] = 'abc123';
    process.env['email-account'] = 'sample@sample.com';

    const data: any = {
      email: 'test@test.com'
    };
    const context: any = {};

    chai.expect(welcomeEmail(data, context)).to.be.fulfilled.then(() => {
      done();
    });
  });
});
