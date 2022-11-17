import useExercise from '../../hooks/useExercise';
import { HexColorPicker } from 'react-colorful';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import saveOutline from '@iconify/icons-eva/save-outline';
import { Icon } from '@iconify/react';

const EditExercise = () => {
  const { currentExercise } = useExercise();

  const [exerciseCardColor, setExerciseCardColor] = useState<string>(
    currentExercise?.cardColor ?? ''
  );
  const [exerciseName, setExerciseName] = useState<string>(
    currentExercise?.name ?? ''
  );
  const [exerciseOrder, setExerciseOrder] = useState<number | string>(
    currentExercise?.order ?? 0
  );
  const [exerciseTextColor, setExerciseTextColor] = useState<string>(
    currentExercise?.textColor ?? ''
  );

  const [openExerciseColorPicker, setOpenExeriseColorPicker] =
    useState<boolean>(false);
  const [openExerciseTextColorPicker, setOpenExerciseTextColorPicker] =
    useState<boolean>(false);
  console.log(currentExercise);

  useEffect(() => {
    setExerciseCardColor(currentExercise?.cardColor ?? '');
    setExerciseName(currentExercise?.name ?? '');
    setExerciseOrder(currentExercise?.order ?? 0);
    setExerciseTextColor(currentExercise?.textColor ?? '');
  }, [currentExercise]);

  return (
    <AnimatePresence>
      <div className="relative flex h-full w-full flex-col gap-y-4 px-5 pb-15">
        <div className="mt-5 flex w-full">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
            {currentExercise?.name}
          </h1>
        </div>

        <div className="flex flex-col py-2 lg:flex-row lg:gap-x-4">
          <div className="mt-2 flex flex-col lg:mt-5">
            <h3 className="font-semibold text-gray-800 dark:text-white">
              Exercise card color:
            </h3>
            {!openExerciseColorPicker && (
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
                  setOpenExeriseColorPicker(!openExerciseColorPicker)
                }
                style={{
                  backgroundColor: exerciseCardColor,
                }}
              />
            )}
            {openExerciseColorPicker && (
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
                  color={exerciseCardColor}
                  onChange={setExerciseCardColor}
                />

                <div
                  className="cursor-pointer self-end rounded-full bg-white p-1 shadow-card transition-all hover:bg-gray-50"
                  onClick={() => setOpenExeriseColorPicker(false)}
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
                  backgroundColor: exerciseTextColor,
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
                  color={exerciseTextColor}
                  onChange={setExerciseTextColor}
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

        <div className="flex flex-col">
          <label className="mb-1 font-medium dark:text-white">
            Exercise name:
          </label>
          <input
            className="w-full rounded-full border-2 border-blues-1 bg-transparent py-1.5 px-3 outline-none transition-all focus:border-blues-2 dark:text-white"
            value={exerciseName}
            onChange={(e) => setExerciseName(e.target.value)}
            placeholder="Exercise Name"
          />
        </div>

        <div className="flex flex-col">
          <label className="mb-1 font-medium dark:text-white">
            Exercise order on the Home page:
          </label>
          <input
            className="w-full rounded-full border-2 border-blues-1 bg-transparent py-1.5 px-3 outline-none transition-all focus:border-blues-2 dark:text-white"
            value={exerciseOrder}
            type="number"
            min={1}
            onChange={(e) => {
              if (e.target.value === '') {
                setExerciseOrder('');
              } else {
                setExerciseOrder(Number(e.target.value));
              }
            }}
            placeholder="Exercise Name"
          />
        </div>
      </div>
    </AnimatePresence>
  );
};

export default EditExercise;
