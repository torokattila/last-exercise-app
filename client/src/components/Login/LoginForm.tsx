import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import eyeOutline from '@iconify/icons-eva/eye-outline';
import emailOutline from '@iconify/icons-eva/email-outline';
import lockOutline from '@iconify/icons-eva/lock-outline';
import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import eyeOffOutline from '@iconify/icons-eva/eye-off-outline';
import useLogin from '../../hooks/useLogin';

const LoginForm = (): JSX.Element => {
  const navigate = useNavigate();
  const {
    email,
    setEmail,
    password,
    setPassword,
    isPassword,
    setIsPassword,
    errors,
    setErrors,
    handleSubmit,
  } = useLogin();

  return (
    <AnimatePresence>
      <motion.div className="mt-5 flex flex-col items-center">
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
                  `border-2 w-auto lg:w-96 border-white bg-transparent rounded-full py-1.5 pl-8 pr-4 focus:border-blues-1 outline-none transition-all`,
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
              className="relative"
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
              <input
                type={isPassword ? 'password' : 'text'}
                autoComplete="new-password"
                placeholder={errors.password ? errors.password : 'Password'}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={classNames(
                  `border-2 w-auto lg:w-96 border-white bg-transparent rounded-full py-1.5 pl-8 pr-4 focus:border-blues-1 outline-none transition-all`,
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
                onClick={() => navigate('/register')}
                type="button"
                className="p-1.5 border-white transition-all uppercase rounded-full text-white hover:text-[#4A9ECC] w-full"
              >
                register
              </button>

              <button className="p-1.5 hover:bg-[#0e6696] transition-all bg-[#4A9ECC] w-full rounded-full uppercase text-white">
                login
              </button>
            </motion.div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginForm;
