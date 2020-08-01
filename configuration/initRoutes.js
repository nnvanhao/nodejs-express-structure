const CommonRoutes = require('../src/routes/common.routes');
const AuthorizationRoutes = require('../src/routes/authorization/authorization.routes');

exports.initRoutes = function (app) {
    CommonRoutes.routesConfig(app);
    AuthorizationRoutes.routesConfig(app);
};