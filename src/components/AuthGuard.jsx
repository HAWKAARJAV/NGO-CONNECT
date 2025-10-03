import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AuthGuard = ({ children }) => {
  const { user, userProfile, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not loading and user exists but no profile, there might be an issue
    if (!loading && user && !userProfile) {
      console.warn('User exists but profile is missing, redirecting to login...');
      setTimeout(() => {
        navigate('/', { replace: true });
      }, 3000); // Give it 3 seconds to load
    }
  }, [user, userProfile, loading, navigate]);

  return children;
};

export default AuthGuard;