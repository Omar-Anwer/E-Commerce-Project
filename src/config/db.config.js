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
