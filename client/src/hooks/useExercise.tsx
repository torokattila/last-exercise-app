import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ExercisePayload from '../api/payloads/ExercisePayload';
import Exercise from '../models/Exercise';
import ExerciseType from '../models/ExerciseType';
import useApi from './useApi';
import useHome from './useHome';
import { motion, AnimatePresence } from 'framer-motion';

const useExercise = () => {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const apiClient = useApi();
  const { user, refetchUser } = useHome();
  const navigate = useNavigate();
  const params = useParams();

  const {
    isLoading,
    data: currentExercise,
    refetch,
  } = useQuery(
    ['getExercise', { exerciseId: params.exerciseId }],
    async () => await apiClient.getExercise(params.exerciseId as string),
    {
      refetchOnWindowFocus: false,
    }
  );

  const sortExerciseTypesByOrder = (
    a: ExerciseType,
    b: ExerciseType
  ): number => {
    if (a.order === b.order) {
      if ((a.modified ?? '') < (b.modified ?? '')) return -1;
      if ((a.modified ?? '') > (b.modified ?? '')) return 1;
      return 0;
    } else {
      return a.order - b.order;
    }
  };

  const sortedExerciseTypes = useMemo(() => {
    if (currentExercise?.exerciseTypes) {
      return currentExercise?.exerciseTypes.sort(sortExerciseTypesByOrder);
    } else {
      return [];
    }
  }, [currentExercise]);

  const finishExercise = async (
    exerciseId: string,
    duration: string
  ): Promise<boolean> => {
    try {
      await apiClient.finishExercise(user?.id ?? '', exerciseId, duration);

      refetchUser();

      const key = enqueueSnackbar('Last exercise updated!', {
        variant: 'success',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });

      navigate('/');

      return true;
    } catch (error: any) {
      const key = enqueueSnackbar('Error in last exercise update!', {
        variant: 'error',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });

      return false;
    }
  };

  const handleFinishExercise = (exerciseId: string, duration: string) => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <div className="rounded-2xl bg-white p-3 shadow-card backdrop-blur-xl lg:p-4">
            <p className="text-md text-left font-medium text-gray-800 lg:text-lg lg:font-bold">
              Are you sure you want to finish the exercise?
            </p>

            <div className="mt-4 flex flex-row justify-end gap-x-2">
              <button
                className="rounded-full bg-[#4A9ECC] px-2 py-1 uppercase text-white transition-all hover:bg-[#0e6696]"
                onClick={() => onClose()}
              >
                cancel
              </button>

              <button
                className="rounded-full bg-red-500 px-2 py-1 font-bold uppercase text-white transition-all hover:bg-red-700"
                onClick={() => {
                  finishExercise(exerciseId, duration);
                  onClose();
                }}
              >
                finish
              </button>
            </div>
          </div>
        );
      },
    });
  };

  const deleteType = async (typeId: string): Promise<boolean> => {
    try {
      await apiClient.deleteExerciseType(typeId);

      refetch();

      const key = enqueueSnackbar('Exercise type deleted!', {
        variant: 'success',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });

      return true;
    } catch (error: any) {
      const key = enqueueSnackbar('Error in delete exercise type!', {
        variant: 'error',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });

      return false;
    }
  };

  const handleDeleteExerciseType = (typeId: string) => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <>
            <div className="fixed top-0 left-0 z-10 h-screen w-full bg-black opacity-80" />
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
              className="rounded-t-1.5 fixed inset-0 top-0 left-0 right-0 z-50 my-auto mx-auto h-20 overflow-auto rounded-2xl bg-white p-3 align-middle opacity-100 shadow-card lg:w-65"
            >
              <p className="text-md text-left font-medium text-gray-800 lg:text-lg lg:font-bold">
                Are you sure you want to delete the Exercise type?
              </p>

              <div className="mt-4 flex flex-row justify-end gap-x-2">
                <button
                  className="rounded-full bg-[#4A9ECC] px-2 py-1 uppercase text-white transition-all hover:bg-[#0e6696]"
                  onClick={() => onClose()}
                >
                  cancel
                </button>

                <button
                  className="rounded-full bg-red-500 px-2 py-1 font-bold uppercase text-white transition-all hover:bg-red-700"
                  onClick={() => {
                    deleteType(typeId);
                    onClose();
                  }}
                >
                  finish
                </button>
              </div>
            </motion.div>
          </>
        );
      },
    });
  };

  const editExercise = async (exercise: Exercise): Promise<boolean> => {
    try {
      await apiClient.editExercise(exercise.id, exercise);

      refetch();
      refetchUser();

      navigate('/');

      const key = enqueueSnackbar('Exercise updated!', {
        variant: 'success',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });

      return true;
    } catch (error: any) {
      const key = enqueueSnackbar('Error in Exercise update!', {
        variant: 'error',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });

      return false;
    }
  };

  const handleEditExercise = (exercise: Exercise) => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <>
            <div className="fixed top-0 left-0 z-10 h-screen w-full bg-black opacity-80" />
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
              className="rounded-t-1.5 fixed inset-0 top-0 left-0 right-0 z-50 my-auto mx-auto h-20 overflow-auto rounded-2xl bg-white p-3 align-middle opacity-100 shadow-card lg:w-65"
            >
              <p className="text-md text-left font-medium text-gray-800 lg:text-lg lg:font-bold">
                Are you sure you want to edit this Exercise?
              </p>

              <div className="mt-4 flex flex-row justify-end gap-x-2">
                <button
                  className="rounded-full bg-[#4A9ECC] px-2 py-1 uppercase text-white transition-all hover:bg-[#0e6696]"
                  onClick={() => onClose()}
                >
                  cancel
                </button>

                <button
                  className="rounded-full bg-red-500 px-2 py-1 font-bold uppercase text-white transition-all hover:bg-red-700"
                  onClick={() => {
                    editExercise(exercise);
                    onClose();
                  }}
                >
                  edit
                </button>
              </div>
            </motion.div>
          </>
        );
      },
    });
  };

  const createExercise = async (
    exercise: ExercisePayload
  ): Promise<boolean> => {
    try {
      await apiClient.createExercise(exercise);

      refetchUser();

      navigate('/');

      const key = enqueueSnackbar('Exercise created!', {
        variant: 'success',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });

      return true;
    } catch (error: any) {
      const key = enqueueSnackbar('Error in Exercise create!', {
        variant: 'error',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });

      return false;
    }
  };

  const handleCreateExercise = (exercise: ExercisePayload) => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <>
            <div className="fixed top-0 left-0 z-10 h-screen w-full bg-black opacity-80" />
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
              className="rounded-t-1.5 fixed inset-0 top-0 left-0 right-0 z-50 my-auto mx-auto h-20 overflow-auto rounded-2xl bg-white p-3 align-middle opacity-100 shadow-card lg:w-65"
            >
              <p className="text-md text-left font-medium text-gray-800 lg:text-lg lg:font-bold">
                Are you sure you want to create this Exercise?
              </p>

              <div className="mt-4 flex flex-row justify-end gap-x-2">
                <button
                  className="rounded-full bg-[#4A9ECC] px-2 py-1 uppercase text-white transition-all hover:bg-[#0e6696]"
                  onClick={() => onClose()}
                >
                  cancel
                </button>

                <button
                  className="rounded-full bg-red-500 px-2 py-1 font-bold uppercase text-white transition-all hover:bg-red-700"
                  onClick={() => {
                    createExercise(exercise);
                    onClose();
                  }}
                >
                  create
                </button>
              </div>
            </motion.div>
          </>
        );
      },
    });
  };

  return {
    isLoading,
    currentExercise,
    refetch,
    handleFinishExercise,
    sortedExerciseTypes,
    handleDeleteExerciseType,
    handleEditExercise,
    user,
    handleCreateExercise,
  };
};

export default useExercise;
