const { Sku, SkuSchema } = require("./sku.model");

function setupModels(sequelize) {
  Sku.init(SkuSchema, Sku.config(sequelize));
}

module.exports = setupModels;
