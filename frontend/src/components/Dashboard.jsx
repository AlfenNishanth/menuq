import React, { useState, useEffect, useRef } from "react";
import { Clock, AlertTriangle, Settings, ExternalLink } from "lucide-react";
import RestaurantStatusPanel from "./RestaurantStatusPanel"; // Importing the RestaurantStatusPanel
import { useAuth } from "../contexts/AuthContext";
import config from "../../config";

// Main Dashboard Component
const DashboardHome = () => {
  const { userData, loading: AuthLoading } = useAuth();

  if (AuthLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 relative">
          <div className="absolute inset-0 border-4 border-amber-200 border-t-amber-600 rounded-full animate-spin"></div>
          <div className="absolute inset-3 border-2 border-amber-100 border-b-amber-400 rounded-full animate-spin-slow"></div>
        </div>
        <p className="mt-6 text-amber-800 font-medium">Loading </p>
      </div>
    );
  }

  const [restaurant, setRestaurant] = useState(null);
  const [restaurantName, setRestaurantName] = useState("Your Restaurant");

  // QR code state
  const [qrURL, setQrURL] = useState("https://menuq.app/your-restaurant");
  const qrRef = useRef(null);

  // Profile completeness state - very minimal storage impact
  const [profileCompleteness, setProfileCompleteness] = useState({
    hasLogo: false,
    hasHours: false,
  });

  // Loading and error states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // QR code options state
  const [qrOptions, setQrOptions] = useState({
    bgColor: "#FFFFFF",
    fgColor: "#B45309", // amber-700
    shape: "square",
    size: 256,
    logoImage: null,
    logoSize: 60,
    includeLogo: false,
    includeCustomLogo: false,
    selectedPresetLogo: "food",
    restaurantName: "",
    downloadFormat: "png",
    errorCorrectionLevel: "H",
    logoBackgroundColor: "#FFFFFF",
    logoPosition: "center",
    borderColor: "#B45309",
    borderSize: 0,
    shapeType: "basic", // basic, food, drink, or restaurant
    customShape: "square", // Name of the selected shape
  });

  // Using Vite's environment variable format instead of process.env
  

  // Fetch restaurant data from backend API
  useEffect(() => {
    try {
      setLoading(true);

      const restaurantData = userData;

      setRestaurant(restaurantData);
      setRestaurantName(restaurantData.name);
      setQrURL(`${config.QR_URL}/${restaurantData.restaurantId}`);

      // Calculate profile completeness (minimal data needed)
      // setProfileCompleteness({
      //   hasLogo: !!restaurantData.logoUrl,
      //   hasHours:
      //     restaurantData.operatingHours &&
      //     restaurantData.operatingHours.length > 0,
      // });
    } catch (err) {
      console.error("Error fetching restaurant data:", err);
      setError(
        "Failed to load restaurant information. Please refresh the page."
      );
    } finally {
      setLoading(false);
    }
  }, [userData]);

  // Handle updates from RestaurantStatusPanel
  const handleRestaurantUpdate = (updatedRestaurant) => {
    setRestaurant(updatedRestaurant);

    // Update other states if needed
    if (updatedRestaurant.name !== restaurantName) {
      setRestaurantName(updatedRestaurant.name);
    }

    // Update profile completeness
    setProfileCompleteness((prev) => ({
      ...prev,
      hasHours:
        updatedRestaurant.operatingHours &&
        updatedRestaurant.operatingHours.length > 0,
    }));
  };

  // Calculate completeness percentage
  const calculateCompleteness = () => {
    const { hasLogo, hasHours } = profileCompleteness;
    const completedItems = [hasLogo, hasHours].filter(Boolean).length;
    return Math.round((completedItems / 2) * 100);
  };

  // Get current time
  const getCurrentTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Handle view menu click
  const handleViewMenuClick = () => {
    window.open(qrURL, '_blank');
  };

  return (
    <div className="px-6 py-8 bg-gradient-to-br from-amber-50 to-white min-h-screen">
      {/* Dashboard Header */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-amber-200">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-amber-800 mb-2">
              MenuQ Dashboard
            </h1>
            <p className="text-amber-700 flex items-center">
              <span className="mr-3">{userData?.restaurantId} </span>
              <Clock size={16} className="mr-0.5 mt-0.25" />
              <span>Last updated: {getCurrentTime()}</span>
            </p>
          </div>
          
          {/* View Menu Button */}
          <button
            onClick={handleViewMenuClick}
            className="flex items-center px-5 py-3 bg-gradient-to-r from-amber-600 to-amber-700 hover:from-amber-700 hover:to-amber-800 text-white font-medium rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            <span className="mr-2">View Menu</span>
            <ExternalLink size={18} />
          </button>
        </div>
      </div>

      {/* Error message */}
      {/* {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-md">
          <div className="flex items-center">
            <AlertTriangle className="text-red-500 mr-2" size={20} />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )} */}

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {/* Profile Completeness Section - Requires minimal data storage */}
        {/* <div className="lg:col-span-2 bg-white rounded-xl shadow-md p-6 border border-amber-100">
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
              
              <div className="grid grid-cols-1 md:grid-cols-1 gap-4"> */}
        {/* Only Restaurant Logo Option */}
        {/* <div className={`p-4 rounded-lg border ${profileCompleteness.hasLogo ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
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
              </div> */}

        {/* Quick Tips */}
        {/* <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                <h3 className="font-medium text-blue-800 mb-2">Quick Tips</h3>
                <ul className="text-sm text-blue-700 pl-5 list-disc">
                  <li className="mb-1">Complete your profile to make your menu look professional</li>
                  <li className="mb-1">Print your QR code and place it on tables for easy access</li>
                  <li>Add descriptions and images to menu items to increase customer interest</li>
                </ul>
              </div>
            </div>
          )}
        </div> */}

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