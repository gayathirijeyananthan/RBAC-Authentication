// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import '../components/Login.css';
// import Register from '../components/Register';
// import { Link } from 'react-router-dom';


// const Login = ({ setToken, setRole }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const navigate = useNavigate();  // useNavigate hook to navigate programmatically

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
//       const { token, role } = response.data;

//       // Store token and set token/role
//       localStorage.setItem('token', token);
//       setToken(token);
//       setRole(role);

//       // Redirect based on role
//       if (role === 'admin') {
//         navigate('/admin');  // Navigate to AdminPanel if role is admin
//       } else {
//         navigate('/user');   // Navigate to UserDashboard if role is user
//       }
//     } catch (error) {
//       console.error('Login failed', error);
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit}>
//         <h2>Login</h2>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//         <br></br>
//         <br></br>

//         <p className='last'>Don't Have an Account?<a href="/register"> Register Here</a></p>
//       </form>
//     </div>
//   );
// };

// export default Login;
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../components/Login.css';

const Login = ({ setToken, setRole }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      const { token, role } = response.data;

      localStorage.setItem('token', token);
      setToken(token);
      setRole(role);

      if (role === 'admin') {
        navigate('/admin');
      } else if (role === 'educator') {
        navigate('/educator');
      } else {
        navigate('/user');
      }
      
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <br></br>
        <br></br>
        <p className='last'>Don't Have an Account?<a href="/register"> Register Here</a></p>
      </form>
    </div>
  );
};

export default Login;
