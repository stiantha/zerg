import React from 'react';

const CircledOne: React.FC = () => (
  <span
    className="circled-one"
    role="img"
    aria-label="key one"
    aria-hidden="false"
    style={{ fontWeight: 'bold' }}
  >
    ①
  </span>
);

const Header: React.FC = () => {
  return (
    <header className="border-b border-dashed border-white-700 flex flex-col sm:flex-row justify-between items-center h-auto sm:h-20 w-full z-10 p-2 sm:p-0">
      <div className="text-xl font-light tracking-wider mb-2 sm:mb-0"></div>
      <div className="w-full text-center mt-2 sm:mt-0 sm:ml-4 p-2 text-sm text-gray-400">
        <p>Keybinds: Press <CircledOne /> to select a category | Use arrow keys for previous & next category</p>
      </div>
      <div className="flex w-full h-auto sm:h-full">
        <div className="flex-1 border-dashed sm:border-t-0 sm:border-l border-white-700 text-center cursor-pointer hover:bg-gray-700 flex items-center justify-center p-4 sm:p-2">
          <span className="text-pink-400 text-base sm:text-lg">{'<< Introduction'}</span>
        </div>
        <div className="flex-1 border-dashed sm:border-t-0 sm:border-l border-white-700 text-center cursor-pointer hover:bg-gray-700 flex items-center justify-center p-4 sm:p-2">
          <span className="text-pink-400 text-base sm:text-lg">{'Demographics >>'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
