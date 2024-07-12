const { Model, DataTypes } = require('sequelize')

class News extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'news',
            modelName: 'News',
            timestamps: true,
        }
    }
    static associate(models) {
        this.belongsTo(models.NewsCategory, {
            foreignKey: 'news_category_id',
            as: 'category',
        })
    }
}

const NewsSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
    },
    news_category_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'news_categories',
            key: 'id',
        },
    },
    title: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    image: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    link_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

module.exports = { News, NewsSchema }
