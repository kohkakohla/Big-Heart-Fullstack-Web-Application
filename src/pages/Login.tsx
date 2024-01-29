import NavBar from "../components/NavBar";

// Import React and necessary components
import React, { useState } from 'react';

// Define the Login component
const Login: React.FC = () => {
  // State to manage username and password inputs
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State to manage login status
  const [isLoggedIn, setLoggedIn] = useState(false);

  // Function to handle login button click
  const handleLogin = () => {
    // Basic validation
    if (username === 'demo' && password === 'password') {
      setLoggedIn(true);
      alert('Login successful!');
    } else {
      alert('Invalid username or password. Please try again.');
    }
  };

  return (
    <div>
      <NavBar></NavBar>
      <h1>Login Page</h1>

      {/* Conditionally render login form or success message */}
      {isLoggedIn ? (
        <p>Welcome, {username}! You are now logged in.</p>
      ) : (
        <form>
          {/* Username input */}
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {/* Password input */}
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {/* Login button */}
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      )}
    </div>
  );
};

// Export the Login component
export default Login;
