import classNames from 'classnames';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import emailOutline from '@iconify/icons-eva/email-outline';
import lockOutline from '@iconify/icons-eva/lock-outline';
import { Icon } from '@iconify/react';

const LoginForm = (): JSX.Element => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  return (
    <AnimatePresence>
      <motion.div
        className="mt-28 lg:mt-[10%] flex flex-col items-center"
        initial={{
          opacity: 0,
          y: '100vw',
        }}
        animate={{
          y: 0,
          opacity: 1,
          transition: {
            type: 'spring',
            duration: 2,
          },
        }}
      >
        <form autoComplete="off">
          <div className="flex flex-col gap-y-7">
            <div className="relative">
              <input
                type="email"
                autoComplete="new-email"
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                value={email}
                className={classNames(
                  `border-2 w-auto lg:w-96 border-white bg-transparent rounded-full py-2 pl-14 pr-4 focus:border-blues-1 outline-none transition-all`,
                  {
                    'text-greys-1': !email.length,
                    'text-white': email.length,
                  }
                )}
              />
              <Icon
                className="absolute top-2 left-5"
                icon={emailOutline}
                color={`#4A9ECB`}
                fontSize={25}
              />
            </div>

            <div className="relative">
              <input
                type="password"
                autoComplete="new-password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                className={classNames(
                  `border-2 w-auto lg:w-96 border-white bg-transparent rounded-full py-2 pl-14 pr-4 focus:border-blues-1 outline-none transition-all`,
                  {
                    'text-greys-1': !password.length,
                    'text-white': password.length,
                  }
                )}
              />
              <Icon
                className="absolute top-2 left-5"
                icon={lockOutline}
                color={`#4A9ECB`}
                fontSize={25}
              />
            </div>
          </div>
        </form>
      </motion.div>
    </AnimatePresence>
  );
};

export default LoginForm;
