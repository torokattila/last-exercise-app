import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const LoadingScreen = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center min-h-[70vh]">
      <ThreeCircles
        width="200"
        height="200"
        color="#00BFFF"
        visible={true}
        ariaLabel="three-circles-rotating"
      />
    </div>
  );
};

export default LoadingScreen;
