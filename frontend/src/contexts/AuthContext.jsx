import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../fireabse/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
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
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);

  function signUp(email, password) {
    console.log("creating user");
    return createUserWithEmailAndPassword(auth, email, password);
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

  //using then
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //     if(user){
  //       const userRef = doc(db, "Users", user.uid);
  //       console.log(userRef);
  //       getDoc(userRef).then((userSnap) => {
  //         if(userSnap.exists()){
  //           setUserData(userSnap.data());
  //           console.log(userSnap.data());
  //         }else setUserData(null)
  //     })
  //       .catch((error)=>{
  //         console.log("Error fetching user data" + error)
  //         setUserData(null);
  //       })}
  //     setLoading(false);
  //   });

  //   // console.log(JSON.stringify(currentUser) + " 2 " + loading);
  //   return unsubscribe;
  // }, []);

  async function signUpComplete(email, password, restaurantData) {
    setIsAuthLoading(true);
    setIsSigningUp(true); // Set this to true during signup
    try {
      // Your existing code...
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      const backendData = {
        ...restaurantData,
        firebaseUid: user.uid
      };
      
      await registerRestaurant(backendData);
      
      // Manually fetch and set user data instead of relying on the listener
      const data = await fetchRestaurantByUID(user.uid);
      setUserData(data);
      
      setIsSigningUp(false); // Reset signup flag
      return userCredential;
    } catch (error) {
      if (auth.currentUser) {
        await auth.currentUser.delete();
      }
      setIsAuthLoading(false);
      setIsSigningUp(false); // Reset signup flag
      throw error;
    }
  }


  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      setIsAuthLoading(true);

      if (user) {
        try {
          const data = await fetchRestaurantByUID(user.uid);
          if (data) {
            setUserData(data);
            console.log("set user data: " + JSON.stringify(data));
          } else {
            setUserData(null);
            console.log("No user data");
          }
        } catch (error) {
          console.log("Error while fetching user data: " + error);
          setUserData(null);
        }
      } else {
        setUserData(null);
      }
      setLoading(false); 
      setIsAuthLoading(false);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    if (currentUser && userData === null && !isAuthLoading) {
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
  }, [userData, currentUser, isAuthLoading,isSigningUp]);


  const updateUserData = async () => {
    if (currentUser) {
      try {
        const data = await fetchRestaurantByUID(currentUser.uid);
        if (data) {
          setUserData(data);
          console.log("sett user data: " + JSON.stringify(data));
        } else {
          setUserData(null);
          console.log("No user data");
          //todo: check and direct to update profile
        }
      } catch (error) {
        console.log("Error while fetching user data: " + error);
        setUserData(null);
      }
    } else setUserData(null);
    setLoading(false);
  };

  // const unsubscribe = onAuthStateChanged(auth, user=> {
  //     console.log(JSON.stringify(currentUser) + 'first ' + loading)
  //     setCurrentUser(user);
  //     setLoading(false)
  //     console.log(JSON.stringify(currentUser) + 'in second ' + loading)
  // })

  // useEffect(() => {
  //     console.log("Updated userDAta in the context: ", userData);
  // }, [userData]);


  
  const value = {
    currentUser,
    userData,
    signUp,
    signUpComplete,
    login,
    logout,
    updateUserData,
    loading,
    resetPassword,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
