import useExercise from '../../hooks/useExercise';
import { HexColorPicker } from 'react-colorful';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';

import saveOutline from '@iconify/icons-eva/save-outline';
import { Icon } from '@iconify/react';
import ExerciseType from '../../models/ExerciseType';

type ExerciseTypeCardColorOpen = {
  index: number;
  isOpen: boolean;
};

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
  const [exerciseTypes, setExerciseTypes] = useState<ExerciseType[]>(
    currentExercise?.exerciseTypes ?? []
  );

  const [openExerciseColorPicker, setOpenExeriseColorPicker] =
    useState<boolean>(false);
  const [openExerciseTextColorPicker, setOpenExerciseTextColorPicker] =
    useState<boolean>(false);
  const [openExerciseTypeCardColorPicker, setOpenExerciseTypeCardColorPicker] =
    useState<ExerciseTypeCardColorOpen[]>([]);
  console.log(currentExercise);

  useEffect(() => {
    setExerciseCardColor(currentExercise?.cardColor ?? '');
    setExerciseName(currentExercise?.name ?? '');
    setExerciseOrder(currentExercise?.order ?? 0);
    setExerciseTextColor(currentExercise?.textColor ?? '');
    setExerciseTypes(currentExercise?.exerciseTypes ?? []);

    if (exerciseTypes.length > 0) {
      const initialOpenExerciseTypeCardColorValues: ExerciseTypeCardColorOpen[] =
        [];

      for (let i = 0; i < exerciseTypes.length; i++) {
        initialOpenExerciseTypeCardColorValues.push({
          index: i,
          isOpen: false,
        });
      }

      setOpenExerciseTypeCardColorPicker(
        initialOpenExerciseTypeCardColorValues
      );
    }
  }, [currentExercise, exerciseTypes.length]);

  console.log(openExerciseTypeCardColorPicker);

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
            className="w-full rounded-full border-2 border-blues-1 bg-transparent py-1.5 px-3 outline-none transition-all focus:shadow-card dark:text-white"
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
            className="w-full rounded-full border-2 border-blues-1 bg-transparent py-1.5 px-3 outline-none transition-all focus:shadow-card dark:text-white"
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

        <div>
          <h3 className="font-semibold text-gray-800 dark:text-white">
            Exercise types:
          </h3>

          {exerciseTypes && (
            <div className="mt-2 flex flex-col gap-y-2">
              {exerciseTypes.length > 0 &&
                exerciseTypes.map((type, index: number) => (
                  <div
                    key={type.id}
                    className="flex flex-col gap-y-3 rounded-2xl bg-blues-1 p-2 shadow-card"
                  >
                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium text-white">Name:</label>
                      <input
                        className="w-full rounded-full border-2 bg-white py-1.5 px-3 outline-none transition-all focus:shadow-card dark:bg-[#28282B] dark:text-white"
                        type="text"
                        value={type.name}
                        onChange={(e) => {
                          setExerciseTypes([
                            ...exerciseTypes.slice(0, index),
                            { ...exerciseTypes[index], name: e.target.value },
                            ...exerciseTypes.slice(index + 1),
                          ]);
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium text-white">
                        Order on the Exercise page:
                      </label>
                      <input
                        value={type.order}
                        type="number"
                        className="w-full rounded-full border-2 bg-white py-1.5 px-3 outline-none transition-all focus:shadow-card dark:bg-[#28282B] dark:text-white"
                        onChange={(e) => {
                          setExerciseTypes([
                            ...exerciseTypes.slice(0, index),
                            {
                              ...exerciseTypes[index],
                              order: Number(e.target.value),
                            },
                            ...exerciseTypes.slice(index + 1),
                          ]);
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium text-white">
                        Number of series card:
                      </label>
                      <input
                        value={Number(type.seriesCardNumber)}
                        type="number"
                        className="w-full rounded-full border-2 bg-white py-1.5 px-3 outline-none transition-all focus:shadow-card dark:bg-[#28282B] dark:text-white"
                        onChange={(e) => {
                          setExerciseTypes([
                            ...exerciseTypes.slice(0, index),
                            {
                              ...exerciseTypes[index],
                              seriesCardNumber: Number(e.target.value),
                            },
                            ...exerciseTypes.slice(index + 1),
                          ]);
                        }}
                      />
                    </div>

                    <div className="flex flex-col gap-y-1">
                      <label className="font-medium text-white">
                        Color of the series cards:
                      </label>

                      {openExerciseTypeCardColorPicker[index] &&
                        !openExerciseTypeCardColorPicker[index].isOpen && (
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
                            className="mt-1 h-5 w-12 cursor-pointer rounded-lg shadow-card"
                            onClick={() =>
                              setOpenExerciseTypeCardColorPicker([
                                ...openExerciseTypeCardColorPicker.slice(
                                  0,
                                  index
                                ),
                                {
                                  ...openExerciseTypeCardColorPicker[index],
                                  isOpen:
                                    !openExerciseTypeCardColorPicker[index]
                                      .isOpen,
                                },
                                ...openExerciseTypeCardColorPicker.slice(
                                  index + 1
                                ),
                              ])
                            }
                            style={{
                              backgroundColor:
                                exerciseTypes[index].seriesCardsColor,
                            }}
                          />
                        )}
                      {openExerciseTypeCardColorPicker[index] &&
                        openExerciseTypeCardColorPicker[index].isOpen && (
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
                              color={exerciseTypes[index].seriesCardsColor}
                              onChange={(value) => {
                                setExerciseTypes([
                                  ...exerciseTypes.slice(0, index),
                                  {
                                    ...exerciseTypes[index],
                                    seriesCardsColor: value,
                                  },
                                  ...exerciseTypes.slice(index + 1),
                                ]);
                              }}
                            />

                            <div
                              className="cursor-pointer self-end rounded-full bg-white p-1 shadow-card transition-all hover:bg-gray-50"
                              onClick={() =>
                                setOpenExerciseTypeCardColorPicker([
                                  ...openExerciseTypeCardColorPicker.slice(
                                    0,
                                    index
                                  ),
                                  {
                                    ...openExerciseTypeCardColorPicker[index],
                                    isOpen: false,
                                  },
                                  ...openExerciseTypeCardColorPicker.slice(
                                    index + 1
                                  ),
                                ])
                              }
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
                ))}
            </div>
          )}
        </div>
      </div>
    </AnimatePresence>
  );
};

export default EditExercise;
