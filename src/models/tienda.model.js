const { Model, DataTypes } = require('sequelize')

class Tienda extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'tiendas',
            modelName: 'Tienda',
            timestamps: true,
        }
    }

    static associate(models) {
        this.hasMany(models.User, {
            foreignKey: 'tienda_id',
            as: 'users',
        })
    }
}

const TiendaSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ruc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: -90,
            max: 90,
        },
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: false,
        validate: {
            min: -180,
            max: 180,
        },
    },
    tienda_img: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    phone: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '1',
    },
}

module.exports = { Tienda, TiendaSchema }
