import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import useHome from '../../hooks/useHome';
import Exercise from '../../models/Exercise';

import { Icon } from '@iconify/react';
import saveOutline from '@iconify/icons-eva/save-outline';

const AddExercise = () => {
  const { user } = useHome();
  const [openExerciseCardColorPicker, setOpenExeriseCardColorPicker] =
    useState<boolean>(false);
  const [openExerciseTextColorPicker, setOpenExerciseTextColorPicker] =
    useState<boolean>(false);

  const [exercise, setExercise] = useState<Exercise>({
    id: '',
    name: '',
    cardColor: '#005A92',
    textColor: '#fff',
    duration: '',
    exerciseTypes: [],
    order: 1,
    userId: user?.id ?? '',
  });

  return (
    <AnimatePresence>
      <div className="mt-5 flex flex-col gap-y-2 pl-2.5">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Create new Exercise 💪
        </h1>

        <div className="flex flex-col py-2 lg:flex-row lg:gap-x-4">
          <div className="mt-2 flex flex-col lg:mt-5">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Exercise card color:
            </h3>

            {!openExerciseCardColorPicker && (
              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0,
                }}
                transition={{
                  duration: 0.4,
                  type: 'spring',
                }}
                className="mt-2 h-5 w-12 cursor-pointer rounded-lg shadow-card"
                onClick={() =>
                  setOpenExeriseCardColorPicker(!openExerciseCardColorPicker)
                }
                style={{
                  backgroundColor: exercise.cardColor,
                }}
              />
            )}
            {openExerciseCardColorPicker && (
              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0,
                }}
                transition={{
                  duration: 0.4,
                  type: 'spring',
                }}
                className="mt-2 flex flex-row gap-x-3"
              >
                <HexColorPicker
                  className="rounded-3xl shadow-card"
                  color={exercise.cardColor}
                  onChange={(e) => setExercise({ ...exercise, cardColor: e })}
                />

                <div
                  className="cursor-pointer self-end rounded-full bg-white p-1 shadow-card transition-all hover:bg-gray-50"
                  onClick={() => setOpenExeriseCardColorPicker(false)}
                >
                  <Icon
                    icon={saveOutline}
                    fontSize={30}
                    className="text-green-700"
                  />
                </div>
              </motion.div>
            )}
          </div>

          <div className="mt-2 flex flex-col lg:mt-5">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Exercise text color on the card:
            </h3>
            {!openExerciseTextColorPicker && (
              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0,
                }}
                transition={{
                  duration: 0.4,
                  type: 'spring',
                }}
                className="mt-2 h-5 w-12 cursor-pointer rounded-lg shadow-card"
                onClick={() =>
                  setOpenExerciseTextColorPicker(!openExerciseTextColorPicker)
                }
                style={{
                  backgroundColor: exercise.textColor,
                }}
              />
            )}
            {openExerciseTextColorPicker && (
              <motion.div
                initial={{
                  scale: 0,
                }}
                animate={{
                  scale: 1,
                }}
                exit={{
                  scale: 0,
                }}
                transition={{
                  duration: 0.4,
                  type: 'spring',
                }}
                className="mt-2 flex flex-row gap-x-3"
              >
                <HexColorPicker
                  className="rounded-3xl shadow-card"
                  color={exercise.textColor}
                  onChange={(e) => setExercise({ ...exercise, textColor: e })}
                />

                <div
                  className="cursor-pointer self-end rounded-full bg-white p-1 shadow-card transition-all hover:bg-gray-50"
                  onClick={() => setOpenExerciseTextColorPicker(false)}
                >
                  <Icon
                    icon={saveOutline}
                    fontSize={30}
                    className="text-green-700"
                  />
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default AddExercise;
