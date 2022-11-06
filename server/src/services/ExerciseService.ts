import { Logger } from 'common';
import Exercise from '../entities/Exercise';
import { getConnection } from 'typeorm';

const logger = Logger(__filename);
const getExerciseRepository = () => getConnection().getRepository(Exercise);

const create = async (exercise: Partial<Exercise>): Promise<Exercise> => {};

export default {
  create,
};
