const fs = require('fs')
const path = require('path')
const openai = require('../utils/openai')

exports.procesarBoleta = async (req, res) => {
    const filePath = req.file?.path

    if (!filePath) {
        return res.status(400).json({ error: 'No se envió imagen.' })
    }

    const fileBuffer = fs.readFileSync(filePath)
    const base64Image = fileBuffer.toString('base64')

    const prompt = `
        Extrae todos los productos de la boleta (nombre, cantidad, total por ítem) y devuelve en formato json.
        `

    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
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

        res.json({ resultado })
    } catch (error) {
        console.error('Error con OpenAI:', error.message)
        res.status(500).json({ error: 'Error procesando la boleta' })
    } finally {
        fs.unlinkSync(filePath)
    }
}
