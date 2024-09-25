import React, { useState, useEffect } from 'react';
import { getResources, updateResource } from '../components/api'; // Assume getResource is defined in API

const EditResource = ({ match, history }) => {
  const resourceId = match.params.id;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [link, setLink] = useState('');

  useEffect(() => {
    const fetchResource = async () => {
      const response = await getResources(resourceId);
      setTitle(response.data.title);
      setDescription(response.data.description);
      setLink(response.data.link);
    };
    fetchResource();
  }, [resourceId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedResource = { title, description, link };
    await updateResource(resourceId, updatedResource);
    history.push('/'); // Redirect to the resource list page after updating
  };

  return (
    <div>
      <h2>Edit Resource</h2>
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
        <button type="submit">Update Resource</button>
      </form>
    </div>
  );
};

export default EditResource;
