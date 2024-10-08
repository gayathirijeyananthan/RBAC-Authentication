import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../components/css/LandingPage.css"; // Importing the CSS file for styling

import Navbar from "../components/Navbar";

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("login"); // State to toggle between login and register

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="landing-container">
      {/* Navbar */}
      <Navbar />
      {/* Main Section */}
      <div className="main-content">
        <h2>Welcome to the E-Learning Platform</h2>
        <p>Explore and enhance your skills with top-quality resources.</p>
        <Link to="/resources" className="cta-button">
          View Resources
        </Link>
      </div>

      {/* Modal for Login/Register */}
    </div>
  );
};

export default LandingPage;
