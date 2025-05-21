import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateRestaurant } from "../api/restaurant";
import LocationSelector from "./LocationSelector"; // Import the LocationSelector component

const UpdateProfile = () => {
  const { currentUser, userData, updateUserData } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [isChanged, setIsChanged] = useState(false);
  const navigate = useNavigate();

  // State for form inputs
  const [phone, setPhone] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [restaurantAddress, setRestaurantAddress] = useState("");
  const [noOfSeats, setNoOfSeats] = useState("");
  // Add restaurant category state
  const [restaurantCategory, setRestaurantCategory] = useState("");
  
  // New state for location data
  const [locationData, setLocationData] = useState({
    address: "",
    coordinates: [null, null],
    placeId: ""
  });

  useEffect(() => {
    console.log("in component - userData:", userData);

    if (userData) {
      setPhone(userData.phone || "");
      setRestaurantName(userData.restaurantName || "");
      setRestaurantAddress(userData.restaurantAddress || "");
      setNoOfSeats(userData.noOfSeats || "");
      
      // Add debugging to check what category data we have
      console.log("Restaurant Category from userData:", userData.restaurantCategory);
      
      // Initialize restaurant category - try both possible property names
      if (userData.restaurantCategory) {
        setRestaurantCategory(userData.restaurantCategory);
      } else if (userData.category) {
        setRestaurantCategory(userData.category);
      }
      
      // Initialize location data if it exists in userData
      if (userData.location) {
        setLocationData(userData.location);
      }
      
      setInitialLoading(false);
    }
  }, [userData]);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
    setIsChanged(true);
  };

  // Handler for location selection
  const handleLocationSelect = (selectedLocation) => {
    setLocationData(selectedLocation);
    setRestaurantAddress(selectedLocation.address); // Update the address field
    setIsChanged(true);
  };

  async function handleSubmit(e) {
    e.preventDefault();
  
    if (!phone.match(/^[6-9]\d{9}$/)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
  
    setLoading(true);
  
    try {
      const updatedData = {
        phone,
        restaurantName,
        restaurantAddress,
        noOfSeats,
        restaurantCategory, // Include restaurant category in update data
        location: locationData, // Include the location data
        updatedAt: new Date(),
      };
  
      console.log("Updating profile with data:", updatedData);
      await updateRestaurant(currentUser.uid, updatedData); 
      toast.success("Profile updated successfully!");
      updateUserData();
      setIsChanged(false);
    } catch (err) {
      toast.error("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900 px-4 py-6">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-300 mix-blend-multiply"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber-200 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-100 mix-blend-multiply"></div>
      </div>
      
      <div className="p-4 sm:p-8 rounded-2xl shadow-xl w-full max-w-md bg-white/80 backdrop-blur-sm relative z-10 border border-amber-50">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold mb-4 sm:mb-6 text-center text-amber-700">
          Update Profile
        </h2>

        {initialLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-12 w-12 border-4 border-t-transparent border-amber-600 rounded-full"></div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-3 sm:space-y-4"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.type !== "textarea") {
                e.preventDefault();
              }
            }}
          >
            <div className="grid grid-cols-1 gap-3 sm:gap-4">
              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => handleInputChange(e, setPhone)}
                  placeholder="Phone Number"
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-gray-300 text-gray-900"
                  disabled={loading}
                  required
                />
              </div>

              {/* Restaurant Name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Restaurant Name
                </label>
                <input
                  type="text"
                  value={restaurantName}
                  onChange={(e) => handleInputChange(e, setRestaurantName)}
                  placeholder="Restaurant Name"
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-gray-300 text-gray-900"
                  disabled={loading}
                  required
                />
              </div>

              {/* Restaurant Category Dropdown */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Restaurant Category
                </label>
                <select
                  value={restaurantCategory}
                  onChange={(e) => handleInputChange(e, setRestaurantCategory)}
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-gray-300 text-gray-900"
                  disabled={loading}
                  aria-label="Restaurant Category"
                >
                  <option value="">Select Category</option>
                  <option value="Restaurant">Restaurant</option>
                  <option value="Quick Service Restaurant">Quick Service Restaurant (QSR)</option>
                  <option value="Cafe & Coffee Shop">Cafe & Coffee Shop</option>
                  <option value="Bar & Pub">Bar & Pub</option>
                  <option value="Bakery & Patisserie">Bakery & Patisserie</option>
                  <option value="Juice & Beverage Shop">Juice & Beverage Shop</option>
                  <option value="Food Court Vendor">Food Court Vendor</option>
                  <option value="Food Stall/Cart/Truck">Food Stall/Cart/Truck</option>
                  <option value="Hotel Restaurant">Hotel Restaurant</option>
                  <option value="Catering Service">Catering Service</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Location Selector */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Restaurant Location
                </label>
                <LocationSelector 
                  onLocationSelect={handleLocationSelect}
                  initialLocation={locationData} 
                />
              </div>

              {/* Restaurant Address (now auto-filled by LocationSelector but can be edited) */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Restaurant Address (Detailed)
                </label>
                <textarea
                  value={restaurantAddress}
                  onChange={(e) => handleInputChange(e, setRestaurantAddress)}
                  placeholder="Additional Address Details"
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-gray-300 text-gray-900"
                  disabled={loading}
                  rows={3}
                  required
                />
              </div>

              {/* Number of Seats */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Number of Seats
                </label>
                <input
                  type="number"
                  value={noOfSeats}
                  onChange={(e) => handleInputChange(e, setNoOfSeats)}
                  placeholder="Number of Seats"
                  className="w-full p-2 sm:p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-gray-300 text-gray-900"
                  disabled={loading}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 pt-4">
              <button
                type="submit"
                className="w-full bg-amber-600 text-white p-2 sm:p-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300 shadow-lg disabled:opacity-50 flex justify-center items-center"
                disabled={loading || !isChanged}
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "Update Profile"
                )}
              </button>

              <Link
                to="/dashboard/"
                className="w-full text-center bg-gray-300 text-gray-800 p-2 sm:p-3 rounded-lg font-semibold hover:bg-gray-400 transition duration-300 shadow-lg flex justify-center items-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        )}
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
    </div>
  );
};

export default UpdateProfile;