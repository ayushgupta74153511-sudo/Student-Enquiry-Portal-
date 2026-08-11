const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_EMAIL,
    pass: process.env.SMTP_PASS,
  },
})

async function sendMail(to, subject, html) {
  try {
    await transporter.sendMail({
      from: `"Student Grievance System" <${process.env.SMTP_EMAIL}>`,
      to,
      subject,
      html,
    })
    console.log(' Mail sent to', to)
  } catch (err) {
    console.error('Mail error:', err.message)
  }
}

module.exports = sendMail
