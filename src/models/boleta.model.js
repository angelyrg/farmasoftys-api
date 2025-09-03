const { Model, DataTypes } = require('sequelize')

class Boleta extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'boletas',
            modelName: 'Boleta',
            timestamps: true,
        }
    }

    static associate(models) {
        this.belongsToMany(models.Product, {
            through: models.BoletaProduct,
            foreignKey: 'boleta_id',
            otherKey: 'product_id',
            as: 'products',
        })

        this.belongsTo(models.User, {
            foreignKey: 'user_id',
            as: 'user',
        })
    }
}

const BoletaSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    user_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'id',
        },
    },
    retiro_id: {
        allowNull: true,
        type: DataTypes.INTEGER,
        defaultValue: null,
        references: {
            model: 'retiros',
            key: 'id',
        },
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
    },
    comision_total: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
    },
    img_boleta: {
        allowNull: false,
        type: DataTypes.STRING,
    },
}

module.exports = { Boleta, BoletaSchema }
