import React from 'react';
import DarkModeSwitch from './components/dark-mode-switch';

function App() {
  return (
    <div className="dark:bg-black bg-white h-full w-full">
      <DarkModeSwitch />
      <h2 className="dark:text-white text-black">Hello</h2>
    </div>
  );
}

export default App;
