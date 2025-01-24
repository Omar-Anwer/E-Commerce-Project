import { DataTypes, Sequelize } from 'sequelize';

import sequelize from '../../config/db.connect';

const User = sequelize.define(
    'Users',
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
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
            validate: {
                isAfter: '1940-01-01',
            },
        },
        // userName: {
        //     type: DataTypes.STRING(100),
        //     unique: true,
        //     allowNull: false,
        // },
        email: {
            type: DataTypes.STRING(100),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
            },
        },

        // Indicates whether the user's email or phone is verified.
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },

        /* Audit Logging */
        // Tracks which admin or system created the user.
        createdBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        // Tracks who last updated the user.
        updatedBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },

        /* Privacy & Compliance */
        // Supports soft deletion to comply with GDPR or similar regulations.
        deletedAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },

        // Timestamp when the user gave consent to terms or privacy policies.
        consentGivenAt: {
            type: DataTypes.DATE,
            allowNull: true,
        },
    },
    {
        // createdAt: 'registeredAt',
        timestamps: true,
    }
);

export default User;
