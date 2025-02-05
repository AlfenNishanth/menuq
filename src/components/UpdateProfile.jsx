import { useRef, useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../fireabse/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

const UpdateProfile = () => {
  const phoneRef = useRef();
  const ResNameRef = useRef();
  const ResAdrsRef = useRef();
  const NoSeatsRef = useRef();
  // If you want to allow email updates, you can include an email input as well:
  // const emailRef = useRef();

  const { currentUser } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch the current user profile from Firestore when the component mounts.


  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const userDocRef = doc(db, "Users", currentUser.uid);
      await updateDoc(userDocRef, {
        phone: phoneRef.current.value,
        restaurantName: ResNameRef.current.value,
        restaurantAddress: ResAdrsRef.current.value,
        noOfSeats: NoSeatsRef.current.value,
        // If updating email, include it here (and handle Firebase auth email update separately)
        // email: emailRef.current.value,
      });
      setLoading(false);
      navigate("/"); 
    } catch (err) {
      setError("Failed to update profile: " + err.message);
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
        {error && <div style={{ color: "red" }}>{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Phone number input */}
          <input
            type="tel"
            ref={phoneRef}
            placeholder="Phone Number"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
            pattern="^[6-9]\d{9}$"
            title="Please enter a valid 10-digit phone number."
          />
          {/* Restaurant Name input */}
          <input
            type="text"
            ref={ResNameRef}
            placeholder="Restaurant Name"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          {/* Restaurant Address input */}
          <input
            type="text"
            ref={ResAdrsRef}
            placeholder="Restaurant Address"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          {/* Number of Seats input */}
          <input
            type="number"
            ref={NoSeatsRef}
            placeholder="Number of Seats"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          {/* Uncomment if allowing email updates:
          <input
            type="email"
            ref={emailRef}
            placeholder="Email"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          /> */}
          <button
            type="submit"
            className="w-full bg-teal-400 text-white p-2 rounded-lg hover:bg-teal-700 transition flex items-center justify-center"
            disabled={loading}
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
        <div className="flex justify-center mt-4">
          <Link to="/" className="text-blue-800 underline">
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
