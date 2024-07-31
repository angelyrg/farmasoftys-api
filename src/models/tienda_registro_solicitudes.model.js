const { Model, DataTypes } = require('sequelize')

class TiendasRegistrosSolicitudes extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'tiendas_registro_solicitudes',
            modelName: 'TiendasRegistrosSolicitudes',
            timestamps: true,
        }
    }
}

const TiendasRegistroSolicitudesSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    manager_name: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phone: {
        type: DataTypes.STRING(12),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
}

module.exports = { TiendasRegistrosSolicitudes, TiendasRegistroSolicitudesSchema }
