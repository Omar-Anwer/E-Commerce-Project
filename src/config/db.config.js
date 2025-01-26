require('dotenv').config();


module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: true,
        pool: {
            max: 10, // Maximum number of connections in the pool
            min: 0, // Minimum number of connections in the pool
            acquire: 30000, // Maximum time (in ms) to acquire a connection
            idle: 10000, // Maximum time (in ms) a connection can be idle
        },
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT,
        database: process.env.DB_TEST_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        logging: true,
    },
};

// import dotenv from 'dotenv';
// dotenv.config();

// module.exports = {
//     development: {
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         port: process.env.DB_PORT,
//         database: process.env.DB_NAME,
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_DIALECT,
//         logging: true, // Enable logging in development mode
//         pool: {
//             max: 10, // Maximum number of connections in the pool
//             min: 0, // Minimum number of connections in the pool
//             acquire: 30000, // Maximum time (in ms) to acquire a connection
//             idle: 10000, // Maximum time (in ms) a connection can be idle
//         },
//     },
//     test: {
//         username: process.env.DB_USERNAME,
//         password: process.env.DB_PASSWORD,
//         port: process.env.DB_PORT,
//         database: process.env.DB_TEST_NAME,
//         host: process.env.DB_HOST,
//         dialect: process.env.DB_DIALECT,
//         logging: true, // Enable logging in test mode
//     },
// };

// import dotenv from 'dotenv';
// import { Dialect } from 'sequelize';

// dotenv.config();

// // Define the database configuration interface
// interface DatabaseConfig {
//     dialect: string;
//     host: string;
//     port: number;
//     username: string;
//     password: string;
//     database: string;
//     logging?: boolean | ((msg: string) => void);
//     pool?: {
//         max: number;
//         min: number;
//         acquire: number;
//         idle: number;
//     };
// }

// // Load environment variables
// const {
//     NODE_ENV,
//     DB_HOST,
//     DB_PORT,
//     DB_USERNAME,
//     DB_PASSWORD,
//     DB_DIALECT,
//     DB_NAME,
//     DB_TEST_NAME,
// } = process.env;

// // Shared settings for Sequelize configurations
// const sharedConfig = {
//     dialect: (process.env.DB_DIALECT as Dialect) || 'postgres',
//     port: process.env.DB_PORT || 5432,
//     host: process.env.DB_HOST || 'localhost',
//     dialectOptions: {
//         charset: 'utf8',
//     },
//     define: {
//         timestamps: true, // Enable timestamps by default for all tables
//     },
//         pool: {
//         max: 10, // Maximum number of connections in the pool
//         min: 0, // Minimum number of connections in the pool
//         acquire: 30000, // Maximum time (in ms) to acquire a connection
//         idle: 10000, // Maximum time (in ms) a connection can be idle
//     },
// };

// const config = {
//     development: {
//         ...sharedConfig,
//         username: process.env.DB_USERNAME || 'dev_user',
//         password: process.env.DB_PASSWORD || 'dev_password',
//         database: process.env.DB_NAME || 'dev_database',
//         logging: true, // Enable logging in development mode
//     },
//     test: {
//         ...sharedConfig,
//         username: process.env.DB_USERNAME || 'test_user',
//         password: process.env.DB_PASSWORD || 'test_password',
//         database: process.env.DB_TEST_NAME || 'test_database',
//         logging: false, // Disable logging in test mode
//     },
//     production: {
//         ...sharedConfig,
//         username: process.env.DB_USERNAME || 'prod_user',
//         password: process.env.DB_PASSWORD || 'prod_password',
//         database: process.env.DB_PROD_NAME || 'prod_database',
//         dialectOptions: {
//             ...sharedConfig.dialectOptions,
//             multipleStatements: true, // Allow multiple statements in production
//         },
//         logging: false, // Disable logging in production
//     },
// };

// // // Define the database configuration
// // const dbConfig: DatabaseConfig = {
// //     dialect: DB_DIALECT,
// //     host: DB_HOST,
// //     port: parseInt(DB_PORT, 10),
// //     username: DB_USERNAME,
// //     password: DB_PASSWORD,
// //     database: databaseName, // Dynamically set based on the environment
// //     logging: true, // Enable logging by default
// //     pool: {
// //         max: 10, // Maximum number of connections in the pool
// //         min: 0, // Minimum number of connections in the pool
// //         acquire: 30000, // Maximum time (in ms) to acquire a connection
// //         idle: 10000, // Maximum time (in ms) a connection can be idle
// //     },
// // };

// const dbConfig = config.development;

// console.log(dbConfig);

// export default dbConfig;
