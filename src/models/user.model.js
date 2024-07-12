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
        User.belongsTo(models.Tienda, {
            foreignKey: 'tienda_id',
            as: 'tienda',
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
        type: DataTypes.STRING(12),
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
    tienda_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'tiendas',
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
