// firebase.js

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
import { useState, useEffect } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB2eLt__kkonGKGSwLo65aEsRuAxwtXNCw",
  authDomain: "auth-devlopment-e4afb.firebaseapp.com",
  projectId: "auth-devlopment-e4afb",
  storageBucket: "auth-devlopment-e4afb.appspot.com",
  messagingSenderId: "35097344393",
  appId: "1:35097344393:web:7587017db6b2b908340958"
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
