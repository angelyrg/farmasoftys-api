const { Model, DataTypes } = require('sequelize')

class Company extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'company',
            modelName: 'Company',
            timestamps: true,
        }
    }

    static associate(models) {
        Company.hasMany(models.User, { foreignKey: 'ruc' })
    }
}

const CompanySchema = {
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
}

module.exports = { Company, CompanySchema }
