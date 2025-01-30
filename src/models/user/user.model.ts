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
    id?: number;
    uuid?: string;
    firstName: string;
    lastName: string;
    birthDate: Date;
    email: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

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
        uuid: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
        },
        firstName: {
            type: DataTypes.STRING(50),
        },
        lastName: {
            type: DataTypes.STRING(50),
        },
        birthDate: {
            type: DataTypes.DATEONLY,
        },
        email: {
            type: DataTypes.STRING(100),
        },
        password: {
            type: DataTypes.STRING(255),
        },
    },
    {
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
