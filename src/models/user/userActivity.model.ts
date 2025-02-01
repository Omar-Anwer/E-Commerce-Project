import { DataTypes, QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable('UserActivity', {
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
            lastLogin: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            lastActivityAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            status: {
                type: DataTypes.ENUM('ACTIVE', 'IDLE', 'LOCKED'),
                allowNull: false,
            },
        });
    },

    async down(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.dropTable('UserActivity');
    },
};
