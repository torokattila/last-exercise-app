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
    <div className="overflow-y-auto pb-16 lg:pb-7 px-5 bg-white flex flex-col w-full h-screen dark:bg-[#28282B]">
      <div className="mt-5 lg:mt-7">
        <h1 className="text-2xl font-bold dark:text-white text-gray-800">
          Hello, {user?.firstname}! 👋
        </h1>
        <p className="mt-1 text-gray-500 dark:text-gray-400">
          Let's do some workout today!
        </p>
      </div>

      {user?.lastExercise && (
        <div className="mt-5 lg:mt-7">
          <h1 className="text-gray-800 dark:text-white font-bold text-xl">
            Your last exercise was:
          </h1>
          <div className="mt-3">
            <ExerciseCard exercise={user?.lastExercise} isLastExercise />
          </div>
        </div>
      )}

      <div className="mt-10 flex flex-col">
        <h2 className="text-gray-800 dark:text-white text-xl font-bold">
          Your exercises:
        </h2>

        <div className="mt-3 lg:mt-5 flex flex-col lg:flex-row lg:flex-wrap gap-4">
          {sortedExercises.map((exercise: Exercise) => (
            <div key={exercise.id}>
              <ExerciseCard exercise={exercise} />
            </div>
          ))}
        </div>
      </div>

      <div className="lg:flex z-20 hidden absolute bottom-9 right-10">
        <AddExerciseButton />
      </div>

      <div className="lg:hidden z-20 flex absolute right-5 top-5">
        <AddExerciseButton />
      </div>
    </div>
  );
};

export default Home;
