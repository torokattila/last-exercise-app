import classNames from 'classnames';
import { useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '../../components/Login';
import RegistrationForm from '../../components/Registration';

const Login = (): JSX.Element => {
  const location = useLocation();
  const isLoginPage = useMemo(() => {
    return location.pathname === '/login';
  }, [location.pathname]);

  return (
    <div className="flex flex-col relative">
      <div
        className={classNames('h-screen relative', {
          'login-background-image': isLoginPage,
          'register-background-image': !isLoginPage,
        })}
      >
        <div
          className={classNames(`absolute rotate-90 w-8 top-7 right-5 m-0`, {
            hidden: !isLoginPage,
          })}
        >
          <h1 className="uppercase text-white text-8xl xl:text-8xl text-opacity-60">
            login
          </h1>
        </div>
        <div
          className={classNames(`absolute rotate-90 w-8 top-7 left-3 m-0`, {
            hidden: isLoginPage,
          })}
        >
          <h1 className="uppercase text-white text-6xl xl:text-7xl text-opacity-60">
            Register
          </h1>
        </div>
      </div>
      <div className="credentials absolute flex justify-center items-center h-[53%] bottom-0 w-full bg-black">
        {isLoginPage ? <LoginForm /> : <RegistrationForm />}
      </div>
    </div>
  );
};

export default Login;
