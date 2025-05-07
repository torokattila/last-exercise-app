import { User } from '../../src/modules/users/entities/user.entity';

export const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  password: 'hashedPassword',
  created_at: new Date(),
  updated_at: new Date(),
  firstname: 'John',
  lastname: 'Doe',
  exercises: [],
  lastExerciseId: null,
  lastExercise: null,
  exerciseHistory: null,
};

export const mockUser2: User = {
  id: 2,
  email: 'test2@example.com',
  password: 'hashedPassword',
  created_at: new Date(),
  updated_at: new Date(),
  firstname: 'John',
  lastname: 'Doe',
  exercises: [],
  lastExerciseId: null,
  lastExercise: null,
  exerciseHistory: null,
};

export const mockUser3: User = {
  id: 3,
  email: 'test3@example.com',
  password: 'hashedPassword',
  created_at: new Date(),
  updated_at: new Date(),
  firstname: 'John',
  lastname: 'Doe',
  exercises: [],
  lastExerciseId: null,
  lastExercise: null,
  exerciseHistory: null,
};
