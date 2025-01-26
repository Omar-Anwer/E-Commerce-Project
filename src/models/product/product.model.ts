import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../config/db.connect';

const Product = sequelize.define(
    'Products',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        //   vendorId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     references: {
        //       model: 'Vendors',
        //       key: 'vendorId',
        //     },
        //     onDelete: 'SET NULL',
        //     onUpdate: 'CASCADE',
        //   },
        // categoryId: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     references: {
        //         model: 'ProductCategories',
        //         key: 'categoryId',
        //     },
        //     onDelete: 'SET NULL',
        //     onUpdate: 'CASCADE',
        // },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false,
            validate: {
                min: 0.01,
            },
        },
        stockQuantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
    },
    {
        tableName: 'products',
        underscored: true,
        timestamps: true,
        // paranoid: true,   // Adds a deletedAt
        indexes: [
            {
                unique: false,
                fields: ['name'],
            },
            {
                unique: false,
                fields: ['price'],
            },
        ],
    }
);

export default Product;
