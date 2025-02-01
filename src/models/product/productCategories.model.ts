import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../config/db.connect';

const Categories = sequelize.define(
    'product_categories',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
    },
    {
        tableName: 'product_categories',
        underscored: true,
        timestamps: true,
        // paranoid: true,   // Adds a deletedAt
    }
);

export default Categories;
