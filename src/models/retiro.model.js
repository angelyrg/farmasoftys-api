const { Model, DataTypes } = require('sequelize')

const { RETIRO_STATUS } = require('../constants/retiro.constant')


class Retiro extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'retiros',
            modelName: 'Retiro',
            timestamps: true,
        }
    }

    static associate(models) {
        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        })

        this.hasMany(models.Boleta, {
            foreignKey: 'retiro_id',
            as: 'boletas',
        })
    }
}

const RetiroSchema = {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    request_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    requested_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0,
    },
    payment_date: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: null,
    },
    paid_amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true,
        defaultValue: null,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: RETIRO_STATUS.PENDIENTE,
    },
}

module.exports = { Retiro, RetiroSchema }
