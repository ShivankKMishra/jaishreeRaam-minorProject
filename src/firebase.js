// firebase.js

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, orderBy, onSnapshot } from "firebase/firestore";
import { useState, useEffect } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyD_b1408OP4FpiYkyAyNz_lXRjwaVy2h98",
  authDomain: "auth-devlopment-d7e31.firebaseapp.com",
  databaseURL: "https://auth-devlopment-d7e31-default-rtdb.firebaseio.com",
  projectId: "auth-devlopment-d7e31",
  storageBucket: "auth-devlopment-d7e31.appspot.com",
  messagingSenderId: "787757585356",
  appId: "1:787757585356:web:6c5bc659a691151869c369"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // Initialize Firestore with the app instance

const googleProvider = new GoogleAuthProvider();

// Sign in and check or create account in Firestore
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    console.log("User signed in:", user);
    console.log("User ID -", user.uid);
    // Use db from Firestore to perform operations
  } catch (err) {
    alert(err.message);
  }
};

const logout = () => {
  auth.signOut();
};

// Custom hook to handle authentication state
export const useAuthState = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return [user, loading];
};

export { app, auth, db, signInWithGoogle, logout };
