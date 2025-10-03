import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import NavigationGuard from "components/NavigationGuard";
import AuthGuard from "components/AuthGuard";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DonorDashboard from './pages/donor-dashboard';
import ImpactTrackingAndProofVerification from './pages/impact-tracking-and-proof-verification';
import ItemDonationListing from './pages/item-donation-listing';
import NGODiscoveryAndMatching from './pages/ngo-discovery-and-matching';
import AuthenticationScreen from './pages/authentication-screen-login-register';
import NGODashboard from './pages/ngo-dashboard-post-verification';
import FundingOrgDashboard from './pages/funding-organization-dashboard';
// Removed GetStarted page
import LearnMore from './pages/LearnMore';
import BadgesAndAchievements from './pages/BadgesAndAchievements';
import DirectDonation from './pages/DirectDonation';
import NGONeeds from './pages/NGONeeds';
import RoleBasedRoute from './components/RoleBasedRoute';
import { AuthProvider } from './contexts/AuthContext';
import { DataSyncProvider } from './contexts/DataSyncContext';
import SyncStatusIndicator from './components/SyncStatusIndicator';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <AuthProvider>
          <DataSyncProvider>
            <AuthGuard>
              <ScrollToTop />
              <NavigationGuard />
              <SyncStatusIndicator />
              <RouterRoutes>
                {/* Public routes */}
                <Route path="/" element={<AuthenticationScreen />} />
                <Route path="/authentication-screen-login-register" element={<AuthenticationScreen />} />
                {/* Removed Get Started route; link flows now go to auth or Learn More */}
                <Route path="/learn-more" element={<LearnMore />} />
                
                {/* Protected routes - role-based */}
                <Route path="/dashboard" element={<RoleBasedRoute />} />
                <Route path="/donor-dashboard" element={<DonorDashboard />} />
                <Route path="/ngo-dashboard" element={<NGODashboard />} />
                <Route path="/funding-dashboard" element={<FundingOrgDashboard />} />
                
                {/* Feature pages */}
                <Route path="/impact-tracking-and-proof-verification" element={<ImpactTrackingAndProofVerification />} />
                <Route path="/item-donation-listing" element={<ItemDonationListing />} />
                <Route path="/ngo-discovery-and-matching" element={<NGODiscoveryAndMatching />} />
                <Route path="/ngo-dashboard-post-verification" element={<NGODashboard />} />
                
                {/* New functional pages */}
                <Route path="/badges-and-achievements" element={<BadgesAndAchievements />} />
                <Route path="/direct-donation" element={<DirectDonation />} />
                <Route path="/ngo-needs" element={<NGONeeds />} />
                
                {/* Catch all */}
                <Route path="*" element={<NotFound />} />
              </RouterRoutes>
            </AuthGuard>
          </DataSyncProvider>
        </AuthProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
