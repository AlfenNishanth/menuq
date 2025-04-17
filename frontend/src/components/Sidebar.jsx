import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  MoreVertical,
  Menu,
  ChevronLeft,
  Home,
  ChefHat, 
  Crown, 
  Palette, 
  BookOpen, 
  TrendingUp, 
  Sliders, 
  FileEdit, 
  Users,
  LogOut,
  ChevronDown
} from 'lucide-react';
import { useAuth } from "../contexts/AuthContext"; // Import your authentication context

// Create context for sidebar state
const SidebarContext = createContext({ expanded: true });

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
      <li className="mb-2">
        <NavLink
          to={to}
          onClick={handleClick}
          className={`relative flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 group ${
            isActive
              ? "bg-gradient-to-tr from-amber-100 to-amber-50 text-amber-800"
              : "hover:bg-amber-50 text-gray-700"
          }`}
        >
          {/* Consistent icon placement - centered when collapsed */}
          <div className={`flex items-center ${!expanded ? "mx-auto" : ""}`}>
            <div className={`text-amber-600 flex items-center justify-center w-5 ${!expanded ? "mx-auto" : ""}`}>
              {icon}
            </div>
            {expanded && (
              <>
                <span className="ml-3 font-medium">{text}</span>
                {badge && (
                  <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                    {badge}
                  </span>
                )}
              </>
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
              className="absolute left-full rounded-md px-2 py-1 ml-6
                bg-amber-800 text-white text-sm font-medium
                invisible opacity-0 -translate-x-3 transition-all duration-300
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                z-50 whitespace-nowrap"
            >
              {text}
              {badge && (
                <span className="ml-1 text-xs px-1 py-0.5 rounded-full bg-amber-700">
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
      <li onClick={handleClick} className="cursor-pointer mb-2">
        <div
          className="relative flex items-center py-2.5 px-3 rounded-lg transition-colors group hover:bg-amber-50 text-gray-700"
        >
          <div className={`text-amber-600 flex items-center justify-center w-5 ${!expanded ? "mx-auto" : ""}`}>
            {icon}
          </div>
          {expanded && (
            <span className="ml-3 font-medium">{text}</span>
          )}
          
          {!expanded && (
            <div
              className="absolute left-full rounded-md px-2 py-1 ml-6
                bg-amber-800 text-white text-sm font-medium
                invisible opacity-0 -translate-x-3 transition-all duration-300
                group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
                z-50 whitespace-nowrap"
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
    <li className="py-2 px-2 text-sm flex items-center gap-2 rounded-md cursor-pointer transition-colors text-gray-600 hover:text-amber-800 hover:bg-amber-50">
      {icon}
      <span>{text}</span>
    </li>
  );
}

const Sidebar = ({ onLogoutClick }) => {
  const [expanded, setExpanded] = useState(true);
  const [animate, setAnimate] = useState(false);
  const location = useLocation();
  
  // Use your actual authentication context
  const { currentUser: user, userData } = useAuth();
  
  // Toggle sidebar animation
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timeout);
  }, [expanded]);
  
  const toggleSidebar = () => {
    setExpanded(!expanded);
  };
  
  // Get avatar from API or use initials
  const iconApi = `https://ui-avatars.com/api/?name=${String(
    user?.displayName || "User"
  ).replace(/ /g, "+")}/?background=fef3c7&color=92400e&bold=true`;
  
  return (
    <aside className={`h-screen sticky top-0 bg-white border-r transition-all duration-300 ease-in-out ${expanded ? 'w-64' : 'w-16'} ${animate ? "animate-pulse" : ""}`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between px-3 py-4 border-b">
          {expanded && <span className="font-serif font-bold text-lg text-amber-700">Menu Q</span>}
          <button 
            onClick={toggleSidebar} 
            className={`p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600 ${!expanded && 'mx-auto'}`}
          >
            {expanded ? <ChevronLeft size={18} /> : <Menu size={18} />}
          </button>
        </div>
        
        {/* Menu Items */}
        <SidebarContext.Provider value={{ expanded }}>
          <ul className="flex-1 px-3 py-4 flex flex-col gap-2">
            <SidebarItem
              icon={<Crown size={18} className="rotate-3" />}
              text="Dashboard"
              to="/dashboard/"
              badge="New"
            />
            <SidebarItem
              icon={<ChefHat size={18} />}
              text="Manage Menu"
              to="/dashboard/manage-menu/"
            />
            <SidebarItem
              icon={<Palette size={18} />}
              text="Add Menu Item"
              to="/dashboard/add-new-menu-item"
            />
            <SidebarItem
              icon={<FileEdit size={18} />}
              text="Edit Profile"
              to="/dashboard/update-profile"
            />
            {/* <SidebarItem
              icon={<TrendingUp size={18} />}
              text="Analytics"
              to="/dashboard/analytics"
            >
              <SidebarSubItem text="Sales Report" icon={<BookOpen size={14} />} />
              <SidebarSubItem text="Customer Traffic" icon={<Users size={14} />} />
            </SidebarItem> */}
            
            <SidebarItem
              icon={<Sliders size={18} />}
              text="Settings"
              to="/dashboard/settings"
            />
            <SidebarItem
              icon={<Sliders size={18} />}
              text="QR Code"
              to="/dashboard/qr-generator/:id"
            />
          </ul>
          
          {/* Logout (separated from main menu) */}
          {onLogoutClick && (
            <div className="mt-auto px-3 pb-4">
              <div
                onClick={onLogoutClick}
                className="flex items-center py-2.5 px-3 cursor-pointer rounded-md transition-colors hover:bg-red-50 text-red-500"
              >
                <div className={`flex items-center justify-center w-5 ${!expanded ? "mx-auto" : ""}`}>
                  <LogOut size={18} />
                </div>
                {expanded && (
                  <span className="ml-3">Logout</span>
                )}
              </div>
            </div>
          )}
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
            <button className="p-1.5 rounded-lg hover:bg-amber-50">
              <MoreVertical size={16} />
            </button>
          )}
        </div>
      </div>
    </aside>
  );
};

// Modify the App component to include the AuthContext provider if needed
export default function App() {
  // Example onLogoutClick function - you can replace with your actual logout function
  const handleLogout = () => {
    console.log("Logout clicked");
    // Your actual logout logic here
  };

  return (
    <div className="flex">
      <Sidebar onLogoutClick={handleLogout} />
      {/* <div className="p-6 flex-1">
        <h1 className="text-2xl font-bold">Dashboard Content</h1>
      </div> */}
    </div>
  );
}