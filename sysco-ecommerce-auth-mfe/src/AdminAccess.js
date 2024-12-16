import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const AdminAccess = ({ children }) => {
  const navigate = useNavigate();
  const authToken = localStorage.getItem('authToken');
  const requiredRole = 'Admin';

  useEffect(() => {
    if (!authToken) {
      // Redirect to login if no token is found
      navigate('/login');
      return;
    }

    try {
      // Decode the JWT
      const decodedToken = jwtDecode(authToken);

      // Check token expiration
      const currentTime = Math.floor(Date.now() / 1000);
      if (decodedToken.exp && decodedToken.exp < currentTime) {
        console.warn('Token expired. Redirecting to login.');
        localStorage.removeItem('authToken');
        navigate('/login');
        return;
      }

      // Verify the user's role
      const userRole = decodedToken['custom:Role']; // Adjust key as needed
      if (userRole !== requiredRole) {
        console.warn(`Unauthorized access: User role is ${userRole}`);
        navigate('/unauthorized');
        return;
      }
    } catch (err) {
      console.error('Error decoding token:', err);
      navigate('/login');
    }
  }, [authToken, navigate]);

  return authToken ? children : null;
};

export default AdminAccess;
