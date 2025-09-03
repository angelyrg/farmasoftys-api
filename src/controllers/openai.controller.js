const fs = require('fs')
const path = require('path')
const openai = require('../utils/openai')
const logger = require('../utils/logger')

exports.procesarBoleta = async (req, res) => {
    const filePath = req.file?.path

    if (!filePath) {
        logger.warn('No se envió imagen en la solicitud.') // 👈
        return res.status(400).json({ error: 'No se envió imagen.' })
    }

    let fileBuffer
    try {
        fileBuffer = fs.readFileSync(filePath)
    } catch (e) {
        logger.error(`Error leyendo el archivo: ${e.message}`)
        return res.status(500).json({ error: 'No se pudo leer la imagen.' })
    }
    const base64Image = fileBuffer.toString('base64')

    const prompt = "Devuelve solo los datos en CSV (sin ningún texto adicional, sin etiquetas, sin explicaciones). Formato: nombre,cantidad,subtotal"


    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            temperature: 0, // Esto reduce la creatividad del modelo y lo fuerza a seguir instrucciones estrictas.
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: 'text', text: prompt },
                        {
                            type: 'image_url',
                            image_url: {
                                url: `data:image/jpeg;base64,${base64Image}`,
                            },
                        },
                    ],
                },
            ],
            max_tokens: 1000,
        })

        const resultado = response.choices[0].message.content

        if (!resultado) {
            logger.info('La respuesta de OpenAI está vacía o malformada.')
            return res.status(500).json({ error: 'Respuesta vacía de OpenAI.' })
        }

        res.send(resultado)
    } catch (error) {
        logger.error(`Error con OpenAI: ${error.message}`)
        res.status(500).json({ error: 'Error procesando la boleta' })
    } finally {
        try {
            fs.unlinkSync(filePath)
        } catch (err) {
            logger.warn(`No se pudo eliminar el archivo temporal: ${err.message}`) // 👈
        }
    }
}
