const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const compression = require('compression');
const bodyParser = require('body-parser');
const HttpStatus = require('http-status-codes');
const Swagger = require('./configuration/initSwagger');
const Routes = require('./configuration/initRoutes');
const Server = require('./configuration/initServer');
const MySQLConnection = require('./src/config/connection/mysql.connection');

const app = express();

app.use(compression());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header('Access-Control-Allow-Headers', 'Accept, Authorization, Content-Type, X-Requested-With, Range');
    res.header('Cache-Control', 'public, max-age=86400');
    if (req.method === 'OPTIONS') {
        return res.send(HttpStatus.OK);
    } else {
        return next();
    }
});

console.log('=>> Step: Init swagger');
Swagger.initSwagger(app);

console.log('=>> Step: Init routes');
Routes.initRoutes(app);

console.log('=>> Step: Connection database');
MySQLConnection.getSequelizeInstance().getConnectStatus();

console.log('=>> Step: Create server');
Server.create(app);


