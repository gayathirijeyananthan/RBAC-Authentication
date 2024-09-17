import React, { useState } from 'react';
import axios from 'axios';

const EducatorRegistration = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('educator'); // Default role is 'user'
  const [error, setError] = useState(''); // State to hold the error message


  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await axios.post('http://localhost:5000/api/auth/educator/register', 
        { username, email, password, role }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('Educator registered successfully');
      setError(''); // Clear the error if successful
    } catch (error) {
      if (error.response) {
        // Log detailed error response for debugging
        console.log('Error response data:', error.response.data);
        setError(error.response.data.message || 'Registration failed'); // Show specific message if available
      } else {
        console.log(JSON.stringify(error, null, 2));
        setError('Registration failed');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Name"
        required
      />
      <input
        type="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Register as Educator</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default EducatorRegistration;
