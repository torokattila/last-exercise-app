import { useSnackbar } from 'notistack';
import { useState } from 'react';
import LocalStorageManager from '../utils/LocalStorageManager';
import useApi from './useApi';
import * as Yup from 'yup';
import UserEditPayload from '../api/payloads/UserEditPayload';
import PasswordChangePayload from '../api/payloads/PasswordChangePayload';
import { confirmAlert } from 'react-confirm-alert';
import ConfirmAlertLayout from '../components/shared/ConfirmAlertLayout';
import { useNavigate } from 'react-router-dom';

const useProfile = () => {
  const apiClient = useApi();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const user = LocalStorageManager.getUser();
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>(user?.email ?? '');
  const [firstname, setFirstname] = useState<string>(user?.firstname ?? '');
  const [lastname, setLastname] = useState<string>(user?.lastname ?? '');
  const [currentPassword, setCurrentPassword] = useState<string>(
    user?.password ?? ''
  );
  const [isCurrentPassword, setIsCurrentPassword] = useState<boolean>(true);
  const [newPassword, setNewPassword] = useState<string>('');
  const [isNewPassword, setIsNewPassword] = useState<boolean>(true);
  const [newPasswordConfirm, setNewPasswordConfirm] = useState<string>('');
  const [isNewPasswordConfirm, setIsNewPasswordConfirm] =
    useState<boolean>(true);

  const [baseDataErrors, setBaseDataErrors] = useState<{
    [key: string]: string;
  }>({});
  const [passwordChangeErrors, setPasswordChangeErrors] = useState<{
    [key: string]: string;
  }>({});

  const UserEditSchema = Yup.object().shape({
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    email: Yup.string().required('Email is required'),
  });

  const PasswordChangeSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string().required('New password is required'),
    newPasswordConfirm: Yup.string()
      .required('Confirm password is required')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const editedUser: UserEditPayload = {
    email,
    firstname,
    lastname,
  };

  const passwordChangeData: PasswordChangePayload = {
    currentPassword,
    newPassword,
    newPasswordConfirm,
  };

  const verifyBaseDataForm = async (): Promise<boolean> => {
    try {
      await UserEditSchema.validate(editedUser, { abortEarly: false });
      setBaseDataErrors({});

      return Promise.resolve(true);
    } catch (error: any) {
      const newErrors: { [key: string]: string } = {};

      for (const err of error.inner) {
        newErrors[err.path] = err.message;
      }

      setBaseDataErrors(newErrors);
      return Promise.resolve(false);
    }
  };

  const verifyPasswordChangeForm = async (): Promise<boolean> => {
    try {
      await PasswordChangeSchema.validate(passwordChangeData, {
        abortEarly: false,
      });
      setPasswordChangeErrors({});

      return Promise.resolve(true);
    } catch (error: any) {
      const newErrors: { [key: string]: string } = {};

      for (const err of error.inner) {
        newErrors[err.path] = err.message;
      }

      setPasswordChangeErrors(newErrors);
      return Promise.resolve(false);
    }
  };

  const updateUser = async (): Promise<void> => {
    const payload: UserEditPayload = {
      firstname,
      lastname,
      email,
    };

    const isVerified = await verifyBaseDataForm();

    if (isVerified) {
      try {
        await apiClient.updateUser(user?.id ?? '', payload);

        const key = enqueueSnackbar('User data updated!', {
          variant: 'success',
          autoHideDuration: 3000,
          onClick: () => {
            closeSnackbar(key);
          },
        });
      } catch (error: any) {
        if (error.response.data.errors[0] === 'existing_email') {
          const key = enqueueSnackbar('Email already exists!', {
            variant: 'error',
            autoHideDuration: 3000,
            onClick: () => {
              closeSnackbar(key);
            },
          });
        } else {
          const key = enqueueSnackbar('Unsuccessful modification!', {
            variant: 'error',
            autoHideDuration: 3000,
            onClick: () => {
              closeSnackbar(key);
            },
          });
        }
      }
    } else {
      const key = enqueueSnackbar('Validation error!', {
        variant: 'error',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });
    }
  };

  const handleUpdateUser = (): void => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <ConfirmAlertLayout>
            <>
              <p className="text-md text-left font-medium text-gray-800 lg:text-lg lg:font-bold">
                Are you sure you want update your credentials?
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
                    updateUser();
                    onClose();
                  }}
                >
                  update
                </button>
              </div>
            </>
          </ConfirmAlertLayout>
        );
      },
    });
  };

  const passwordChangeSubmit = async (): Promise<void> => {
    const payload: PasswordChangePayload = {
      currentPassword,
      newPassword,
      newPasswordConfirm,
    };

    const isVerified = await verifyPasswordChangeForm();

    if (isVerified) {
      try {
        await apiClient.updateUserPassword(user?.id ?? '', payload);

        const key = enqueueSnackbar('Password updated!', {
          variant: 'success',
          autoHideDuration: 3000,
          onClick: () => {
            closeSnackbar(key);
          },
        });

        setCurrentPassword('');
        setNewPassword('');
        setNewPasswordConfirm('');
      } catch (error: any) {
        if (error.response.data.errors[0] === 'invalid_current_password') {
          const key = enqueueSnackbar('Invalid current password!', {
            variant: 'error',
            autoHideDuration: 3000,
            onClick: () => {
              closeSnackbar(key);
            },
          });
        } else {
          const key = enqueueSnackbar('Password change failed!', {
            variant: 'error',
            autoHideDuration: 3000,
            onClick: () => {
              closeSnackbar(key);
            },
          });
        }
      }
    } else {
      const key = enqueueSnackbar('Validation error!', {
        variant: 'error',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });
    }
  };

  const handlePasswordChangeSubmit = (): void => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <ConfirmAlertLayout>
            <>
              <p className="text-md text-left font-medium text-gray-800 lg:text-lg lg:font-bold">
                Are you sure you want change your password?
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
                    passwordChangeSubmit();
                    onClose();
                  }}
                >
                  update
                </button>
              </div>
            </>
          </ConfirmAlertLayout>
        );
      },
    });
  };

  const deleteUser = async (): Promise<void> => {
    try {
      await apiClient.deleteUser(user?.id ?? '');
      await LocalStorageManager.removeLocalStorage();
      navigate('/');
    } catch (error: any) {
      const key = enqueueSnackbar('Delete failed!', {
        variant: 'error',
        autoHideDuration: 3000,
        onClick: () => {
          closeSnackbar(key);
        },
      });
    }
  };

  const handleDeleteUser = (): void => {
    confirmAlert({
      customUI: ({ onClose }: { onClose: () => void }) => {
        return (
          <ConfirmAlertLayout>
            <>
              <p className="text-md text-left font-medium text-gray-800 lg:text-lg lg:font-bold">
                Are you sure you want to delete your account?
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
                    deleteUser();
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
    user,
    email,
    setEmail,
    firstname,
    setFirstname,
    lastname,
    setLastname,
    currentPassword,
    setCurrentPassword,
    newPassword,
    setNewPassword,
    newPasswordConfirm,
    setNewPasswordConfirm,
    isCurrentPassword,
    setIsCurrentPassword,
    isNewPassword,
    setIsNewPassword,
    isNewPasswordConfirm,
    setIsNewPasswordConfirm,
    baseDataErrors,
    passwordChangeErrors,
    handlePasswordChangeSubmit,
    handleUpdateUser,
    handleDeleteUser,
  };
};

export default useProfile;
