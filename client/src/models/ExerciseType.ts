import EntityBase from './EntityBase';
import Exercise from './Exercise';

interface ExerciseType extends EntityBase {
  name: string;
  exercise: Exercise;
  exerciseId: string;
  seriesCardNumber: number | null;
  seriesCardsColor: string;
}

export default ExerciseType;