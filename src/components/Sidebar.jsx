import {  MoreVertical,MenuIcon, ChevronLeftIcon,HomeIcon,  ChartArea,ChevronDown, Edit,LogOut,
} from "lucide-react";
import { createContext, useContext, useState } from "react";
import { auth } from "../fireabse/firebase";
import { NavLink } from "react-router-dom";
import MarqueeText from "../animation/MarqueeText";

const SidebarContext = createContext();

export default function Sidebar({onLogoutClick }) {

  console.log('mounted sidebar');

  const [expanded, setExpanded] = useState(false);
  const user = auth.currentUser;
  // console.log(user);
  
  const iconApi = `https://ui-avatars.com/api/?name=${String(user.displayName).replace(
    / /g,
    "+"
  )}/?background=c7d2fe&color=3730a3&bold=true`;

  return (
    <aside
      className={`h-screen transition-all duration-300 ease-in-out ${
        expanded ? "max-w-70" : "max-w-16"
      }`}
    >
      <nav className="h-full flex flex-col bg-white border-r-blue-950 shadow-sm">
        <div className="p-4 pb-2 flex justify-between items-center">
          <img
            src="https://img.logoipsum.com/222.svg"
            alt="Logo"
            className={`transition-all duration-300 ease-in-out ${
              expanded ? "w-32" : "w-0"
            }`}
          />
          <button
            className="p-1.5 rounded-lg hover:bg-gray-100"
            onClick={() => setExpanded((curr) => !curr)}
          >
            {expanded ? <ChevronLeftIcon /> : <MenuIcon size={20} />}
          </button>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3">
            {/* Replace the manual onClick with NavLink "to" properties */}
            <SidebarItem
              icon={<HomeIcon size={20} />}
              text="Home"
              to="/dashboard/"
            />
            <SidebarItem
              icon={<ChartArea size={20} />}
              text="Dashboard"
              to="/dashboard/dashboard"
            >
              <SidebarSubItem
                text="place-holder"
                icon={<MoreVertical size={20} />}
              />
              <SidebarSubItem
                text="place-holder"
                icon={<MoreVertical size={20} />}
              />
              <SidebarSubItem
                text="place-holder"
                icon={<MoreVertical size={20} />}
              />
            </SidebarItem>
            <SidebarItem
              icon={<Edit size={20} />}
              text="Edit profile"
              to="/dashboard/update-profile"
            />
            <SidebarItem
              icon={<LogOut size={20} />}
              text="Log out"
              onClick={onLogoutClick}
            />{" "}
          </ul>
        </SidebarContext.Provider>

        <div className="border-t flex p-3 items-center">
          <img
            src={iconApi}
            alt="User Avatar"
            className="w-10 h-10 rounded-md"
          />
          <div
            className={`flex justify-between items-center overflow-hidden transition-all duration-300 whitespace-nowrap ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
          >
            <div className="leading-4">
              {/* <h4 className="font-semibold" >{user?.displayName}</h4> */}
              {/* <MarqueeText text={user?.displayName} /> */}
              <MarqueeText text="abc" />              
              <span className="text-xs text-gray-600">{user?.email}</span>
            </div>
            <MoreVertical />
          </div>
        </div>
      </nav>
    </aside>
  );
}

export function SidebarItem({ icon, text, to, onClick, children }) {
  const { expanded } = useContext(SidebarContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
    if (children) {
      setIsOpen((prev) => !prev);
    }
  };

  if (to) {

    const normalizedLocation = location.pathname.toLowerCase();
    const normalizedTo = to.toLowerCase();
    const isActive = normalizedLocation === normalizedTo;

    return (
      <li>
        <NavLink
          to={to}
          // end
          onClick={handleClick}

          className={() =>
            `relative flex items-center py-2 px-2.5 my-1 font-medium rounded-md transition-colors group ${
              isActive
                ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
                : "hover:bg-indigo-50 text-gray-600"
            }`
          }

          // className={({ isActive }) =>
          //   `relative flex items-center py-2 px-2.5 my-1 font-medium rounded-md transition-colors group ${
          //     isActive
          //       ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
          //       : "hover:bg-indigo-50 text-gray-600"
          //   }`
          // }
        >
          <div className="flex items-center">
            {icon}
            <span
              className={`flex justify-between overflow-hidden transition-all whitespace-nowrap ${
                expanded ? "w-52 ml-3" : "w-0"
              }`}
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
            >
              {text}
            </div>
          )}
        </NavLink>
        {children && isOpen && (
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
  } else {
    return (
      <li onClick={handleClick} className="cursor-pointer">
        <div
          className={`relative flex items-center py-2 px-2.5 my-1 font-medium rounded-md transition-colors group hover:bg-indigo-50 text-gray-600`}
        >
          {icon}
          <span
            className={`flex justify-between overflow-hidden transition-all whitespace-nowrap ${
              expanded ? "w-52 ml-3" : "w-0"
            }`}
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
      </li>
    );
  }
}


// export function SidebarItem({ icon, text, to, onClick, children }) {
//   const { expanded } = useContext(SidebarContext);
//   const [isOpen, setIsOpen] = useState(false);

//   const handleClick = (e) => {
//     // If an onClick is provided, call it.
//     if (onClick) {
//       onClick(e);
//     }
//     // Toggle sub-items if there are children.
//     if (children) {
//       setIsOpen((prev) => !prev);
//     }
//   };

//   // If a "to" prop is provided, assume this is a navigation item.
//   if (to) {
//     return (
//       <li>
//         <NavLink
//           to={to}
//           onClick={handleClick}
//           className={({ isActive }) =>
//             `relative flex items-center py-2 px-2.5 my-1 font-medium rounded-md transition-colors group ${
//               isActive
//                 ? "bg-gradient-to-tr from-indigo-200 to-indigo-100 text-indigo-800"
//                 : "hover:bg-indigo-50 text-gray-600"
//             }`
//           }
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
//     // Otherwise, render an action item.
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

function SidebarSubItem({ text, icon }) {
  return (
    <li className="py-2 text-sm indent-1.5 ml-2 list-disc text-gray-700 hover:text-indigo-800 hover:bg-indigo-50 rounded-md cursor-pointer">
      {text}
    </li>
  );
}
