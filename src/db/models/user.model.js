const { Model, DataTypes } = require('sequelize')

class User extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'users',
            modelName: 'User',
            timestamps: true,
        }
    }
}

const UserSchema = {
    id_oauth: {
        type: DataTypes.STRING,
    },
    fullname: {
        type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.INTEGER,
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
    },
    clave: {
        type: DataTypes.STRING,
    },
    img_profile: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    ruc: {
        type: DataTypes.INTEGER,
    },
    id_rol: {
        type: DataTypes.INTEGER,
    },
}

module.exports = { User, UserSchema }
