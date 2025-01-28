import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
    Optional,
} from 'sequelize';
import sequelize from '../../config/db.connect';
import { hashPassword } from '../../utils/hash.util';

export interface User extends Model {
    id: number;
    email: string;
    password: string;
}

// Define User model attributes
// export interface UserAttributes {
//     id?: number;
//     uuid?: string;
//     firstName: string;
//     lastName: string;
//     birthDate: Date; // Use string or Date depending on your implementation
//     email: string;
//     password: string;
//     createdAt?: Date;
//     updatedAt?: Date;
// }

// Attributes required for user creation
export interface UserCreationAttributes {
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    password: string;
}

export const User = sequelize.define(
    'User',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            unique: true,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        birthDate: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [3, 100],
            },
        },
    },
    {
        // sequelize,
        tableName: 'users',
        timestamps: true, // Adds createdAt and updatedAt
        hooks: {
            beforeCreate: async (user: User) => {
                if (user.password) {
                    user.password = await hashPassword(user.password);
                }
            },
            beforeUpdate: async (user: User) => {
                if (user.changed('password')) {
                    user.password = await hashPassword(user.password);
                }
            },
        },
    }
);
