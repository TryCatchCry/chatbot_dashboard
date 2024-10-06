import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCi8cWPvfQIvhcLo_2Uamnymchv8RhLYSE",
    authDomain: "chatbotdashboard-713ad.firebaseapp.com",
    projectId: "chatbotdashboard-713ad",
    storageBucket: "chatbotdashboard-713ad.appspot.com",
    messagingSenderId: "135285436408",
    appId: "1:135285436408:web:75a526c947477a6118700d",
    measurementId: "G-NCW4ZKCN3L"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();  // Set up Google auth provider

export { auth, googleProvider };

