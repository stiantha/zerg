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
    <footer className="flex items-center justify-start h-13 px-3 border-t border-dashed border-white-700 flex-shrink-0">
      <div className="flex-2 text-sm text-gray-400 text-center">
        <Key>1</Key> - <Key>9</Key> Select Category
      </div>

      <div className="flex-2 text-sm text-gray-400 text-center">

          <Key>&#8592;</Key> - <Key>&#8594;</Key> Next / Previous Category
  
      </div>
    </footer>
  );
};

export default Footer;
