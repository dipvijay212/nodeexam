const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER,     
    pass: process.env.EMAIL_PASS,     
  },
});

const sendLoginEmail = async (to, name) => {
  const mailOptions = {
    from: `"Login Alert" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Login Successful",
    text: `Hi ${name},\n\nYou have successfully logged in.`,
    html: `<p>Hi <strong>${name}</strong>,</p><p>You have successfully logged in.</p>`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendLoginEmail };
