import express, { Application } from 'express';
import morgan from 'morgan';
import config from './config';
import cors from 'cors';
import { authenticate } from 'middlewares/Authenticate';
import RegistrationController from './controllers/RegistrationController';
import LoginController from './controllers/LoginController';
import MeController from './controllers/MeController';
import UserController from './controllers/UserController';

class App {
  public express: Application;

  constructor() {
    this.init();
  }

  private init() {
    this.express = express();
    this.middlewares();
    this.routes();
  }

  private routes() {
    this.express.use('/register', RegistrationController);
    this.express.use('/login', LoginController);
    this.express.use('/me', authenticate, MeController);
    this.express.use('/users', authenticate, UserController);
  }

  private middlewares() {
    this.express.use(express.json());
    this.express.use(express.urlencoded({ extended: true }));
    this.express.use(morgan(config.accessLogFormat));
    this.express.use(
      cors({
        origin: config.enabledOrigins,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        optionsSuccessStatus: 200,
        exposedHeaders: [
          'X-Total-Count',
          'X-Pagination-Page',
          'X-Pagination-Limit',
        ],
      })
    );
  }
}

export default new App().express;
