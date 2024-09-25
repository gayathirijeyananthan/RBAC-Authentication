import React, { useState } from 'react';
import { addResource } from '../api'; // API call

const AddResource = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newResource = { title, description, link };
    await addResource(newResource);
    setTitle(''); // Clear fields after submission
    setDescription('');
    setLink('');
  };

  return (
    <div>
      <h2>Add New Resource</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div>
          <label>Link:</label>
          <input
            type="text"
            value={link}
            onChange={(e) => setLink(e.target.value)}
          />
        </div>
        <button type="submit">Add Resource</button>
      </form>
    </div>
  );
};

export default AddResource;
