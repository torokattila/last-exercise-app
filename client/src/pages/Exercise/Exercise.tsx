import { useMemo, useState } from 'react';
import ExerciseTypeCard from '../../components/ExerciseTypeCard';
import useExercise from '../../hooks/useExercise';
import ExerciseType from '../../models/ExerciseType';

const Exercise = () => {
  const {
    isLoading,
    currentExercise,
    refetch,
    handleFinishExercise,
    sortedExerciseTypes,
  } = useExercise();
  const [duration, setDuration] = useState<string>('');

  return (
    <>
      <div className="h-screen w-full px-5 relative hidden flex-col lg:flex">
        <div className="w-full mt-5 flex">
          <h1 className="text-2xl text-gray-800 dark:text-white font-bold">
            {currentExercise?.name}
          </h1>
        </div>

        <div className="relative flex flex-col h-full pb-16 lg:pb-7">
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

        <div className="relative flex flex-col h-full bg-white dark:bg-[#28282B] rounded-t-[40px] pb-17">
          {sortedExerciseTypes.map((type) => (
            <div key={type.id}>
              <h1 className="font-semibold text-lg mt-5 text-center dark:text-white text-gray-800">
                {type.name}
              </h1>
              <ExerciseTypeCard key={type.id} exerciseType={type} />
            </div>
          ))}
          <div className="mt-5 flex justify-center flex-row items-center">
            <button
              className="uppercase font-medium rounded-full bg-[#4A9ECB] hover:bg-[#0e6696] py-2 px-4 transition-all shadow-card text-white"
              onClick={() => handleFinishExercise(currentExercise?.id ?? '')}
            >
              finish exercise
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Exercise;
