const Sequalize = require("sequelize");
const config = require('../../config');
const { LOGGER_TYPE } = require('../../common/constants/common.constant');
const Logger = require('../../../src/helpers/logger.helper');
const logger = new Logger();
let count = 0;

const sequelize = new Sequalize(
    config.DATABASE.MYSQL_DATABASE,
    config.DATABASE.USERNAME,
    config.DATABASE.PASSWORD, {
    host: config.DATABASE.MYSQL_HOST,
    dialect: "mysql",
    define: {
        timestamps: false
    },
    logging: false,
}
);

async function connect() {
    try {
        await sequelize.authenticate();
    } catch (error) {
        logger.log(`MySQL connect unsuccessful, retry after 3 seconds at: ${new Date()}`, LOGGER_TYPE.ERROR);
        ++count;
        setTimeout(connect, 3000);
    }
}

module.exports = { connect };
global.sequelize = sequelize;
