import { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaApple } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { updateProfile } from "firebase/auth";
import { registerRestaurant } from "../api/restaurant";
import LocationSelector from "./LocationSelector";

const Signup = () => {
  // Form references
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const ResNameRef = useRef();
  const ResAdrsRef = useRef();
  const NoSeatsRef = useRef();
  const phoneRef = useRef();

  // Restaurant data states
  const [ResLoc, setResLoc] = useState({ type: "Point", coordinates: [0, 0] });
  const [ResCategory, setResCategory] = useState("");
  const [CuisineType, setCuisineType] = useState([]);
  const [OperatingHours, setOperatingHours] = useState([]);
  const [SocialMedia, setSocialMedia] = useState({});

  // UI states
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { signUp, socialLogin, currentUser, userData, isSigningUp } = useAuth();
  const navigate = useNavigate();

  // Focus email input on component mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // Redirect if user is already signed in
  useEffect(() => {
    if (currentUser && !isSigningUp && userData) {
      toast.info("You are already signed in. Please logout first to signup with a new user.");
      navigate("/dashboard/");
    }
  }, [currentUser, isSigningUp, userData, navigate]);

  // Handle location selection from the location picker
  const handleLocationSelect = (locationData) => {
    setResLoc({
      type: "Point",
      coordinates: locationData.coordinates,
      address: locationData.address,
      placeId: locationData.placeId
    });
    
    // Auto-fill address field
    if (ResAdrsRef.current) {
      ResAdrsRef.current.value = locationData.address;
    }
  };

  // Handle form submission
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    
    // Client-side validations
    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setLoading(false);
      toast.error("Passwords do not match");
      return setError("Passwords do not match");
    }
    
    if (passwordRef.current.value.length < 6) {
      setLoading(false);
      toast.error("Password must be at least 6 characters long");
      return setError("Password must be at least 6 characters long");
    }
    
    // Check if location is selected
    if (ResLoc.coordinates[0] === 0 && ResLoc.coordinates[1] === 0) {
      setLoading(false);
      toast.error("Please select a restaurant location");
      return setError("Please select a restaurant location");
    }
    
    try {
      setError("");
      
      // Prepare restaurant data object
      const restaurantData = {
        restaurantName: ResNameRef.current.value,
        restaurantAddress: ResAdrsRef.current.value,
        restaurantLocation: ResLoc,
        noOfSeats: NoSeatsRef.current.value,
        phone: phoneRef.current.value,
        restaurantCategory: ResCategory,
        cuisineType: CuisineType,
        operatingHours: OperatingHours,
        socialMedia: SocialMedia
      };
      
      // Call the enhanced signUp function from AuthContext
      const result = await signUp(
        emailRef.current.value,
        passwordRef.current.value,
        restaurantData
      );
      
      if (result.success) {
        toast.success("Account created successfully!");
        navigate("/dashboard");
      }
    } catch (err) {
      const errorMessage = err.message.replace("Firebase: ", "");
      setError(`Failed to create an account: ${errorMessage}`);
      toast.error(`Signup failed: ${errorMessage}`);
      console.error(err);
    }
    
    setLoading(false);
  }

  // Fallback signup method (kept from your comments) - can be used if needed
  async function handleLegacySignup(e) {
    e.preventDefault();
    setLoading(true);

    if (passwordRef.current.value !== confirmPasswordRef.current.value) {
      setLoading(false);
      toast.error("Passwords do not match");
      return setError("Passwords do not match");
    }

    if (passwordRef.current.value.length < 6) {
      setLoading(false);
      toast.error("Password must be at least 6 characters long");
      return setError("Password must be at least 6 characters long");
    }
    
    if (ResLoc.coordinates[0] === 0 && ResLoc.coordinates[1] === 0) {
      setLoading(false);
      toast.error("Please select a restaurant location");
      return setError("Please select a restaurant location");
    }

    try {
      setError("");
      const userCredential = await signUp(
        emailRef.current.value,
        passwordRef.current.value
      );

      const user = userCredential.user;
      if (user) {
        await updateProfile(user, { displayName: ResNameRef.current.value });
        
        // Prepare restaurant data
        const data = {
          firebaseUid: user.uid,
          email: emailRef.current.value,
          phone: phoneRef.current.value,
          restaurantName: ResNameRef.current.value,
          restaurantAddress: ResAdrsRef.current.value,
          restaurantLocation: ResLoc,
          noOfSeats: NoSeatsRef.current.value,
          restaurantCategory: ResCategory,
          cuisineType: CuisineType,
          operatingHours: OperatingHours,
          socialMedia: SocialMedia
        };
        
        try {
          await registerRestaurant(data);
          toast.success("Account created successfully!");
          navigate("/dashboard");
        } catch (error) {
          console.error("Error registering restaurant in database:", error);
          setError(`Failed to create an account: ${error}`);
          console.log("deleting firebase user " + user.uid + " " + user.displayName);
          await user.delete();
        }
      }
    } catch (err) {
      const errorMessage = err.message.replace("Firebase: ", "");
      setError(`Failed to create an account: ${errorMessage}`);
      toast.error(`Signup failed: ${errorMessage}`);
      console.error(err);
    }

    setLoading(false);
  }

  // Social login handler
  async function handleSocialSignup(provider) {
    try {
      setLoading(true);
      const result = await socialLogin(provider);
      if (result.user) {
        navigate("/complete-profile");
      }
    } catch (error) {
      toast.error(`Social signup failed: ${error.message}`);
    }
    setLoading(false);
  }

  // Toggle password visibility handlers
  const togglePasswordVisibility = (fieldType) => {
    if (fieldType === 'password') {
      setShowPassword(!showPassword);
    } else if (fieldType === 'confirmPassword') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen transition-colors duration-500 bg-gradient-to-b from-amber-50 to-white px-4 py-8 sm:px-6">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-300 mix-blend-multiply"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber-200 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-100 mix-blend-multiply"></div>
      </div>

      <div className="p-4 sm:p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-transform duration-300 backdrop-blur-lg bg-white/90 border border-amber-100">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-center text-gray-900">Create Your MenuQ Account</h2>
        {error && <div className="text-red-500 text-center mb-4 animate-shake">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <input 
              type="email" 
              ref={emailRef} 
              placeholder="Email Address" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900" 
              required 
              autoFocus 
              aria-label="Email Address"
            />
            
            <input 
              type="tel" 
              ref={phoneRef} 
              placeholder="Phone Number" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900" 
              required
              pattern="^[6-9]\d{9}$"
              title="Please enter a valid 10-digit phone number."
              aria-label="Phone Number"
            />
            
            {/* Password field with toggle icon */}
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                ref={passwordRef} 
                placeholder="Password" 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900 pr-10" 
                required
                aria-label="Password" 
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900"
                onClick={() => togglePasswordVisibility('password')}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            
            {/* Confirm Password field with toggle icon */}
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                ref={confirmPasswordRef} 
                placeholder="Confirm Password" 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900 pr-10" 
                required
                aria-label="Confirm Password" 
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-700 hover:text-gray-900"
                onClick={() => togglePasswordVisibility('confirmPassword')}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <input 
              type="text" 
              ref={ResNameRef} 
              placeholder="Restaurant Name" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900" 
              required
              aria-label="Restaurant Name" 
            />
            
            {/* Location Selector Component */}
            <div className="bg-amber-50 p-3 sm:p-4 rounded-lg border border-amber-200">
              <h3 className="text-sm font-bold text-amber-800 mb-2">Restaurant Location</h3>
              <LocationSelector onLocationSelect={handleLocationSelect} />
            </div>
            
            <input 
              type="text" 
              ref={ResAdrsRef} 
              placeholder="Restaurant Address (auto-filled from location)" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900" 
              required
              aria-label="Restaurant Address" 
              readOnly
            />
            
            <input 
              type="number" 
              ref={NoSeatsRef} 
              placeholder="Number of Seats" 
              min="1"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900" 
              required
              aria-label="Number of Seats" 
            />

            {/* Restaurant Category Dropdown */}
            <select
              value={ResCategory}
              onChange={(e) => setResCategory(e.target.value)}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900"
              aria-label="Restaurant Category"
              required
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

          <button 
            type="submit" 
            className="w-full bg-amber-600 text-white p-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300 shadow-lg disabled:opacity-50 flex justify-center items-center" 
            disabled={loading}
            aria-label="Create account"
          >
            {loading ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Social login buttons - commented out for future implementation */}
        {/* <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 mb-2">Or sign up with</p>
          <div className="flex justify-center space-x-3">
            <button 
              className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700" 
              onClick={() => handleSocialSignup('google')}
              aria-label="Sign up with Google"
            >
              <FaGoogle />
            </button>
            <button 
              className="p-3 bg-black text-white rounded-full hover:bg-gray-800" 
              onClick={() => handleSocialSignup('apple')}
              aria-label="Sign up with Apple"
            >
              <FaApple />
            </button>
          </div>
        </div> */}

        <div className="flex justify-center mt-4 text-gray-500 text-sm sm:text-base">
          Already have an account?
          <Link to="/login" className="text-amber-600 underline ml-2 hover:text-amber-700 transition">Log In</Link>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable theme="light" />
    </div>
  );
};

export default Signup;