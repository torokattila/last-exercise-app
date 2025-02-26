import { ExerciseType } from '../../src/modules/exercise-types/entities/exercise-type.entity';
import { mockExercise } from './mock-exercise';

export const mockExerciseType: ExerciseType = {
  id: 1,
  name: 'Mock exercise',
  cardTextColor: '#f0f0f0',
  created_at: new Date(),
  exercise: mockExercise,
  exerciseId: mockExercise.id,
  numberOfRepetitions: 5,
  order: 1,
  seriesCardNumber: 4,
  seriesCardsColor: '#5Ba342',
  updated_at: new Date(),
};
