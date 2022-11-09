import EntityBase from './EntityBase';
import Exercise from './Exercise';

interface User extends EntityBase {
  googleId?: string;
  email: string;
  firstname: string;
  lastname: string;
  password: string;
  exercises: Exercise[];
  lastExercise: Exercise;
  lastExerciseId: string | null;
}

export default User;
