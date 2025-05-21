import React, { createContext, useContext, useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { 
  MoreVertical,
  Menu,
  ChevronLeft,
  ChevronDown,
  LayoutDashboard,
  MenuSquare,
  PlusCircle,
  UserCog,
  Settings,
  QrCode,
  LogOut,
  X
} from 'lucide-react';
import { useAuth } from "../contexts/AuthContext";

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

// Logout confirmation modal component
function LogoutConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[999]">
      <div className="bg-white rounded-lg shadow-xl p-6 w-80 max-w-md transform transition-all duration-300 ease-in-out">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Logout</h3>
        <p className="text-gray-600 mb-6">Are you sure you want to log out?</p>
        <div className="flex justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm}
            className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}

const Sidebar = ({ onLogoutClick }) => {
  const [expanded, setExpanded] = useState(true);
  const [animate, setAnimate] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  
  // Use your actual authentication context
  const { currentUser: user, userData, logout, loading:AuthLoading } = useAuth();

  // Handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      // Only auto-collapse on desktop, mobile always shows full sidebar when open
      if (window.innerWidth >= 768) {
        // For desktop, we can toggle expanded state based on width
        setExpanded(window.innerWidth >= 1024);
      }
    };

    // Set initial state based on screen size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Close mobile sidebar when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);
  
  //   if (AuthLoading) {
  //   return (
  //     <div className="flex flex-col items-center justify-center py-16">
  //       <div className="w-16 h-16 relative">
  //         <div className="absolute inset-0 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
  //         <div className="absolute inset-3 border-2 border-amber-100 border-b-amber-400 rounded-full animate-spin-slow"></div>
  //       </div>
  //       <p className="mt-6 text-amber-800 font-medium">Loading </p>
  //     </div>
  //   );
  // }

  // Toggle sidebar animation
  useEffect(() => {
    setAnimate(true);
    const timeout = setTimeout(() => setAnimate(false), 500);
    return () => clearTimeout(timeout);
  }, [expanded]);
  
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      setMobileOpen(!mobileOpen);
    } else {
      setExpanded(!expanded);
    }
  };
  
  // Show logout confirmation modal
  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };
  
  // Handle confirmed logout - directly perform logout here
  const handleConfirmLogout = () => {
    setShowLogoutModal(false);
    
    // Perform logout directly
    if (logout) {
      logout()
        .then(() => {
          navigate("/login");
        })
        .catch((error) => {
          console.error("Failed to log out", error);
        });
    }
  };
  
  // Get avatar from API or use initials
  const iconApi = `https://ui-avatars.com/api/?name=${String(
    user?.displayName || "User"
  ).replace(/ /g, "+")}/?background=fef3c7&color=92400e&bold=true`;
  
  // Mobile hamburger button that's always visible
  const MobileMenuToggle = () => (
    <button 
      onClick={toggleSidebar}
      className="fixed z-30 bottom-6 right-6 p-3 rounded-full bg-amber-500 text-white shadow-lg md:hidden flex items-center gap-2"
      aria-label="Toggle menu"
    >
      {mobileOpen ? <X size={24} /> : <>
        <span className="text-sm font-medium pr-1">Menu</span>
        <Menu size={20} />
      </>}
    </button>
  );

  // Main sidebar content
  const SidebarContent = () => (
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
            icon={<LayoutDashboard size={18} />}
            text="Dashboard"
            to="/dashboard/"
            badge="New"
          />
          <SidebarItem
            icon={<MenuSquare size={18} />}
            text="Manage Menu"
            to="/dashboard/manage-menu/"
          />
          <SidebarItem
            icon={<PlusCircle size={18} />}
            text="Add Menu Item"
            to="/dashboard/add-new-menu-item"
          />
          <SidebarItem
            icon={<UserCog size={18} />}
            text="Edit Profile"
            to="/dashboard/update-profile"
          />
          {/* <SidebarItem
            icon={<Settings size={18} />}
            text="Settings"
            to="/dashboard/settings"
          /> */}
          <SidebarItem
            icon={<QrCode size={18} />}
            text="QR Code"
            to={`/dashboard/qr-generator`}
          />
        </ul>
        
        {/* Logout button */}
        <div className="mt-auto px-3 pb-4">
          <div
            onClick={handleLogoutClick}
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
  );
  
  return (
    <>
      {/* Desktop sidebar - always visible on md+ screens */}
      <aside 
        className={`hidden md:block h-screen sticky top-0 bg-white border-r transition-all duration-300 ease-in-out ${
          expanded ? 'w-64' : 'w-16'
        } ${animate ? "animate-pulse" : ""}`}
      >
        <SidebarContent />
      </aside>
      
      {/* Mobile sidebar - conditionally visible */}
      <div 
        className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          mobileOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setMobileOpen(false)}
      />
      
      <aside 
        className={`md:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white border-r shadow-lg transition-transform duration-300 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* For mobile, always force expanded mode for clarity */}
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-3 py-4 border-b">
            <span className="font-serif font-bold text-lg text-amber-700">Menu Q</span>
            <button 
              onClick={toggleSidebar} 
              className="p-1.5 rounded-lg bg-amber-50 hover:bg-amber-100 text-amber-600"
            >
              <X size={18} />
            </button>
          </div>
          
          {/* Menu Items - Always expanded on mobile */}
          <ul className="flex-1 px-3 py-4 flex flex-col gap-2">
            <li className="mb-2">
              <NavLink
                to="/dashboard/"
                className={({isActive}) => `relative flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-tr from-amber-100 to-amber-50 text-amber-800"
                    : "hover:bg-amber-50 text-gray-700"
                }`}
              >
                <div className="text-amber-600 flex items-center justify-center w-5">
                  <LayoutDashboard size={18} />
                </div>
                <span className="ml-3 font-medium">Dashboard</span>
                <span className="ml-2 text-xs bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full">
                  New
                </span>
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/dashboard/manage-menu/"
                className={({isActive}) => `relative flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-tr from-amber-100 to-amber-50 text-amber-800"
                    : "hover:bg-amber-50 text-gray-700"
                }`}
              >
                <div className="text-amber-600 flex items-center justify-center w-5">
                  <MenuSquare size={18} />
                </div>
                <span className="ml-3 font-medium">Manage Menu</span>
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/dashboard/add-new-menu-item"
                className={({isActive}) => `relative flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-tr from-amber-100 to-amber-50 text-amber-800"
                    : "hover:bg-amber-50 text-gray-700"
                }`}
              >
                <div className="text-amber-600 flex items-center justify-center w-5">
                  <PlusCircle size={18} />
                </div>
                <span className="ml-3 font-medium">Add Menu Item</span>
              </NavLink>
            </li>
            <li className="mb-2">
              <NavLink
                to="/dashboard/update-profile"
                className={({isActive}) => `relative flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-tr from-amber-100 to-amber-50 text-amber-800"
                    : "hover:bg-amber-50 text-gray-700"
                }`}
              >
                <div className="text-amber-600 flex items-center justify-center w-5">
                  <UserCog size={18} />
                </div>
                <span className="ml-3 font-medium">Edit Profile</span>
              </NavLink>
            </li>
            {/* <li className="mb-2">
              <NavLink
                to="/dashboard/settings"
                className={({isActive}) => `relative flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-tr from-amber-100 to-amber-50 text-amber-800"
                    : "hover:bg-amber-50 text-gray-700"
                }`}
              >
                <div className="text-amber-600 flex items-center justify-center w-5">
                  <Settings size={18} />
                </div>
                <span className="ml-3 font-medium">Settings</span>
              </NavLink>
            </li> */}
            <li className="mb-2">
              <NavLink
                to="/dashboard/qr-generator"
                className={({isActive}) => `relative flex items-center py-2.5 px-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-gradient-to-tr from-amber-100 to-amber-50 text-amber-800"
                    : "hover:bg-amber-50 text-gray-700"
                }`}
              >
                <div className="text-amber-600 flex items-center justify-center w-5">
                  <QrCode size={18} />
                </div>
                <span className="ml-3 font-medium">QR Code</span>
              </NavLink>
            </li>
          </ul>
          
          {/* Logout button - Always showing text on mobile */}
          <div className="mt-auto px-3 pb-4">
            <div
              onClick={handleLogoutClick}
              className="flex items-center py-2.5 px-3 cursor-pointer rounded-md transition-colors hover:bg-red-50 text-red-500"
            >
              <div className="flex items-center justify-center w-5">
                <LogOut size={18} />
              </div>
              <span className="ml-3">Logout</span>
            </div>
          </div>

          {/* User Profile Section - Always expanded on mobile */}
          <div className="border-t p-3 flex items-center border-gray-200">
            <div className="relative flex-shrink-0">
              <img
                src={iconApi}
                alt="User Avatar"
                className="w-10 h-10 rounded-lg shadow-md"
              />
              <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white" />
            </div>
            <div className="flex-1 ml-3 overflow-hidden">
              <div className="truncate font-medium">
                {user?.displayName || "User"}
              </div>
              <div className="text-xs truncate text-gray-500">
                {user?.email || "user@example.com"}
              </div>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-amber-50">
              <MoreVertical size={16} />
            </button>
          </div>
        </div>
      </aside>
      
      {/* Mobile menu toggle button */}
      <MobileMenuToggle />
      
      {/* Logout confirmation modal */}
      <LogoutConfirmationModal 
        isOpen={showLogoutModal} 
        onClose={() => setShowLogoutModal(false)} 
        onConfirm={handleConfirmLogout}
      />
    </>
  );
};

export default Sidebar;