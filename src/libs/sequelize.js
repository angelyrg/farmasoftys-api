const { Sequelize } = require('sequelize')

const { config } = require('./../config/config')
const setupModels = require('../models_new')

const sequelize = new Sequelize(
    config.dbName,
    config.dbUser,
    config.dbPassword,
    {
        host: config.dbHost,
        dialect: config.dbDialect,
        port: config.dbPort,
    },
)

//sequelize.sync()
setupModels(sequelize)

module.exports = { sequelize, models: sequelize.models }
