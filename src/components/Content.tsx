const MainContent: React.FC<{ currentCategory: string }> = ({ currentCategory }) => {
  return (
    <main className="flex-1 flex flex-col min-h-screen">
      
      <div className="p-6">
      <h1 className="text-3xl font-bold text-white">{currentCategory}</h1>
      <p className="mt-4">Empty</p>
    </div>
    </main>
  );
};

export default MainContent;