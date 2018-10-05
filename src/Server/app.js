
import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import {redisServer} from './config/redis'
import {HOST,CLIENT_PORT} from '../Server/config/Contants/uri_contans'
const app = express();
const urlencodedParser = bodyParser.urlencoded({limit: '50mb',extended: false });
app.use(bodyParser.json({limit: '50mb'}));
app.use(urlencodedParser);
app.use(redisServer);
app.use(cors({
    origin: `${HOST}:${CLIENT_PORT}`,
    allowedHeaders:['X-Requested-With','X-HTTP-Method-Override','Content-Type','Accept','Authorization'],
    credentials:true,
    methods:['POST','GET']
}))
export default app;