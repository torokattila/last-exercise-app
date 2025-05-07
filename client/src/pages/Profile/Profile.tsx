import useProfile from '../../hooks/useProfile';

import eyeOutline from '@iconify/icons-eva/eye-outline';
import emailOutline from '@iconify/icons-eva/email-outline';
import lockOutline from '@iconify/icons-eva/lock-outline';
import eyeOffOutline from '@iconify/icons-eva/eye-off-outline';
import personOutline from '@iconify/icons-eva/person-outline';
import personAddOutline from '@iconify/icons-eva/person-add-outline';
import shieldOutline from '@iconify/icons-eva/shield-outline';
import alertTriangleOutline from '@iconify/icons-eva/alert-triangle-outline';
import { Icon } from '@iconify/react';
import classNames from 'classnames';

const Profile = () => {
  const {
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
  } = useProfile();

  return (
    <div
      id="profile-page"
      className="flex h-screen w-full flex-col overflow-y-auto bg-white px-5 !pb-16 dark:bg-[#28282B] lg:pb-7"
    >
      <div className="mt-5 lg:mt-7">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
          Edit Profile <span className="ml-1">✏️</span>
        </h1>
      </div>

      <div className="mt-4 flex w-full flex-col rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 p-3 shadow-card lg:mt-10 lg:w-1/2">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold text-white">Base credentials</h2>
          <Icon icon={personAddOutline} color="white" fontSize={35} />
        </div>
        <div className="relative mt-3 flex flex-col gap-y-1">
          <label className="font-medium text-white">First name:</label>
          <input
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            placeholder={baseDataErrors.firstname ?? 'First name'}
          />
          <Icon
            className="absolute top-6 left-3"
            icon={personOutline}
            color="white"
            fontSize={25}
          />
        </div>

        <div className="relative mt-2 flex flex-col gap-y-1">
          <label className="font-medium text-white">Last name:</label>
          <input
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            placeholder={baseDataErrors.lastname ?? 'Last name'}
          />
          <Icon
            className="absolute top-6 left-3"
            icon={personOutline}
            color="white"
            fontSize={25}
          />
        </div>

        <div className="relative mt-2 flex flex-col gap-y-1 pb-2">
          <label className="font-medium text-white">Email:</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={baseDataErrors.email ?? 'Email'}
            autoComplete="new-email"
            className={classNames(
              'mt-1 rounded-full border-2 border-white bg-transparent py-1 pl-7 pr-4 text-white outline-none transition-all placeholder:text-gray-300 focus:border-cyan-200',
              {
                'border-red-400 placeholder:text-red-400': baseDataErrors.email,
              }
            )}
          />
          <Icon
            className="absolute top-6 left-3"
            icon={emailOutline}
            color="white"
            fontSize={25}
          />
        </div>

        <div className="mt-2 self-end">
          <button
            type="button"
            onClick={handleUpdateUser}
            className="rounded-full border-2 border-white px-4 py-1 uppercase text-white shadow-card transition-all hover:border-cyan-200"
          >
            Save
          </button>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-col rounded-2xl bg-gradient-to-r from-cyan-600 to-cyan-500 p-3 shadow-card lg:w-1/2">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold text-white">Password change</h2>
          <Icon icon={shieldOutline} color="white" fontSize={35} />
        </div>

        <div className="relative mt-2 flex flex-col gap-y-1 pb-2">
          <label className="font-medium text-white">Current password:</label>
          <input
            value={currentPassword}
            type={isCurrentPassword ? 'password' : 'text'}
            onChange={(e) => setCurrentPassword(e.target.value)}
            placeholder={
              passwordChangeErrors.currentPassword ?? 'Current password'
            }
            autoComplete="new-password"
            className={classNames(
              'mt-1 rounded-full border-2 border-white bg-transparent py-1 pl-7 pr-4 text-white outline-none transition-all placeholder:text-gray-300 focus:border-cyan-200',
              {
                'border-red-400 placeholder:text-red-400':
                  passwordChangeErrors.currentPassword,
              }
            )}
          />
          <Icon
            className="absolute top-6 left-3"
            icon={lockOutline}
            color="white"
            fontSize={25}
          />
          <Icon
            className="absolute top-6 right-3 cursor-pointer"
            icon={isCurrentPassword ? eyeOutline : eyeOffOutline}
            onClick={() => setIsCurrentPassword(!isCurrentPassword)}
            color="white"
            fontSize={25}
          />
        </div>

        <div className="relative mt-2 flex flex-col gap-y-1 pb-2">
          <label className="font-medium text-white">New password:</label>
          <input
            value={newPassword}
            type={isNewPassword ? 'password' : 'text'}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder={passwordChangeErrors.newPassword ?? 'New password'}
            autoComplete="new-password"
            className={classNames(
              'mt-1 rounded-full border-2 border-white bg-transparent py-1 pl-7 pr-4 text-white outline-none transition-all placeholder:text-gray-300 focus:border-cyan-200',
              {
                'border-red-400 placeholder:text-red-400':
                  passwordChangeErrors.newPassword,
              }
            )}
          />
          <Icon
            className="absolute top-6 left-3"
            icon={lockOutline}
            color="white"
            fontSize={25}
          />
          <Icon
            className="absolute top-6 right-3 cursor-pointer"
            icon={isNewPassword ? eyeOutline : eyeOffOutline}
            onClick={() => setIsNewPassword(!isNewPassword)}
            color="white"
            fontSize={25}
          />
        </div>

        <div className="relative mt-2 flex flex-col gap-y-1 pb-2">
          <label className="font-medium text-white">
            New password confirm:
          </label>
          <input
            value={newPasswordConfirm}
            type={isNewPasswordConfirm ? 'password' : 'text'}
            onChange={(e) => setNewPasswordConfirm(e.target.value)}
            placeholder={
              passwordChangeErrors.newPasswordConfirm ?? 'New password confirm'
            }
            autoComplete="new-password"
            className={classNames(
              'mt-1 rounded-full border-2 border-white bg-transparent py-1 pl-7 pr-4 text-white outline-none transition-all placeholder:text-gray-300 focus:border-cyan-200',
              {
                'border-red-400 placeholder:text-red-400':
                  passwordChangeErrors.newPasswordConfirm,
              }
            )}
          />
          <Icon
            className="absolute top-6 left-3"
            icon={lockOutline}
            color="white"
            fontSize={25}
          />
          <Icon
            className="absolute top-6 right-3 cursor-pointer"
            icon={isNewPasswordConfirm ? eyeOutline : eyeOffOutline}
            onClick={() => setIsNewPasswordConfirm(!isNewPasswordConfirm)}
            color="white"
            fontSize={25}
          />
        </div>

        <div className="mt-2 self-end">
          <button
            type="button"
            onClick={handlePasswordChangeSubmit}
            className="rounded-full border-2 border-white px-4 py-1 uppercase text-white shadow-card transition-all hover:border-cyan-200"
          >
            Save
          </button>
        </div>
      </div>

      <div className="mt-4 flex w-full flex-col gap-x-2 rounded-2xl bg-gradient-to-r from-red-500 to-orange-700 p-3 shadow-card lg:w-1/2">
        <div className="flex flex-row justify-between">
          <h2 className="text-xl font-semibold text-white">Danger zone</h2>
          <Icon icon={alertTriangleOutline} color="white" fontSize={35} />
        </div>

        <div className="mt-4">
          <button
            onClick={handleDeleteUser}
            className="mb-1 rounded-xl border-2 border-white bg-transparent px-3 py-1 font-semibold uppercase text-white shadow-card transition-all hover:bg-red-700"
          >
            delete profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
