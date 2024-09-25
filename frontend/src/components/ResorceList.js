import React, { useState, useEffect } from 'react';
import { getResources as fetchAllResources, deleteResource } from '../components/api'; // Rename the imported getResources

const ResourceList = () => { // Renaming component function properly
  const [resources, setResources] = useState([]);

  useEffect(() => {
    fetchResources();
  }, []);

  // Fetch resources using the imported getResources (renamed as fetchAllResources)
  const fetchResources = async () => {
    try {
      const response = await fetchAllResources(); // Call the API to get resources
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResource(id); // Call the API to delete resource by id
      fetchResources(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
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
