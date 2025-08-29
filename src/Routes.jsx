import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import DonorDashboard from './pages/donor-dashboard';
import ImpactTrackingAndProofVerification from './pages/impact-tracking-and-proof-verification';
import ItemDonationListing from './pages/item-donation-listing';
import NGODiscoveryAndMatching from './pages/ngo-discovery-and-matching';
import AuthenticationScreen from './pages/authentication-screen-login-register';
import NGODashboard from './pages/ngo-dashboard-post-verification';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AuthenticationScreen />} />
        <Route path="/donor-dashboard" element={<DonorDashboard />} />
        <Route path="/impact-tracking-and-proof-verification" element={<ImpactTrackingAndProofVerification />} />
        <Route path="/item-donation-listing" element={<ItemDonationListing />} />
        <Route path="/ngo-discovery-and-matching" element={<NGODiscoveryAndMatching />} />
        <Route path="/authentication-screen-login-register" element={<AuthenticationScreen />} />
        <Route path="/ngo-dashboard-post-verification" element={<NGODashboard />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
