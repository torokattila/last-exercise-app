import ExerciseType from "../../models/ExerciseType";

interface ExercisePayload {
  id: string;
  name: string;
  cardColor: string;
  textColor: string;
  duration: string;
  exerciseTypes: ExerciseType[];
  order: number;
  userId: string;
}

export default ExercisePayload