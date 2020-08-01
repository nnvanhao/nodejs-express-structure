const VerifyUserMiddleware = require('../../middlewares/authorization/verify.user.middleware');
const AuthorizationController = require('../../controllers/authorization/authorization.controller');
const ApiUtils = require('../../common/api/api.router');

exports.routesConfig = function (app) {
    app.post(ApiUtils.AUTH, [
        VerifyUserMiddleware.hasAuthValidFields,
        AuthorizationController.login,
    ]);

    app.post(ApiUtils.REGISTRY, [
        VerifyUserMiddleware.hasRegistryUserValidFields,
        AuthorizationController.registry,
    ]);

    app.post(ApiUtils.AUTH_REFRESH, [
        VerifyUserMiddleware.validJWTNeeded,
        VerifyUserMiddleware.verifyRefreshBodyField,
        VerifyUserMiddleware.validRefreshNeeded,
        AuthorizationController.login
    ]);

    app.post(ApiUtils.LOGOUT, [
        AuthorizationController.logout
    ]);
};