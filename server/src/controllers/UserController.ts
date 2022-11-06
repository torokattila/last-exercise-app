import { Logger, PromiseRejectionHandler } from 'common';
import { Router, Request, Response } from 'express';
import * as Yup from 'yup';
import { validate as uuidValidate } from 'uuid';
import UserService from '../services/UserService';
import { StatusCodes } from 'http-status-codes';

const logger = Logger(__filename);

class UserController {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/:id', PromiseRejectionHandler(this.getUser));
  }

  private async getUser(req: Request, res: Response) {
    logger.info(
      `GET /users/:id called, id param: ${JSON.stringify(req.params.id)}`
    );

    const id = req.params.id;

    if (!id || !uuidValidate(id)) {
      throw new Error('invalid_path_parameters');
    }

    try {
      const user = await UserService.findById(id);

      if (user) {
        logger.info(`GET /users/${id} status code: ${StatusCodes.OK}`);

        return res.status(StatusCodes.OK).send(user);
      } else {
        return res.status(StatusCodes.BAD_REQUEST).send({
          errors: ['user_not_found'],
        });
      }
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        errors: [error],
      });
    }
  }
}

export default new UserController().router;
