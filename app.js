
import express from 'express'
import bodyParser from 'body-parser'
import path from 'path'
import passport from 'passport'
//Todo: Database
import db from './src/Server/config/mongoose'
import {redisServer} from './src/Server/config/redis'
//Todo: MiddleWare
import {headerMiddleware} from './src/Server/middlewares/header_middleware'
import {errorHandler} from './src/Server/middlewares/error_handler'
//Todo: Router
import accountRouter from './src/Server/routers/account_router'

const app = express();
const urlencodedParser = bodyParser.urlencoded({limit: '50mb',extended: false });

app.use(bodyParser.json({limit: '50mb'}));
app.use(urlencodedParser);
app.use(redisServer);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));
app.use(headerMiddleware);
app.use('/account',accountRouter);
app.use(errorHandler);

export default app;