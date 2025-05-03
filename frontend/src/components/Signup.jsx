import { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash, FaGoogle, FaFacebook, FaApple, FaCloudUploadAlt, FaTrash } from "react-icons/fa";
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

  const { signUp, socialLogin, currentUser,signUpComplete } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

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
      // const userCredential = await signUp(
      //   emailRef.current.value,
      //   passwordRef.current.value
      // );

      // const user = userCredential.user;
      // if (user) {
      //   await updateProfile(user, { displayName: ResNameRef.current.value });
        
        let imageUrl = null;
        if (imageFile) {
          imageUrl = await uploadRestaurantImage(user.uid);
        }
        
        // Prepare restaurant data
        const data = {
          // firebaseUid: user.uid,
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
          //await registerRestaurant(data);
          
        await signUpComplete(
          emailRef.current.value,
          passwordRef.current.value,
          data);

          toast.success("Account created successfully!");
          navigate("/dashboard");
        
      
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
    <div className="flex items-center justify-center min-h-screen transition-colors duration-500 bg-gradient-to-b from-gray-50 to-white">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-amber-300 mix-blend-multiply"></div>
        <div className="absolute top-1/3 right-1/4 w-64 h-64 rounded-full bg-amber-200 mix-blend-multiply"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-amber-100 mix-blend-multiply"></div>
      </div>

      <div className="p-8 rounded-2xl shadow-xl w-full max-w-md transform transition-transform duration-300 backdrop-blur-lg bg-white/80">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-900">Create Your MenuQ Account</h2>
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
            
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                ref={passwordRef} 
                placeholder="Password" 
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900" 
                required
                aria-label="Password" 
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-700 hover:text-gray-900"
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
                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900" 
                required
                aria-label="Confirm Password" 
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-700 hover:text-gray-900"
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
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900" 
              required
              aria-label="Restaurant Name" 
            />
            
            <input 
              type="text" 
              ref={ResAdrsRef} 
              placeholder="Restaurant Address" 
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-amber-500 transition bg-gray-200 border-gray-300 text-gray-900" 
              required
              aria-label="Restaurant Address" 
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
            <div className="border-2 border-dashed rounded-lg p-4 transition border-gray-300 hover:border-amber-400 text-center">
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
                  <div className="text-center py-4 text-gray-500">
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
                    className="mt-2 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-amber-600 text-white hover:bg-amber-700 transition-colors"
                    aria-label="Browse for restaurant image"
                  >
                    Browse Image
                  </button>
                )}
                
                {imagePreview && (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current.click()}
                    className="mt-2 inline-flex items-center px-4 py-2 text-sm font-medium rounded-md bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
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
            className="w-full bg-amber-600 text-white p-3 rounded-lg font-semibold hover:bg-amber-700 transition duration-300 shadow-lg disabled:opacity-50 flex justify-center items-center" 
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
        </div>

        <div className="flex justify-center mt-4 text-gray-500">
          Already have an account?
          <Link to="/login" className="text-amber-600 underline ml-2 hover:text-amber-700 transition">Log In</Link>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar closeOnClick pauseOnHover draggable theme="light" />
    </div>
  );
};

export default Signup;