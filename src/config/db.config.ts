import { Dialect } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// Shared settings for Sequelize configurations
const sharedConfig = {
    dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
    host: process.env.DB_HOST || 'localhost',
    dialectOptions: {
        charset: 'utf8',
    },
    define: {
        timestamps: true, // Enable timestamps by default for all tables
    },
};

module.exports = {
    development: {
        ...sharedConfig,
        username: process.env.DB_USERNAME || 'dev_user',
        password: process.env.DB_PASSWORD || 'dev_password',
        database: process.env.DB_NAME || 'dev_database',
        logging: true, // Enable logging in development mode
    },
    test: {
        ...sharedConfig,
        username: process.env.DB_USERNAME || 'test_user',
        password: process.env.DB_PASSWORD || 'test_password',
        database: process.env.DB_TEST_NAME || 'test_database',
        logging: false, // Disable logging in test mode
    },
    production: {
        ...sharedConfig,
        username: process.env.DB_USERNAME || 'prod_user',
        password: process.env.DB_PASSWORD || 'prod_password',
        database: process.env.DB_PROD_NAME || 'prod_database',
        dialectOptions: {
            ...sharedConfig.dialectOptions,
            multipleStatements: true, // Allow multiple statements in production
        },
        logging: false, // Disable logging in production
    },
};
