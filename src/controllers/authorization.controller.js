const HttpStatus = require("http-status-codes");
const BaseController = require("./base.controller");
const { AuthorizationService } = require('../services');

class AuthorizationController extends BaseController {
    constructor() {
        super();
        this.AuthorizationService = new AuthorizationService();
    };

    signIn = (req, res, next) => {
        const { email, password } = req.body;
        const result = this.AuthorizationService.signIn(email, password);
        this.sendResponse(result, this, HttpStatus.OK, req, res, next);
    };

    signUp = (req, res, next) => {
        const { email, password, firstName, lastName } = req.body;
        const result = this.AuthorizationService.signUp(email, password, firstName, lastName);
        this.sendResponse(result, this, HttpStatus.CREATED, req, res, next);
    };

    signOut = (req, res, next) => {
        this.sendResponse(null, this, HttpStatus.NO_CONTENT, req, res, next);
    };
}

module.exports = new AuthorizationController();