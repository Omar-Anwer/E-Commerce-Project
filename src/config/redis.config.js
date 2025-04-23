require('dotenv').config();

module.exports = {
    development: {
        url: process.env.REDIS_URL,
    },
    test: {
        url: process.env.REDIS_URL,
    },
};
