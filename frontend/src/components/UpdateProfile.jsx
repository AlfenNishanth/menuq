// import { useRef, useState, useEffect } from "react";
// import { useAuth } from "../contexts/AuthContext";
// import { Link, useNavigate } from "react-router-dom";
// import { db } from "../fireabse/firebase";
// import { doc, getDoc, updateDoc } from "firebase/firestore";

// const UpdateProfile = () => {
//   const phoneRef = useRef();
//   const ResNameRef = useRef();
//   const ResAdrsRef = useRef();
//   const NoSeatsRef = useRef();
//   // If you want to allow email updates, you can include an email input as well:
//   // const emailRef = useRef();

//   const { currentUser } = useAuth();
//   const [error, setError] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Fetch the current user profile from Firestore when the component mounts.


//   async function handleSubmit(e) {
//     e.preventDefault();
//     setLoading(true);
//     setError("");

//     try {
//       const userDocRef = doc(db, "Users", currentUser.uid);
//       await updateDoc(userDocRef, {
//         phone: phoneRef.current.value,
//         restaurantName: ResNameRef.current.value,
//         restaurantAddress: ResAdrsRef.current.value,
//         noOfSeats: NoSeatsRef.current.value,
//         // If updating email, include it here (and handle Firebase auth email update separately)
//         // email: emailRef.current.value,
//       });
//       setLoading(false);
//       navigate("/"); 
//     } catch (err) {
//       setError("Failed to update profile: " + err.message);
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-96">
//         <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
//         {error && <div style={{ color: "red" }}>{error}</div>}
//         <form onSubmit={handleSubmit} className="space-y-4">
//           {/* Phone number input */}
//           <input
//             type="tel"
//             ref={phoneRef}
//             placeholder="Phone Number"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//             pattern="^[6-9]\d{9}$"
//             title="Please enter a valid 10-digit phone number."
//           />
//           {/* Restaurant Name input */}
//           <input
//             type="text"
//             ref={ResNameRef}
//             placeholder="Restaurant Name"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//           {/* Restaurant Address input */}
//           <input
//             type="text"
//             ref={ResAdrsRef}
//             placeholder="Restaurant Address"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//           {/* Number of Seats input */}
//           <input
//             type="number"
//             ref={NoSeatsRef}
//             placeholder="Number of Seats"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           />
//           {/* Uncomment if allowing email updates:
//           <input
//             type="email"
//             ref={emailRef}
//             placeholder="Email"
//             className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
//             required
//           /> */}
//           <button
//             type="submit"
//             className="w-full bg-teal-400 text-white p-2 rounded-lg hover:bg-teal-700 transition flex items-center justify-center"
//             disabled={loading}
//           >
//             {loading ? "Updating..." : "Update Profile"}
//           </button>
//         </form>
//         <div className="flex justify-center mt-4">
//           <Link to="/" className="text-blue-800 underline">
//             Cancel
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UpdateProfile;




import { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../fireabse/firebase"; // Fixed typo in import
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateProfile = () => {
  const phoneRef = useRef();
  const ResNameRef = useRef();
  const ResAdrsRef = useRef();
  const NoSeatsRef = useRef();

  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const navigate = useNavigate();

  // Fetch the current user profile from Firestore when the component mounts
  useEffect(() => {
    async function loadUserProfile() {
      try {
        const userDocRef = doc(db, "Users", currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          
          // Populate the form fields with existing data
          if (phoneRef.current) phoneRef.current.value = userData.phone || "";
          if (ResNameRef.current) ResNameRef.current.value = userData.restaurantName || "";
          if (ResAdrsRef.current) ResAdrsRef.current.value = userData.restaurantAddress || "";
          if (NoSeatsRef.current) NoSeatsRef.current.value = userData.noOfSeats || "";
        }
      } catch (err) {
        toast.error("Failed to load profile data: " + err.message);
      } finally {
        setInitialLoading(false);
      }
    }

    if (currentUser) {
      loadUserProfile();
    }
  }, [currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Form validation
    if (!phoneRef.current.value.match(/^[6-9]\d{9}$/)) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }
    
    setLoading(true);

    try {
      const userDocRef = doc(db, "Users", currentUser.uid);
      await updateDoc(userDocRef, {
        phone: phoneRef.current.value,
        restaurantName: ResNameRef.current.value,
        restaurantAddress: ResAdrsRef.current.value,
        noOfSeats: NoSeatsRef.current.value,
        updatedAt: new Date()
      });
      
      toast.success("Profile updated successfully!");
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      toast.error("Failed to update profile: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-900">
      <div className="p-8 rounded-2xl shadow-xl w-full max-w-md bg-white">
        <h2 className="text-3xl font-extrabold mb-6 text-center">Update Profile</h2>
        
        {initialLoading ? (
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin h-12 w-12 border-4 border-t-transparent border-teal-600 rounded-full"></div>
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
                <label className="block text-sm font-medium mb-1 text-gray-700">Phone Number</label>
                <input
                  type="tel"
                  ref={phoneRef}
                  placeholder="Phone Number"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition bg-gray-200 border-gray-300 text-gray-900"
                  disabled={loading}
                  pattern="^[6-9]\d{9}$"
                  title="Please enter a valid 10-digit phone number"
                  required
                />
              </div>

              {/* Restaurant Name */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Restaurant Name</label>
                <input
                  type="text"
                  ref={ResNameRef}
                  placeholder="Restaurant Name"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition bg-gray-200 border-gray-300 text-gray-900"
                  disabled={loading}
                  required
                />
              </div>

              {/* Restaurant Address */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Restaurant Address</label>
                <textarea
                  ref={ResAdrsRef}
                  placeholder="Restaurant Address"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition bg-gray-200 border-gray-300 text-gray-900"
                  disabled={loading}
                  rows={3}
                  required
                />
              </div>

              {/* Number of Seats */}
              <div>
                <label className="block text-sm font-medium mb-1 text-gray-700">Number of Seats</label>
                <input
                  type="number"
                  ref={NoSeatsRef}
                  placeholder="Number of Seats"
                  className="w-full p-3 border rounded-lg focus:outline-none focus:ring-4 focus:ring-teal-500 transition bg-gray-200 border-gray-300 text-gray-900"
                  disabled={loading}
                  min="1"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-4 pt-4">
              <button 
                type="submit" 
                className="flex-1 bg-teal-600 text-white p-3 rounded-lg font-semibold hover:bg-teal-700 transition duration-300 shadow-lg disabled:opacity-50 flex justify-center items-center" 
                disabled={loading}
              >
                {loading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  "Update Profile"
                )}
              </button>
              
              <Link
                to="/"
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