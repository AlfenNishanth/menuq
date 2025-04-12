import { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaSun, FaMoon, FaGoogle, FaFacebook, FaApple, FaCloudUploadAlt, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { db, storage } from "../fireabse/firebase"; // Fixed typo in import path
import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { updateProfile } from "firebase/auth";
import { registerRestaurant } from "../api/restaurant";

const Signup = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const confirmPasswordRef = useRef();
  const ResNameRef = useRef();
  const ResAdrsRef = useRef();
  const NoSeatsRef = useRef();
  const phoneRef = useRef();
  const fileInputRef = useRef();

  // Additional restaurant data
  const [ResLoc, setResLoc] = useState({ type: "Point", coordinates: [0, 0] });
  const [ResCategory, setResCategory] = useState("Other");
  const [CuisineType, setCuisineType] = useState([]);
  const [OperatingHours, setOperatingHours] = useState([]);
  const [SocialMedia, setSocialMedia] = useState({});

  const { signUp, socialLogin, currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem("darkMode") === "true");
  const [language, setLanguage] = useState(() => localStorage.getItem("language") || "en");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem("language", language);
  // }, [language]);

  // useEffect(() => {
  //   localStorage.setItem("darkMode", darkMode);
  //   document.body.classList.toggle("dark-mode", darkMode);
  // }, [darkMode]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error("Image size should be less than 5MB");
        return;
      }
      
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImageFile(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  async function uploadRestaurantImage(userId) {
    if (!imageFile) return null;
    
    setUploadingImage(true);
    try {
      const storageRef = ref(storage, `restaurant_images/${userId}/${Date.now()}_${imageFile.name}`);
      await uploadBytes(storageRef, imageFile);
      const downloadURL = await getDownloadURL(storageRef);
      setUploadingImage(false);
      return downloadURL;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image");
      setUploadingImage(false);
      return null;
    }
  }

  async function handleSubmit(e) {
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

    try {
      setError("");
      const userCredential = await signUp(
        emailRef.current.value,
        passwordRef.current.value
      );

      const user = userCredential.user;
      if (user) {
        await updateProfile(user, { displayName: ResNameRef.current.value });
        
        let imageUrl = null;
        if (imageFile) {
          imageUrl = await uploadRestaurantImage(user.uid);
        }
        
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
          socialMedia: SocialMedia,
          profileImage: imageUrl
        };
        
        // Use your API function to register the restaurant
       try{
        await registerRestaurant(data);
        
        toast.success("Account created successfully!");
        navigate("/dashboard");
       }catch (error) {
        console.error("Error registering restaurant in database:", error);
        setError(`Failed to create an account: ${error}`);
        console.log("deleting firebase user " + user.uid + " " + user.displayName )
        await user.delete();
      }
      }
    } catch (err) {
      const errorMessage = err.message.replace("Firebase: ", "");
      setError(`Failed to create an account: ${errorMessage}`);
      toast.error(`Signup failed: ${errorMessage}`);
      console.error(error);
    }

    setLoading(false);
  }

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

  return (
    <div className={`flex items-center justify-center min-h-screen transition-colors duration-500 ${darkMode ? 'bg-gradient-to-r from-indigo-900 via-purple-900 to-gray-900 text-gray-100' : 'bg-gray-100 text-gray-900'}`}>
      {/* <div className="absolute top-5 right-5 flex gap-3">
        <button 
          onClick={() => setDarkMode(!darkMode)} 
          className="p-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition flex items-center"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon className="text-gray-400" />}
        </button>
        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          className="p-2 rounded-lg bg-gray-700 text-white"
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
          <option value="es">Español</option>
          <option value="fr">Français</option>
        </select>
      </div> */}

      <div className={`p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-transform duration-300 backdrop-blur-lg ${darkMode ? 'bg-gray-800 bg-opacity-30' : 'bg-white'}`}>
        <h2 className="text-3xl font-extrabold mb-6 text-center">Create Your MenuQ Account</h2>
        {error && <div className="text-red-500 text-center mb-4 animate-shake">{error}</div>}
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            <input 
              type="email" 
              ref={emailRef} 
              placeholder="Email Address" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`} 
              required 
              autoFocus 
              aria-label="Email Address"
            />
            
            <input 
              type="tel" 
              ref={phoneRef} 
              placeholder="Phone Number" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`} 
              required
              pattern="^[6-9]\d{9}$"
              title="Please enter a valid 10-digit phone number."
              aria-label="Phone Number"
            />
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                ref={passwordRef} 
                placeholder="Password" 
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`} 
                required
                aria-label="Password" 
              />
              <button
                type="button"
                className={`absolute right-3 top-3 ${
                  darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <FaEyeSlash className="mt-1.5" /> : <FaEye className="mt-1.5"/>}
              </button>
            </div>
            
            <div className="relative">
              <input 
                type={showConfirmPassword ? "text" : "password"} 
                ref={confirmPasswordRef} 
                placeholder="Confirm Password" 
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`} 
                required
                aria-label="Confirm Password" 
              />
              <button
                type="button"
                className={`absolute right-3 top-3 ${
                  darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-700 hover:text-gray-900"
                }`}
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                aria-label={showConfirmPassword ? "Hide password" : "Show password"}
              >
                {showConfirmPassword ? <FaEyeSlash className="mt-1.5"/> : <FaEye className="mt-1.5"/>}
              </button>
            </div>

            <input 
              type="text" 
              ref={ResNameRef} 
              placeholder="Restaurant Name" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`} 
              required
              aria-label="Restaurant Name" 
            />
            
            <input 
              type="text" 
              ref={ResAdrsRef} 
              placeholder="Restaurant Address" 
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`} 
              required
              aria-label="Restaurant Address" 
            />
            
            <input 
              type="number" 
              ref={NoSeatsRef} 
              placeholder="Number of Seats" 
              min="1"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`} 
              required
              aria-label="Number of Seats" 
            />

            {/* Restaurant Category Dropdown */}
            <select
              value={ResCategory}
              onChange={(e) => setResCategory(e.target.value)}
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition ${darkMode ? 'bg-gray-700 border-gray-600 text-white' : 'bg-gray-200 border-gray-300 text-gray-900'}`}
              aria-label="Restaurant Category"
            >
              <option value="Other">Select Category</option>
              <option value="Fine Dining">Fine Dining</option>
              <option value="Casual Dining">Casual Dining</option>
              <option value="Cafe">Cafe</option>
              <option value="Fast Food">Fast Food</option>
              <option value="Buffet">Buffet</option>
              <option value="Food Truck">Food Truck</option>
              <option value="Other">Other</option>
            </select>

            {/* Restaurant Image Upload */}
            <div className={`border-2 border-dashed rounded-lg p-4 transition ${darkMode ? 'border-gray-600 hover:border-gray-400' : 'border-gray-300 hover:border-teal-400'} text-center`}>
              <div className="space-y-2">
                {imagePreview ? (
                  <div className="relative">
                    <img 
                      src={imagePreview} 
                      alt="Restaurant Preview" 
                      className="mx-auto h-36 object-cover rounded-lg"
                    />
                    <button 
                      type="button" 
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
                      aria-label="Remove image"
                    >
                      <FaTrash size={12} />
                    </button>
                  </div>
                ) : (
                  <div className={`text-center py-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    <FaCloudUploadAlt className="mx-auto text-4xl mb-2" />
                    <p className="text-sm font-medium">Upload Restaurant Image</p>
                    <p className="text-xs mt-1">JPG, PNG or GIF (Max. 5MB)</p>
                  </div>
                )}
                
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                  id="restaurant-image"
                  aria-label="Upload restaurant image"
                />
                
                {!imagePreview && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className={`mt-2 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      darkMode 
                        ? 'bg-teal-700 text-white hover:bg-teal-600' 
                        : 'bg-teal-600 text-white hover:bg-teal-700'
                    } transition-colors`}
                    aria-label="Browse for restaurant image"
                  >
                    Browse Image
                  </button>
                )}
                
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className={`mt-2 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                      darkMode 
                        ? 'bg-gray-700 text-white hover:bg-gray-600' 
                        : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                    } transition-colors`}
                    aria-label="Change restaurant image"
                  >
                    Change Image
                  </button>
                )}
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-teal-600 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300 shadow-lg disabled:opacity-50 flex justify-center items-center" 
            disabled={loading || uploadingImage}
            aria-label="Create account"
          >
            {loading || uploadingImage ? (
              <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400 mb-2">Or sign up with</p>
          <div className="flex justify-center space-x-3">
            <button 
              className="p-3 bg-red-600 text-white rounded-full hover:bg-red-700" 
              onClick={() => handleSocialSignup('google')}
              aria-label="Sign up with Google"
            >
              <FaGoogle />
            </button>
            <button 
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-700" 
              onClick={() => handleSocialSignup('facebook')}
              aria-label="Sign up with Facebook"
            >
              <FaFacebook />
            </button>
            <button 
              className="p-3 bg-black text-white rounded-full hover:bg-gray-800" 
              onClick={() => handleSocialSignup('apple')}
              aria-label="Sign up with Apple"
            >
              <FaApple />
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-4 text-gray-400">
          Already have an account?
          <Link to="/login" className="text-teal-400 underline ml-2 hover:text-teal-600 transition">Log In</Link>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable theme={darkMode ? "dark" : "light"} />
    </div>
  );
};

export default Signup;