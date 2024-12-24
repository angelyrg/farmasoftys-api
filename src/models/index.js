const { Boleta, BoletaSchema } = require('./boleta.model')
const { Tienda, TiendaSchema } = require('./tienda.model')
const { User, UserSchema } = require('./user.model')
const { Product, ProductSchema } = require('./product.model')
const { BoletaProduct, BoletaProductSchema } = require('./boleta_product.model')
const { Category, CategorySchema } = require('./category.model')
const { NewsCategory, NewsCategorySchema } = require('./news_category.model')
const { News, NewsSchema } = require('./news.model')
const { Popup, PopupSchema } = require('./popup.model')
const { TiendasRegistrosSolicitudes, TiendasRegistroSolicitudesSchema } = require('./tienda_registro_solicitudes.model')

function setupModels(sequelize) {
    Tienda.init(TiendaSchema, Tienda.config(sequelize))
    Category.init(CategorySchema, Category.config(sequelize))
    NewsCategory.init(NewsCategorySchema, NewsCategory.config(sequelize))
    User.init(UserSchema, User.config(sequelize))
    Product.init(ProductSchema, Product.config(sequelize))
    Boleta.init(BoletaSchema, Boleta.config(sequelize))
    BoletaProduct.init(BoletaProductSchema, BoletaProduct.config(sequelize))
    News.init(NewsSchema, News.config(sequelize))
    Popup.init(PopupSchema, Popup.config(sequelize))
    TiendasRegistrosSolicitudes.init(TiendasRegistroSolicitudesSchema, TiendasRegistrosSolicitudes.config(sequelize))

    Tienda.associate(sequelize.models)
    User.associate(sequelize.models)
    Boleta.associate(sequelize.models)
    Product.associate(sequelize.models)
    News.associate(sequelize.models)
    NewsCategory.associate(sequelize.models)
}

module.exports = setupModels
