import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import TrustSignals from './components/TrustSignals';

const AuthenticationScreen = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check if user is already authenticated
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    const userRole = localStorage.getItem('userRole');
    
    if (isAuthenticated === 'true' && userRole) {
      const routes = {
        donor: '/donor-dashboard',
        ngo: '/ngo-dashboard-post-verification',
        funding: '/donor-dashboard'
      };
      navigate(routes?.[userRole] || '/donor-dashboard');
    }

    // Check for saved language preference
    const savedLanguage = localStorage.getItem('preferredLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, [navigate]);

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('preferredLanguage', language);
  };

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Minimal Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" />
              </div>
              <span className="ml-2 text-xl font-heading font-bold text-foreground">
                DonateConnect
              </span>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <Icon name="Globe" size={16} className="text-muted-foreground" />
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e?.target?.value)}
                className="text-sm bg-transparent border-none text-muted-foreground focus:outline-none cursor-pointer"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
                <option value="mr">मराठी</option>
              </select>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Content */}
            <div className="space-y-8">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-4">
                  Connect.{' '}
                  <span className="text-primary">Donate.</span>{' '}
                  <span className="text-secondary">Transform.</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8">
                  Join India's most trusted donation platform connecting donors, NGOs, and funding organizations for maximum social impact.
                </p>
              </div>

              {/* Trust Signals */}
              <div className="hidden lg:block">
                <TrustSignals />
              </div>
            </div>

            {/* Right Side - Authentication Form */}
            <div className="w-full max-w-md mx-auto lg:mx-0">
              <div className="bg-card border border-border rounded-lg shadow-pronounced p-8">
                {/* Tab Navigation */}
                <div className="flex mb-8 bg-muted rounded-lg p-1">
                  <button
                    onClick={() => handleTabSwitch('login')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-smooth ${
                      activeTab === 'login' ?'bg-card text-foreground shadow-subtle' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleTabSwitch('register')}
                    className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-smooth ${
                      activeTab === 'register' ?'bg-card text-foreground shadow-subtle' :'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    Create Account
                  </button>
                </div>

                {/* Form Content */}
                {activeTab === 'login' ? (
                  <LoginForm
                    onForgotPassword={handleForgotPassword}
                    onSwitchToRegister={() => handleTabSwitch('register')}
                  />
                ) : (
                  <RegisterForm
                    onSwitchToLogin={() => handleTabSwitch('login')}
                  />
                )}
              </div>

              {/* Mobile Trust Signals */}
              <div className="lg:hidden mt-8">
                <TrustSignals />
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span>© {new Date()?.getFullYear()} DonateConnect</span>
              <span>•</span>
              <button className="hover:text-foreground transition-smooth">
                Privacy Policy
              </button>
              <span>•</span>
              <button className="hover:text-foreground transition-smooth">
                Terms of Service
              </button>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Phone" size={14} />
                <span>+91-1800-123-4567</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Mail" size={14} />
                <span>support@donateconnect.in</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      {/* Forgot Password Modal */}
      <ForgotPasswordModal
        isOpen={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </div>
  );
};

export default AuthenticationScreen;