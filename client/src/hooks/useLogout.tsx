import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import LocalStorageManager from '../utils/LocalStorageManager';
import ConfirmAlertLayout from '../components/shared/ConfirmAlertLayout';

const useLogout = () => {
  const navigate = useNavigate();

  const logout = () => {
    LocalStorageManager.removeLocalStorage();
    navigate('/login');
  };

  const handleLogoutConfirm = (): void => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <div className="rounded-2xl bg-white p-3 shadow-card backdrop-blur-xl lg:p-4">
            <p className="text-md text-left font-medium text-gray-800 lg:text-lg lg:font-bold">
              Are you sure you want to Log Out?
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
                  logout();
                  onClose();
                }}
              >
                logout
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return { handleLogoutConfirm };
};

export default useLogout;
