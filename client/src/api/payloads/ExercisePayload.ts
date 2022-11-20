import ExerciseType from "../../models/ExerciseType";

interface ExercisePayload {
  name: string;
  cardColor: string;
  textColor: string;
  duration: string;
  exerciseTypes: Partial<ExerciseType>[];
  order: number;
  userId: string;
}

export default ExercisePayload