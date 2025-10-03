import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DonorDashboard from '../pages/donor-dashboard';
import NGODashboard from '../pages/ngo-dashboard-post-verification';
import FundingOrgDashboard from '../pages/funding-organization-dashboard';

const RoleBasedRoute = () => {
  const { user, userProfile, loading } = useAuth();

  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-500 mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // If no user, redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // If user exists but profile is still loading, show loading state
  if (user && !userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-pulse rounded-full h-16 w-16 bg-purple-500/30 mx-auto mb-4"></div>
          <p className="text-white text-lg">Setting up your profile...</p>
        </div>
      </div>
    );
  }

  // Route based on user role
  switch (userProfile?.role) {
    case 'donor':
      return <DonorDashboard />;
    case 'ngo':
      return <NGODashboard />;
    case 'funding_organization':
      return <FundingOrgDashboard />;
    default:
      // If role is not set or invalid, redirect to authentication
      console.warn('Invalid or missing user role:', userProfile?.role);
      return <Navigate to="/" replace />;
  }
};

export default RoleBasedRoute;
