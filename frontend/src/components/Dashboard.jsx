import React, { useState, useEffect } from "react";
import { Clock, QrCode, AlertTriangle, Settings, FileText, ShoppingBag } from "lucide-react";
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';
import RestaurantStatusPanel from './RestaurantStatusPanel'; // Importing the RestaurantStatusPanel

// Main Dashboard Component
const DashboardHome = () => {
  // Restaurant data states
  const [restaurant, setRestaurant] = useState(null);
  const [restaurantName, setRestaurantName] = useState('Your Restaurant');
  
  // QR code state
  const [showQRDownloader, setShowQRDownloader] = useState(false);
  const [qrURL, setQrURL] = useState('https://menuq.app/your-restaurant');
  
  // Profile completeness state - very minimal storage impact
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

  // Using Vite's environment variable format instead of process.env
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.menuq.app';
  
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
        setRestaurant(restaurantData);
        setRestaurantName(restaurantData.name);
        setQrURL(`https://menuq.app/menu/${restaurantData.slug}`);
        
        // Calculate profile completeness (minimal data needed)
        setProfileCompleteness({
          hasLogo: !!restaurantData.logoUrl,
          hasAddress: !!restaurantData.address,
          hasMenu: (restaurantData.menuItems && restaurantData.menuItems.length > 0),
          hasHours: (restaurantData.operatingHours && restaurantData.operatingHours.length > 0),
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
  }, [API_BASE_URL]);

  // Handle updates from RestaurantStatusPanel
  const handleRestaurantUpdate = (updatedRestaurant) => {
    setRestaurant(updatedRestaurant);
    
    // Update other states if needed
    if (updatedRestaurant.name !== restaurantName) {
      setRestaurantName(updatedRestaurant.name);
    }
    
    // Update profile completeness
    setProfileCompleteness(prev => ({
      ...prev,
      hasHours: (updatedRestaurant.operatingHours && updatedRestaurant.operatingHours.length > 0)
    }));
  };
  
  // Calculate completeness percentage
  const calculateCompleteness = () => {
    const { hasLogo, hasAddress, hasMenu, hasHours, hasContact } = profileCompleteness;
    const completedItems = [hasLogo, hasAddress, hasMenu, hasHours, hasContact].filter(Boolean).length;
    return Math.round((completedItems / 5) * 100);
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

                <div className={`p-4 rounded-lg border ${profileCompleteness.hasMenu ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${profileCompleteness.hasMenu ? 'bg-green-100' : 'bg-amber-100'} mr-3`}>
                      <FileText size={20} className={profileCompleteness.hasMenu ? 'text-green-600' : 'text-amber-600'} />
                    </div>
                    <div>
                      <h4 className="font-medium">Menu Items</h4>
                      <p className="text-sm text-gray-600">
                        {profileCompleteness.hasMenu ? 'Menu items added' : 'Add items to your menu'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${profileCompleteness.hasAddress ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${profileCompleteness.hasAddress ? 'bg-green-100' : 'bg-amber-100'} mr-3`}>
                      <Settings size={20} className={profileCompleteness.hasAddress ? 'text-green-600' : 'text-amber-600'} />
                    </div>
                    <div>
                      <h4 className="font-medium">Restaurant Address</h4>
                      <p className="text-sm text-gray-600">
                        {profileCompleteness.hasAddress ? 'Address added' : 'Add your restaurant address'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className={`p-4 rounded-lg border ${profileCompleteness.hasContact ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                  <div className="flex items-center">
                    <div className={`p-2 rounded-full ${profileCompleteness.hasContact ? 'bg-green-100' : 'bg-amber-100'} mr-3`}>
                      <ShoppingBag size={20} className={profileCompleteness.hasContact ? 'text-green-600' : 'text-amber-600'} />
                    </div>
                    <div>
                      <h4 className="font-medium">Contact Information</h4>
                      <p className="text-sm text-gray-600">
                        {profileCompleteness.hasContact ? 'Contact info added' : 'Add contact information'}
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
        
        {/* Restaurant Status Panel - Now properly passing props */}
        <div className="lg:col-span-1">
          <RestaurantStatusPanel 
            restaurant={restaurant} 
            onUpdate={handleRestaurantUpdate} 
          />
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