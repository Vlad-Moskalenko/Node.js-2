const nodemailer = require('nodemailer');

const { META_PASSWORD } = process.env;

const nodemailerConfig = {
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: 'vlad.moskalenko@meta.ua',
    pass: META_PASSWORD,
  },
};

const transport = nodemailer.createTransport(nodemailerConfig);

const email = {
  to: 'email@example.com',
  from: 'vlad.moskalenko1993@gmail.com',
  subject: 'test',
  html: '<strong>Test email</strong>',
};

transport
  .sendMail(email)
  .then(() => console.log('email sent'))
  .catch(err => console.log(err.message));
