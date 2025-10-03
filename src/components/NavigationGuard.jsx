import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const NavigationGuard = () => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const locationRef = useRef(location);
  const isNavigatingRef = useRef(false);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const pendingNavigationRef = useRef(null);

  useEffect(() => {
    locationRef.current = location;
  }, [location]);

  // Custom confirmation dialog component
  const ConfirmationDialog = ({ show, onConfirm, onCancel }) => {
    if (!show) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md mx-4 shadow-xl">
          <div className="flex items-center mb-4">
            <div className="flex-shrink-0">
              <svg className="h-6 w-6 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.99-.833-2.76 0L3.054 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-medium text-gray-900">
                Sign Out Confirmation
              </h3>
            </div>
          </div>
          <div className="mb-6">
            <p className="text-sm text-gray-500">
              You are currently logged in to NGO Connect. Do you want to sign out and leave the application?
            </p>
          </div>
          <div className="flex space-x-3 justify-end">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-gray-300 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Stay Logged In
            </button>
            <button
              onClick={onConfirm}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    );
  };

  const handleConfirmSignOut = () => {
    setShowConfirmDialog(false);
    isNavigatingRef.current = true;
    
    signOut().then(() => {
      if (pendingNavigationRef.current) {
        // If there was a pending navigation, execute it
        navigate(pendingNavigationRef.current, { replace: true });
      } else {
        // Default to authentication page
        navigate('/', { replace: true });
      }
      pendingNavigationRef.current = null;
    });
  };

  const handleCancelSignOut = () => {
    setShowConfirmDialog(false);
    pendingNavigationRef.current = null;
  };

  useEffect(() => {
    if (!user) return;

    // Handle browser back/forward button
    const handlePopState = (event) => {
      if (user && !isNavigatingRef.current) {
        // Prevent the navigation temporarily
        window.history.pushState(null, '', locationRef.current.pathname + locationRef.current.search);
        
        // Store the intended navigation and show custom dialog
        pendingNavigationRef.current = '/';
        setShowConfirmDialog(true);
      }
    };

    // Handle page refresh/close
    const handleBeforeUnload = (event) => {
      if (user) {
        const message = 'You are currently logged in to NGO Connect. Are you sure you want to leave?';
        event.returnValue = message;
        return message;
      }
    };

    // Handle visibility change (when user switches tabs or minimizes browser)
    const handleVisibilityChange = () => {
      if (user && document.visibilityState === 'hidden') {
        // Optional: You can add additional logic here if needed
        console.log('User switched away from the tab while logged in');
      }
    };

    // Add event listeners
    window.addEventListener('popstate', handlePopState);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Push current state to history to catch back button
    window.history.pushState(null, '', location.pathname + location.search);

    // Cleanup
    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [user, signOut, navigate, location.pathname, location.search]);

  // Reset navigation flag when user navigates programmatically
  useEffect(() => {
    const timer = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 100);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <ConfirmationDialog
      show={showConfirmDialog}
      onConfirm={handleConfirmSignOut}
      onCancel={handleCancelSignOut}
    />
  );
};

export default NavigationGuard;