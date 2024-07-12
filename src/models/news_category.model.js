const { Model, DataTypes } = require('sequelize')

class NewsCategory extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'news_categories',
            modelName: 'NewsCategory',
            timestamps: true,
        }
    }

    static associate(models) {
        this.hasMany(models.News, {
            foreignKey: 'news_category_id',
            as: 'news',
        })
    }
}

const NewsCategorySchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}

module.exports = { NewsCategory, NewsCategorySchema }
