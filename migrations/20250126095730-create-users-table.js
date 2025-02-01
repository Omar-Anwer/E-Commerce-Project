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
        uid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4,
            unique: true,
            allowNull: false,
        },
        first_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        last_name: {
            type: Sequelize.STRING(50),
            allowNull: false,
        },
        birth_date: {
            type: Sequelize.DATEONLY,
            allowNull: false,
            validate: {
                isDate: true,
            },
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
            type: Sequelize.STRING(255),
            allowNull: false,
            validate: {
                len: [8, 100],
            },
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')

        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')

        }
        });

        // Add constraints
        await queryInterface.sequelize.query(`
            ALTER TABLE users 
            ADD CONSTRAINT birth_date_valid CHECK ("birth_date" BETWEEN '1950-01-01' AND CURRENT_DATE);
        `);

        // Add indexes
        await queryInterface.addIndex('users', ['uid'], { unique: true });
        await queryInterface.addIndex('users', ['email'], { unique: true });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    },
};