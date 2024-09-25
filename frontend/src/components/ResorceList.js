import React, { useState, useEffect } from 'react';
import { getResources, deleteResource } from '../api'; // Import API calls

const ResourceList = () => {
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    const response = await getResources();
    setResources(response.data);
  };

  const handleDelete = async (id) => {
    await deleteResource(id);
    fetchResources(); // Refresh the list
  };

  return (
    <div>
      <h2>All Resources</h2>
      <ul>
        {resources.map(resource => (
          <li key={resource._id}>
            <h3>{resource.title}</h3>
            <p>{resource.description}</p>
            <a href={resource.link} target="_blank" rel="noopener noreferrer">View Resource</a>
            <button onClick={() => handleDelete(resource._id)}>Delete</button>
            <a href={`/edit/${resource._id}`}>Edit</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ResourceList;
