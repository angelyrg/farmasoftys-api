const { Model, DataTypes } = require('sequelize')

class Product extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'products',
            modelName: 'Product',
            timestamps: true,
            paranoid: true,
        }
    }

    static associate(models) {
        this.belongsToMany(models.Boleta, {
            through: models.BoletaProduct,
            foreignKey: 'product_id',
            otherKey: 'boleta_id',
            as: 'boletas',
        })

        this.belongsTo(models.Category, {
            foreignKey: 'category_id',
            as: 'category',
        })
    }
}

const ProductSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'categories',
            key: 'id',
        },
    },
    sector_general: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'sector_general',
    },
    sector_detallado: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'sector_detallado',
    },
    marca_detalle: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'marca_detalle',
    },
    status: {
        type: DataTypes.TINYINT,
        defaultValue: 1,
        field: 'status',
    },
    imagen_sku: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'imagen_sku',
    },
    comision: {
        allowNull: false,
        type: DataTypes.DECIMAL(10, 2),
        defaultValue: 0,
        field: 'comision',
    },
}

module.exports = { Product, ProductSchema }
