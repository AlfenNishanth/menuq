import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../fireabse/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import config from "../../config";
import { fetchRestaurantByUID, registerRestaurant } from "../api/restaurant";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);

  // Enhanced signUp function that handles both Firebase auth and database registration
  async function signUp(email, password, restaurantData) {
    try {
      // Check if there's an existing user and sign them out first
      if (currentUser) {
        console.log("Existing user found, signing out before new signup");
        await signOut(auth);
        // Clear current user data
        setCurrentUser(null);
        setUserData(null);
      }
      
      // Flag that we're starting the signup process
      setIsSigningUp(true);
      console.log("Creating user in Firebase...");
      
      // 1. Create the Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Update the user profile with display name if provided
      if (restaurantData.restaurantName) {
        await updateProfile(user, { displayName: restaurantData.restaurantName });
      }
      
      // 3. Upload image if available (assuming this function is defined elsewhere)
      let imageUrl = null;
      if (restaurantData.imageFile) {
        imageUrl = await uploadRestaurantImage(user.uid, restaurantData.imageFile);
      }
      
      // 4. Prepare complete restaurant data with Firebase UID
      const completeData = {
        ...restaurantData,
        firebaseUid: user.uid,
        email: email,
        profileImage: imageUrl
      };
      
      try {
        // 5. Register the restaurant in your database
        console.log("Registering restaurant in database...");
        const registeredData = await registerRestaurant(completeData);
        console.log("Restaurant registered successfully!");
        
        // 6. Set the userData directly here so it's available immediately
        setUserData(registeredData || completeData);
        
        // Finish the signup process
        setIsSigningUp(false);
        return { success: true, user: user };
      } catch (error) {
        // 7. If database registration fails, delete the Firebase user
        console.error("Error registering restaurant in database:", error);
        console.log("Deleting Firebase user", user.uid);
        await user.delete();
        
        setIsSigningUp(false);
        throw new Error(`Failed to register restaurant: ${error.message}`);
      }
    } catch (error) {
      // Handle any errors from the Firebase user creation
      setIsSigningUp(false);
      const errorMessage = error.message.replace("Firebase: ", "");
      console.error("Signup error:", errorMessage);
      throw error; // Rethrow to be caught by the component
    }
  }

  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        // If we're in the signup process, don't try to fetch user data yet
        // The signUp function will set userData directly after database registration
        if (!isSigningUp) {
          try {
            console.log("Auth state changed, fetching user data for:", user.uid);
            const data = await fetchRestaurantByUID(user.uid);
            if (data) {
              setUserData(data);
              console.log("User data found:", JSON.stringify(data));
            } else {
              console.log('No user data found in database');
              setUserData(null);
            }
          } catch (error) {
            console.log("Error while fetching user data:", error);
            setUserData(null);
          }
        } else {
          console.log("In signup process, skipping initial data fetch");
        }
      } else {
        console.log("No user authenticated");
        setUserData(null);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, [isSigningUp]);

  const updateUserData = async () => {
    if (currentUser) {
      try {
        const data = await fetchRestaurantByUID(currentUser.uid);
        if (data) {
          setUserData(data);
          console.log("Updated user data:", JSON.stringify(data));
        } else {
          setUserData(null);
          console.log('No user data found during update');
        }
      } catch (error) {
        console.log("Error while updating user data:", error);
        setUserData(null);
      }
    } else {
      setUserData(null);
    }
    setLoading(false);
  };

  // Log out user if no data is found after a timeout
  useEffect(() => {
    // Only check for missing data if:
    // 1. User is authenticated
    // 2. Not in signup process
    // 3. userData is null
    if (currentUser && !isSigningUp && userData === null) {
      const timeoutId = setTimeout(() => {
        console.log("No user data found after timeout, logging out...");
        logout()
          .then(() => {
            console.log("User logged out successfully");
          })
          .catch((error) => {
            console.error("Error logging out:", error);
          });
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
  }, [userData, currentUser, isSigningUp]);

  const value = {
    currentUser,
    userData,
    signUp,
    login,
    logout,
    updateUserData, 
    loading,
    resetPassword,
    isSigningUp
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;