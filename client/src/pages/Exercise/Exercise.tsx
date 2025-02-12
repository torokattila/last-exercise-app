import { useState } from 'react';
import ExerciseTypeCard from '../../components/ExerciseTypeCard';
import PreventPullToRefresh from '../../components/shared/PreventPullToRefresh';
import StopWatch from '../../components/StopWatch';
import useExercise from '../../hooks/useExercise';

const Exercise = () => {
  const { currentExercise, handleFinishExercise, sortedExerciseTypes } =
    useExercise();
  const [duration, setDuration] = useState<string>('');
  const [showStopWatch, setShowStopWatch] = useState<boolean>(false);

  return (
    <PreventPullToRefresh>
      <>
        <div className="relative hidden h-screen w-full flex-col px-5 lg:flex">
          <StopWatch
            show={showStopWatch}
            setDuration={setDuration}
            setShowStopWatch={setShowStopWatch}
          />
          <div className="mt-5 flex w-full">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
              {currentExercise?.name}
            </h1>
          </div>

          <div className="relative flex h-screen flex-col lg:pb-8">
            {sortedExerciseTypes.map((type) => (
              <div key={type.id} className="mt-3">
                <h1 className="text-lg font-semibold text-gray-800 dark:text-white">
                  {type.name}
                </h1>
                <ExerciseTypeCard key={type.id} exerciseType={type} />
              </div>
            ))}

            <div className="mt-10 flex flex-row items-center justify-center pb-7">
              <button
                style={{
                  backgroundColor: currentExercise?.cardColor,
                  color: currentExercise?.textColor,
                }}
                className="rounded-full py-2 px-10 font-medium uppercase shadow-card transition-all hover:opacity-90"
                onClick={() =>
                  handleFinishExercise(
                    Number(currentExercise?.id) ?? null,
                    duration
                  )
                }
              >
                finish exercise
              </button>
            </div>
          </div>
        </div>

        <StopWatch
          show={showStopWatch}
          setShowStopWatch={setShowStopWatch}
          setDuration={setDuration}
        />
        <div
          style={{
            backgroundColor: currentExercise?.cardColor,
          }}
          className="relative flex h-full flex-col lg:hidden"
        >
          <div className="flex h-13 w-full items-center justify-center">
            <h1
              style={{
                color: currentExercise?.textColor,
              }}
              className="text-2xl"
            >
              {currentExercise?.name}
            </h1>
          </div>

          <div className="relative flex h-full flex-col rounded-t-[40px] bg-white pb-17 dark:bg-[#28282B]">
            {sortedExerciseTypes.map((type) => (
              <div key={type.id}>
                <h1 className="mt-5 text-center text-lg font-semibold text-gray-800 dark:text-white">
                  {type.name}
                </h1>
                <ExerciseTypeCard key={type.id} exerciseType={type} />
              </div>
            ))}
            <div className="mt-5 flex flex-row items-center justify-center">
              <button
                style={{
                  backgroundColor: currentExercise?.cardColor,
                  color: currentExercise?.textColor,
                }}
                className="rounded-full py-2 px-4 font-medium uppercase shadow-card transition-all hover:opacity-90"
                onClick={() =>
                  handleFinishExercise(
                    Number(currentExercise?.id) ?? null,
                    duration
                  )
                }
              >
                finish exercise
              </button>
            </div>
          </div>
        </div>
      </>
    </PreventPullToRefresh>
  );
};

export default Exercise;
