// Dashboard.jsx
// import React from "react";

// const DashboardHome = () => {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold mb-4">Dashboard Home</h1>
//       <p> overview</p>
//       {/* Add additional dashboard content as needed */}
//     </div>
//   );
// };

// export default DashboardHome;

// export const DashboardIndex = () => {
//   return <h1>Dashboard Index</h1>;
// };




import React, { useState, useEffect } from "react";
import { db } from "../fireabse/firebase"; // Make sure the path matches your project structure
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";

const DashboardHome = () => {
  const [scanStats, setScanStats] = useState({
    totalScans: 0,
    todayScans: 0,
    recentScans: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScanData = async () => {
      try {
        setLoading(true);
        
        // Reference to the scans collection - adjust the collection name if needed
        const scansRef = collection(db, "QRScans");
        
        // Get all scans for total count
        const querySnapshot = await getDocs(scansRef);
        const totalScans = querySnapshot.size;
        
        // Calculate today's scans
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const todayScans = querySnapshot.docs.filter(doc => {
          const scanDate = doc.data().timestamp?.toDate() || new Date(doc.data().timestamp);
          return scanDate >= today;
        }).length;
        
        // Get recent scans
        const recentScansQuery = query(scansRef, orderBy("timestamp", "desc"), limit(5));
        const recentScansSnapshot = await getDocs(recentScansQuery);
        const recentScans = recentScansSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          timestamp: doc.data().timestamp?.toDate() || new Date(doc.data().timestamp)
        }));
        
        setScanStats({
          totalScans,
          todayScans,
          recentScans
        });
      } catch (error) {
        console.error("Error fetching scan data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchScanData();
  }, []);

  // Format the timestamp to a readable date
  const formatDate = (timestamp) => {
    if (!timestamp) return "Unknown";
    return timestamp.toLocaleString();
  };

  return (
    <div className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Dashboard Home</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* QR Code Scan Stats Widget */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">QR Code Scans</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-32">
              <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-purple-600 rounded-full"></div>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-purple-100 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Total Scans</p>
                  <p className="text-2xl font-bold text-purple-700">{scanStats.totalScans}</p>
                </div>
                
                <div className="bg-blue-100 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-600">Todays Scans</p>
                  <p className="text-2xl font-bold text-blue-700">{scanStats.todayScans}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-medium mb-2">Recent Scans</h3>
                {scanStats.recentScans.length > 0 ? (
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {scanStats.recentScans.map((scan) => (
                      <div key={scan.id} className="text-sm bg-gray-50 p-2 rounded">
                        <p className="font-medium">{scan.customerName || "Anonymous Customer"}</p>
                        <p className="text-gray-500 text-xs">{formatDate(scan.timestamp)}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500">No recent scans</p>
                )}
              </div>
            </div>
          )}
        </div>
        

        {/* Additional widgets can be added here */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Overview</h2>
          <p className="text-gray-600">
            Welcome to your restaurant dashboard. Monitor your QR code scans and other important metrics here.
          </p>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

// Keeping this separate component if you need it elsewhere
export const DashboardIndex = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Dashboard Index</h1>
      <DashboardHome />
    </div>
  );
};









// import React, { useState, useEffect } from "react";
// import Sidebar from "./Sidebar";
// import { useAuth } from "../contexts/AuthContext";
// import { useNavigate } from "react-router-dom";
// import UpdateProfile from "./UpdateProfile";
// function Dashboard() {
//   const [selectedItem, setSelectedItem] = useState("Home");
//   const [error, setError] = useState("");
//   const [showLogoutModal, setShowLogoutModal] = useState(false); // State to track logout modal
//   const { currentUser, logout } = useAuth();
//   const navigate = useNavigate();

//   const handleSidebarSelect = (item) => {
//     if (item === "Log out") {
//       setShowLogoutModal(true); // Show logout confirmation
//     } else {
//       setSelectedItem(item); // Normal page change
//     }
//   };

//   useEffect(() => {
//     if (selectedItem === "Log out") {
//       setShowLogoutModal(true); // Show modal when "Log out" is selected
//     }
//   }, [selectedItem]);

//   async function handleLogout() {
//     setError("");
//     try {
//       await logout();
//       navigate("/login");
//     } catch (err) {
//       setError("Failed to Log out: " + err.message);
//     }
//   }

//   return (
//     <div className="parent-div flex flex-col h-screen w-screen">
//       <div className="flex h-screen">
//         <Sidebar
//           userName="Alfen Nishanth S"
//           selectedItem={selectedItem}
//           setSelectedItem={handleSidebarSelect}
//         />
// <div className="flex-1 overflow-auto">
//           <UpdateProfile />
//         </div>

//       </div>


//       {/* Logout Confirmation Modal */}
//       {showLogoutModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/50">
//          {/*         <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-100">  backdrop-blur-sm"> */}
//           <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//             <h2 className="text-xl font-semibold">
//               Are you sure you want to log out?
//             </h2>
//             {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
//             <div className="mt-4 flex justify-end space-x-3">
//               <button
//                 onClick={() => setShowLogoutModal(false)}
//                 className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={handleLogout}
//                 className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
//               >
//                 Log out
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Dashboard;
