const ApiUtils = require('../common/api/api.router');

exports.routesConfig = function (app) {
    app.post(ApiUtils.ROOT);
};