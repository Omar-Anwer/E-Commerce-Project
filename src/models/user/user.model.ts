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
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [8, 100],
            },
        },
        // isVerified: {
        //     type: DataTypes.BOOLEAN,
        //     defaultValue: false,
        //     allowNull: false,
        // },
        // createdBy: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     comment: "Stores the user ID or some identifier of the user who created the record."
        // },
        // updatedBy: {
        //     type: DataTypes.INTEGER,
        //     allowNull: true,
        //     comment: "Stores the user ID or some identifier of the user who updated the record."
        // },
        // consentGivenAt: {
        //     type: DataTypes.DATE,
        //     allowNull: true,
        // },
    },
    {
        tableName: 'users',
        //underscored: true,
        timestamps: true, // Adds createdAt and updatedAt
        // paranoid: true,   // Adds a deletedAt
        hooks: {
            beforeCreate: async (user: UserModel) => {
                if (user.password) {
                    user.password = await hashPassword(user.password);
                }
            },
            beforeUpdate: async (user: UserModel) => {
                if (user.changed('password')) {
                    user.password = await hashPassword(user.password);
                }
            },
        },
        indexes: [
            {
                fields: ['uuid'],
                unique: true,
            },
            {
                fields: ['firstName'],
            },
            {
                unique: true,
                fields: ['email'],
            },
        ],
    }
);
