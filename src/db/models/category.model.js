const { Model, DataTypes } = require('sequelize')

class Category extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'categories',
            modelName: 'Category',
            timestamps: true,
        }
    }

    static associate(models) {
        this.hasMany(models.Product, {
            foreignKey: 'product_id',
            as: 'products',
        })
    }
}

const CategorySchema = {
    description: {
        allowNull: false,
        type: DataTypes.STRING,
        field: 'description',
    },
}

module.exports = { Category, CategorySchema }
