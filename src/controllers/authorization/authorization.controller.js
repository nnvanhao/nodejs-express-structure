const TokenHelper = require('../../helpers/token.helper');
const BaseController = require('../base.controller');
const HttpStatus = require('http-status-codes');

class AuthorizationController extends BaseController {
    constructor() {
        super();
        this.login = this.login.bind(this);
        this.registry = this.registry.bind(this);
        this.logout = this.logout.bind(this);
    }

    login(req, res, next) {
        const token = TokenHelper.getToken(req);
        const refreshToken = TokenHelper.getRefreshToken(req);

        const authData = {
            accessToken: token,
            refreshToken: refreshToken,
        };

        this.sendResponse(authData, AuthorizationController, HttpStatus.OK, req, res, next);
    }

    registry(req, res, next) {
        const token = TokenHelper.getToken(req);
        const refreshToken = TokenHelper.getRefreshToken(req);

        const authData = {
            accessToken: token,
            refreshToken: refreshToken,
        };
        
        this.sendResponse(authData, null, HttpStatus.CREATED, req, res, next);
    };

    logout(req, res, next) {
        this.sendResponse(null, null, HttpStatus.NO_CONTENT, req, res, next);
    };
}

module.exports = new AuthorizationController();