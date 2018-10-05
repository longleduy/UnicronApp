
import chalk from 'chalk'
import "regenerator-runtime/runtime";
import { ApolloServer } from 'apollo-server-express';
import { connectMongooseDB } from './config/mongoose'
import * as https from 'https'
import * as fs from 'fs'
import app from './app'
import { schema } from './schemas/schema'
import { ErrorLogger } from './config/logger'
require('dotenv').config();
const connectApolloServer = async () => {
  const configurations = {
    production: { ssl: false, port: 443, hostname: 'unicron.com' },
    development: { ssl: true, port: 4000, hostname: 'localhost' }
  }
  const environment = process.env.NODE_ENV || 'development'
  const config = configurations[environment]

  const server = new ApolloServer({
    schema,
    context: async ({ req,res, next }) => {
        return {req,res}
    },
    formatError: error => {
      const message = error.message;
      if (error.extensions.exception.name !== "dataFormInvalid") {
       // ErrorLogger(error.extensions.exception.stacktrace);
        console.log(error);
      }
      return {
        ...error,
        message,
      };
    },
    // playground: false
  });
  server.applyMiddleware({ app });
  var sslServer;
  if (config.ssl) {
    sslServer = https.createServer({
      key: fs.readFileSync('./ssl/server.key'),
      cert: fs.readFileSync('./ssl/server.crt')
    }, app)
  } else {
    sslServer = http.createServer(app)
  }
  server.installSubscriptionHandlers(sslServer)
  sslServer.listen({ port: 4000 });
}
const run = async () => {
  try {
    const connectDB = connectMongooseDB();
    const connectServer = connectApolloServer();
    await connectDB;
    await connectServer;
    console.log(`🛡️  ${chalk.cyan('Apollo server')},${chalk.green('MongoDB')} connecting..., ${chalk.cyan('Port')} 4000`)
  } catch (error) {
    console.log(error);
  }
}
run();