import { useState } from 'react';
import useExercise from '../../hooks/useExercise';

const Exercise = () => {
  const { isLoading, currentExercise, refetch } = useExercise();
  const [duration, setDuration] = useState<string>('');

  return (
    <div
      style={{
        backgroundColor: currentExercise?.cardColor,
      }}
      className="h-screen relative flex flex-col"
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
        {currentExercise?.exerciseTypes?.map((type) => (
          <div className="flex flex-col gap-3 items-center mt-3" key={type.id}>
            <h1 className="font-semibold text-lg dark:text-white text-gray-800">
              {type.name}
            </h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercise;
