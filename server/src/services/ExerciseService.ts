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

const findById = async (id: string): Promise<Exercise> => {
  try {
    const queryBuilder = getExerciseRepository().createQueryBuilder('exercise');
    queryBuilder.leftJoinAndSelect('exercise.exerciseTypes', 'exerciseTypes');
    queryBuilder.andWhere('exercise.id = :id', { id });

    const exercise = await queryBuilder.getOne();

    return Promise.resolve(exercise);
  } catch (error: any) {
    logger.error(`Find by id failed in ExerciseService, error: ${error}`);
    throw new Error(error);
  }
};

const list = async (userId: string): Promise<Exercise[]> => {
  try {
    const queryBuilder = getExerciseRepository().createQueryBuilder('exercise');
    queryBuilder.leftJoinAndSelect('exercise.exerciseTypes', 'exerciseTypes');
    queryBuilder.andWhere('exercise.userId = :userId', { userId });

    return await queryBuilder.getMany();
  } catch (error: any) {
    logger.error(`List failed in ExerciseService, error: ${error}`);
    throw new Error(error);
  }
};

export default {
  create,
  list,
  findById,
};
