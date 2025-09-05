const mailjet = require('node-mailjet')
const logger = require('../utils/logger')
require('dotenv').config()

const mailjetClient = mailjet.apiConnect(
    process.env.MAILJET_API_KEY,
    process.env.MAILJET_SECRET_KEY,
)

async function sendWelcomeEmail({ to, name, solicitud }) {
    try {
        const request = await mailjetClient
            .post('send', { version: 'v3.1' })
            .request({
                Messages: [
                    {
                        From: {
                            Email: process.env.MAILJET_FROM_EMAIL,
                            Name: 'FarmaSoftys',
                        },
                        To: [
                            {
                                Email: to,
                                Name: name,
                            },
                        ],
                        Subject:
                            'Solicitud de tienda registrada - Acción requerida en FarmaSoftys',
                        TextPart: `Hola ${name}, se ha registrado una solicitud para asociar una tienda a FarmaSoftys. Revisa la solicitud en: https://farmasoftys.com/solicitud-tiendas?id=${solicitud.uuid}`,
                        HTMLPart: `
                        <div style="width: 100%; background-color: #f5f5f5; padding: 30px 0;">
                            <table width="600" align="center" cellpadding="0" cellspacing="0" style="background-color: #ffffff; padding: 30px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.05); font-family: Arial, sans-serif;">
                                <tr>
                                    <td align="center" style="padding-bottom: 20px;">
                                        <img src="https://res.cloudinary.com/dlnx6im7h/image/upload/v1756988486/softys/ftdrrbthqincluwqhvro.png" alt="FarmaSoftys" width="150" style="display: block; max-width: 100%;" />
                                    </td>
                                </tr>
                                <tr>
                                    <td style="color: #333333; font-size: 16px; line-height: 1.6;">
                                        <h2 style="color: #2c3e50;">Hola ${name},</h2>
                                        <p>
                                        Se ha registrado una solicitud para asociar la siguiente tienda a FarmaSoftys. Como representante, puedes <strong>aceptar</strong> o <strong>rechazar</strong> esta solicitud.
                                        </p>

                                        <h3 style="margin-top: 30px;">🛍️ Información de la tienda</h3>

                                        <ul style="padding-left: 20px; line-height: 1.5;">
                                            <li><strong>Nombre:</strong> ${solicitud.name}</li>
                                            <li><strong>Dirección:</strong> ${solicitud.address}</li>
                                            <li><strong>RUC:</strong> ${solicitud.ruc}</li>
                                            <li><strong>Teléfono:</strong> ${solicitud.phone}</li>
                                            <li><strong>Email de contacto:</strong> ${solicitud.email}</li>
                                        </ul>

                                        <p style="margin-top: 20px;">
                                        Por favor, revisa la información y haz clic en el siguiente botón para continuar:
                                        </p>

                                        <p style="text-align: center; margin: 30px 0;">
                                            <a href="https://farmasoftys.com/solicitud-tiendas?id=${solicitud.uuid}" style="background-color: #005EB8; color: white; padding: 12px 25px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                                                Revisar Solicitud
                                            </a>
                                        </p>

                                        <p style="text-align: center; color: #888888;">
                                            Si el botón no funciona, copia y pega este enlace en tu navegador:<br />
                                            <a href="https://farmasoftys.com/solicitud-tiendas?id=${solicitud.uuid}" style="color: #005EB8;">https://farmasoftys.com/solicitud-tiendas?id=${solicitud.uuid}</a>
                                        </p>


                                        <hr style="margin: 40px 0;" />

                                        <p style="color: #999999; font-size: 14px;">
                                        ⚠️ <strong>¿No reconoces esta solicitud?</strong><br />
                                        Si no has solicitado registrar esta tienda o no estás relacionado con ella, puedes ignorar este mensaje. No se realizará ninguna acción sin tu confirmación.
                                        </p>

                                        <p style="margin-top: 30px;">
                                        Ante cualquier duda o consulta, no dudes en contactarnos.
                                        </p>

                                        <p>
                                        Atentamente,<br />
                                        <strong>FarmaSoftys</strong>
                                        </p>
                                    </td>
                                </tr>
                                <tr>
                                    <td style="text-align: center; font-size: 12px; color: #aaaaaa; padding-top: 20px;">
                                        © ${new Date().getFullYear()} FarmaSoftys. Todos los derechos reservados.
                                    </td>
                                </tr>
                            </table>
                        </div>`,
                    },
                ],
            })

        return request.body
    } catch (err) {
        logger.error(`Error al enviar correo a ${to}: ${err}`)
        throw err
    }
}

module.exports = { sendWelcomeEmail }
