const ApiUtils = require('../common/api/api.router');
const CommonController = require('../controllers/common.controller');

exports.routesConfig = function (app) {
    app.get(ApiUtils.ROOT, [
        CommonController.accessRoot,
    ]);
};