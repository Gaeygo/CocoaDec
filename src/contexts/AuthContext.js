import React, { useContext, useState, useEffect } from "react";
import { auth, firebase } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentNumber, setCurrentNumber] = useState();

  const [loading, setLoading] = useState(true);
  const [otp, setOtp] = useState();
  const [email, setEmail] = useState();


  const signOutUser = () => {
    return auth.signOut();
  };

  // function signInWithNumber(phonenumber, verify) {
  //   auth.setPersistence(firebase.auth.Auth.Persistence.SESSION).then(() => {
  //     return auth.signInWithPhoneNumber(phonenumber, verify);
  //   });
  // }

  function signInWithNumber(phonenumber, verify) {
    return auth.signInWithPhoneNumber(phonenumber, verify);
  }

  useEffect(() => {
    const unsuscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);

      setLoading(false);
    });
    return unsuscribe;
  }, []);

  const value = {
    currentUser,
    setCurrentUser,
    signInWithNumber,
    signOutUser,
    otp,
    setOtp,
    email,
    setEmail,
    setCurrentNumber,
    currentNumber

  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
