import classNames from 'classnames';
import { useLocation } from 'react-router-dom';

const Login = (): JSX.Element => {
  const location = useLocation();

  return (
    <div className="flex flex-col">
      <div
        className={classNames({
          'login-background-image': location.pathname === '/login',
          'register-background-image': location.pathname === '/register',
        })}
      />
      <div>Login</div>
    </div>
  );
};

export default Login;
