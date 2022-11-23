import Menu from './Menu';

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div>
      <Menu />
      <div className='lg:pl-14'>{children}</div>
    </div>
  );
};

export default Layout;
