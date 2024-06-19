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
}

const NewsSchema = {
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
    news_type: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}

module.exports = { News, NewsSchema }
