import React, { useState, useEffect } from 'react';
import { addResource, updateResource, getResources } from '../components/api'; // Import the necessary API calls

const ResourceForm = ({ resourceId, onSubmitSuccess }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    link: ''
  });

  useEffect(() => {
    if (resourceId) {
      fetchResourceDetails(resourceId);
    }
  }, [resourceId]);

  const fetchResourceDetails = async (id) => {
    const response = await getResources(id);
    setFormData(response.data); // Pre-fill the form for editing
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (resourceId) {
        await updateResource(resourceId, formData);
      } else {
        await addResource(formData);
      }
      onSubmitSuccess(); // Refresh resource list after successful submission
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Description"
        required
      />
      <input
        type="text"
        name="link"
        value={formData.link}
        onChange={handleInputChange}
        placeholder="Resource Link"
        required
      />
      <button type="submit">{resourceId ? 'Update Resource' : 'Create Resource'}</button>
    </form>
  );
};

export default ResourceForm;
