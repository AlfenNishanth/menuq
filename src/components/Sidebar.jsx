import {
    MoreVertical,
    MenuIcon,
    ChevronLeftIcon,
    HomeIcon,
    ChartArea,
    ChevronDown,
    User,
    Edit,
    LogOut,
  } from "lucide-react";
  import { createContext, useContext, useState } from "react";
  import { auth } from "../fireabse/firebase";
  const SidebarContext = createContext();
  
  export default function Sidebar({
    children,
    userName,
    selectedItem,
    setSelectedItem,
  }) {
    const [expanded, setExpanded] = useState(false);
  
    const user = auth.currentUser;
  
    console.log("mounted sidebar");
  
    const iconApi = `https://ui-avatars.com/api/?name=${String(userName).replace(
      / /g,
      "+"
    )}/??background=c7d2fe&color=3730a3&bold=true`;
    // console.log(typeof userName);
    // console.log(iconApi);
  
    return (
      <aside
        className={`h-screen transition-all duration-300 ease-in-out ${
          expanded ? "max-w-70" : "max-w-16"
        }`}
      >
        {/* // <aside className="h-screen w-150"> */}
        <nav className="h-full flex flex-col bg-white border-r-blue-950 shadow-sm">
          <div className="p-4 pb-2 flex justify-between items-center">
            <img
              src="https://img.logoipsum.com/222.svg"
              className={` transition-all duration-300 ease-in-out ${
                expanded ? "w-32" : "w-0"
              }`}
            />
            <button
              className="p-1.5 rounded-lg bg-gray-5- hover:bg-gray-100"
              onClick={() => setExpanded((curr) => !curr)}
            >
              {expanded ? <ChevronLeftIcon /> : <MenuIcon size={20} />}
            </button>
          </div>
  
          <SidebarContext.Provider value={{ expanded }}>
            <ul className="flex-1 px-3">
              <SidebarItem
                icon={<HomeIcon size={20} />}
                text="Home"
                active
                onClick={() => setSelectedItem("Home")}
              />
              <SidebarItem
                icon={<ChartArea size={20} />}
                text="Dashboard"
                onClick={() => setSelectedItem("Dashboard")}
              />
              <SidebarItem
                icon={<Edit size={20} />}
                text="Edit profile"
                onClick={() => setSelectedItem("Edit profile")}
              />
              <SidebarItem
                icon={<LogOut size={20} />}
                text="Log out"
                onClick={() => setSelectedItem("Log out")}
              />
            </ul>
          </SidebarContext.Provider>
  
          <div className="border-t flex p-3 items-center">
            <img src={iconApi} alt="" className="w-10 h-10 rounded-md" />
  
            {/* <div className="self-center flex justify-center items-center w-4 h-4 ml-2"> */}
  
            {/* </div> */}
            <div
              className={`flex justify-between items-center overflow-hidden transition-all duration-300 ease-in-out ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
            >
              <div className="leading-4">
                <h4 className="font-semibold">{user.displayName}</h4>
                <span className="text-xs text-gray-600">
                  {user.email}
                </span>
              </div>
              <MoreVertical />
            </div>
          </div>
        </nav>
      </aside>
    );
  }
  
  export function SidebarItem({ icon, text, active, alert, children, onClick }) {
    const { expanded } = useContext(SidebarContext);
    const [isOpen, setIsOpen] = useState(false);
  
    const handleClick = () => {
      console.log(`Selected Item: ${text}`);
      onClick();
      if (children) {
        setIsOpen((prev) => !prev);
      }
    };
  
    return (
      <li>
        <div
          className={`relative flex items-center py-2 px-2.5 my-1 font-medium rounded-md cursor-pointer transition-colors group
          ${
            active
              ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-600"
          }
        `}
          // onClick={()=> setIsOpen((prev)=> !prev)}
          onClick={handleClick}
        >
          <div className="flex items-center">
            {" "}
            {/* Changed from align-center to items-center */}
            {icon}
            <span
              className={`flex justify-between overflow-hidden transition-all whitespace-nowrap ${
                expanded ? "w-52 ml-3" : "w-0"
              } `}
            >
              {text}
              {children && (
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              )}
            </span>
          </div>
          {!expanded && (
          <div
            className={`
            absolute left-full rounded-md px-2 py-1 ml-4
            bg-indigo-100 text-indigo-800 text-sm whitespace-nowrap
            invisible opacity-20 -translate-x-3 transition-all duration-300
            group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 
            z-10
        `}
  
        // {!expanded && (
        //   <div
        //   className={`
        //     absolute left-14 px-2 py-1 
        //     bg-indigo-100 text-indigo-800 text-sm whitespace-nowrap
        //     rounded-md shadow-md
        //     opacity-0 invisible transition-all duration-300
        //     group-hover:opacity-100 group-hover:visible
        //   `}  
          >
            {text}
          </div>
        )}
        </div>
  
        {alert && (
          <div
            className={`absolute right-2 w-2 h-2 rounded bg-indigo-400 ${
              expanded ? "" : "top-3"
            }`}
          />
        )}
        
        
        {isOpen && children && (
          <ul
            className={`pl-8 transition-all duration-300 ease-in-out ${
              expanded ? "block" : "hidden"
            }`}
          >
            {children}
          </ul>
        )}
      </li>
    );
  }
  
  // function SidebarSubItem({ text }) {
  //   return (
  //     <li className="py-2 text-sm indent-1.5 ml-4 list-square list-disc text-gray-700 hover:text-indigo-800 hover:bg-indigo-50 rounded-md cursor-pointer ">
  //       {text}
  //     </li>
  //   );
  // }
  
  function SidebarSubItem({ text, icon }) {
    return (
      // <li className="py-2 text-sm  list-disc  text-gray-700 hover:text-indigo-800 hover:bg-indigo-50 rounded-md cursor-pointer flex items-center">
      // <div className="mr-2 text-gray-700" size={14}>{icon}</div> */
      <li className="py-2 text-sm indent-1.5 ml-2 list-disc text-gray-700 hover:text-indigo-800 hover:bg-indigo-50 rounded-md cursor-pointer ">
        {text}
      </li>
    );
  }
  