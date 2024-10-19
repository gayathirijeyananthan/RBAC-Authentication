import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/css/EduDashboard.css";
import "../components/css/Resource.css";

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem("token");
        const role = localStorage.setItem("role", "educator"); // Set this when the user logs in

        const response = await fetch(
          "http://localhost:5000/api/auth/educator/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Only token in Authorization header
              "X-User-Role": role, // Custom header for role
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        setResources(data);
      } catch (err) {
        console.error("Fetch error:", err.message); // Log errors
        setError(err.message);
      }
    };

    fetchResources();
  }, []);

  return (
    <div className="landing-container">
      <Navbar />
      <div className="flex">
        <div className="sidebar">
          <div className="content11">
            <li>
              <Link to="/educator/resources">Resource List</Link>
            </li>
          </div>
        </div>
        <div className="resource">
          <h1>Resources</h1>
          <div className="create-resource-btn-container">
            <Link to="/educator/resources/add">
              <button className="create-resource-btn">Create New Resource</button>
            </Link>
          </div>
          {error ? <p>Error: {error}</p> : null}
          {resources.length === 0 && !error ? (
            <p>No resources available.</p>
          ) : null}
          <div className="resource-container">
            {resources.map((resource) => (
              <div key={resource._id} className="resource-card">
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceList;
