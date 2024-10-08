import React from "react";
import { Link } from "react-router-dom";
import "../components/css/EduDashboard.css";
import Navbar from "../components/Navbar";

const EduDashboard = ({ logout }) => {
  return (
    <>
      <div className="landing-container">
        <Navbar />
        <div className="flex">
          <div className="sidebar">
            <div className="content1">
              <li>
                <Link to="/educator/resources">Resource List</Link>
              </li>
              <li>
                <Link to="/educator/resources">Resource List</Link>
              </li>
              <li>
                <Link to="/educator/resources">Resource List</Link>
              </li>
            </div>
          </div>
          <div className="content">
            <div className="content1">
              <h2>Educator Dashboard</h2>
              <p>Welcome, Educator!</p>
              <button onClick={logout}>Logout</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EduDashboard;
