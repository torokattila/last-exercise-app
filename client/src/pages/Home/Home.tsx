import { useMemo } from 'react';
import ExerciseCard from '../../components/ExerciseCard';
import AddExerciseButton from '../../components/shared/AddExerciseButton';
import useHome from '../../hooks/useHome';
import Exercise from '../../models/Exercise';

const Home = (): JSX.Element => {
  const { refetchUser, user } = useHome();

  const sortExerciseByOrder = (a: Exercise, b: Exercise): number => {
    if (a.order === b.order) {
      if ((a.modified ?? '') < (b.modified ?? '')) return -1;
      if ((a.modified ?? '') > (b.modified ?? '')) return 1;
      return 0;
    } else {
      return a.order - b.order;
    }
  };

  const sortedExercises = useMemo(() => {
    if (user?.exercises) {
      return user?.exercises.sort(sortExerciseByOrder);
    } else {
      return [];
    }
  }, [user]);

  return (
    <div className="flex h-screen w-full flex-col overflow-y-auto bg-white px-5 pb-16 dark:bg-[#28282B] lg:pb-7">
      <div className="mt-5 lg:mt-7">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Hello, {user?.firstname}! 👋
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Let's do some workout today!
        </p>
      </div>

      {user?.lastExercise && (
        <div className="mt-5 lg:mt-7">
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            Your last exercise was:
          </h1>
          <div className="mt-3">
            
            <ExerciseCard exercise={user?.lastExercise} isLastExercise />
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-col">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          Your exercises:
        </h2>

        <div className="mt-3 flex flex-col gap-4 lg:mt-5 lg:flex-row lg:flex-wrap">
          {sortedExercises.map((exercise: Exercise) => (
            <div key={exercise.id}>
              <ExerciseCard exercise={exercise} />
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-9 right-10 z-20 hidden lg:flex">
        <AddExerciseButton />
      </div>

      <div className="absolute right-5 top-5 z-20 flex lg:hidden">
        <AddExerciseButton />
      </div>
    </div>
  );
};

export default Home;
