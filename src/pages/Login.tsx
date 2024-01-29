import NavBar from "../components/NavBar";

export default function Login() {
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
