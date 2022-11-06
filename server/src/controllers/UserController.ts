import { Logger, PromiseRejectionHandler } from 'common';
import { Router, Request, Response } from 'express';
import * as Yup from 'yup';
import { validate as uuidValidate } from 'uuid';
import UserService from '../services/UserService';
import { StatusCodes } from 'http-status-codes';

const logger = Logger(__filename);

const UpdateUserSchema = Yup.object().shape({
  email: Yup.string().required('email_required'),
  firstname: Yup.string().required('firstname_required'),
  lastname: Yup.string().required('lastname_required'),
});

class UserController {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.get('/:id', PromiseRejectionHandler(this.getUser));
    this.router.put('/:id', PromiseRejectionHandler(this.updateUser));
  }

  private async getUser(req: Request, res: Response) {
    logger.info(
      `GET /users/:id called, id param: ${JSON.stringify(req.params.id)}`
    );

    const id = req.params.id;

    if (!id || !uuidValidate(id)) throw new Error('invalid_path_parameters');

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

  private async updateUser(req: Request, res: Response) {
    logger.info(
      `PUT /users/:id called, id param: ${JSON.stringify(
        req.params.id
      )}, body: ${JSON.stringify(req.body)}`
    );

    const id = req.params.id;

    if (!id || !uuidValidate(id)) throw new Error('invalid_path_parameters');

    const editableUser = req.body;

    try {
      await UpdateUserSchema.validate(editableUser, {
        abortEarly: false,
      });
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        errors: error.errors,
      });
    }

    const updatedUser = await UserService.update(id, editableUser);

    logger.info(`PUT /users/:id status code: ${StatusCodes.OK}`);
    return res.status(StatusCodes.OK).send(updatedUser);
  }
}

export default new UserController().router;
