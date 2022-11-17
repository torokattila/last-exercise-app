import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Exercise from '../../models/Exercise';

import editOutline from '@iconify/icons-eva/edit-outline';
import { Icon } from '@iconify/react';

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
      style={{
        backgroundColor: exercise.cardColor,
        color: exercise.textColor,
      }}
      className={`relative z-10 h-19 w-full cursor-pointer rounded-2xl p-2 shadow-card transition-all hover:opacity-90 lg:w-40`}
    >
      <div
        onClick={() => navigate(`/exercises/${exercise.id}/edit`)}
        className="absolute -right-2 -top-2 z-20 flex h-6 w-6 cursor-pointer flex-row items-center justify-center rounded-full border-2 border-gray-300 bg-blues-1 transition-all hover:bg-blues-2"
      >
        <Icon
          icon={editOutline}
          className="text-3xl"
          color="white"
        />
      </div>
      <div
        className="flex h-14.5 flex-col justify-between"
        onClick={() => navigate(`/exercises/${exercise.id}`)}
      >
        <h1 className="text-xl font-semibold">{exercise.name}</h1>

        <div
          style={{
            color: exercise.textColor,
          }}
          className="relative -mb-0.5 w-full self-start font-semibold opacity-80"
        >
          <p>Number of exercise types: {numberOfExerciseTypes}</p>
          {isLastExercise &&
            exercise.duration &&
            exercise?.duration?.length > 0 && (
              <p>Last session's duration: {exercise.duration}</p>
            )}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
