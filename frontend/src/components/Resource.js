import React, { useState, useEffect } from 'react';
import { getResources, deleteResource } from '../components/api'; // Import API calls
import ResourceForm from '../components/ResourceForm'; // Import the form component

const Resource = () => {
  const [resources, setResources] = useState([]);
  const [editingResourceId, setEditingResourceId] = useState(null); // To track the resource being edited
  const [showForm, setShowForm] = useState(false); // To toggle between form and list view

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await getResources();
      setResources(response.data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteResource(id);
      fetchResources(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting resource:', error);
    }
  };

  const handleEdit = (id) => {
    setEditingResourceId(id);
    setShowForm(true); // Show the form for editing
  };

  const handleCreate = () => {
    setEditingResourceId(null);
    setShowForm(true); // Show the form for creating a new resource
  };

  const handleFormSubmitSuccess = () => {
    setShowForm(false); // Hide form after successful submission
    fetchResources(); // Refresh the list after creating/editing
  };

  return (
    <div>
      <h1>Resource Management</h1>

      {showForm ? (
        <ResourceForm
          resourceId={editingResourceId}
          onSubmitSuccess={handleFormSubmitSuccess}
        />
      ) : (
        <div>
          <button onClick={handleCreate}>Create New Resource</button>
          <ul>
            {resources.map((resource) => (
              <li key={resource._id}>
                <h2>{resource.title}</h2>
                <p>{resource.description}</p>
                <a href={resource.link}>View Resource</a>
                <button onClick={() => handleEdit(resource._id)}>Edit</button>
                <button onClick={() => handleDelete(resource._id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Resource;
