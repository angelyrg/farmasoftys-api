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
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
    },
    image: {
        type: DataTypes.STRING,
    },
    link: {
        type: DataTypes.STRING,
    },
    link_type: {
        type: DataTypes.STRING(20),
    },
}

module.exports = { Popup, PopupSchema }
