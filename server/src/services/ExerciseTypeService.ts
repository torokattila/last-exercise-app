import { Logger } from 'common';
import ExerciseType from 'entities/ExerciseType';
import { getConnection } from 'typeorm';

const logger = Logger(__filename);
const getExerciseTypeRepository = () =>
  getConnection().getRepository(ExerciseType);

const create = async (exerciseType: Partial<ExerciseType>): Promise<ExerciseType> => {
  try {
    return await getExerciseTypeRepository().save(exerciseType);
  } catch (error: any) {
    logger.error(`Cretate failed in ExerciseTypeService, error: ${error}`);
    throw new Error(error);
  }
};

export default {
  create,
};
