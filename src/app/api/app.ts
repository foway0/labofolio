const debug = process.env.DEBUG
  ? require('debug')('labofolio:api-app')
  : () => {};

import * as express from 'express';
import { OpenApiValidator } from 'express-openapi-validator';
import * as path from 'path';

import Application from '../../application';
import { errorHandler } from '../../middleware/error_handler';

class ApiApplication extends Application {
  async init(): Promise<void> {
    // middleware
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use((req, res, next) => {
      debug(`${this.host}:${this.port}${req.url}`);
      next();
    });

    await new OpenApiValidator({
      apiSpec: path.join(__dirname, '../../api_specs/api.yaml'),
      validateRequests: true,
      validateResponses: true,
      operationHandlers: path.join(__dirname)
    }).install(this.app);

    // error handler
    this.app.use(errorHandler);
  }
}

export { ApiApplication };
