import { useMemo, useState } from 'react';
import ExerciseTypeCard from '../../components/ExerciseTypeCard';
import useExercise from '../../hooks/useExercise';
import ExerciseType from '../../models/ExerciseType';

const Exercise = () => {
  const { isLoading, currentExercise, refetch } = useExercise();
  const [duration, setDuration] = useState<string>('');

  const sortExerciseTypesByOrder = (
    a: ExerciseType,
    b: ExerciseType
  ): number => {
    if (a.order === b.order) {
      if ((a.modified ?? '') < (b.modified ?? '')) return -1;
      if ((a.modified ?? '') > (b.modified ?? '')) return 1;
      return 0;
    } else {
      return a.order - b.order;
    }
  };

  const sortedExerciseTypes = useMemo(() => {
    if (currentExercise?.exerciseTypes) {
      return currentExercise?.exerciseTypes.sort(sortExerciseTypesByOrder);
    } else {
      return [];
    }
  }, [currentExercise]);

  return (
    <>
      <div
        style={{
          backgroundColor: currentExercise?.cardColor,
        }}
        className="h-full relative flex flex-col lg:hidden"
      >
        <div className="w-full h-13 flex items-center justify-center">
          <h1
            style={{
              color: currentExercise?.textColor,
            }}
            className="text-2xl"
          >
            {currentExercise?.name}
          </h1>
        </div>

        <div className="relative flex flex-col h-screen bg-white dark:bg-[#28282B] rounded-t-[40px] pb-16 lg:pb-7">
          {sortedExerciseTypes.map((type) => (
            <div key={type.id}>
              <h1 className="font-semibold text-lg mt-5 text-center dark:text-white text-gray-800">
                {type.name}
              </h1>
              <ExerciseTypeCard key={type.id} exerciseType={type} />
            </div>
          ))}
        </div>
      </div>

      <div className="h-screen w-full px-5 relative hidden flex-col lg:flex dark:bg-[#28282B]">
        <div className="w-full mt-5 flex">
          <h1 className="text-2xl text-gray-800 dark:text-white font-bold">
            {currentExercise?.name}
          </h1>
        </div>

        <div className="relative flex flex-col h-full bg-white dark:bg-[#28282B] pb-16 lg:pb-7">
          {sortedExerciseTypes.map((type) => (
            <div key={type.id} className="mt-3">
              <h1 className="font-semibold text-lg dark:text-white text-gray-800">
                {type.name}
              </h1>
              <ExerciseTypeCard key={type.id} exerciseType={type} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Exercise;
