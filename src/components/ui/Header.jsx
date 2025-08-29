import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { label: 'Dashboard', path: '/donor-dashboard', icon: 'Home' },
    { label: 'Donate Items', path: '/item-donation-listing', icon: 'Gift' },
    { label: 'Find NGOs', path: '/ngo-discovery-and-matching', icon: 'Search' },
    { label: 'Track Impact', path: '/impact-tracking-and-proof-verification', icon: 'BarChart3' }
  ];

  const moreItems = [
    { label: 'NGO Dashboard', path: '/ngo-dashboard-post-verification', icon: 'Building' },
    { label: 'Settings', path: '/settings', icon: 'Settings' },
    { label: 'Help', path: '/help', icon: 'HelpCircle' }
  ];

  const notifications = [
    { id: 1, title: 'Donation Approved', message: 'Your donation to Green Earth NGO has been approved', time: '2 min ago', unread: true },
    { id: 2, title: 'Impact Update', message: 'See how your donation helped 50 families', time: '1 hour ago', unread: true },
    { id: 3, title: 'New NGO Match', message: 'Found 3 NGOs near your location', time: '3 hours ago', unread: false }
  ];

  const handleNavigation = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const handleNotificationClick = (notification) => {
    setIsNotificationOpen(false);
    // Handle notification action
  };

  const handleLogout = () => {
    navigate('/authentication-screen-login-register');
    setIsProfileOpen(false);
  };

  const isActive = (path) => location?.pathname === path;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-subtle">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigate('/donor-dashboard')}
              className="flex items-center space-x-2 transition-smooth hover:opacity-80"
            >
              <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                <Icon name="Heart" size={20} color="white" />
              </div>
              <span className="text-xl font-heading font-bold text-foreground">
                DonateConnect
              </span>
            </button>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navigationItems?.map((item) => (
              <button
                key={item?.path}
                onClick={() => handleNavigation(item?.path)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-interactive text-sm font-medium transition-smooth ${
                  isActive(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={16} />
                <span>{item?.label}</span>
              </button>
            ))}
            
            {/* More Menu */}
            <div className="relative">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-interactive text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
              >
                <Icon name="MoreHorizontal" size={16} />
                <span>More</span>
              </button>
              
              {isMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-interactive shadow-pronounced z-50">
                  {moreItems?.map((item) => (
                    <button
                      key={item?.path}
                      onClick={() => handleNavigation(item?.path)}
                      className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth first:rounded-t-interactive last:rounded-b-interactive"
                    >
                      <Icon name={item?.icon} size={16} />
                      <span>{item?.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-3">
            {/* Search */}
            <button className="p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-interactive transition-smooth">
              <Icon name="Search" size={20} />
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                className="relative p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-interactive transition-smooth"
              >
                <Icon name="Bell" size={20} />
                {notifications?.some(n => n?.unread) && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full"></span>
                )}
              </button>

              {isNotificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-popover border border-border rounded-interactive shadow-pronounced z-50">
                  <div className="p-3 border-b border-border">
                    <h3 className="font-heading font-semibold text-popover-foreground">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications?.map((notification) => (
                      <button
                        key={notification?.id}
                        onClick={() => handleNotificationClick(notification)}
                        className="w-full p-3 text-left hover:bg-muted transition-smooth border-b border-border last:border-b-0"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <p className="text-sm font-medium text-popover-foreground">
                              {notification?.title}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification?.message}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1 font-caption">
                              {notification?.time}
                            </p>
                          </div>
                          {notification?.unread && (
                            <div className="w-2 h-2 bg-accent rounded-full mt-1"></div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-2 p-1 rounded-interactive hover:bg-muted transition-smooth"
              >
                <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                  <Icon name="User" size={16} color="white" />
                </div>
                <Icon name="ChevronDown" size={16} className="text-muted-foreground hidden sm:block" />
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-popover border border-border rounded-interactive shadow-pronounced z-50">
                  <div className="p-3 border-b border-border">
                    <p className="text-sm font-medium text-popover-foreground">John Donor</p>
                    <p className="text-xs text-muted-foreground font-caption">Verified Donor</p>
                  </div>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/profile');
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="User" size={16} />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => {
                      setIsProfileOpen(false);
                      navigate('/settings');
                    }}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-popover-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name="Settings" size={16} />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-3 py-2 text-sm text-destructive hover:bg-muted transition-smooth rounded-b-interactive"
                  >
                    <Icon name="LogOut" size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-muted rounded-interactive transition-smooth"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-border bg-card">
            <nav className="py-2">
              {navigationItems?.map((item) => (
                <button
                  key={item?.path}
                  onClick={() => handleNavigation(item?.path)}
                  className={`flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium transition-smooth ${
                    isActive(item?.path)
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                  }`}
                >
                  <Icon name={item?.icon} size={18} />
                  <span>{item?.label}</span>
                </button>
              ))}
              
              <div className="border-t border-border mt-2 pt-2">
                {moreItems?.map((item) => (
                  <button
                    key={item?.path}
                    onClick={() => handleNavigation(item?.path)}
                    className="flex items-center space-x-3 w-full px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-smooth"
                  >
                    <Icon name={item?.icon} size={18} />
                    <span>{item?.label}</span>
                  </button>
                ))}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;