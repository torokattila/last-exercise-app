import { Logger, PromiseRejectionHandler } from 'common';
import { Router, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import ExerciseService from 'services/ExerciseService';
import * as Yup from 'yup';

const logger = Logger(__filename);

const ExerciseSchema = Yup.object().shape({
  name: Yup.string().required('name_required'),
  userId: Yup.string().required('user_id_required'),
});

class ExerciseController {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  init() {
    this.router.post('/', PromiseRejectionHandler(this.createExercise));
  }

  private async createExercise(req: Request, res: Response) {
    logger.info(`POST /exercises called, body: ${req.body}`);

    const exercise = req.body;

    try {
      await ExerciseSchema.validate(exercise, { abortEarly: false });
    } catch (error: any) {
      return res.status(StatusCodes.BAD_REQUEST).send({
        errors: error.errors,
      });
    }

    const result = await ExerciseService.create(exercise);

    logger.info(`POST /exercises status code: ${StatusCodes.CREATED}`);
    return res.status(StatusCodes.CREATED).send(result);
  }
}

export default new ExerciseController().router;
