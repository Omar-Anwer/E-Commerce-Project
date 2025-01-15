import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import logger from '../utils/logger.util';

dotenv.config();
const {
    NODE_ENV,
    DB_HOST,
    DB_PORT,
    DB_USERNAME,
    DB_PASSWORD,
    DB_DIALECT,
    DB_NAME,
    DB_TEST_NAME,
} = process.env;

const databaseName = NODE_ENV == 'test' ? DB_TEST_NAME : DB_NAME;

// const sequelize = new Sequelize(
//     String(databaseName),
//     String(DB_USERNAME),
//     String(DB_PASSWORD),
//     {
//         dialect: DB_DIALECT as Dialect,
//         host: String(DB_HOST),
//         logging: (msg) => logger.info(`Sequelize: ${msg}`),
//     }
// );

const sequelize = new Sequelize(
    `${DB_DIALECT}://${DB_USERNAME}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${databaseName}`,
    {
        logging: (msg) => logger.info(msg),
    }
);

export default sequelize;
