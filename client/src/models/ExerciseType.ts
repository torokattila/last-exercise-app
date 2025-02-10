import EntityBase from './EntityBase';
import Exercise from './Exercise';

interface ExerciseType extends EntityBase {
  name: string;
  exercise: Exercise | null;
  exerciseId: number;
  seriesCardNumber: number | null;
  seriesCardsColor: string;
  cardTextColor: string;
  order: number;
  numberOfRepetitions: number | null;
}

export default ExerciseType;
