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
import { db } from "../fireabse/firebase"; // Fixed typo in the import path
import { collection, query, getDocs, orderBy, limit } from "firebase/firestore";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar, Clock, BarChart2, Users, TrendingUp, Coffee } from "lucide-react";

const DashboardHome = () => {
  const [scanStats, setScanStats] = useState({
    totalScans: 0,
    todayScans: 0,
    recentScans: [],
    weeklyData: []
  });
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    const fetchScanData = async () => {
      try {
        setLoading(true);
        
        // Reference to the scans collection
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
        
        // Generate weekly data for chart (mock data for demonstration)
        const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        const weeklyData = days.map(day => ({
          name: day,
          scans: Math.floor(Math.random() * 50) + 10
        }));
        
        setScanStats({
          totalScans,
          todayScans,
          recentScans,
          weeklyData
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
  
  // Get current time
  const getCurrentTime = () => {
    const now = new Date();
    return now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="px-6 py-8 bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen">
      {/* Dashboard Header with Glass Morphism */}
      <div className="bg-white bg-opacity-70 backdrop-blur-lg rounded-xl shadow-md p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Restaurant Dashboard</h1>
            <p className="text-gray-600 flex items-center">
              <Clock size={16} className="mr-2" /> 
              <span>Last updated: {getCurrentTime()}</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0 flex space-x-2">
            <button className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-lg transition duration-150 flex items-center">
              <BarChart2 size={16} className="mr-2" /> Analytics
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 py-2 px-4 rounded-lg transition duration-150">
              Settings
            </button>
          </div>
        </div>
      </div>
      
      {/* Dashboard Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-8 overflow-hidden">
        <div className="flex border-b">
          <button 
            onClick={() => setActiveTab("overview")} 
            className={`px-5 py-4 text-sm font-medium flex items-center ${activeTab === "overview" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-600 hover:text-gray-800"}`}
          >
            <BarChart2 size={16} className="mr-2" /> Overview
          </button>
          <button 
            onClick={() => setActiveTab("customers")} 
            className={`px-5 py-4 text-sm font-medium flex items-center ${activeTab === "customers" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-600 hover:text-gray-800"}`}
          >
            <Users size={16} className="mr-2" /> Customers
          </button>
          <button 
            onClick={() => setActiveTab("trends")} 
            className={`px-5 py-4 text-sm font-medium flex items-center ${activeTab === "trends" ? "text-indigo-600 border-b-2 border-indigo-600" : "text-gray-600 hover:text-gray-800"}`}
          >
            <TrendingUp size={16} className="mr-2" /> Trends
          </button>
        </div>
      </div>
      
      {/* KPI Cards Row - Fixed with Better Text Contrast */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-br from-purple-500 to-indigo-600 rounded-xl shadow-md overflow-hidden">
          <div className="flex items-start p-6">
            <div className="p-3 bg-white bg-opacity-30 rounded-lg mr-4">
              <BarChart2 size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Total Scans</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{loading ? "..." : scanStats.totalScans}</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium bg-white text-indigo-700 px-2 py-1 rounded-full">
                  +12% from last week
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl shadow-md overflow-hidden">
          <div className="flex items-start p-6">
            <div className="p-3 bg-white bg-opacity-30 rounded-lg mr-4">
              <Calendar size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Today's Scans</p>
              <h3 className="text-2xl font-bold mt-1 text-white">{loading ? "..." : scanStats.todayScans}</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium bg-white text-blue-700 px-2 py-1 rounded-full">
                  +5% from yesterday
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl shadow-md overflow-hidden">
          <div className="flex items-start p-6">
            <div className="p-3 bg-white bg-opacity-30 rounded-lg mr-4">
              <Users size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Conversion Rate</p>
              <h3 className="text-2xl font-bold mt-1 text-white">65%</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium bg-white text-orange-700 px-2 py-1 rounded-full">
                  +3% improvement
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-md overflow-hidden">
          <div className="flex items-start p-6">
            <div className="p-3 bg-white bg-opacity-30 rounded-lg mr-4">
              <Coffee size={24} className="text-white" />
            </div>
            <div>
              <p className="text-white font-medium text-sm">Menu Engagement</p>
              <h3 className="text-2xl font-bold mt-1 text-white">78%</h3>
              <div className="flex items-center mt-2">
                <span className="text-xs font-medium bg-white text-green-700 px-2 py-1 rounded-full">
                  High performance
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Weekly Scan Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Weekly Scan Activity</h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-indigo-600 rounded-full"></div>
            </div>
          ) : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={scanStats.weeklyData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="scans" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
          <div className="mt-4 grid grid-cols-3 gap-4">
            <div className="p-3 bg-indigo-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Peak Day</p>
              <p className="font-semibold text-indigo-700">Friday</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Avg. Daily</p>
              <p className="font-semibold text-indigo-700">27 Scans</p>
            </div>
            <div className="p-3 bg-indigo-50 rounded-lg text-center">
              <p className="text-xs text-gray-500">Growth</p>
              <p className="font-semibold text-indigo-700">+18.5%</p>
            </div>
          </div>
        </div>
        
        {/* Quick Actions Panel - Redesigned with Gradient Button */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Quick Actions</h2>
          <div className="space-y-4">
            <button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white py-3 px-4 rounded-xl transition duration-150 font-medium">
              Generate New QR Code
            </button>
            <button className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white py-3 px-4 rounded-xl transition duration-150 font-medium">
              Export Scan Data
            </button>
            <button className="w-full border border-gray-300 hover:bg-gray-50 text-gray-800 py-3 px-4 rounded-xl transition duration-150 font-medium">
              View Detailed Reports
            </button>
          </div>
          
          {/* New Feature: Restaurant Status Card */}
          <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100">
            <h3 className="text-md font-medium mb-2 text-blue-800">Restaurant Status</h3>
            <div className="flex items-center mb-3">
              <div className="h-3 w-3 bg-green-500 rounded-full mr-2"></div>
              <span className="text-sm font-medium">Open Now</span>
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Today: 9:00 AM - 10:00 PM</span>
              <span className="font-medium text-green-600">Active</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Row - 2 Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity with User Avatars and Improved Timeline */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Recent Activity</h2>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-purple-600 rounded-full"></div>
            </div>
          ) : (
            <div className="relative">
              <div className="absolute top-0 bottom-0 left-4 w-0.5 bg-indigo-100"></div>
              <div className="space-y-6 relative">
                {scanStats.recentScans.length > 0 ? (
                  scanStats.recentScans.map((scan, index) => (
                    <div key={scan.id} className="flex items-start">
                      <div className="flex-shrink-0 bg-gradient-to-br from-indigo-500 to-purple-600 h-8 w-8 rounded-full flex items-center justify-center z-10 text-white text-sm shadow-md">
                        {scan.customerName ? scan.customerName.charAt(0).toUpperCase() : "A"}
                      </div>
                      <div className="ml-4 flex-1">
                        <div className="bg-gray-50 p-4 rounded-lg hover:bg-indigo-50 transition duration-150 border border-gray-100">
                          <p className="font-medium text-gray-800">{scan.customerName || "Anonymous Customer"}</p>
                          <p className="text-sm text-gray-600 mt-1">Scanned QR code for menu access</p>
                          <div className="flex justify-between items-center mt-2">
                            <p className="text-xs text-gray-500">{formatDate(scan.timestamp)}</p>
                            <span className="text-xs bg-indigo-100 text-indigo-800 px-2 py-1 rounded-full font-medium">
                              New
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 ml-6">No recent scan activity</p>
                )}
              </div>
            </div>
          )}
        </div>
        
        {/* Performance Stats with Improved UI */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold mb-6">Performance Metrics</h2>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-sm font-medium">Scan Conversion Rate</p>
                  <p className="text-xs text-gray-500">Customers who order after scanning</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-600">65%</p>
                  <p className="text-xs text-green-600">+3.2% from last week</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2.5 rounded-full" style={{ width: '65%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-sm font-medium">Menu Engagement</p>
                  <p className="text-xs text-gray-500">Time spent browsing menu items</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-600">78%</p>
                  <p className="text-xs text-green-600">+5.1% from last week</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-600 h-2.5 rounded-full" style={{ width: '78%' }}></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-sm font-medium">Return Rate</p>
                  <p className="text-xs text-gray-500">Customers who return within 30 days</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-600">42%</p>
                  <p className="text-xs text-yellow-600">+0.8% from last week</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-amber-500 to-orange-600 h-2.5 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>

            {/* New Metric */}
            <div>
              <div className="flex justify-between mb-2">
                <div>
                  <p className="text-sm font-medium">Customer Satisfaction</p>
                  <p className="text-xs text-gray-500">Based on feedback surveys</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-600">89%</p>
                  <p className="text-xs text-green-600">+2.3% from last week</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5">
                <div className="bg-gradient-to-r from-emerald-500 to-green-600 h-2.5 rounded-full" style={{ width: '89%' }}></div>
              </div>
            </div>
          </div>
          
          <button className="mt-6 w-full flex items-center justify-center text-indigo-600 hover:text-indigo-800 font-medium text-sm py-2 px-4 rounded-lg border border-indigo-200 bg-indigo-50 hover:bg-indigo-100 transition duration-150">
            <BarChart2 size={16} className="mr-2" /> View Complete Analytics Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;

export const DashboardIndex = () => {
  return (
    <div className="p-0">
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
