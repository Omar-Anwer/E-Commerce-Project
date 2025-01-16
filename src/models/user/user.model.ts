import { DataTypes, QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable('Users', {
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
            userName: {
                type: DataTypes.STRING(100),
                unique: true,
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

            // Indicates whether the user's email or phone is verified.
            isVerified: {
                type: DataTypes.BOOLEAN,
                defaultValue: false,
                allowNull: false,
            },
            // Stores a token for email/phone verification purposes.
            verificationToken: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            //Unique API key for user-specific API access.
            apiKey: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: true,
            },

            /* Audit Logging */
            // Tracks which admin or system created the user.
            createdBy: {
                type: DataTypes.UUID,
                allowNull: true,
            },
            // Tracks who last updated the user.
            updatedBy: {
                type: DataTypes.UUID,
                allowNull: true,
            },

            createdAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
                allowNull: false,
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
        });
    },

    async down(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.dropTable('Users');
    },
};
