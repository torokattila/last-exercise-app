import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Exercise from '../../models/Exercise';

import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
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
      className={`relative z-10 h-21 w-[80%] cursor-pointer rounded-2xl p-2 shadow-card transition-all hover:opacity-90 lg:w-40`}
    >
      <div
        onClick={() => navigate(`/exercises/${exercise.id}/edit`)}
        className={`absolute right-1.5 top-1.5 z-20 flex h-5 w-5 cursor-pointer 
          flex-row items-center justify-center rounded-full 
          border-2 border-gray-300 bg-slate-700 transition-all 
          hover:bg-slate-800`}
      >
        <Icon icon={moreHorizontalFill} className="text-2xl" color="white" />
      </div>
      <div
        className="flex h-14.5 flex-col justify-between"
        onClick={() => navigate(`/exercises/${exercise.id}`)}
      >
        <h1 className="text-xl font-semibold">{exercise.name}</h1>

        <div
          className="absolute bottom-0 left-0 w-full self-start overflow-hidden rounded-bl-2xl rounded-br-2xl py-1.5 pl-2 font-semibold"
          style={{ position: 'absolute' }}
        >
          <div
            style={{
              backgroundColor: exercise.cardColor,
              color: exercise.textColor,
              filter: 'brightness(0.6)',
              position: 'absolute',
              inset: 0,
              zIndex: 0,
            }}
          />
          <div className="relative z-10">
            <p>Exercises: {numberOfExerciseTypes}</p>
            {isLastExercise &&
              exercise.duration &&
              exercise?.duration?.length > 0 && (
                <p>Last session's duration: {exercise.duration}</p>
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
