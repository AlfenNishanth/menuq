import React, { useEffect, useState, useContext } from "react";
import { auth } from "../fireabse/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

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

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
      // console.log(JSON.stringify(currentUser) + 'in second ' + loading)
      console.log(
        user ? `User logged in: ${JSON.stringify(user)}` : "No user logged in"
      );
    });
    console.log(JSON.stringify(currentUser) + "third " + loading);
    return unsubscribe;
  }, []);

    // const unsubscribe = onAuthStateChanged(auth, user=> {
    //     console.log(JSON.stringify(currentUser) + 'first ' + loading)
    //     setCurrentUser(user);
    //     setLoading(false)
    //     console.log(JSON.stringify(currentUser) + 'in second ' + loading)
    // })


  // useEffect(() => {
  //     console.log("Updated currentUser in the context: ", currentUser);
  // }, [currentUser]);

  const value = {
    currentUser,
    signUp,
    login,
    logout,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
