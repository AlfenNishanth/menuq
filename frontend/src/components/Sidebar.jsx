// import {  MoreVertical,MenuIcon, ChevronLeftIcon,HomeIcon,  ChartArea,ChevronDown, Edit,LogOut, PlusSquare,
// } from "lucide-react";
// import { createContext, useContext, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { NavLink } from "react-router-dom";
// import MarqueeText from "../animation/MarqueeText";

// const SidebarContext = createContext();

// export default function Sidebar({onLogoutClick }) {

//   // console.log('mounted sidebar');

//   const [expanded, setExpanded] = useState(false);
//   const {currentUser: user} = useAuth();

//   const {userData} = useAuth();
//   console.log("from sidebar")
//   console.log(userData);
  
//   const iconApi = `https://ui-avatars.com/api/?name=${String(user.displayName).replace(
//     / /g,
//     "+"
//   )}/?background=c7d2fe&color=3730a3&bold=true`;

//   return (
//     <aside
//       className={`h-screen transition-all duration-300 ease-in-out ${
//         expanded ? "max-w-70" : "max-w-16"
//       }`}
//     >
//       <nav className="h-full flex flex-col bg-white border-r-blue-950 shadow-sm">
//         <div className="p-4 pb-2 flex justify-between items-center">
//           <img
//             src="https://img.logoipsum.com/222.svg"
//             alt="Logo"
//             className={`transition-all duration-300 ease-in-out ${
//               expanded ? "w-32" : "w-0"
//             }`}
//           />
//           <button
//             className="p-1.5 rounded-lg hover:bg-gray-100"
//             onClick={() => setExpanded((curr) => !curr)}
//           >
//             {expanded ? <ChevronLeftIcon /> : <MenuIcon size={20} />}
//           </button>
//         </div>

//         <SidebarContext.Provider value={{ expanded }}>
//           <ul className="flex-1 px-3">
//             {/* Replace the manual onClick with NavLink "to" properties */}
//             <SidebarItem
//               icon={<HomeIcon size={20} />}
//               text="Home"
//               to="/dashboard/"
//             />
//             <SidebarItem
//               icon={<PlusSquare size={20} />}
//               text="Add New Menu Item"
//               to="/dashboard/add-new-menu-item"
//             />
//             {/* <SidebarItem
//               icon={<Edit size={20} />}
//               text="Edit profile"
//               to="/dashboard/update-profile2"
//             /> */}
//             <SidebarItem
//               icon={<Edit size={20} />}
//               text="Edit profile"
//               to="/dashboard/update-profile"
//             />
//             <SidebarItem
//               icon={<LogOut size={20} />}
//               text="Log out"
//               onClick={onLogoutClick}
//             />{" "}
//           </ul>
//         </SidebarContext.Provider>

//         <div className="border-t flex p-3 items-center">
//           <img
//             src={iconApi}
//             alt="User Avatar"
//             className="w-10 h-10 rounded-md"
//           />
//           <div
//             className={`flex justify-between items-center overflow-hidden transition-all duration-300 whitespace-nowrap ${
//               expanded ? "w-52 ml-3" : "w-0"
//             }`}
//           >
//             <div className="leading-4">
//               {/* <h4 className="font-semibold" >{user?.displayName}</h4> */}
//               {/* <MarqueeText text={user?.displayName} /> */}
//               <MarqueeText text={user.displayName} />              
//               <span className="text-xs text-gray-600">{user?.email}</span>
//             </div>
//             <MoreVertical />
//           </div>
//         </div>
//       </nav>
//     </aside>
//   );
// }

// export function SidebarItem({ icon, text, to, onClick, children }) {
//   const { expanded } = useContext(SidebarContext);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClick = (e) => {
//     if (onClick) {
//       onClick(e);
//     }
//     if (children) {
//       setIsOpen((prev) => !prev);
//     }
//   };

//   if (to) {

//     const normalizedLocation = location.pathname.toLowerCase();
//     const normalizedTo = to.toLowerCase();
//     const isActive = normalizedLocation === normalizedTo;

//     return (
//       <li>
//         <NavLink
//           to={to}
//           // end
//           onClick={handleClick}

//           className={() =>
//             `relative flex items-center py-2 px-2.5 my-1 font-medium rounded-md transition-colors group ${
//               isActive
//                 ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//                 : "hover:bg-indigo-50 text-gray-600"
//             }`
//           }

//           // className={({ isActive }) =>
//           //   `relative flex items-center py-2 px-2.5 my-1 font-medium rounded-md transition-colors group ${
//           //     isActive
//           //       ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//           //       : "hover:bg-indigo-50 text-gray-600"
//           //   }`
//           // }
//         >
//           <div className="flex items-center">
//             {icon}
//             <span
//               className={`flex justify-between overflow-hidden transition-all whitespace-nowrap ${
//                 expanded ? "w-52 ml-3" : "w-0"
//               }`}
//             >
//               {text}
//               {children && (
//                 <ChevronDown
//                   className={`transition-transform duration-300 ${
//                     isOpen ? "rotate-180" : "rotate-0"
//                   }`}
//                 />
//               )}
//             </span>
//           </div>
//           {!expanded && (
//             <div
//               className={`
//                 absolute left-full rounded-md px-2 py-1 ml-4
//                 bg-indigo-100 text-indigo-800 text-sm whitespace-nowrap
//                 invisible opacity-20 -translate-x-3 transition-all duration-300
//                 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 
//                 z-10
//               `}
//             >
//               {text}
//             </div>
//           )}
//         </NavLink>
//         {children && isOpen && (
//           <ul
//             className={`pl-8 transition-all duration-300 ease-in-out ${
//               expanded ? "block" : "hidden"
//             }`}
//           >
//             {children}
//           </ul>
//         )}
//       </li>
//     );
//   } else {
//     return (
//       <li onClick={handleClick} className="cursor-pointer">
//         <div
//           className={`relative flex items-center py-2 px-2.5 my-1 font-medium rounded-md transition-colors group hover:bg-indigo-50 text-gray-600`}
//         >
//           {icon}
//           <span
//             className={`flex justify-between overflow-hidden transition-all whitespace-nowrap ${
//               expanded ? "w-52 ml-3" : "w-0"
//             }`}
//           >
//             {text}
//             {children && (
//               <ChevronDown
//                 className={`transition-transform duration-300 ${
//                   isOpen ? "rotate-180" : "rotate-0"
//                 }`}
//               />
//             )}
//           </span>
//         </div>
//       </li>
//     );
//   }
// }


// // export function SidebarItem({ icon, text, to, onClick, children }) {
// //   const { expanded } = useContext(SidebarContext);
// //   const [isOpen, setIsOpen] = useState(false);

// //   const handleClick = (e) => {
// //     // If an onClick is provided, call it.
// //     if (onClick) {
// //       onClick(e);
// //     }
// //     // Toggle sub-items if there are children.
// //     if (children) {
// //       setIsOpen((prev) => !prev);
// //     }
// //   };

// //   // If a "to" prop is provided, assume this is a navigation item.
// //   if (to) {
// //     return (
// //       <li>
// //         <NavLink
// //           to={to}
// //           onClick={handleClick}
// //           className={({ isActive }) =>
// //             `relative flex items-center py-2 px-2.5 my-1 font-medium rounded-md transition-colors group ${
// //               isActive
// //                 ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
// //                 : "hover:bg-indigo-50 text-gray-600"
// //             }`
// //           }
// //         >
// //           <div className="flex items-center">
// //             {icon}
// //             <span
// //               className={`flex justify-between overflow-hidden transition-all whitespace-nowrap ${
// //                 expanded ? "w-52 ml-3" : "w-0"
// //               }`}
// //             >
// //               {text}
// //               {children && (
// //                 <ChevronDown
// //                   className={`transition-transform duration-300 ${
// //                     isOpen ? "rotate-180" : "rotate-0"
// //                   }`}
// //                 />
// //               )}
// //             </span>
// //           </div>
// //           {!expanded && (
// //             <div
// //               className={`
// //                 absolute left-full rounded-md px-2 py-1 ml-4
// //                 bg-indigo-100 text-indigo-800 text-sm whitespace-nowrap
// //                 invisible opacity-20 -translate-x-3 transition-all duration-300
// //                 group-hover:visible group-hover:opacity-100 group-hover:translate-x-0 
// //                 z-10
// //               `}
// //             >
// //               {text}
// //             </div>
// //           )}
// //         </NavLink>

// //         {children && isOpen && (
// //           <ul
// //             className={`pl-8 transition-all duration-300 ease-in-out ${
// //               expanded ? "block" : "hidden"
// //             }`}
// //           >
// //             {children}
// //           </ul>
// //         )}
// //       </li>
// //     );
// //   } else {
// //     // Otherwise, render an action item.
// //     return (
// //       <li onClick={handleClick} className="cursor-pointer">
// //         <div
// //           className={`relative flex items-center py-2 px-2.5 my-1 font-medium rounded-md transition-colors group hover:bg-indigo-50 text-gray-600`}
// //         >
// //           {icon}
// //           <span
// //             className={`flex justify-between overflow-hidden transition-all whitespace-nowrap ${
// //               expanded ? "w-52 ml-3" : "w-0"
// //             }`}
// //           >
// //             {text}
// //             {children && (
// //               <ChevronDown
// //                 className={`transition-transform duration-300 ${
// //                   isOpen ? "rotate-180" : "rotate-0"
// //                 }`}
// //               />
// //             )}
// //           </span>
// //         </div>
// //       </li>
// //     );
// //   }
// // }

// function SidebarSubItem({ text, icon }) {
//   return (
//     <li className="py-2 text-sm indent-1.5 ml-2 list-disc text-gray-700 hover:text-indigo-800 hover:bg-indigo-50 rounded-md cursor-pointer">
//       {text}
//     </li>
//   );
// }


import {
  MoreVertical,
  Menu,
  ChevronLeft,
  Home,
  BarChart3,
  ChevronDown,
  Edit3,
  LogOut,
  PlusSquare,
  User,
  Settings,
  Settings2, 
} from "lucide-react";
import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { NavLink, useLocation } from "react-router-dom";

// Create context for sidebar state
const SidebarContext = createContext();

export default function Sidebar({ onLogoutClick }) {
  const [expanded, setExpanded] = useState(true);
  const [animate, setAnimate] = useState(false);
  const { currentUser: user } = useAuth();
  const { userData } = useAuth();
  const location = useLocation();

  // Toggle sidebar animation
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timeout);
  }, [expanded]);

  // Get avatar from API or use initials
  const getInitials = (name) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(part => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  const iconApi = `https://ui-avatars.com/api/?name=${String(
    user.displayName || "User"
  ).replace(/ /g, "+")}/?background=c7d2fe&color=3730a3&bold=true`;

  return (
    <aside
      className={`h-screen transition-all duration-300 ease-in-out ${
        expanded ? "w-64" : "w-20"
      } bg-white ${
        animate ? "animate-pulse" : ""
      }`}
    >
      <nav
        className="h-full flex flex-col bg-white text-gray-800 shadow-lg border-r border-opacity-20 border-indigo-100"
      >
        {/* Logo & Toggle Button */}
        <div className="p-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img 
              // src="frontend/public/short logo.png"
              className="h-6 w-6" 
            />
            <span 
              className={`font-bold text-lg transition-all duration-300 ${
                expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              Menu Q
            </span>
          </div>
          <button
            className="p-2 rounded-lg hover:bg-indigo-50 bg-indigo-50 transition-all duration-200 flex items-center justify-center z-10 h-8 w-8"
            onClick={() => setExpanded((curr) => !curr)}
          >
            {expanded ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Divider */}
        <div className="mx-3 border-b border-gray-200" />

        {/* Menu Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 py-4 space-y-2">
            <SidebarItem
              icon={<Home size={18} />}
              text="Dashboard"
              to="/dashboard/"
              badge="New"
            />
            <SidebarItem
              icon={<Settings2 size={18} />}
              text="Manage Menu"
              to="/dashboard/manage-menu/"
            />
            <SidebarItem
              icon={<PlusSquare size={18} />}
              text="Add Menu Item"
              to="/dashboard/add-new-menu-item"
            />
            <SidebarItem
              icon={<Edit3 size={18} />}
              text="Edit Profile"
              to="/dashboard/update-profile"
            />
            <SidebarItem
              icon={<BarChart3 size={18} />}
              text="Analytics"
              to="/dashboard/analytics"
            >
              <SidebarSubItem text="Sales Report" icon={<BarChart3 size={14} />} />
              <SidebarSubItem text="Customer Traffic" icon={<User size={14} />} />
            </SidebarItem>
            <SidebarItem
              icon={<Settings size={18} />}
              text="Settings"
              to="/dashboard/settings"
            />
          </ul>
          
          {/* Logout (separated from main menu) */}
          <div className="mt-auto px-3 pb-4">
            <div
              onClick={onLogoutClick}
              className="flex items-center py-2.5 px-3 cursor-pointer rounded-md transition-colors hover:bg-red-50 text-red-500"
            >
              <div className="flex items-center justify-center w-5">
                <LogOut size={18} />
              </div>
              <span
                className={`ml-3 transition-all duration-300 ${
                  expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
                }`}
              >
                Logout
              </span>
            </div>
          </div>
        </SidebarContext.Provider>

        {/* User Profile Section */}
        <div className="border-t p-3 flex items-center border-gray-200">
          <div className="relative flex-shrink-0">
            <img
              src={iconApi}
              alt="User Avatar"
              className="w-10 h-10 rounded-lg shadow-md"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
          </div>
          <div
            className={`flex-1 ml-3 overflow-hidden transition-all duration-300 ${
              expanded ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            <div className="truncate font-medium">
              {user?.displayName || "User"}
            </div>
            <div className="text-xs truncate text-gray-500">
              {user?.email || "user@example.com"}
            </div>
          </div>
          {expanded && (
            <button className="p-1.5 rounded-lg hover:bg-gray-100">
              <MoreVertical size={16} />
            </button>
          )}
        </div>
      </nav>
    </aside>
  );
}

function SidebarItem({ icon, text, to, badge, onClick, children }) {
  const { expanded } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const handleClick = (e) => {
    if (onClick) onClick(e);
    if (children) setIsOpen((prev) => !prev);
  };

  // Check if current route matches this item
  const isActive = to && location.pathname.toLowerCase() === to.toLowerCase();

  if (to) {
    return (
      <li>
        <NavLink
          to={to}
          onClick={handleClick}
          className={`relative flex items-center py-2.5 px-3 my-1 font-medium rounded-md transition-all duration-200 group ${
            isActive
              ? "bg-gradient-to-tr from-indigo-100 to-indigo-50 text-indigo-800"
              : "hover:bg-indigo-50 text-gray-700"
          }`}
        >
          <div className="flex items-center">
            <div className="flex items-center justify-center w-5">
              {icon}
            </div>
            <span
              className={`ml-3 transition-all duration-300 ${
                expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
              }`}
            >
              {text}
            </span>
            {badge && expanded && (
              <span className="ml-2 text-xs font-semibold px-1.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                {badge}
              </span>
            )}
          </div>
          {children && expanded && (
            <ChevronDown
              size={16}
              className={`ml-auto transition-transform duration-300 ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          )}
          
          {/* Tooltip for collapsed state */}
          {!expanded && (
            <div
              className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-800 text-white text-sm font-medium
                invisible opacity-0 -translate-x-3 transition-all duration-300
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                z-50 whitespace-nowrap
              `}
            >
              {text}
              {badge && (
                <span className="ml-1 text-xs px-1 py-0.5 rounded-full bg-indigo-700">
                  {badge}
                </span>
              )}
            </div>
          )}
        </NavLink>
        
        {/* Submenu */}
        {children && (
          <div
            className={`overflow-hidden transition-all duration-300 ${
              isOpen && expanded ? "max-h-40" : "max-h-0"
            }`}
          >
            <ul className="pl-7 pt-1 pb-1">{children}</ul>
          </div>
        )}
      </li>
    );
  } else {
    return (
      <li onClick={handleClick} className="cursor-pointer">
        <div
          className="relative flex items-center py-2.5 px-3 my-1 font-medium rounded-md transition-colors group hover:bg-indigo-50 text-gray-700"
        >
          <div className="flex items-center justify-center w-5">
            {icon}
          </div>
          <span
            className={`ml-3 transition-all duration-300 ${
              expanded ? "opacity-100" : "opacity-0 w-0 overflow-hidden"
            }`}
          >
            {text}
          </span>
          
          {!expanded && (
            <div
              className={`
                absolute left-full rounded-md px-2 py-1 ml-6
                bg-indigo-800 text-white text-sm font-medium
                invisible opacity-0 -translate-x-3 transition-all duration-300
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                z-50 whitespace-nowrap
              `}
            >
              {text}
            </div>
          )}
        </div>
      </li>
    );
  }
}

function SidebarSubItem({ text, icon }) {
  return (
    <li className="py-2 px-2 text-sm flex items-center gap-2 rounded-md cursor-pointer transition-colors text-gray-600 hover:text-indigo-800 hover:bg-indigo-50">
      {icon}
      <span>{text}</span>
    </li>
  );
}