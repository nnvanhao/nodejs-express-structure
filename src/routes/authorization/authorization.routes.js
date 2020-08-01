const VerifyUserMiddleware = require('../../middlewares/authorization/verify.user.middleware');
const AuthorizationController = require('../../controllers/authorization/authorization.controller');
const ApiUtils = require('../../common/api/api.router');

exports.routesConfig = function (app) {
    /**
      * @swagger
      * /auth:
      *   post:
      *     tags:
      *       - Auth
      *     produces:
      *       - application/json
      *     parameters:
      *     - name: body
      *       in: body
      *       description: Sign in using email and password
      *       required: true
      *       schema:
      *         type: object
      *         required:
      *           - email
      *           - password
      *         properties:
      *           email:
      *             type: string
      *           password:
      *             type: string
      *     responses:
      *       200:
      *         description: Sign in successful
      */
    app.post(ApiUtils.AUTH, [
        VerifyUserMiddleware.hasAuthValidFields,
        AuthorizationController.signIn,
    ]);

    /**
      * @swagger
      * /signup:
      *   post:
      *     tags:
      *       - Auth
      *     produces:
      *       - application/json
      *     parameters:
      *     - name: body
      *       in: body
      *       description: Sign up using email, firstName, lastName, password
      *       required: true
      *       schema:
      *         type: object
      *         required:
      *           - email
      *           - firstName
      *           - lastName
      *           - password
      *         properties:
      *           email:
      *             type: string
      *           firstName:
      *             type: string
      *           lastName:
      *             type: string
      *           password:
      *             type: string
      *     responses:
      *       201:
      *         description: Sign up successful
      */
    app.post(ApiUtils.SIGN_UP, [
        VerifyUserMiddleware.hasRegistryUserValidFields,
        AuthorizationController.signUp,
    ]);

    app.post(ApiUtils.AUTH_REFRESH, [
        VerifyUserMiddleware.validJWTNeeded,
        VerifyUserMiddleware.verifyRefreshBodyField,
        VerifyUserMiddleware.validRefreshNeeded,
        AuthorizationController.signIn,
    ]);

    /**
      * @swagger
      * /signout:
      *   post:
      *     tags:
      *       - Auth
      *     produces:
      *       - application/json
      *     parameters:
      *     - name: fcmToken
      *       in: header
      *       description: fire base cloud messaging token
      *       required: true
      *       type: string
      *     responses:
      *       201:
      *         description: Sign in successful
      */
    app.post(ApiUtils.SIGN_OUT, [
        AuthorizationController.signOut,
    ]);
};