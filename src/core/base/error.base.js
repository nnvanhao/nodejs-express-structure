const ResponseSerializer = require('../utils/responseSerializer.util');
const ErrorCode = require('../../common/constants/errorCode.constant');
const Logger = require('../../helpers/logger.helper');
const logger = new Logger();

const sendErrorResponse = (errorItem, req, res, next, err = null) => {
    logger.log(`Error during processing request: ${`${req.protocol}://${req.get('host')}${req.originalUrl}`} details message: ${err}`, 'error');
    try {
        const response = ResponseSerializer.errorResponse(errorItem);
        res.status(errorItem.code).send(response);
    } catch (err) {
        if (err.code === 'ER_ROW_IS_REFERENCED_2') {
            next(ErrorCode.SYSTEM_SETTINGS.SYSTEM_SETTINGS_VALIDATION_FAILED);
        } else {
            next(err);
        }
    }
}

module.exports = { sendErrorResponse };
