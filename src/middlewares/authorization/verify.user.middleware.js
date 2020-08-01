const crypto = require('crypto');
const config = require('../../config');
const jwt = require('jsonwebtoken');
const Message = require('../../common/constants/message.constant');
const {buildErrorItem} = require('../../helpers/error.helper');
const {sendErrorResponse} = require('../../core/base/error.base');
const HttpStatus = require('http-status-codes');

exports.hasAuthValidFields = (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email || !req.body.password) {
            errors.push(Message.MISSING_EMAIL_PASSWORD_FIELDS);
        }

        if (errors.length) {
            const errorItem = buildErrorItem('hasAuthValidFields', null, HttpStatus.BAD_REQUEST, errors, null);
            sendErrorResponse(errorItem, req, res, next);
        } else {
            return next();
        }
    }
};

exports.hasRegistryUserValidFields = async (req, res, next) => {
    let errors = [];

    if (req.body) {
        if (!req.body.email) {
            errors.push(Message.MISSING_EMAIL_FIELDS);
        }
        if (!req.body.password) {
            errors.push(Message.MISSING_PASSWORD_FIELDS);
        }

        if (errors.length) {
            const errorItem = buildErrorItem('hasRegistryUserValidFields', null, HttpStatus.BAD_REQUEST, errors, null);
            sendErrorResponse(errorItem, req, res, next);
        } else {
            return next();
        }
    }
};

exports.verifyRefreshBodyField = (req, res, next) => {
    if (!req.body || !req.body.refresh_token) {
        const errorItem = buildErrorItem('verifyRefreshBodyField', null, HttpStatus.BAD_REQUEST, Message.REFRESH_TOKEN_FIELD, null);
        sendErrorResponse(errorItem, req, res, next);
    } else {
        return next();
    }
};

exports.validJWTNeeded = (req, res, next) => {
    if (req.headers['authorization']) {
        try {
            let authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                const errorItem = buildErrorItem('validJWTNeeded', null, HttpStatus.UNAUTHORIZED, Message.UNAUTHORIZED, null);
                sendErrorResponse(errorItem, req, res, next);
            } else {
                req.jwt = jwt.verify(authorization[1], config.jwt_secret);
                return next();
            }

        } catch (err) {
            const errorItem = buildErrorItem('validJWTNeeded', null, HttpStatus.FORBIDDEN, Message.FORBIDDEN, null);
            sendErrorResponse(errorItem, req, res, next);
        }
    } else {
        const errorItem = buildErrorItem('validJWTNeeded', null, HttpStatus.UNAUTHORIZED, Message.UNAUTHORIZED, null);
        sendErrorResponse(errorItem, req, res, next);
    }
};

exports.validRefreshNeeded = (req, res, next) => {
    let b = new Buffer(req.body.refresh_token, 'base64');
    let refresh_token = b.toString();
    let hash = crypto.createHmac('sha512', req.jwt.refreshKey).update(req.jwt.userId + config.jwt_secret).digest("base64");
    if (hash === refresh_token) {
        req.body = req.jwt;
        return next();
    } else {
        const errorItem = buildErrorItem('validRefreshNeeded', null, HttpStatus.UNAUTHORIZED, Message.UNAUTHORIZED, null);
        sendErrorResponse(errorItem, req, res, next);
    }
};