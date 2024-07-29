const nodemailer = require('nodemailer');
const sgTransport = require('nodemailer-sendgrid-transport');
// const SENDGRID_SENDER_EMAIL = process.env.SENDGRID_SENDER_EMAIL;

const options = {
  auth: {
    api_key: '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',
  },
};

const mailService = nodemailer.createTransport(sgTransport(options));

const sendMail = options => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await mailService.sendMail(options);
      return resolve(response);
    } catch (e) {
      return reject(e);
    }
  });
};

module.exports = async (to, subject, body) => {
  return sendMail({
    // from: SENDGRID_SENDER_EMAIL,
    from: 'info@swappiamo.it',
    to,
    subject,
    html: body,
  });
};
