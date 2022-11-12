import eyeOutline from '@iconify/icons-eva/eye-outline';
import emailOutline from '@iconify/icons-eva/email-outline';
import lockOutline from '@iconify/icons-eva/lock-outline';
import personOutline from '@iconify/icons-eva/person-outline';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import eyeOffOutline from '@iconify/icons-eva/eye-off-outline';
import { motion, AnimatePresence } from 'framer-motion';
import classNames from 'classnames';
import useRegister from '../../hooks/useRegister';

const RegistrationForm = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    firstname,
    setFirstname,
    lastname,
    setLastname,
    email,
    setEmail,
    password,
    setPassword,
    passwordConfirm,
    setPasswordConfirm,
    isPassword,
    setIsPassword,
    isPasswordConfirm,
    setIsPasswordConfirm,
    handleSubmit,
    errors,
  } = useRegister();

  return (
    <AnimatePresence>
      <motion.div className="mt-6 flex flex-col items-center px-2 lg:px-0">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-y-3">
            <motion.div
              className="relative"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1,
              }}
            >
              <input
                type="email"
                autoComplete="new-email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder={errors.email ? errors.email : 'Email'}
                value={email}
                className={classNames(
                  `border-2 w-full border-white bg-transparent rounded-full py-1.5 pl-8 pr-4 focus:border-blues-1 outline-none transition-all`,
                  {
                    'text-greys-1': !email.length,
                    'text-white': email.length,
                    'border-red-400 placeholder-red-400': errors.email,
                  }
                )}
              />
              <Icon
                className="absolute top-1.5 left-3"
                icon={emailOutline}
                color={`#4A9ECB`}
                fontSize={25}
              />
            </motion.div>

            <motion.div
              className="relative flex flex-row gap-x-2"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 1.5,
              }}
            >
              <div className="relative">
                <input
                  type="text"
                  autoComplete="new-firstname"
                  onChange={(e) => setFirstname(e.target.value)}
                  placeholder={
                    errors.firstname ? errors.firstname : 'First name'
                  }
                  value={firstname}
                  className={classNames(
                    `border-2 w-full border-white bg-transparent rounded-full py-1.5 pl-7 pr-4 focus:border-blues-1 outline-none transition-all`,
                    {
                      'text-greys-1': !firstname.length,
                      'text-white': firstname.length,
                      'border-red-400 placeholder-red-400': errors.firstname,
                    }
                  )}
                />
                <Icon
                  className="absolute top-1.5 left-3"
                  icon={personOutline}
                  color={`#4A9ECB`}
                  fontSize={25}
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  autoComplete="new-lastname"
                  onChange={(e) => setLastname(e.target.value)}
                  placeholder={errors.lastname ? errors.lastname : 'Last name'}
                  value={lastname}
                  className={classNames(
                    `border-2 w-full border-white bg-transparent rounded-full py-1.5 pl-7 pr-4 focus:border-blues-1 outline-none transition-all`,
                    {
                      'text-greys-1': !lastname.length,
                      'text-white': lastname.length,
                      'border-red-400 placeholder-red-400': errors.lastname,
                    }
                  )}
                />
                <Icon
                  className="absolute top-1.5 left-3"
                  icon={personOutline}
                  color={`#4A9ECB`}
                  fontSize={25}
                />
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 2,
              }}
            >
              <input
                type={isPassword ? 'password' : 'text'}
                autoComplete="new-password"
                placeholder={errors.password ? errors.password : 'Password'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={classNames(
                  `border-2 w-full border-white bg-transparent rounded-full py-1.5 pl-8 pr-4 focus:border-blues-1 outline-none transition-all`,
                  {
                    'text-greys-1': !password.length,
                    'text-white': password.length,
                    'border-red-400 placeholder-red-400': errors.password,
                  }
                )}
              />
              <Icon
                className="absolute top-1.5 left-3"
                icon={lockOutline}
                color={`#4A9ECB`}
                fontSize={25}
              />
              <Icon
                className="absolute top-1.5 right-3 cursor-pointer"
                icon={isPassword ? eyeOutline : eyeOffOutline}
                onClick={() => setIsPassword(!isPassword)}
                color={`#4A9ECB`}
                fontSize={25}
              />
            </motion.div>

            <motion.div
              className="relative"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 2.5,
              }}
            >
              <input
                type={isPasswordConfirm ? 'password' : 'text'}
                autoComplete="new-password-confirm"
                placeholder={
                  errors.passwordConfirm
                    ? errors.passwordConfirm
                    : 'Confirm password'
                }
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
                className={classNames(
                  `border-2 w-full border-white bg-transparent rounded-full py-1.5 pl-8 pr-4 focus:border-blues-1 outline-none transition-all`,
                  {
                    'text-greys-1': !passwordConfirm.length,
                    'text-white': passwordConfirm.length,
                    'border-red-400 placeholder-red-400':
                      errors.passwordConfirm,
                  }
                )}
              />
              <Icon
                className="absolute top-1.5 left-3"
                icon={lockOutline}
                color={`#4A9ECB`}
                fontSize={25}
              />
              <Icon
                className="absolute top-1.5 right-3 cursor-pointer"
                icon={isPasswordConfirm ? eyeOutline : eyeOffOutline}
                onClick={() => setIsPasswordConfirm(!isPasswordConfirm)}
                color={`#4A9ECB`}
                fontSize={25}
              />
            </motion.div>

            <motion.div
              className="relative flex flex-row gap-x-1 mt-1 justify-between"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: 2,
              }}
            >
              <button
                onClick={() => navigate('/login')}
                type="button"
                className="p-1.5 border-white transition-all uppercase rounded-full text-white hover:text-[#4A9ECC] w-full"
              >
                login
              </button>

              <button className="p-1.5 hover:bg-[#0e6696] transition-all bg-[#4A9ECC] w-full rounded-full uppercase text-white">
                register
              </button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default RegistrationForm;
