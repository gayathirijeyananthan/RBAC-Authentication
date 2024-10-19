import React, { useState } from 'react';
import axios from 'axios';

function AddResourceForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Input validation
    if (!title || !description || !link) {
      setMessage('All fields are required');
      return;
    }

    try {
      // Sending the POST request to the backend
      const response = await axios.post(
        'http://localhost:5000/api/auth/educator/add', 
        { title, description, link },
        {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}` // Add your auth token if needed
          }
        }
      );
      
      // Handle success response
      setMessage(response.data.message);
      // Optionally, clear the form fields
      setTitle('');
      setDescription('');
      setLink('');
    } catch (error) {
      setMessage(error.response ? error.response.data.message : 'Error submitting the form');
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Add a New Resource</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Link</label>
          <input
            type="url"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Resource</button>
      </form>
    </div>
  );
}

export default AddResourceForm;
