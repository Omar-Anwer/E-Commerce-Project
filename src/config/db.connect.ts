import { Sequelize } from 'sequelize';
import logger from '../utils/logger.util';
//import dbConfig from './db.config';
const dbConfig = require('./db.config.js');

// const dbConfig = require();

// Determine the environment (default to 'development' if not set)
const env = process.env.NODE_ENV || 'development';

// Get the configuration for the current environment
const config = dbConfig[env];

// Initialize Sequelize with the configuration
const sequelize = new Sequelize(
    `${config.dialect}://${config.username}:${config.password}@${config.host}:${config.port}/${config.database}`,
    {

        logging: config.logging ? (msg) => logger.info(`Sequelize: ${msg}`) : false, // Custom logging function
        pool: config.pool, // Use the pool configuration from dbConfig
    }
);

// Test the database connection
export const dbTestConnection = async () => {
    try {
        await sequelize.authenticate();
        // await sequelize.sync(/*{ force: true }*/);
        logger.info('Database connection established successfully.');
    } catch (error) {
        logger.error('Unable to connect to the database:', error);
        throw error;
    }
};

export default sequelize;
