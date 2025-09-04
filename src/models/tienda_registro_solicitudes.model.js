const { Model, DataTypes } = require('sequelize')

const { TIENDA_REGISTRO_STATUS } = require('../constants/tienda_registros.constant')

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
     uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
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
    ruc: {
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: TIENDA_REGISTRO_STATUS.CREADA,
    },
}

module.exports = {
    TiendasRegistrosSolicitudes,
    TiendasRegistroSolicitudesSchema,
}
