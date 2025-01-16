import dotenv from 'dotenv';

dotenv.config();

module.exports = {
    development: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        // dialectOptions: {
        //     charset: "utf8",
        // },
        // define: {
        //     timestamps: false,
        // },
    },
    test: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_TEST_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        // dialectOptions: {
        //     charset: "utf8",
        // },
        // define: {
        //     timestamps: false,
        // },
    },
    production: {
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_PROD_NAME,
        host: process.env.DB_HOST,
        dialect: process.env.DB_DIALECT,
        // dialectOptions: {
        //     charset: "utf8",
        //     multipleStatements: true,
        // },
        // logging: false,
        // define: {
        //     timestamps: false,
        // },
    },
};
