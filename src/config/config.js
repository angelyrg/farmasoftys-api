require("dotenv").config();

const config = {
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USERNAME,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_DATABASE,
  dbPort: process.env.DB_PORT,
  dbDialect: process.env.DB_DIALECT,
};

module.exports = { config };
