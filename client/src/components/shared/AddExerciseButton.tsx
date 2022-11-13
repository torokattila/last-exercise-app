import { useNavigate } from 'react-router-dom';

import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import { Tooltip } from '@mui/material';

const AddExerciseButton = () => {
  const navigate = useNavigate();

  return (
    <Tooltip title="Add exercise" arrow placement="left">
      <button
        className="bg-[#4A9ECB] hover:bg-[#0e6696] text-white transition-all hover:rotate-90 shadow-card rounded-full p-1.5"
        onClick={() => navigate('/exercises/add')}
      >
        <Icon icon={plusFill} className="text-3xl lg:text-4xl" />
      </button>
    </Tooltip>
  );
};

export default AddExerciseButton;
