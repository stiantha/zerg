const Header: React.FC = () => {
  return (
    <header className="border-b border-dashed border-white-700 flex justify-between items-center h-20 w-full z-10">
      <div className="text-xl font-light tracking-wider"></div>
      <div className="flex h-full">
        <div className="w-100 border-dashed border-l border-white-700 text-center cursor-pointer hover:bg-gray-700 flex-1 flex items-center justify-center">
          <span className="text-pink-400">{'<< Introduction'}</span>
        </div>
        <div className="w-100 border-dashed border-l border-white-700 text-center cursor-pointer hover:bg-gray-700 flex-1 flex items-center justify-center">
          <span className="text-pink-400">{'Demographics >>'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header
