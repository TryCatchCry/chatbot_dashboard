import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/userSlice"; // Redux action to login
import { auth, googleProvider } from "../firebase"; // Firebase setup
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"; // Firebase methods for authentication
import { useNavigate } from "react-router-dom"; // React Router navigation
import { FaEye, FaEyeSlash } from "react-icons/fa6"; // Icons for password visibility toggle
import Image from "../assets/image.png"; // Background image
import Logo from "../assets/logo.png"; // Company logo
import GoogleSvg from "../assets/icons8-google.svg"; // Google icon for login

const Login = () => {
  // Local state for storing user input
  const [email, setEmail] = useState(""); // User's email
  const [password, setPassword] = useState(""); // User's password
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const dispatch = useDispatch(); // Redux dispatch function
  const navigate = useNavigate(); // Navigation function to redirect users

  // Handle email/password login
  const onFinish = async () => {
    try {
      // Sign in with Firebase using email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const userData = {
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL || null,
        displayName: userCredential.user.displayName || "Anonymous", // Ensure a fallback name is set
      };

      // Dispatch user data to Redux store
      dispatch(login(userData));

      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect user to the home page after successful login
      navigate("/home");
    } catch (error) {
      // Log any error that occurs during login
      console.error(error.message);
    }
  };

  // Handle Google login
  const handleGoogleLogin = async () => {
    try {
      // Sign in with Firebase using Google authentication
      const userCredential = await signInWithPopup(auth, googleProvider);

      const userData = {
        email: userCredential.user.email,
        photoURL: userCredential.user.photoURL || "fallback-avatar-url",
        displayName: userCredential.user.displayName || "Anonymous", // Store the Google avatar URL
      };

      // Dispatch user data (email and Google photo URL) to Redux store
      dispatch(login(userData));

      // Save user data in localStorage
      localStorage.setItem("user", JSON.stringify(userData));

      // Redirect user to the home page after successful Google login
      navigate("/home");
    } catch (error) {
      // Log any error that occurs during Google login
      console.error(error.message);
    }
  };

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Login Background" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-logo">
            <img src={Logo} alt="Company Logo" />
          </div>
          <div className="login-center">
            <h2>Welcome back!</h2>
            <p>Please enter your details</p>
            <form>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} // Update email state as the user types
              />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} // Update password state as the user types
                />
                {/* Toggle password visibility */}
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>

              <div className="login-center-options">
                <div className="remember-div">
                  <input type="checkbox" id="remember-checkbox" />
                  <label htmlFor="remember-checkbox">Remember</label>
                </div>
                <a href="#" className="forgot-pass-link">
                  Forgot password?
                </a>
              </div>

              <div className="login-center-buttons">
                <button type="button" onClick={onFinish}>
                  Log In
                </button>
                <button type="button" onClick={handleGoogleLogin}>
                  <img src={GoogleSvg} alt="Google Icon" />
                  Log In with Google
                </button>
              </div>
            </form>
          </div>

          <p className="login-bottom-p">
            Don't have an account? <a href="#">Sign Up</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
