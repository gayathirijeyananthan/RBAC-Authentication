// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import Navbar from "../components/Navbar";
// import "../components/css/EduDashboard.css";
// import "../components/css/Resource.css";

// const ResourceList = () => {
//   const [resources, setResources] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchResources = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const role = localStorage.setItem("role", "educator"); // Set this when the user logs in

//         const response = await fetch(
//           "http://localhost:5000/api/auth/educator/",
//           {
//             method: "GET",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${token}`, // Only token in Authorization header
//               "X-User-Role": role, // Custom header for role
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error(`Error: ${response.status}`);
//         }

//         const data = await response.json();
//         setResources(data);
//       } catch (err) {
//         console.error("Fetch error:", err.message); // Log errors
//         setError(err.message);
//       }
//     };

//     fetchResources();
//   }, []);

//   return (
//     <div className="landing-container">
//       <Navbar />
//       <div className="flex">
//         <div className="sidebar">
//           <div className="content11">
//             <li>
//               <Link to="/educator/resources">Resource List</Link>
//             </li>
//           </div>
//         </div>
//         <div className="resource">
//           <h1>Resources</h1>
//            <div className="create-resource-btn-container">
//             <Link to="/educator/resources/add">
//               <button className="create-resource-btn">Create New Resource</button>
//             </Link>
//           </div>
//           {error ? <p>Error: {error}</p> : null}
//           {resources.length === 0 && !error ? (
//             <p>No resources available.</p>
//           ) : null}
//           <div className="resource-container">
//             {resources.map((resource) => (
//               <div key={resource._id} className="resource-card">
//                 <h2>{resource.title}</h2>
//                 <p>{resource.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ResourceList;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../components/css/EduDashboard.css";
import "../components/css/Resource.css";
import AddResourceForm from "./AddResource"; // Import the form component

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [message, setMessage] = useState(''); // State for showing notification

  // Function to fetch resources
  const fetchResources = async () => {
    try {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role"); // Get the role from localStorage

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
      setResources(data); // Update the resources state
    } catch (err) {
      console.error("Fetch error:", err.message); // Log errors
      setError(err.message);
    }
  };

  // Fetch resources initially when the component mounts
  useEffect(() => {
    fetchResources();
  }, []);

  // Function to close the modal and show a success message
  const handleResourceAdded = (successMessage) => {
    setShowModal(false); // Close the modal
    setMessage(successMessage); // Set the success message for notification
    fetchResources(); // Re-fetch resources after adding a new resource
    setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
  };

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

          {/* Button to open the create resource modal */}
          <div className="create-resource-btn-container">
            <button 
              className="create-resource-btn" 
              onClick={() => setShowModal(true)} // Show modal on click
            >
              Create New Resource
            </button>
          </div>

          {/* Notification message */}
          {message && <div className="notification">{message}</div>}

          {/* Display error if there's any */}
          {error ? <p>Error: {error}</p> : null}

          {/* Display message if no resources are found */}
          {resources.length === 0 && !error ? (
            <p>No resources available.</p>
          ) : null}

          {/* Display resources */}
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

      {/* Modal for Add Resource Form */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <button 
              className="close-modal" 
              onClick={() => setShowModal(false)}
            >
              &times;
            </button>
            <AddResourceForm onResourceAdded={handleResourceAdded} /> {/* Pass the callback */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceList;
