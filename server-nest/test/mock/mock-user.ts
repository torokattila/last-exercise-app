import { User } from '../../src/modules/users/entities/user.entity';

export const mockUser: User = {
  id: 1,
  email: 'test@example.com',
  password: 'hashedPassword',
  created_at: new Date(),
  updated_at: new Date(),
  firstName: 'John',
  lastName: 'Doe',
  exercises: [],
  lastExerciseId: null,
  lastExercise: null,
  exerciseHistory: null,
};
