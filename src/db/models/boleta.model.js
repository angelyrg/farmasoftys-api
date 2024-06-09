const { Model, DataTypes } = require('sequelize')

class Boleta extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'boleta',
            modelName: 'Boleta',
            timestamps: true,
        }
    }
}

const BoletaSchema = {
    id_usuario: {
        allowNull: false,
        type: DataTypes.INTEGER,
    },
    img_boleta: {
        allowNull: false,
        type: DataTypes.TEXT,
    },
    product_id: {
        type: DataTypes.INTEGER,
    },
}

module.exports = { Boleta, BoletaSchema }
