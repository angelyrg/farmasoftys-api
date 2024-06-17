const { Model, DataTypes } = require('sequelize')

class Company extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'companies',
            modelName: 'Company',
            timestamps: true,
        }
    }

    static associate(models) {
        Company.hasMany(models.User, {
            foreignKey: 'company_id',
            as: 'users',
        })
    }
}

const CompanySchema = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ruc: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    company_adress: {
        type: DataTypes.STRING,
    },
    img_company: {
        type: DataTypes.TEXT,
    },
    company_phone: {
        type: DataTypes.INTEGER,
    },
    id_company_category: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: '1',
    },
}

module.exports = { Company, CompanySchema }
