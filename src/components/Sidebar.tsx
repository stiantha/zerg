import { useState, useEffect } from "react";
import { Mail, ChevronDown, ChevronRight } from "lucide-react";

interface SidebarProps {
  expandedCategory: string | null;
  setExpandedCategory: (category: string | null) => void;
}
interface CategoryItem {
  name: string;
  active?: boolean;
  highlight?: boolean;
  color?: string;
  subItems?: CategoryItem[];
}

interface Categories {
  [key: string]: CategoryItem[];
}

const categories: Categories = {
  main: [
    {
      name: "Home",
      color: "text-pink-400",
    },
    {
      name: "Programming Languages",
      color: "text-pink-400",
      subItems: [
        { name: "JavaScript" },
        { name: "Python" },
        { name: "Java" },
        { name: "C++" },
        { name: "Ruby" }
      ]
    },
    {
      name: "Web Development",
      color: "text-pink-400",
      subItems: [
        { name: "HTML/CSS" },
        { name: "Frontend Frameworks" },
        { name: "Backend Development" },
        { name: "RESTful APIs" }
      ]
    },
    {
      name: "Database Systems",
      color: "text-pink-400",
      subItems: [
        { name: "SQL" },
        { name: "NoSQL" },
        { name: "ORM" },
        { name: "Database Design" }
      ]
    },
    {
      name: "DevOps",
      color: "text-pink-400",
      subItems: [
        { name: "CI/CD" },
        { name: "Docker" },
        { name: "Kubernetes" },
        { name: "Cloud Platforms" }
      ]
    },
    {
      name: "Data Structures",
      color: "text-pink-400",
      subItems: [
        { name: "Arrays and Strings" },
        { name: "Linked Lists" },
        { name: "Trees and Graphs" },
      ]
    },
    {
      name: "Algorithms",
      color: "text-pink-400",
      subItems: [
        { name: "Sorting and Searching" },
      ]
    },
    {
      name: "Machine Learning",
      color: "text-pink-400",
      subItems: [
        { name: "Supervised Learning" },
        { name: "Unsupervised Learning" },
        { name: "Neural Networks" },
        { name: "Deep Learning" }
      ]
    },
    {
      name: "Software Architecture",
      color: "text-pink-400",
      subItems: [
        { name: "Design Patterns" },
        { name: "Microservices" },
        { name: "Serverless" },
        { name: "Event-Driven Architecture" }
      ]
    },
    {
      name: "Testing",
      color: "text-pink-400",
      subItems: [
        { name: "Unit Testing" },
        { name: "Integration Testing" },
        { name: "E2E Testing" },
        { name: "TDD" }
      ]
    },
    {
      name: "Version Control",
      color: "text-pink-400",
      subItems: [
        { name: "Git" },
        { name: "GitHub" },
        { name: "GitLab" },
        { name: "Branching Strategies" }
      ]
    },
    {
      name: "Security",
      color: "text-pink-400",
      subItems: [
        { name: "Authentication" },
        { name: "Authorization" },
        { name: "Encryption" },
        { name: "OWASP Top 10" }
      ]
    },
    {
      name: "Mobile Development",
      color: "text-pink-400",
      subItems: [
        { name: "iOS (Swift)" },
        { name: "Android (Kotlin)" },
        { name: "React Native" },
        { name: "Flutter" }
      ]
    },
    {
      name: "About",
      color: "text-pink-400",
      subItems: [
        { name: "Our Team" },
        { name: "Contact" },
        { name: "Contribute" }
      ]
    },
  ],
};

const Sidebar: React.FC<SidebarProps> = ({ expandedCategory, setExpandedCategory }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleCategory = (category: string) => {
    setExpandedCategory(expandedCategory === category ? null : category);
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key;
    if (/^[1-9]$/.test(key)) {
      const index = parseInt(key, 10) - 1;
      if (categories.main[index]) {
        toggleCategory(categories.main[index].name);
        setIsSidebarOpen(true);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [expandedCategory]);

  return (
    <aside className="h-screen w-70 border-r border-dashed border-white-700 flex flex-col m-0">
      {/* Sidebar Header */}
      <div className="sidebar-header flex items-center justify-center h-20 border-b border-dashed border-white-700 flex-shrink-0">
        <div className="text-4xl font-extrabold tracking-widest text-transparent bg-clip-text bg-white">
          ZERG.DEV
        </div>
      </div>

      {/* Navigation Wrapper */}
      <div className="flex-grow relative">
        {/* Sidebar Content */}
        <nav 
          className="absolute inset-0 overflow-y-auto space-y-3 text-sm sm:text-xs md:text-sm scrollbar-thin scrollbar-thumb-pink-600 scrollbar-track-transparent hover:scrollbar-thumb-pink-500 px-2 pt-6"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgb(82 82 82) transparent'
          }}
        >
          {categories.main.map((item, index) => (
            <div key={item.name}>
              <div
                className={`flex items-center w-full cursor-pointer
                          ${item.active 
                            ? 'text-white bg-neutral-800' 
                            : 'text-gray-300 hover:text-white hover:bg-gray-700'}
                          transition-colors duration-200 ease-in-out rounded px-2 py-1`}
                onClick={() => item.subItems && toggleCategory(item.name)}
              >
                {/* Left container for index and name */}
                <div className="flex-grow flex items-center">
                  <span className="text-pink-400 mr-2">{index + 1}.</span>
                  <span className={`text-sm sm:text-xs md:text-sm ${item.color || ''}`}>
                    {item.name}
                  </span>
                </div>
                
                {/* Right container for chevron with fixed width */}
                {item.subItems && (
                  <div className="w-6 flex justify-center">
                    {expandedCategory === item.name ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                  </div>
                )}
              </div>
              {item.subItems && expandedCategory === item.name && (
                <div className="ml-8 mt-2 space-y-2">
                  {item.subItems.map((subItem, subIndex) => (
                    <div
                      key={subItem.name}
                      className="cursor-pointer text-gray-400 hover:text-white hover:bg-neutral-800
                               transition-colors duration-200 ease-in-out rounded px-2 py-1
                               text-sm sm:text-xs md:text-sm flex items-center"
                    >
                      <span className="text-pink-400 mr-2">{index + 1}.{subIndex + 1}</span>
                      {subItem.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Sidebar Footer */}
      <div className="sidebar-footer flex items-center justify-start h-13 px-3 border-t border-dashed border-white-700 flex-shrink-0">
        <button className="text-gray-400 hover:text-white color-background-color">
          <Mail size={25} />
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
export { categories };