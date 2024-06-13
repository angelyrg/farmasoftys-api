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

    static associate(models) {
        User.belongsTo(models.Company, {
            foreignKey: 'ruc',
            as: 'company',
        })
    }
}

const UserSchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
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
        type: DataTypes.STRING,
        references: {
            model: 'company',
            key: 'ruc',
        },
    },
    id_rol: {
        type: DataTypes.INTEGER,
    },
}

module.exports = { User, UserSchema }
