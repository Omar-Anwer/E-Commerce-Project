import { DataTypes, QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable('user_addresses', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: { model: 'Users', key: 'id' },
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            },
            country: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            state: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            city: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            zipCode: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            Line1: {
                type: DataTypes.STRING(255),
                allowNull: false,
            },
            Line2: {
                type: DataTypes.STRING(255),
                allowNull: true,
            },
            isDefault: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
        });
        // Add indexes for optimized queries
        await queryInterface.addIndex('user_addresses', ['userId']);
        await queryInterface.addIndex('user_addresses', ['city']);
    },

    async down(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.dropTable('user_addresses');
    },
};
