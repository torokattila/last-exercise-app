import useHome from '../../hooks/useHome';

const Home = (): JSX.Element => {
  const { refetchUser, user } = useHome();

  console.log(user);

  return (
    <div className="bg-white w-full h-screen dark:bg-[#28282B]">
      <div className="ml-5 mt-5 lg:mt-7">
        <h1 className="text-2xl font-bold dark:text-white text-gray-800">
          Hello, {user?.firstname}! 👋
        </h1>
        <p className='mt-1 text-gray-500 dark:text-gray-400'>Let's do some workout today!</p>
      </div>
    </div>
  );
};

export default Home;
