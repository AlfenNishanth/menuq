import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateRestaurant } from "../api/restaurant"

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

  useEffect(() => {
    
    console.log("in component - userData:", userData);

    if (userData) {
      setPhone(userData.phone || "");
      setRestaurantName(userData.restaurantName || "");
      setRestaurantAddress(userData.restaurantAddress || "");
      setNoOfSeats(userData.noOfSeats || "");
      setInitialLoading(false);
    }
  }, [userData]);

  const handleInputChange = (e, setter) => {
    setter(e.target.value);
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
        updatedAt: new Date(),
      };
  
      await updateRestaurant(currentUser.uid, updatedData); 
      toast.success("Profile updated successfully!");
      updateUserData();
      // setTimeout(() => navigate("/dashboard"), 2000);
      setIsChanged(false);
    } catch (err) {
      toast.error("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-300 mix-blend-multiply"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber-200 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-100 mix-blend-multiply"></div>
      </div>
      
      <div className="p-8 rounded-2xl shadow-xl w-full max-w-md bg-white/80 backdrop-blur-sm relative z-10 border border-amber-50">
        <h2 className="text-3xl font-serif font-bold mb-6 text-center text-amber-700">
          Update Profile
        </h2>

        {initialLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-12 w-12 border-4 border-t-transparent border-amber-600 rounded-full"></div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.target.type !== "textarea") {
                e.preventDefault();
              }
            }}
          >
            <div className="grid grid-cols-1 gap-4">
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-gray-300 text-gray-900"
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-gray-300 text-gray-900"
                  disabled={loading}
                  required
                />
              </div>

              {/* Restaurant Address */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">
                  Restaurant Address
                </label>
                <textarea
                  value={restaurantAddress}
                  onChange={(e) => handleInputChange(e, setRestaurantAddress)}
                  placeholder="Restaurant Address"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-gray-300 text-gray-900"
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
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-50 border-gray-300 text-gray-900"
                  disabled={loading}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button
                type="submit"
                className="flex-1 bg-amber-600 text-white p-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300 shadow-lg disabled:opacity-50 flex justify-center items-center"
                disabled={loading || !isChanged}
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "Update Profile"
                )}
              </button>

              <Link
                to="/dashboard"
                className="flex-1 bg-gray-300 text-gray-800 p-3 rounded-lg font-semibold hover:bg-gray-400 transition duration-300 shadow-lg flex justify-center items-center"
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