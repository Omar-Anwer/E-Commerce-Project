import { DataTypes, QueryInterface } from 'sequelize';

/** @type {import('sequelize-cli').Migration} */
export default {
    async up(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.createTable('UserRoles', {
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
            role: {
                type: DataTypes.STRING,
                allowNull: false,
                defaultValue: 'CUSTOMER',
            },
            customPermissions: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                defaultValue: [],
            },
        });
    },

    async down(queryInterface: QueryInterface): Promise<void> {
        await queryInterface.dropTable('UserRoles');
    },
};
