const { Model, DataTypes } = require("sequelize");

const SKU_TABLE = "sku";

class Sku extends Model {
  static config(sequelize) {
    return {
      sequelize,
      tableName: SKU_TABLE,
      modelName: "Sku",
      timestamps: true,
    };
  }
}

const SkuSchema = {
  id_sku: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  sector_general: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "sector_general",
  },
  sector_detallado: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "sector_detallado",
  },
  marca_detalle: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "marca_detalle",
  },
  imagen_sku: {
    allowNull: false,
    type: DataTypes.STRING,
    field: "imagen_sku",
  },
};

module.exports = { Sku, SkuSchema };
