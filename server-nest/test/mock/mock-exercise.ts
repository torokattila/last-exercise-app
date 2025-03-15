import { Exercise } from '../../src/modules/exercises/entities/exercise.entity';
import { mockUser, mockUser3 } from './mock-user';

export const mockExercise: Exercise = {
  id: 1,
  name: 'Push-ups',
  cardColor: '#005A92',
  created_at: new Date(),
  updated_at: new Date(),
  userId: 1,
  duration: '10000',
  exerciseTypes: [],
  textColor: '#fff',
  order: 1,
  user: mockUser,
};

export const mockExercise2: Exercise = {
  id: 2,
  name: 'Push-ups',
  cardColor: '#005A92',
  created_at: new Date(),
  updated_at: new Date(),
  userId: 1,
  duration: '10000',
  exerciseTypes: [],
  textColor: '#fff',
  order: 1,
  user: mockUser3,
};
