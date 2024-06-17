const { Boleta, BoletaSchema } = require('./boleta.model')
const { Company, CompanySchema } = require('./company.model')
const { User, UserSchema } = require('./user.model')
// const { Popup, PopupSchema } = require('./popup.model')
const { Product, ProductSchema } = require('./product.model')
const { BoletaProduct, BoletaProductSchema } = require('./boleta_product.model')

function setupModels(sequelize) {
    Company.init(CompanySchema, Company.config(sequelize))
    User.init(UserSchema, User.config(sequelize))
    Product.init(ProductSchema, Product.config(sequelize))
    // Popup.init(PopupSchema, Popup.config(sequelize))
    Boleta.init(BoletaSchema, Boleta.config(sequelize))
    BoletaProduct.init(BoletaProductSchema, BoletaProduct.config(sequelize))

    Company.associate(sequelize.models)
    User.associate(sequelize.models)
    Boleta.associate(sequelize.models)
    Product.associate(sequelize.models)
}

module.exports = setupModels
