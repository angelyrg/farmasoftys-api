const { Model, DataTypes } = require('sequelize')

class Popup extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'popups',
            modelName: 'Popup',
            timestamps: true,
        }
    }
}

const PopupSchema = {
    nombre: {
        type: DataTypes.STRING,
    },
    img_popup: {
        type: DataTypes.TEXT,
    },
    descripcion: {
        type: DataTypes.STRING,
    },
    url: {
        type: DataTypes.STRING,
    },
    vigencia: {
        type: DataTypes.INTEGER,
    },
    type_popup: {
        type: DataTypes.TINYINT,
    },
}

module.exports = { Popup, PopupSchema }
