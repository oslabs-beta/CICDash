import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    fetch('/auth/verify')
      .then(res => res.json())
      .then(bool => {
        setLoggedIn(bool);
        if (!bool) {
          navigate('/');
        }
      })
      .catch(err => {
        console.error('Auth check failed:', err);
        navigate('/');
      });
  }, [navigate]);

  // If the user is logged in, render the children, else render null
  return loggedIn ? children : null;
};

export default ProtectedRoute;
