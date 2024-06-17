const { Sequelize } = require('sequelize')

const { config } = require('./../config/config')
const setupModels = require('./../db/models')

const sequelize = new Sequelize(
    config.dbName,
    config.dbUser,
    config.dbPassword,
    {
        host: config.dbHost,
        dialect: config.dbDialect,
    },
)

sequelize.sync({ force: true })
setupModels(sequelize)

module.exports = { sequelize, models: sequelize.models }
