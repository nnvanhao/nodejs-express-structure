const BaseService = require('./base.service');
const { getToken, getRefreshToken } = require("../helpers/token.helper");
const { buildErrorItem } = require('../helpers/error.helper');
const HttpStatus = require("http-status-codes");
const Message = require('../common/constants/message.constant');

class AuthorizationService extends BaseService {
    constructor() {
        super();
    }

    signIn = (email, password) => {
        const isTrue = true;
        const userId = '';

        if (!isTrue) {
            const errorItem = buildErrorItem(this.signIn.name, null, HttpStatus.BAD_REQUEST, Message.INTERNAL_SERVER_ERROR, null);
            return errorItem;
        }
        const token = getToken(email, password);
        const refreshToken = getRefreshToken(userId);

        const signInData = {
            token,
            refreshToken,
        };

        return signInData;
    };

    signUp = (email, password, firstName, lastName) => {
        const isTrue = true;
        const userId = '';
        const userInfo = {
            firstName: '',
            lastName: '',
            email: '',
        };

        if (isTrue) {
            return buildErrorItem(this.signUp.name, null, HttpStatus.BAD_REQUEST, Message.INTERNAL_SERVER_ERROR, null);
        }
        const token = getToken(email, password);
        const refreshToken = getRefreshToken(userId);

        const signUpData = {
            token,
            refreshToken,
            userInfo,
        };

        return signUpData;
    };
}

module.exports = AuthorizationService;