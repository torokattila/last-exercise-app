import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { confirmAlert } from 'react-confirm-alert';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import ExercisePayload from '../api/payloads/ExercisePayload';
import ConfirmAlertLayout from '../components/shared/ConfirmAlertLayout';
import Exercise from '../models/Exercise';
import ExerciseType from '../models/ExerciseType';
import useApi from './useApi';
import useHome from './useHome';

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
    async () =>
      await apiClient.getExercise(Number(params.exerciseId)),
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
    exerciseId: number,
    duration: string
  ): Promise<boolean> => {
    try {
      await apiClient.finishExercise(
        Number(user?.id) ?? null,
        exerciseId,
        duration
      );

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

  const handleFinishExercise = (exerciseId: number, duration: string): void => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <ConfirmAlertLayout>
            <>
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
            </>
          </ConfirmAlertLayout>
        );
      },
    });
  };

  const deleteType = async (typeId: number): Promise<boolean> => {
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

  const handleDeleteExerciseType = (typeId: number): void => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <ConfirmAlertLayout>
            <>
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
            </>
          </ConfirmAlertLayout>
        );
      },
    });
  };

  const editExercise = async (exercise: Exercise): Promise<boolean> => {
    try {
      await apiClient.editExercise(Number(exercise.id), exercise);

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

  const handleEditExercise = (exercise: Exercise): void => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <ConfirmAlertLayout>
            <>
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
            </>
          </ConfirmAlertLayout>
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

  const handleCreateExercise = (exercise: ExercisePayload): void => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <ConfirmAlertLayout>
            <>
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
            </>
          </ConfirmAlertLayout>
        );
      },
    });
  };

  const deleteExercise = async (exerciseId: number): Promise<boolean> => {
    try {
      await apiClient.deleteExercise(exerciseId);

      refetch();
      refetchUser();

      navigate('/');

      const key = enqueueSnackbar('Exercise deleted!', {
        variant: 'success',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });

      return true;
    } catch (error: any) {
      const key = enqueueSnackbar('Error in Exercise delete!', {
        variant: 'error',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });

      return false;
    }
  };

  const handleDeleteExercise = (exerciseId: number | undefined): void => {
    if (!exerciseId) return;
    
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <ConfirmAlertLayout>
            <>
              <p className="text-md text-left font-medium text-gray-800 lg:text-lg lg:font-bold">
                Are you sure you want to delete this Exercise?
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
                    deleteExercise(exerciseId);
                    onClose();
                  }}
                >
                  delete
                </button>
              </div>
            </>
          </ConfirmAlertLayout>
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
    handleDeleteExercise,
  };
};

export default useExercise;
