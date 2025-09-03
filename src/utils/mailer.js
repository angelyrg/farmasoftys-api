const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail', // o el servicio SMTP que uses
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

async function sendEmail({ to, subject, html }) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
    }

    try {
        const info = await transporter.sendMail(mailOptions)
        console.log('Email enviado:', info.response)
        return info
    } catch (error) {
        console.error('Error al enviar email:', error)
        throw error
    }
}

module.exports = { sendEmail }
