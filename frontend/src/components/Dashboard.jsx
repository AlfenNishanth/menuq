import React, { useState, useEffect } from "react";
import { Clock, QrCode, Edit, Save, AlertTriangle, Settings, FileText, ShoppingBag } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import config from "../../config";

const API_BASE_URL = config.API_BASE_URL;

const DashboardHome = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [restaurantHours, setRestaurantHours] = useState("Loading...");
  const [editingHours, setEditingHours] = useState(false);
  const [tempHours, setTempHours] = useState("");
  const [restaurantId, setRestaurantId] = useState("");
  
  const [showQRDownloader, setShowQRDownloader] = useState(false);
  const [qrURL, setQrURL] = useState('https://menuq.app/your-restaurant');
  const [restaurantName, setRestaurantName] = useState('Your Restaurant');
  
  const [profileCompleteness, setProfileCompleteness] = useState({
    hasLogo: false,
    hasAddress: false,
    hasMenu: false,
    hasHours: false,
    hasContact: false
  });
  
  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [hoursUpdating, setHoursUpdating] = useState(false);
  
  // Fetch restaurant data from backend API
  useEffect(() => {
    const fetchRestaurantData = async () => {
      try {
        setLoading(true);
        
        // Get restaurant information from the backend API
        const token = localStorage.getItem('authToken');
        
        // Call API to get restaurant details
        const response = await axios.get(`${API_BASE_URL}/restaurant/details`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        const restaurantData = response.data;
        
        // Update state with restaurant data
        setRestaurantId(restaurantData.id);
        setRestaurantName(restaurantData.name);
        setIsOpen(restaurantData.isOpen);
        setRestaurantHours(restaurantData.businessHours);
        setQrURL(`https://menuq.app/menu/${restaurantData.slug}`);
        
        // Calculate profile completeness (minimal data needed)
        setProfileCompleteness({
          hasLogo: !!restaurantData.logoUrl,
          hasAddress: !!restaurantData.address,
          hasMenu: (restaurantData.menuItems && restaurantData.menuItems.length > 0),
          hasHours: !!restaurantData.businessHours,
          hasContact: !!restaurantData.contactPhone || !!restaurantData.contactEmail
        });
        
      } catch (err) {
        console.error("Error fetching restaurant data:", err);
        setError("Failed to load restaurant information. Please refresh the page.");
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurantData();
  }, []);
  
  // Calculate completeness percentage
  const calculateCompleteness = () => {
    const { hasLogo, hasAddress, hasMenu, hasHours, hasContact } = profileCompleteness;
    const completedItems = [hasLogo, hasAddress, hasMenu, hasHours, hasContact].filter(Boolean).length;
    return Math.round((completedItems / 5) * 100);
  };
  
  // Toggle restaurant open/closed status via API
  const toggleRestaurantStatus = async () => {
    try {
      setStatusUpdating(true);
      const token = localStorage.getItem('authToken');
      
      await axios.put(
        `${API_BASE_URL}/restaurant/${restaurantId}/status`, 
        { isOpen: !isOpen },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setIsOpen(!isOpen);
      
    } catch (err) {
      console.error("Error updating restaurant status:", err);
      alert("Failed to update restaurant status. Please try again.");
    } finally {
      setStatusUpdating(false);
    }
  };
  
  // Begin editing hours
  const handleEditHours = () => {
    setTempHours(restaurantHours);
    setEditingHours(true);
  };
  
  // Save edited hours to backend API
  const saveHours = async () => {
    try {
      setHoursUpdating(true);
      const token = localStorage.getItem('authToken');
      
      await axios.put(
        `${API_BASE_URL}/restaurant/${restaurantId}/hours`, 
        { businessHours: tempHours },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setRestaurantHours(tempHours);
      setEditingHours(false);
      
      // Update profile completeness for hours
      setProfileCompleteness(prev => ({...prev, hasHours: true}));
      
    } catch (err) {
      console.error("Error updating restaurant hours:", err);
      alert("Failed to update business hours. Please try again.");
    } finally {
      setHoursUpdating(false);
    }
  };
  
  // QR code modal toggle
  const toggleQRModal = () => {
    setShowQRDownloader(!showQRDownloader);
  };
  
  // Get current time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  // Download QR code as PNG
  const downloadQR = () => {
    const canvas = document.createElement("canvas");
    const svg = document.getElementById("restaurant-qr");
    const serializer = new XMLSerializer();
    const svgStr = serializer.serializeToString(svg);
    
    const img = new Image();
    img.src = 'data:image/svg+xml;base64,' + btoa(svgStr);
    
    img.onload = function() {
      canvas.width = img.width;
      canvas.height = img.height;
      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0);
      
      const a = document.createElement("a");
      a.download = `${restaurantName.replace(/\s+/g, '-').toLowerCase()}-qr.png`;
      a.href = canvas.toDataURL("image/png");
      a.click();
    };
  };

  return (
    <div className="px-6 py-8 bg-gradient-to-br from-amber-50 to-white min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-amber-200">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <h1 className="text-3xl font-bold text-amber-800 mb-2">MenuQ Dashboard</h1>
            <p className="text-amber-700 flex items-center">
              <Clock size={16} className="mr-2" /> 
              <span>Last updated: {getCurrentTime()}</span>
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button 
              onClick={toggleQRModal} 
              className="bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition duration-150 flex items-center"
            >
              <QrCode size={16} className="mr-2" /> Show QR Code
            </button>
          </div>
        </div>
      </div>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex items-center">
            <AlertTriangle className="text-red-500 mr-2" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}
      
      {/* QR Code Modal */}
      {showQRDownloader && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-amber-700">Restaurant QR Code</h2>
              <button 
                onClick={toggleQRModal}
                className="text-amber-500 hover:text-amber-700"
              >
                ✕
              </button>
            </div>
            
            <div className="flex justify-center my-4">
              <div className="flex flex-col items-center p-4 bg-white rounded-lg">
                <QRCodeSVG 
                  id="restaurant-qr"
                  value={qrURL}
                  size={200}
                  bgColor="#ffffff"
                  fgColor="#000000"
                  level="H"
                  includeMargin={false}
                />
                <p className="mt-3 text-center text-gray-600">
                  Scan to view {restaurantName}'s menu
                </p>
                <button 
                  onClick={downloadQR}
                  className="mt-4 bg-amber-600 hover:bg-amber-700 text-white py-2 px-4 rounded-lg transition"
                >
                  Download QR Code
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Completeness Section - Requires minimal data storage */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-amber-100">
          <h2 className="text-xl font-semibold text-amber-800 mb-6">Restaurant Profile</h2>
          
          {loading ? (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin h-8 w-8 border-4 border-t-transparent border-amber-600 rounded-full"></div>
            </div>
          ) : (
            <div>
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-amber-800">Profile Completeness</h3>
                  <span className="font-bold text-amber-600">{calculateCompleteness()}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-amber-600 h-2 rounded-full" 
                    style={{ width: `${calculateCompleteness()}%` }}
                  ></div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Quick Action Cards */}
                <div className={`p-4 rounded-lg border ${profileCompleteness.hasLogo ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${profileCompleteness.hasLogo ? 'bg-green-100' : 'bg-amber-100'} mr-3`}>
                      <Settings size={20} className={profileCompleteness.hasLogo ? 'text-green-600' : 'text-amber-600'} />
                    </div>
                    <div>
                      <h4 className="font-medium">Restaurant Logo</h4>
                      <p className="text-sm text-gray-600">
                        {profileCompleteness.hasLogo ? 'Logo uploaded' : 'Upload your restaurant logo'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Tips */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Quick Tips</h3>
                <ul className="text-sm text-blue-700 pl-5 list-disc">
                  <li className="mb-1">Complete your profile to make your menu look professional</li>
                  <li className="mb-1">Print your QR code and place it on tables for easy access</li>
                  <li>Add descriptions and images to menu items to increase customer interest</li>
                </ul>
              </div>
            </div>
          )}
        </div>
        
        {/* Restaurant Status Panel */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-amber-100">
          <h2 className="text-xl font-semibold text-amber-800 mb-6">Restaurant Status</h2>
          
          {/* Open/Close Toggle */}
          <div className="flex items-center justify-between mb-6 p-4 bg-amber-50 rounded-xl">
            <div>
              <h3 className="font-medium text-amber-800">Current Status</h3>
              <p className="text-sm text-gray-600">Toggle to update</p>
            </div>
            <div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={isOpen} 
                  onChange={toggleRestaurantStatus} 
                  disabled={statusUpdating}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
                <span className="ml-3 text-sm font-medium text-gray-900">
                  {statusUpdating ? 'Updating...' : isOpen ? 'Open' : 'Closed'}
                </span>
              </label>
            </div>
          </div>
          
          {/* Hours Editor */}
          <div className="p-4 bg-amber-50 rounded-xl mb-6">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-medium text-amber-800">Business Hours</h3>
              {!editingHours ? (
                <button 
                  onClick={handleEditHours}
                  className="text-amber-600 hover:text-amber-800 flex items-center text-sm"
                >
                  <Edit size={14} className="mr-1" /> Edit
                </button>
              ) : (
                <button 
                  onClick={saveHours}
                  disabled={hoursUpdating}
                  className="text-green-600 hover:text-green-800 flex items-center text-sm"
                >
                  <Save size={14} className="mr-1" /> {hoursUpdating ? 'Saving...' : 'Save'}
                </button>
              )}
            </div>
            
            {!editingHours ? (
              <p className="text-gray-700">{restaurantHours}</p>
            ) : (
              <input
                type="text"
                value={tempHours}
                onChange={(e) => setTempHours(e.target.value)}
                className="w-full p-2 border border-amber-300 rounded-md focus:ring-amber-500 focus:border-amber-500"
                placeholder="e.g. 9:00 AM - 10:00 PM"
                disabled={hoursUpdating}
              />
            )}
          </div>
          
          {/* Quick Stats */}
          <div className="bg-amber-100/50 rounded-xl p-4">
            <h3 className="font-medium text-amber-800 mb-2">Quick Info</h3>
            <div className="grid grid-cols-2 gap-2">
              <div className="p-3 bg-white rounded-lg text-center">
                <p className="text-xs text-gray-500">Restaurant Name</p>
                <p className="font-semibold text-amber-700">{restaurantName}</p>
              </div>
              <div className="p-3 bg-white rounded-lg text-center">
                <p className="text-xs text-gray-500">Menu Link</p>
                <p className="font-semibold text-amber-700 truncate text-xs">
                  {qrURL.length > 20 ? qrURL.substring(0, 20) + '...' : qrURL}
                </p>
              </div>
            </div>
          </div>
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