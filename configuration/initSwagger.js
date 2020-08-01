const swaggerUi = require('swagger-ui-express');
const swaggerJSDoc = require('swagger-jsdoc');

exports.initSwagger = function (app) {
    const swaggerOptions = {
        swaggerDefinition: {
            info: {
                title: 'Customer API',
                version: '1.0.0',
                description: 'API Information',
                contact: {
                    name: 'nnvanhao',
                    email: 'nnvanhao.dev@gmail.com',
                    url: 'https://nnvanhao.com',
                },
                license: {
                    name: 'Apache 2.0',
                    url: 'https://www.apache.org/licenses/LICENSE-2.0.html',
                },
                servers: ['http://localhost:3600'],
            },
            tags: [
                {
                    name: 'users',
                    description: 'Users API',
                },
                {
                    name: 'Auth',
                    description: 'Authentication apis',
                },
                {
                    name: 'Email',
                    description: 'for testing and sending emails ',
                },
                {
                    name: 'termsAndCondition',
                    description: ' the terms and condition for the application',
    
                },
                {
                    name: 'Versioning',
                    description: ' operation related to check the version of the apis or the mobile .. etc ',
    
                },
            ],
            schemes: ['http'],
            basePath: '/api/v1',
            securityDefinitions: {
                Bearer: {
                    type: 'apiKey',
                    description: 'JWT authorization of an API',
                    name: 'Authorization',
                    in: 'header',
                },
            },
        },
        apis: [
            './src/routes/common.routes.js',
            './src/routes/authorization/authorization.routes.js',
        ],
    };
    const swaggerDocs = swaggerJSDoc(swaggerOptions);
    app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
};