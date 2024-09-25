import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth/educator'; // Update this to your backend URL

// Fetch all resources
export const getResources = async () => {
  return await axios.get(API_URL);
};

// Add a new resource
export const addResource = async (resourceData) => {
  return await axios.post(`${API_URL}/add`, resourceData);
};

// Update a resource
export const updateResource = async (id, resourceData) => {
  return await axios.put(`${API_URL}/${id}`, resourceData);
};

// Delete a resource
export const deleteResource = async (id) => {
  return await axios.delete(`${API_URL}/${id}`);
};
