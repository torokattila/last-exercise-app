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
  lastExerciseId: number | null;
  exerciseHistory?:
    | { date: string; exerciseId: string; exercise?: Exercise }[]
    | null;
}

export default User;
