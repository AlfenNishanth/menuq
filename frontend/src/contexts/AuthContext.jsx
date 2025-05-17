import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../fireabse/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
} from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { fetchRestaurantByUID,registerRestaurant } from "../api/restaurant";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isSigningUp, setIsSigningUp] = useState(false);
  

  // function signUp(email, password) {
  //   console.log("creating user");
  //   return createUserWithEmailAndPassword(auth, email, password);
  // }


  async function signUp(email, password, restaurantData) {
    try {
      setIsSigningUp(true)
      console.log("Creating user in Firebase...");
      // 1. Create the Firebase auth user
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // 2. Update the user profile with display name if provided
      if (restaurantData.restaurantName) {
        await updateProfile(user, { displayName: restaurantData.restaurantName });
      }
      
      // 3. Upload image if available (assuming this function is defined elsewhere)
      // let imageUrl = null;
      // if (restaurantData.imageFile) {
      //   imageUrl = await uploadRestaurantImage(user.uid, restaurantData.imageFile);
      // }
      
      // 4. Prepare complete restaurant data with Firebase UID
      const completeData = {
        ...restaurantData,
        firebaseUid: user.uid,
        email: email,
      };
      
      try {
        // 5. Register the restaurant in your database
        console.log("Registering restaurant in database...");
        await registerRestaurant(completeData);
        console.log("Restaurant registered successfully!");
        setIsSigningUp(false);
        return { success: true, user: user };
      } catch (error) {
        // 6. If database registration fails, delete the Firebase user
        console.error("Error registering restaurant in database:", error);
        console.log("Deleting Firebase user", user.uid);
        await user.delete();
        setIsSigningUp(false);        
        throw new Error(`Failed to register restaurant: ${error.message}`);
      }
    } catch (error) {
      // Handle any errors from the Firebase user creation
      const errorMessage = error.message.replace("Firebase: ", "");
      console.error("Signup error:", errorMessage);
      setIsSigningUp(false);
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

// --------------------------------------------

{/* TODO : --- commenting this out cuz it was twice, have to check back *

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      // console.log(JSON.stringify(currentUser) + 'in second ' + loading)
      // console.log(user ? `1 User logged in: ${JSON.stringify(user)}` : "1 No user logged in");
      updateUserData();
    });
    // console.log(JSON.stringify(currentUser) + " 2 " + loading);
    return unsubscribe;
  }, []);

  */}

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
       if(!isSigningUp){ 
        try {
          console.log('useEffect for onAuthStateChanged triggered')
          const data = await fetchRestaurantByUID(user.uid);
          if (data) {
            setUserData(data);
            console.log("set user data: " + JSON.stringify(data));
          } else {
            setUserData(null);
            console.log('No user data');
          }
        } catch (error) {
          console.log("Error while fetching user data: " + error);
          setUserData(null);
        }
      } else console.log("Signup in progress, skipping logout")
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, [isSigningUp]); // Remove currentUser from dependency array

  const updateUserData = async () => {
    if (currentUser) {
      try {
        const data = await fetchRestaurantByUID(currentUser.uid);
        if (data) {
          setUserData(data);
          console.log("sett user data: " + JSON.stringify(data));
        } else {
          setUserData(null);
          console.log('No user data');
          //todo: check and direct to update profile
        }
      } catch (error) {
        console.log("Error while fetching user data: " + error);
        setUserData(null);
      }
    } else setUserData(null);
    setLoading(false);
  };


  // --------------------
  // Logging out user if no data:

useEffect(() => {
  if (currentUser && !isSigningUp && userData === null) {

    const timeoutId = setTimeout(() => {
      console.log("No user data found, logging out...");
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
    loading, resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
