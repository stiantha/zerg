const Header: React.FC = () => {
  return (
    <header className="border-b border-dashed border-white-700 flex justify-between items-center px-6 h-20 w-full z-10">
      <div className="text-xl font-light tracking-wider"></div>
      <div className="flex h-11">
        <div className="w-60 border-dashed border border-white-700 text-center cursor-pointer hover:bg-gray-700 flex-1 flex items-center justify-center">
          <span className="text-pink-400">{'<< Introduction'}</span>
        </div>
        <div className="w-60 border-dashed border border-white-700 text-center cursor-pointer ml-7 hover:bg-gray-700 flex-1 flex items-center justify-center">
          <span className="text-pink-400">{'Demographics >>'}</span>
        </div>
      </div>
    </header>
  );
};

export default Header
