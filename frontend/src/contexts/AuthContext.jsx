import React, { useEffect, useState, useContext } from "react";
import { auth, db } from "../fireabse/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import axios from "axios";
import config from "../../config";
import { fetchRestaurantByUID } from "../api/restaurant";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState(null);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
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
      } else {
        setUserData(null);
      }
      
      setLoading(false);
    });
    
    return unsubscribe;
  }, []); // Remove currentUser from dependency array

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
    login,
    logout,
    updateUserData, 
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
