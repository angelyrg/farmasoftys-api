const { Sku, SkuSchema } = require('./sku.model')
const { Boleta, BoletaSchema } = require('./boleta.model')
const { Company, CompanySchema } = require('./company.model')
const { User, UserSchema } = require('./user.model')
const { Popup, PopupSchema } = require('./popup.model')

function setupModels(sequelize) {
    Sku.init(SkuSchema, Sku.config(sequelize))
    Boleta.init(BoletaSchema, Boleta.config(sequelize))
    Company.init(CompanySchema, Company.config(sequelize))
    User.init(UserSchema, User.config(sequelize))
    Popup.init(PopupSchema, Popup.config(sequelize))

    Company.associate(sequelize.models)
    User.associate(sequelize.models)
}

module.exports = setupModels
