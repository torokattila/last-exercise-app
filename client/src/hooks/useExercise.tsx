import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import useApi from './useApi';

const useExercise = () => {
  const apiClient = useApi();
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

  return {
    isLoading,
    currentExercise,
    refetch,
  };
};

export default useExercise;
