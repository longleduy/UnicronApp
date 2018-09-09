import redis from 'redis'
import Bluebird from 'bluebird'
import chalk from 'chalk'
import redisConnect from 'connect-redis'
import session from 'express-session'

Bluebird.promisifyAll(redis.RedisClient.prototype)
Bluebird.promisifyAll(redis.Multi.prototype)

const RedisStore = redisConnect(session);
export const client = redis.createClient()

client.on('connect', function () {
    if (process.env.NODE_ENV != 'test') {
        console.log(chalk.red('RedisDB') + ' connecting ' + chalk.green('✓'));
    }
});
export const redisServer = session({
    secret: "longld",
    resave: false,
    saveUninitialized: false,
    store: new RedisStore({ host: 'localhost', port: 6379, client: client }),
    cookie: {
        //must be served over https
        secure: false,
        maxAge: 1000 * 60 * 60 * 24 * 3,
        expires: false
    }
})