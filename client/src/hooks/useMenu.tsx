import { useMemo } from 'react';
import useLogout from './useLogout';
import { confirmAlert } from 'react-confirm-alert';
import { useLocation, useNavigate } from 'react-router-dom';

const useMenu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { handleLogoutConfirm } = useLogout();

  const isHomePage = useMemo(() => {
    return location.pathname === '/';
  }, [location.pathname]);
  const isProfilePage = useMemo(() => {
    return location.pathname === '/profile';
  }, [location.pathname]);
  const isExercisePage = useMemo(() => {
    return location.pathname.includes('/exercises');
  }, [location.pathname]);

  const handleNavigateToOtherPage = (
    page: 'home' | 'profile' | 'calendar'
  ): void => {
    switch (page) {
      case 'home':
        navigate('/');
        break;
      case 'profile':
        navigate('/profile');
        break;
      case 'calendar':
        navigate('/calendar');
        break;
      default:
        throw new Error('Invalid page');
    }
  };

  const handleLeavePage = (
    onClose: () => void,
    page: 'home' | 'profile' | 'calendar'
  ) => {
    onClose();
    switch (page) {
      case 'profile':
        return handleNavigateToOtherPage('profile');
      case 'home':
        return handleNavigateToOtherPage('home');
      case 'calendar':
        return handleNavigateToOtherPage('calendar');
      default:
        return;
    }
  };

  const handleConfirmPageNavigation = (
    page: 'home' | 'profile' | 'calendar'
  ): void => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <div className="rounded-2xl bg-white p-3 shadow-card backdrop-blur-xl lg:p-4">
            <p className="text-md text-left font-medium text-gray-800 lg:text-lg lg:font-bold">
              Are you sure you want to leave this page?
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
                onClick={() => handleLeavePage(onClose, page)}
              >
                Leave
              </button>
            </div>
          </div>
        );
      },
    });
  };

  return {
    handleLogoutConfirm,
    isHomePage,
    isProfilePage,
    isExercisePage,
    handleNavigateToOtherPage,
    handleConfirmPageNavigation,
  };
};

export default useMenu;
