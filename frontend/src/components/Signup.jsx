// import { useRef, useState } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { ToastContainer, toast } from "react-toastify";
// import { Link, useNavigate } from "react-router-dom";
// import { db } from "../fireabse/firebase";
// import { doc, getDoc, setDoc, updateDoc, collection } from "firebase/firestore";
// import { Loader2 } from "lucide-react";
// import { updateProfile } from "firebase/auth";
// import { registerRestaurant } from "../api/restaurant";

// const Signup = () => {
//   const emailRef = useRef();
//   const passwordRef = useRef();
//   const confirmPasswordRef = useRef();
//   const ResNameRef = useRef();
//   const ResAdrsRef = useRef();
//   const NoSeatsRef = useRef();
//   const phoneRef = useRef();
//   const [ResLoc, setResLoc] = useState({ type: "Point", coordinates: [0, 0] });
//   const [ResCategory, setResCategory] = useState("Other");
//   const [CuisineType, setCuisineType] = useState([]);
//   const [OperatingHours, setOperatingHours] = useState([]);
//   const [SocialMedia, setSocialMedia] = useState({});

//   const { signUp, currentUser } = useAuth();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);

//   const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);

//     if (passwordRef.current.value !== confirmPasswordRef.current.value) {
//       setLoading(false);
//       return setError("Passwords do not match");
//     }

//     if (
//       passwordRef.current.value.length < 6 ||
//       confirmPasswordRef.current.value.length < 6
//     ) {
//       setLoading(false);
//       return setError("Password must be at least 6 characters long");
//     }

//     try {
//       setError("");
//       setLoading(true);
//       const userCredential = await signUp(
//         emailRef.current.value,
//         passwordRef.current.value
//       );

//       //   console.log(JSON.stringify(currentUser));
//       const user = userCredential.user; // Newly signed-up user
//       if (user) {
//         await updateProfile(user, { displayName: ResNameRef.current.value });
//         console.log("updated user displayName: " + user);
//         const data = {
//           firebaseUid: user.uid,
//           email: emailRef.current.value,
//           phone: phoneRef.current.value,
//           restaurantName: ResNameRef.current.value,
//           restaurantAddress: ResAdrsRef.current.value,
//           restaurantLocation: ResLoc, // This should be an object like: { type: "Point", coordinates: [lng, lat] }
//           noOfSeats: NoSeatsRef.current.value,
//           restaurantCategory: ResCategory,
//           cuisineType: CuisineType,
//           operatingHours: OperatingHours,
//           socialMedia: SocialMedia,
//         };
        
//         await registerRestaurant(data);
//         setLoading(false);
//         navigate("/dashboard/");
//       }
//     } catch (err) {
//       setError(
//         "Failed to create an account " + err.message.replace("Firebase", "")
//       );
//       console.log(error);
//     }

//     setLoading(false);
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         {currentUser && currentUser.email}
//         {/* {console.log(currentUser)} */}
//         <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>
//         {error && <div style={{ color: "red" }}>{error}</div>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <input
//             type="email"
//             ref={emailRef}
//             placeholder="Email"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//           <input
//             type="tel"
//             ref={phoneRef}
//             placeholder="Phone Number"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//             pattern="^[6-9]\d{9}$"
//             title="Please enter a valid 10-digit phone number."
//           />
//           <input
//             type="password"
//             ref={passwordRef}
//             placeholder="Password"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//           <input
//             type="password"
//             ref={confirmPasswordRef}
//             placeholder="Confirm Password"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//           <input
//             type="text"
//             ref={ResNameRef}
//             placeholder="Restaurant Name"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//           <input
//             type="text"
//             ref={ResAdrsRef}
//             placeholder="Restaurant Adress"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//           <input
//             type="number"
//             ref={NoSeatsRef}
//             placeholder="No. of seats"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//           {/* className="w-full bg-teal-400 text-white p-2 rounded-lg hover:bg-teal-700 transition"*/}
//           <button
//             type="submit"
//             className="w-full bg-teal-400 text-white p-2 rounded-lg hover:bg-teal-700 transition flex items-center justify-center"
//             disabled={loading}
//           >
//             {loading ? (
//               <div className="grid place-items-center">
//                 <svg
//                   className="text-white animate-spin"
//                   viewBox="0 0 64 64"
//                   fill="none"
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="24"
//                   height="24"
//                 >
//                   <path
//                     d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
//                     stroke="currentColor"
//                     strokeWidth="5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                   ></path>
//                   <path
//                     d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
//                     stroke="currentColor"
//                     strokeWidth="5"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="text-teal-900"
//                   ></path>
//                 </svg>
//               </div>
//             ) : (
//               "Sign Up"
//             )}
//           </button>
//         </form>

//         <div className="flex justify-center">
//           Already have an account?
//           <Link to="/login" className="text-blue-800 underline ml-2">
//             Log In
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Signup;



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
        await registerRestaurant(data);
        
        toast.success("Account created successfully!");
        navigate("/dashboard");
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
                {showPassword ? <FaEyeSlash /> : <FaEye />}
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
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
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