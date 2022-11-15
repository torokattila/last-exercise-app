import Menu from './Menu';

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div className='flex lg:flex-row flex-col'>
      <Menu />
      {children}
    </div>
  );
};

export default Layout;