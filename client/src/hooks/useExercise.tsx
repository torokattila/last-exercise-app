import { useSnackbar } from 'notistack';
import { confirmAlert } from 'react-confirm-alert';
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
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
    async () => await apiClient.getExercise(params.exerciseId as string),
    {
      refetchOnWindowFocus: false,
    }
  );

  const finishExercise = async (exerciseId: string): Promise<boolean> => {
    try {
      await apiClient.finishExercise(user?.id ?? '', exerciseId);

      refetchUser();

      const key = enqueueSnackbar('Last exercise updated!', {
        variant: 'success',
        onClick: () => {
          closeSnackbar(key);
        },
      });

      navigate('/');

      return true;
    } catch (error: any) {
      const key = enqueueSnackbar('Error in last exercise update!', {
        variant: 'error',
        onClick: () => {
          closeSnackbar(key);
        },
      });

      return false;
    }
  };

  const handleFinishExercise = (exerciseId: string) => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <div className="shadow-card bg-white p-3 lg:p-4 rounded-2xl backdrop-blur-xl">
            <p className="text-left text-gray-800 font-medium lg:font-bold text-md lg:text-lg">
              Are you sure you want to finish the exercise?
            </p>

            <div className="mt-4 flex flex-row gap-x-2 justify-end">
              <button
                className="px-2 py-1 uppercase bg-[#4A9ECC] hover:bg-[#0e6696] rounded-full text-white transition-all"
                onClick={() => onClose()}
              >
                cancel
              </button>

              <button
                className="px-2 py-1 uppercase bg-red-500 transition-all hover:bg-red-700 rounded-full text-white font-bold"
                onClick={() => {
                  finishExercise(exerciseId);
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

  return {
    isLoading,
    currentExercise,
    refetch,
    handleFinishExercise,
  };
};

export default useExercise;
