import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { HexColorPicker } from 'react-colorful';
import useHome from '../../hooks/useHome';
import ExerciseType from '../../models/ExerciseType';
import { ExerciseTypeCardColorOpen } from '../../@types/ExerciseTypeCardColorOpen';

import { Icon } from '@iconify/react';
import saveOutline from '@iconify/icons-eva/save-outline';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import useExercise from '../../hooks/useExercise';
import ExercisePayload from '../../api/payloads/ExercisePayload';

const AddExercise = () => {
  const { user } = useHome();
  const { handleCreateExercise } = useExercise();
  const [openExerciseCardColorPicker, setOpenExeriseCardColorPicker] =
    useState<boolean>(false);
  const [openExerciseTextColorPicker, setOpenExerciseTextColorPicker] =
    useState<boolean>(false);
  const [openExerciseTypeCardColorPicker, setOpenExerciseTypeCardColorPicker] =
    useState<ExerciseTypeCardColorOpen[]>([]);
  const [
    openExerciseTypeCardTextColorPicker,
    setOpenExerciseTypeCardTextColorPicker,
  ] = useState<ExerciseTypeCardColorOpen[]>([]);

  const [exercise, setExercise] = useState<ExercisePayload>({
    id: '',
    name: '',
    cardColor: '#005A92',
    textColor: '#fff',
    duration: '',
    exerciseTypes: [],
    order: 1,
    userId: user?.id ?? '',
  });

  const handleAddNewExerciseType = () => {
    const types = [...exercise.exerciseTypes];
    const newExerciseType: ExerciseType = {
      id: '',
      name: '',
      order: 1,
      exerciseId: '',
      exercise: null,
      cardTextColor: '#fff',
      seriesCardsColor: '#005A92',
      seriesCardNumber: null,
    };
    types.push(newExerciseType);
    setExercise({ ...exercise, exerciseTypes: types });
    setOpenExerciseTypeCardColorPicker([
      ...openExerciseTypeCardColorPicker,
      {
        index:
          openExerciseTypeCardColorPicker[
            openExerciseTypeCardColorPicker.length - 1
          ].index + 1,
        isOpen: false,
      },
    ]);
  };

  const handleDeleteType = (type: ExerciseType, index: number) => {
    let currentExerciseTypes = [...exercise.exerciseTypes];
    currentExerciseTypes = currentExerciseTypes.filter(
      (exType, innerIndex: number) => innerIndex !== index
    );
    setExercise({ ...exercise, exerciseTypes: currentExerciseTypes });
  };

  useEffect(() => {
    if (exercise.exerciseTypes.length > 0) {
      const initialOpenExerciseTypeCardColorValues: ExerciseTypeCardColorOpen[] =
        [];
      const initialOpenExerciseTypeCardTextColorValues: ExerciseTypeCardColorOpen[] =
        [];
      const length = exercise.exerciseTypes.length;

      for (let i = 0; i < length; i++) {
        initialOpenExerciseTypeCardColorValues.push({
          index: i,
          isOpen: false,
        });
        initialOpenExerciseTypeCardTextColorValues.push({
          index: i,
          isOpen: false,
        });
      }

      setOpenExerciseTypeCardColorPicker(
        initialOpenExerciseTypeCardColorValues
      );
      setOpenExerciseTypeCardTextColorPicker(
        initialOpenExerciseTypeCardTextColorValues
      );
    }
  }, [exercise.exerciseTypes.length]);

  return (
    <AnimatePresence>
      <div
        style={{
          backgroundColor: exercise.cardColor,
        }}
        className="relative lg:!bg-white dark:lg:!bg-[#28282B]"
      >
        <div className="relative flex h-full w-full flex-col gap-y-4 lg:gap-y-0">
          <div className="mt-5 flex w-full items-center justify-center lg:justify-start lg:px-5">
            <h1
              style={{
                color: exercise.textColor,
              }}
              className="text-2xl font-bold lg:!text-gray-800 dark:lg:!text-white"
            >
              Create new Exercise 💪
            </h1>
          </div>

          <div className="relative flex w-full flex-col gap-y-4 rounded-t-[40px] bg-white px-5 pb-15 dark:bg-[#28282B] lg:rounded-none">
            <div className="fixed top-17 right-3 lg:top-10">
              <button
                onClick={() => {
                  handleCreateExercise(exercise);
                }}
                style={{
                  backgroundColor: exercise.cardColor,
                  color: exercise.textColor,
                }}
                className="rounded-full px-3 py-2 uppercase shadow-card transition-all"
              >
                create
              </button>
            </div>
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
                      setOpenExeriseCardColorPicker(
                        !openExerciseCardColorPicker
                      )
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
                      onChange={(e) =>
                        setExercise({ ...exercise, cardColor: e })
                      }
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
                      setOpenExerciseTextColorPicker(
                        !openExerciseTextColorPicker
                      )
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
                      onChange={(e) =>
                        setExercise({ ...exercise, textColor: e })
                      }
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
                value={exercise.name}
                onChange={(e) =>
                  setExercise({ ...exercise, name: e.target.value })
                }
                placeholder="Exercise Name"
              />
            </div>

            <div className="flex flex-col">
              <label className="mb-1 font-medium dark:text-white">
                Exercise order on the Home page:
              </label>
              <input
                className="w-full rounded-full border-2 border-blues-1 bg-transparent py-1.5 px-3 outline-none transition-all focus:shadow-card dark:text-white"
                value={exercise.order}
                type="number"
                min={1}
                onChange={(e) => {
                  setExercise({ ...exercise, order: Number(e.target.value) });
                }}
                placeholder="Exercise Name"
              />
            </div>

            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Exercise types:
              </h3>

              {exercise.exerciseTypes && (
                <div className="mt-2 flex flex-col gap-y-2">
                  {exercise.exerciseTypes.length > 0 &&
                    exercise.exerciseTypes.map((type, index: number) => (
                      <motion.div
                        key={`${index}_${type.id}`}
                        className="flex flex-col gap-y-3 rounded-2xl bg-blues-1 p-2 shadow-card"
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
                      >
                        <div className="flex flex-col gap-y-1">
                          <label className="font-medium text-white">
                            Name:
                          </label>
                          <input
                            className="w-full rounded-full border-2 bg-white py-1.5 px-3 outline-none transition-all focus:shadow-card dark:bg-[#28282B] dark:text-white"
                            type="text"
                            value={type.name}
                            onChange={(e) => {
                              setExercise({
                                ...exercise,
                                exerciseTypes: [
                                  ...exercise.exerciseTypes.slice(0, index),
                                  {
                                    ...exercise.exerciseTypes[index],
                                    name: e.target.value,
                                  },
                                  ...exercise.exerciseTypes.slice(index + 1),
                                ],
                              });
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
                              setExercise({
                                ...exercise,
                                exerciseTypes: [
                                  ...exercise.exerciseTypes.slice(0, index),
                                  {
                                    ...exercise.exerciseTypes[index],
                                    order: Number(e.target.value),
                                  },
                                  ...exercise.exerciseTypes.slice(index + 1),
                                ],
                              });
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
                              setExercise({
                                ...exercise,
                                exerciseTypes: [
                                  ...exercise.exerciseTypes.slice(0, index),
                                  {
                                    ...exercise.exerciseTypes[index],
                                    seriesCardNumber: Number(e.target.value),
                                  },
                                  ...exercise.exerciseTypes.slice(index + 1),
                                ],
                              });
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
                                    exercise.exerciseTypes[index]
                                      .seriesCardsColor,
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
                                  color={
                                    exercise.exerciseTypes[index]
                                      .seriesCardsColor
                                  }
                                  onChange={(value) => {
                                    setExercise({
                                      ...exercise,
                                      exerciseTypes: [
                                        ...exercise.exerciseTypes.slice(
                                          0,
                                          index
                                        ),
                                        {
                                          ...exercise.exerciseTypes[index],
                                          seriesCardsColor: value,
                                        },
                                        ...exercise.exerciseTypes.slice(
                                          index + 1
                                        ),
                                      ],
                                    });
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
                                        ...openExerciseTypeCardColorPicker[
                                          index
                                        ],
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

                        <div className="flex flex-col gap-y-1">
                          <label className="font-medium text-white">
                            Series card text color:
                          </label>

                          {openExerciseTypeCardTextColorPicker[index] &&
                            !openExerciseTypeCardTextColorPicker[index]
                              .isOpen && (
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
                                  setOpenExerciseTypeCardTextColorPicker([
                                    ...openExerciseTypeCardTextColorPicker.slice(
                                      0,
                                      index
                                    ),
                                    {
                                      ...openExerciseTypeCardTextColorPicker[
                                        index
                                      ],
                                      isOpen:
                                        !openExerciseTypeCardTextColorPicker[
                                          index
                                        ].isOpen,
                                    },
                                    ...openExerciseTypeCardTextColorPicker.slice(
                                      index + 1
                                    ),
                                  ])
                                }
                                style={{
                                  backgroundColor:
                                    exercise.exerciseTypes[index].cardTextColor,
                                }}
                              />
                            )}
                          {openExerciseTypeCardTextColorPicker[index] &&
                            openExerciseTypeCardTextColorPicker[index]
                              .isOpen && (
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
                                  color={
                                    exercise.exerciseTypes[index].cardTextColor
                                  }
                                  onChange={(value) => {
                                    setExercise({
                                      ...exercise,
                                      exerciseTypes: [
                                        ...exercise.exerciseTypes.slice(
                                          0,
                                          index
                                        ),
                                        {
                                          ...exercise.exerciseTypes[index],
                                          cardTextColor: value,
                                        },
                                        ...exercise.exerciseTypes.slice(
                                          index + 1
                                        ),
                                      ],
                                    });
                                  }}
                                />

                                <div
                                  className="cursor-pointer self-end rounded-full bg-white p-1 shadow-card transition-all hover:bg-gray-50"
                                  onClick={() =>
                                    setOpenExerciseTypeCardTextColorPicker([
                                      ...openExerciseTypeCardTextColorPicker.slice(
                                        0,
                                        index
                                      ),
                                      {
                                        ...openExerciseTypeCardTextColorPicker[
                                          index
                                        ],
                                        isOpen: false,
                                      },
                                      ...openExerciseTypeCardTextColorPicker.slice(
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

                        <div
                          onClick={() => handleDeleteType(type, index)}
                          className="cursor-pointer self-end rounded-full bg-red-700 p-2 shadow-card transition-all hover:bg-red-800"
                        >
                          <Icon
                            icon={trash2Fill}
                            className="text-xl text-white"
                          />
                        </div>
                      </motion.div>
                    ))}
                </div>
              )}
            </div>

            <div className="self-end">
              <button
                onClick={handleAddNewExerciseType}
                className="rounded-full bg-blues-1 px-3 py-2 text-sm uppercase text-white shadow-card transition-all hover:bg-blues-2"
              >
                add new exercise type
              </button>
            </div>
          </div>
        </div>
      </div>
    </AnimatePresence>
  );
};

export default AddExercise;
