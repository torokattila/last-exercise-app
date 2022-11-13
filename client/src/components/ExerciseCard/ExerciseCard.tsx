import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Exercise from '../../models/Exercise';

type Props = {
  exercise: Exercise;
  isLastExercise?: boolean;
};

const ExerciseCard = ({ exercise, isLastExercise }: Props) => {
  const navigate = useNavigate();

  const numberOfExerciseTypes = useMemo(() => {
    return exercise?.exerciseTypes?.length ?? 0;
  }, [exercise]);

  return (
    <div
      onClick={() => navigate(`/exercises/${exercise.id}`)}
      style={{
        backgroundColor: exercise.cardColor,
        color: exercise.textColor,
      }}
      className={`h-19 relative w-full lg:w-40 justify-between rounded-2xl shadow-card flex flex-col p-2 cursor-pointer transition-all hover:opacity-90`}
    >
      <h1 className="font-semibold text-xl">{exercise.name}</h1>

      <div
        style={{
          color: exercise.textColor,
        }}
        className="relative self-start w-full opacity-80 font-semibold"
      >
        <p>Number of exercise types: {numberOfExerciseTypes}</p>
        {isLastExercise &&
          exercise.duration &&
          exercise?.duration?.length > 0 && (
            <p>Last session's duration: {exercise.duration}</p>
          )}
      </div>
    </div>
  );
};

export default ExerciseCard;
