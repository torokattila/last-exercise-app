import { useNavigate } from 'react-router-dom';
import { Tooltip } from '@mui/material';

const AddExerciseButton = () => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Create new workout" arrow placement="left">
      <button
        className={`
          w-[80%] rounded-2xl 
          bg-[#4A9ECB] py-2 px-3 font-semibold uppercase text-white
          shadow-card transition-all hover:rotate-90 hover:bg-[#0e6696]
        `}
        onClick={() => navigate('/exercises/add')}
      >
        Add new workout
      </button>
    </Tooltip>
  );
};

export default AddExerciseButton;
