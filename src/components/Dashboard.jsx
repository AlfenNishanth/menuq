import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function Dashboard() {
  const [selectedItem, setSelectedItem] = useState("Home");
  const [error, setError] = useState("");
  const [showLogoutModal, setShowLogoutModal] = useState(false); // State to track logout modal
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleSidebarSelect = (item) => {
    if (item === "Log out") {
      setShowLogoutModal(true); // Show logout confirmation
    } else {
      setSelectedItem(item); // Normal page change
    }
  };

  useEffect(() => {
    if (selectedItem === "Log out") {
      setShowLogoutModal(true); // Show modal when "Log out" is selected
    }
  }, [selectedItem]);

  async function handleLogout() {
    setError("");
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      setError("Failed to Log out: " + err.message);
    }
  }

  return (
    <div className="parent-div flex flex-col h-screen w-screen">
      <div className="flex h-screen">
        <Sidebar
          userName="Alfen Nishanth S"
          selectedItem={selectedItem}
          setSelectedItem={handleSidebarSelect}
        />
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50">
         {/*         <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100">  backdrop-blur-sm"> */}
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold">
              Are you sure you want to log out?
            </h2>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <div className="mt-4 flex justify-end space-x-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Log out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
