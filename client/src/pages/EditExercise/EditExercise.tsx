import useExercise from '../../hooks/useExercise';
import { HexColorPicker } from 'react-colorful';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ExerciseType from '../../models/ExerciseType';

import saveOutline from '@iconify/icons-eva/save-outline';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { Icon } from '@iconify/react';
import useHome from '../../hooks/useHome';
import { ExerciseTypeCardColorOpen } from '../../@types/ExerciseTypeCardColorOpen';

const EditExercise = () => {
  const {
    currentExercise,
    handleDeleteExerciseType,
    handleEditExercise,
    handleDeleteExercise,
  } = useExercise();
  const { user } = useHome();

  const [exerciseId, setExerciseId] = useState<number | undefined>(
    currentExercise?.id ?? undefined
  );
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
  const [exerciseDuration, setExerciseDuration] = useState<string>(
    currentExercise?.duration ?? ''
  );

  const [openExerciseColorPicker, setOpenExeriseColorPicker] =
    useState<boolean>(false);
  const [openExerciseTextColorPicker, setOpenExerciseTextColorPicker] =
    useState<boolean>(false);
  const [openExerciseTypeCardColorPicker, setOpenExerciseTypeCardColorPicker] =
    useState<ExerciseTypeCardColorOpen[]>([]);
  const [
    openExerciseTypeCardTextColorPicker,
    setOpenExerciseTypeCardTextColorPicker,
  ] = useState<ExerciseTypeCardColorOpen[]>([]);

  useEffect(() => {
    setExerciseId(currentExercise?.id ?? undefined);
    setExerciseCardColor(currentExercise?.cardColor ?? '');
    setExerciseName(currentExercise?.name ?? '');
    setExerciseOrder(currentExercise?.order ?? 0);
    setExerciseTextColor(currentExercise?.textColor ?? '');
    setExerciseTypes(currentExercise?.exerciseTypes ?? []);
    setExerciseDuration(currentExercise?.duration ?? '');
  }, [currentExercise]);

  useEffect(() => {
    if (exerciseTypes.length > 0) {
      const initialOpenExerciseTypeCardColorValues: ExerciseTypeCardColorOpen[] =
        [];
      const initialOpenExerciseTypeCardTextColorValues: ExerciseTypeCardColorOpen[] =
        [];

      for (let i = 0; i < exerciseTypes.length; i++) {
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
  }, [exerciseTypes.length]);

  const handleAddNewExerciseType = () => {
    const types = [...exerciseTypes];
    const newExerciseType: ExerciseType = {
      id: undefined,
      name: '',
      order: 1,
      cardTextColor: '#fff',
      seriesCardsColor: '#005A92',
      seriesCardNumber: null,
      numberOfRepetitions: null,
    };
    types.push(newExerciseType);
    setExerciseTypes(types);
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

  const handleDeleteType = (type: ExerciseType) => {
    if (!type?.id) {
      const currentExerciseTypes = [...exerciseTypes];
      currentExerciseTypes.pop();
      setExerciseTypes(currentExerciseTypes);
    } else {
      handleDeleteExerciseType(type.id);
    }
  };

  return (
    <AnimatePresence>
      <div
        style={{
          backgroundColor: exerciseCardColor,
        }}
        className={`relative lg:!bg-white dark:lg:!bg-[#28282B]`}
      >
        <div className="relative flex h-full w-full flex-col gap-y-4 lg:gap-y-0">
          <div className="mt-5 flex w-full items-center justify-center lg:justify-start lg:px-5">
            <h1
              style={{
                color: exerciseTextColor,
              }}
              className="text-2xl font-bold lg:!text-gray-800 dark:lg:!text-white"
            >
              {currentExercise?.name}
            </h1>
          </div>

          <div className="relative flex w-full flex-col gap-y-4 rounded-t-[40px] bg-white px-5 pb-15 dark:bg-[#28282B] lg:rounded-none">
            <div className="fixed top-17 right-3 flex flex-col items-end gap-y-2 lg:top-10">
              <button
                onClick={() => {
                  handleEditExercise({
                    id: exerciseId,
                    userId: Number(user?.id) ?? undefined,
                    cardColor: exerciseCardColor,
                    duration: exerciseDuration,
                    exerciseTypes: exerciseTypes,
                    name: exerciseName,
                    order: Number(exerciseOrder),
                    textColor: exerciseTextColor,
                  });
                }}
                style={{
                  backgroundColor: exerciseCardColor,
                  color: exerciseTextColor,
                }}
                className="rounded-full px-3 py-2 uppercase shadow-card transition-all hover:opacity-90"
              >
                Edit
              </button>

              <button
                onClick={() => handleDeleteExercise(exerciseId ?? undefined)}
                className="flex h-7 w-7 flex-col items-center justify-center rounded-full bg-red-700 p-2 uppercase shadow-card transition-all hover:bg-red-800"
              >
                <Icon icon={trash2Fill} className="text-2xl text-white" />
              </button>
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
                      setOpenExerciseTextColorPicker(
                        !openExerciseTextColorPicker
                      )
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

            <div className="flex flex-col xl:w-1/3">
              <label className="mb-1 font-medium dark:text-white">
                Exercise name:
              </label>
              <input
                style={{
                  borderColor: exerciseCardColor,
                }}
                className="w-full rounded-full border-2 bg-transparent py-1.5 px-3 outline-none transition-all focus:shadow-card dark:text-white"
                value={exerciseName}
                onChange={(e) => setExerciseName(e.target.value)}
                placeholder="Exercise Name"
              />
            </div>

            <div className="flex flex-col xl:w-1/3">
              <label className="mb-1 font-medium dark:text-white">
                Exercise order on the Home page:
              </label>
              <input
                style={{
                  borderColor: exerciseCardColor,
                }}
                className="w-full rounded-full border-2 bg-transparent py-1.5 px-3 outline-none transition-all focus:shadow-card dark:text-white"
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

            <div className="xl:w-1/3">
              <h3 className="font-semibold text-gray-800 dark:text-white">
                Exercise types:
              </h3>

              {exerciseTypes && (
                <div className="mt-2 flex flex-col gap-y-2">
                  {exerciseTypes.length > 0 &&
                    exerciseTypes.map((type, index: number) => (
                      <motion.div
                        style={{
                          backgroundColor:
                            exerciseTypes[index].seriesCardsColor,
                        }}
                        key={`${index}_${type.id}`}
                        className="flex flex-col gap-y-3 rounded-2xl p-2 shadow-card"
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
                          <label
                            style={{
                              color: exerciseTypes[index].cardTextColor,
                            }}
                            className="font-medium"
                          >
                            Name:
                          </label>
                          <input
                            className="w-full rounded-full border-2 bg-white py-1.5 px-3 outline-none transition-all focus:shadow-card dark:bg-[#28282B] dark:text-white"
                            type="text"
                            value={type.name}
                            onChange={(e) => {
                              setExerciseTypes([
                                ...exerciseTypes.slice(0, index),
                                {
                                  ...exerciseTypes[index],
                                  name: e.target.value,
                                },
                                ...exerciseTypes.slice(index + 1),
                              ]);
                            }}
                          />
                        </div>

                        <div className="flex flex-col gap-y-1">
                          <label
                            style={{
                              color: exerciseTypes[index].cardTextColor,
                            }}
                            className="font-medium"
                          >
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
                          <label
                            style={{
                              color: exerciseTypes[index].cardTextColor,
                            }}
                            className="font-medium"
                          >
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
                          <label
                            style={{
                              color: exerciseTypes[index].cardTextColor,
                            }}
                            className="font-medium"
                          >
                            Number of repetitions:
                          </label>
                          <input
                            value={Number(type.numberOfRepetitions)}
                            type="number"
                            className="w-full rounded-full border-2 bg-white py-1.5 px-3 outline-none transition-all focus:shadow-card dark:bg-[#28282B] dark:text-white"
                            onChange={(e) => {
                              setExerciseTypes([
                                ...exerciseTypes.slice(0, index),
                                {
                                  ...exerciseTypes[index],
                                  numberOfRepetitions: Number(e.target.value),
                                },
                                ...exerciseTypes.slice(index + 1),
                              ]);
                            }}
                          />
                        </div>

                        <div className="flex flex-col gap-y-1">
                          <label
                            style={{
                              color: exerciseTypes[index].cardTextColor,
                            }}
                            className="font-medium"
                          >
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
                          <label
                            style={{
                              color: exerciseTypes[index].cardTextColor,
                            }}
                            className="font-medium"
                          >
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
                                    exerciseTypes[index].cardTextColor,
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
                                  color={exerciseTypes[index].cardTextColor}
                                  onChange={(value) => {
                                    setExerciseTypes([
                                      ...exerciseTypes.slice(0, index),
                                      {
                                        ...exerciseTypes[index],
                                        cardTextColor: value,
                                      },
                                      ...exerciseTypes.slice(index + 1),
                                    ]);
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
                          onClick={() => handleDeleteType(type)}
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
                style={{
                  backgroundColor: exerciseCardColor,
                  color: exerciseTextColor,
                }}
                onClick={handleAddNewExerciseType}
                className="rounded-full px-3 py-2 text-sm uppercase shadow-card transition-all hover:opacity-90"
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

export default EditExercise;
