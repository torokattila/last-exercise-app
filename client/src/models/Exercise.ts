import EntityBase from './EntityBase';
import ExerciseType from './ExerciseType';
import User from './User';

interface Exercise extends EntityBase {
  name: string;
  user?: User | null;
  userId: string;
  duration: string | null;
  exerciseTypes: ExerciseType[];
  cardColor: string;
  textColor: string;
  order: number;
}

export default Exercise;
