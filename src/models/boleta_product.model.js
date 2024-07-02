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
        allowNull: false,
        references: {
            model: 'boletas',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'products',
            key: 'id',
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
    },
    cantidad: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
}

module.exports = { BoletaProduct, BoletaProductSchema }
