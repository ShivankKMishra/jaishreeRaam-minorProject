// Import the functions you need from the SDKs you need
import {getAuth} from "firebase/auth"
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

export { auth };