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
            foreignKey: 'company_id',
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
    },
    company_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'companies',
            key: 'id',
        },
    },
    id_rol: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '1',
    },
}

module.exports = { User, UserSchema }
