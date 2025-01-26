import { DataTypes } from 'sequelize';

import sequelize from '../../config/db.connect';

export const UserCredentials = sequelize.define('userCredentials', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        references: { model: 'Users', key: 'id' },
        onDelete: 'CASCADE',
        allowNull: false,
    },
    salt: {
        type: DataTypes.STRING,
        allowNull: false,
    },

    /* Tokens */
    accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isRevoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
    },
    verificationToken: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Stores a token for email/phone verification purposes.',
    },
    /*Account Recovery*/
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'Stores a token for password reset purposes.',
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    failedLoginAttempts: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        allowNull: false,
        comment:
            'Stores the number of failed login attempts for account lockout policies.',
    },
    passwordChangedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        comment:
            'Stores the timestamp of the last password update to invalidate tokens issued before this time.',
    },
    twoFactorEnabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false,
    },
    twoFactorSecret: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    apiKey: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
        comment: 'Stores a unique API key for user-specific API access.',
    },
});

export default UserCredentials;

// import { DataTypes, QueryInterface } from 'sequelize';

// /** @type {import('sequelize-cli').Migration} */
// export default {
//     async up(queryInterface: QueryInterface): Promise<void> {
//         await queryInterface.createTable('UserCredentials', {
//             id: {
//                 type: DataTypes.INTEGER,
//                 autoIncrement: true,
//                 primaryKey: true,
//                 allowNull: false,
//             },
//             userId: {
//                 type: DataTypes.INTEGER,
//                 references: { model: 'Users', key: 'id' },
//                 onDelete: 'CASCADE',
//                 allowNull: false,
//             },
//             password: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },

//             /*Account Recovery*/
//             resetPasswordToken: {
//                 type: DataTypes.STRING,
//                 allowNull: true,
//             },
//             resetPasswordExpires: {
//                 type: DataTypes.DATE,
//                 allowNull: true,
//             },
//             // Tracks the number of failed login attempts for account lockout policies.
//             failedLoginAttempts: {
//                 type: DataTypes.INTEGER,
//                 defaultValue: 0,
//                 allowNull: false,
//             },
//             // Timestamp of the last password update to invalidate tokens issued before this time.
//             passwordChangedAt: {
//                 type: DataTypes.DATE,
//                 allowNull: true,
//             },
//             twoFactorEnabled: {
//                 type: DataTypes.BOOLEAN,
//                 defaultValue: false,
//                 allowNull: false,
//             },
//             twoFactorSecret: {
//                 type: DataTypes.STRING,
//                 allowNull: true,
//             },
//         });
//     },
//     async down(queryInterface: QueryInterface): Promise<void> {
//         await queryInterface.dropTable('UserCredentials');
//     },
// };
