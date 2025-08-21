import { useState, useEffect, useRef } from "react";
import navLogo from "../assets/virtusLogoLight.png";

const navLinks = [
  { name: "Home", href: "#" },
  {
    name: "Services",
    isDropdown: true,
    dropdownItems: [
        { 
            name: "AI and Machine Learning", 
            description: "Supercharge your workflows with cutting-edge AI models and next-gen machine learning techniques that make your work 100x faster and smarter." 
        },
        { 
            name: "Full-stack Development", 
            description: "From sleek front-end interfaces to robust back-end systems, we craft end-to-end solutions that bring your ideas to life seamlessly." 
        },
        { 
            name: "Professional Counseling", 
            description: "Expert guidance and support to help you navigate challenges, optimize performance, and achieve your personal or professional goals." 
        },
        { 
            name: "VIRTUS Software", 
            description: "Tailored software solutions including CRMs, check-in systems, AI assistants, and on-demand applications designed to elevate your business." 
        },
    ],
  },
  { name: "About us", href: "#" },
  { name: "Contact", href: "#" },
];

function NavbarLayout() {
  const [hoveredItem, setHoveredItem] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
        setHoveredItem(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed bg-virtus-dark border-gray-200 dark:border-gray-600 dark:bg-virtus-dark z-20 w-full">
      <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
        <a href="#" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={navLogo} className="h-8" alt="VIRTUS Logo" />
          <span className="self-center text-4xl font-semibold whitespace-nowrap dark:text-virtus-light">
            VIRTUS
          </span>
        </a>
        <div className="items-center justify-between font-medium hidden w-full md:flex md:w-auto md:order-1 relative">
          <ul
            className="flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-virtus-dark md:space-x-8 
            rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-virtus-dark dark:bg-virtus-dark md:dark:bg-virtus-dark 
            dark:border-gray-700"
          >
            {navLinks.map((link) => (
              <li key={link.name} className="relative">
                {link.isDropdown ? (
                  <div ref={dropdownRef}>
                    <button
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="flex items-center justify-between w-full py-2 px-3 text-white 
                      rounded-sm md:w-auto hover:bg-gray-700 md:hover:bg-transparent md:border-0 md:hover:text-virtus-blue
                      md:p-0 dark:text-white md:dark:hover:text-virtus-blue dark:hover:bg-gray-700 dark:hover:text-virtus-blue
                      md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      {link.name}
                      <svg
                        className="w-2.5 h-2.5 ms-2.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 4 4 4-4"
                        />
                      </svg>
                    </button>
                    <div
                      className={`fixed left-0 top-[64px] w-screen bg-virtus-dark text-white shadow-lg z-20 transform transition-all duration-300 ${
                        dropdownOpen
                          ? "opacity-100 translate-y-0"
                          : "opacity-0 -translate-y-2 pointer-events-none"
                      }`}
                    >
                      <div className="max-w-screen-xl mx-auto grid grid-cols-2 divide-x divide-gray-700">
                        <ul className="flex flex-col p-6 space-y-4">
                          {link.dropdownItems.map((item) => (
                            <li
                              key={item.name}
                              onMouseEnter={() => setHoveredItem(item.name)}
                            >
                              <span
                                className={`font-semibold cursor-pointer transition ${
                                  hoveredItem === item.name
                                    ? "text-virtus-blue"
                                    : "hover:text-virtus-blue"
                                }`}
                              >
                                {item.name}
                              </span>
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-start p-6">
                          {hoveredItem ? (
                            <p className="text-sm text-gray-300">
                              {
                                link.dropdownItems.find(
                                  (i) => i.name === hoveredItem
                                ).description
                              }
                            </p>
                          ) : (
                            <p className="text-sm text-gray-500 italic">
                              
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <a
                    href={link.href}
                    className="block py-2 px-3 text-white rounded-sm hover:bg-gray-700 
                    md:hover:bg-transparent md:hover:text-virtus-blue md:p-0 dark:text-white 
                    md:dark:hover:text-virtus-blue dark:hover:bg-gray-700 dark:hover:text-virtus-blue
                    md:dark:hover:bg-transparent dark:border-gray-700"
                  >
                    {link.name}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavbarLayout;
