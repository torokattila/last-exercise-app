import Menu from './Menu';

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div className="flex lg:flex-row flex-col">
      <Menu />
      <div className='lg:pl-14'>{children}</div>
    </div>
  );
};

export default Layout;
