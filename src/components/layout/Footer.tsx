interface KeyProps {
  children: React.ReactNode;
}

function Key({ children }: KeyProps) {
  return (
    <span
      style={{
        backgroundColor: "text-pink-400",
        padding: "2px 6px",
        borderRadius: "4px",
        border: "1px solid #ccc",
      }}
    >
      {children}
    </span>
  );
}
const Footer = () => {
  return (
    <footer className="border-t border-dashed border-white-700 flex flex-col sm:flex-row justify-between items-center h-auto sm:h-13 w-full sm:p-0 ">

      <div className="w-1/4 mt-2 sm:mt-0 sm:ml-4 p-2 pl-5 text-sm text-gray-400">
        <Key>1</Key> - <Key>9</Key> Select Category
      </div>

      <div className="w-1/3 mt-2 sm:mt-0 sm:ml-4 p-0 pl-5 text-sm text-gray-400">
        <p className="font-bold mb-1 text-left pl-5 pt-2">
          <Key>&#8592;</Key> - <Key>&#8594;</Key> Next / Previous Category
        </p>
      </div>

      <div className="w-1/6 mt-2 sm:mt-0 sm:ml-4 p-0 pl-5 text-sm text-gray-400">
        <p className="font-bold mb-1 text-left pl-10 pt-2">
          <Key>S</Key> Search
        </p>
      </div>
      <div className="w-1/6 mt-2 sm:mt-0 sm:ml-4 p-2 pl-5 text-sm text-gray-400">
        <p className="font-bold mb-1 text-left pl-10 pt-2">
          <Key>C</Key> Console
        </p>
      </div>
    </footer>
  );
};

export default Footer;
