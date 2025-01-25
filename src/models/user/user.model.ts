import {
    DataTypes,
    InferAttributes,
    InferCreationAttributes,
    Model,
} from 'sequelize';
import sequelize from '../../config/db.connect';
import { hashPassword } from '../../utils/hash.util';

export interface UserModel
    extends Model<
        InferAttributes<UserModel>,
        InferCreationAttributes<UserModel>
    > {
    id: string;
    uuid: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    email: string;
    password: string;
    // isVerified?: boolean;
    // createdBy?: number;
    // updatedBy?: number;
    // deletedAt?: Date | null;
    // consentGivenAt?: Date | null;
}

export const User = sequelize.define<UserModel>(
    'Users',
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
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // isVerified: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        //     allowNull: false,
        // },
        // createdBy: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
        // updatedBy: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        // },
        // deletedAt: {
        //     type: DataTypes.DATE,
        //     allowNull: true,
        // },
        // consentGivenAt: {
        //     type: DataTypes.DATE,
        //     allowNull: true,
        // },
    },
    {
        timestamps: true,
        paranoid: true, // Enables soft delete
        tableName: 'users',
        hooks: {
            beforeCreate: async (user) => {
                if (user.password) {
                    user.password = await hashPassword(user.password);
                }
            },
            beforeUpdate: async (user) => {
                if (user.changed('password')) {
                    user.password = await hashPassword(user.password);
                }
            },
        },
    }
);
