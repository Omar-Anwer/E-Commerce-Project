import { DataTypes, Model, Sequelize } from 'sequelize';
import sequelize from '../../config/db.connect';

export interface Product extends Model {
    id?: number | string;
    uuid?: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    images: string[];
    isPublished: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}

// Attributes required for user creation
export interface ProductCreationAttributes {
    name: string;
    description: string;
    price: number;
    quantity?: number;
    images?: string[];
}

export const Product = sequelize.define(
    'Product',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        uid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
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
            type: DataTypes.DECIMAL(10, 2).UNSIGNED,
            allowNull: false,
            validate: {
                min: 0.01,
            },
        },
        quantity: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            validate: {
                min: 0,
            },
        },
        images: {
            type: DataTypes.ARRAY(DataTypes.STRING),
            allowNull: true,
        },
        condition: {
            type: DataTypes.ENUM('new', 'used', 'refurbished'),
            defaultValue: 'new',
            allowNull: false,
        },
        isPublished: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        avgRating: {
            type: DataTypes.FLOAT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
            validate: {
                min: 0,
                max: 5,
            },
        },
        totalReviews: {
            type: DataTypes.BIGINT.UNSIGNED,
            allowNull: false,
            defaultValue: 0,
        },
    },
    {
        tableName: 'products',
        timestamps: true,
        // paranoid: true,   // Adds a deletedAt
    }
);
