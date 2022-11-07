import { Logger } from 'common';
import Exercise from '../entities/Exercise';
import { getConnection } from 'typeorm';
import ExerciseTypeService from './ExerciseTypeService';

const logger = Logger(__filename);
const getExerciseRepository = () => getConnection().getRepository(Exercise);

const create = async (exercise: Partial<Exercise>): Promise<Exercise> => {
  try {
    const newExercise = exercise;
    newExercise.userId = exercise.userId;

    const result = await getExerciseRepository().save(newExercise);

    if (newExercise.exerciseTypes) {
      for (const type of newExercise.exerciseTypes) {
        type.exerciseId = result.id;
        await ExerciseTypeService.create(type);
      }
    }

    return result;
  } catch (error: any) {
    logger.error(`Create failed in ExerciseService, error: ${error}`);
    throw new Error(error);
  }
};

export default {
  create,
};
