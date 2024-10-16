import React, { useEffect, useState } from 'react';

const ResourceList = () => {
  const [resources, setResources] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem('token');
        const role = localStorage.setItem('role', 'educator'); // Set this when the user logs in
        
        
        console.log('Token:', token); // Check if the token is retrieved
        console.log('Role:', role); // Check if the role is retrieved
  
        const response = await fetch('http://localhost:5000/api/auth/educator/', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,  // Only token in Authorization header
            'X-User-Role': role // Custom header for role
          }
        });
  
        console.log('Response Status:', response.status); // Log the response status
  
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
  
        const data = await response.json();
        console.log('Data:', data); // Log the received data
        setResources(data);
      } catch (err) {
        console.error('Fetch error:', err.message); // Log errors
        setError(err.message);
      }
    };
  
    fetchResources();
  }, []);
  

  return (
    <div>
      <h1>Resources</h1>
      {error ? <p>Error: {error}</p> : null}
      {resources.length === 0 && !error ? <p>No resources available.</p> : null}
      <ul>
        {resources.map((resource) => (
          <li key={resource._id}>{resource.title}={resource.description}</li>
           // Adjust based on your resource data structure
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;
