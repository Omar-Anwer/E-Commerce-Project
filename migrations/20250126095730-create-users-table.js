// migrations/20231001120000-create-users-table.js
'use strict';

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
          id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true,
            allowNull: false,
        },
        firstName: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        lastName: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        birthDate: {
            type: Sequelize.DATEONLY,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING(100),
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true,
                notEmpty: true,
            },
        },
        password: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [8, 100],
            },
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE
        }
        });

        // Add indexes
        await queryInterface.addIndex('users', ['uuid'], { unique: true });
        await queryInterface.addIndex('users', ['firstName']); // Snake case in the database
        await queryInterface.addIndex('users', ['email'], { unique: true });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    },
};