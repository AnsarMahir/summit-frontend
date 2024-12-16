import React, { useState } from "react";
import {jwtDecode} from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../App.css";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const payload = { username, password };
  
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        localStorage.setItem("authToken", result.accessToken);
        localStorage.setItem("idToken", result.idToken);
        localStorage.setItem("refreshToken", result.refreshToken);
  
        // Decode the idToken to get the role
        const decodedToken = jwtDecode(result.idToken);
        const role = decodedToken["custom:Role"]; // Use the exact name of your custom attribute
  
        // Navigate based on the role
        if (role === "Admin") {
          window.location.href = "http://localhost:9010/admin";
        } else if (role === "User") {
          window.location.href = "http://localhost:9010";
        } else {
          setError("Unknown role: " + role);
        }
      } else {
        setError("Sign in error: " + result.message);
      }
    } catch (error) {
      setError("Error: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Login</button>
      {error && <p className="error">{error}</p>}
      <button
        type="button"
        onClick={() => window.location.href = 'http://localhost:9010/signup'}
        style={{ marginTop: '10px', backgroundColor: "blue", border: 'none', padding: '10px', cursor: 'pointer' }}
      >
        If not signed up, please sign up
      </button>
    </form>
  );  
};

export default LoginScreen;
