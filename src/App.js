import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import { useSelector } from "react-redux";

const App = () => {
  const user = useSelector((state) => state.user.user); // Get user data from Redux

  return (
    <Router>
      <Routes>
        {/* Show login page if not logged in, otherwise redirect to home */}
        <Route path="/" element={!user ? <Login /> : <Home />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
