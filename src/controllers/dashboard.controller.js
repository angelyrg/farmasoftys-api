const ProductService = require('../services/product.service')
const BoletaService = require('../services/boleta.service')
const UserService = require('../services/user.service')
const TiendaService = require('../services/tienda.service')

const product_service = new ProductService()
const boleta_service = new BoletaService()
const user_service = new UserService()
const tienda_service = new TiendaService()

const getGeneral = async (req, res) => {
    try {
        const totalProduct = await product_service.count()
        const totalBoleta = await boleta_service.count()
        const totalUser = await user_service.count()
        const totalTienda = await tienda_service.count()

        const boletasPorTiendas = await tienda_service.getBoletasByTienda()

        return res.status(200).json({
            success: true,
            code: 200,
            message: 'Success',
            data: {
                'productos': totalProduct ?? 0,
                'boletas': totalBoleta ?? 0,
                'users': totalUser ?? 0,
                'tiendas': totalTienda ?? 0,
                'boletas_por_tienda': boletasPorTiendas ?? []
            },
        })
    } catch (error) {
        console.error('Error al obtener productos.', error)
        return res.status(500).json({
            success: false,
            code: 500,
            message: 'Ha ocurrido un error en el servidor. Intente más tarde.',
        })
    }
}

module.exports = {
    getGeneral,
}
