import { DataTypes, Sequelize } from 'sequelize';
import sequelize from '../../config/db.connect';

const Product = sequelize.define(
    'Products',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
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
        categoryId: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: 'ProductCategories',
                key: 'categoryId',
            },
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
        },
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        timestamps: true,
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
