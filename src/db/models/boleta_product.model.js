const { Model, DataTypes } = require('sequelize')

class BoletaProduct extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'boleta_product',
            modelName: 'BoletaProduct',
            timestamps: false,
        }
    }
}

const BoletaProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    boleta_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'boletas',
            key: 'id',
        },
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'products',
            key: 'id',
        },
    },
}

module.exports = { BoletaProduct, BoletaProductSchema }
