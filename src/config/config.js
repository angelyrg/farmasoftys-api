require('dotenv').config()

const config = {
    port: process.env.PORT || 3000,
    dbHost: process.env.DB_HOST,
    dbUser: process.env.DB_USERNAME,
    dbPassword: process.env.DB_PASSWORD,
    dbName: process.env.DB_DATABASE,
    dbPort: process.env.DB_PORT,
    dbDialect: process.env.DB_DIALECT,
}

const sequelizeConfig = {
    development: {
        username: config.dbUser,
        password: config.dbPassword,
        database: config.dbName,
        host: config.dbHost,
        port: config.dbPort,
        dialect: config.dbDialect,
    },
    test: {
        username: config.dbUser,
        password: config.dbPassword,
        database: config.dbName,
        host: config.dbHost,
        port: config.dbPort,
        dialect: config.dbDialect,
    },
    production: {
        username: config.dbUser,
        password: config.dbPassword,
        database: config.dbName,
        host: config.dbHost,
        port: config.dbPort,
        dialect: config.dbDialect,
    },
}

module.exports = { config, sequelizeConfig }
