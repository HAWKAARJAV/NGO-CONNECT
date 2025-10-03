import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeart, FaUsers, FaBuilding, FaSearch, FaBell, FaUser, 
  FaChevronDown, FaSignOutAlt, FaCog, FaMoon, FaSun 
} from 'react-icons/fa';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();
  const { user, userProfile, signOut } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getUserDisplayName = () => {
    if (userProfile?.full_name) return userProfile.full_name;
    if (user?.email) return user.email.split('@')[0];
    return 'User';
  };

  const getRoleDisplayName = () => {
    switch (userProfile?.role) {
      case 'donor': return 'Donor';
      case 'ngo': return 'NGO';
      case 'funding_organization': return 'Funding Organization';
      default: return 'User';
    }
  };

  const getRoleIcon = () => {
    switch (userProfile?.role) {
      case 'donor': return FaHeart;
      case 'ngo': return FaUsers;
      case 'funding_organization': return FaBuilding;
      default: return FaUser;
    }
  };

  const getRoleColor = () => {
    switch (userProfile?.role) {
      case 'donor': return 'from-red-500 to-pink-500';
      case 'ngo': return 'from-blue-500 to-cyan-500';
      case 'funding_organization': return 'from-green-500 to-emerald-500';
      default: return 'from-purple-500 to-pink-500';
    }
  };

  if (!user) return null;

  const RoleIcon = getRoleIcon();

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="sticky top-0 z-50 border-b shadow-2xl bg-slate-900/95 backdrop-blur-md border-white/10"
    >
      <div className="container px-4 mx-auto">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => navigate('/dashboard')}
          >
            <div className="flex items-center justify-center w-10 h-10 shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl">
              <FaHeart className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
              NGO-CONNECT
            </span>
          </motion.div>

          {/* Navigation Removed */}

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Search Removed */}

            {/* Notifications */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-400 transition-colors rounded-lg hover:text-white hover:bg-white/10"
            >
              <FaBell className="w-5 h-5" />
              <span className="absolute flex items-center justify-center w-4 h-4 text-xs text-white bg-red-500 rounded-full -top-1 -right-1">
                3
              </span>
            </motion.button>

            {/* Theme Toggle Removed */}

            {/* User Menu */}
            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center p-2 space-x-3 transition-colors rounded-lg hover:bg-white/10"
              >
                <div className={`w-10 h-10 bg-gradient-to-r ${getRoleColor()} rounded-full flex items-center justify-center shadow-lg`}>
                  <RoleIcon className="w-5 h-5 text-white" />
                </div>
                <div className="hidden text-left md:block">
                  <p className="text-sm font-medium text-white">{getUserDisplayName()}</p>
                  <p className="text-xs text-gray-400">{getRoleDisplayName()}</p>
                </div>
                <FaChevronDown className="w-4 h-4 text-gray-400" />
              </motion.button>

              <AnimatePresence>
                {showUserMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 z-50 w-56 py-2 mt-2 border shadow-2xl bg-slate-800 rounded-xl border-white/10"
                  >
                    <div className="px-4 py-3 border-b border-white/10">
                      <p className="text-sm font-medium text-white">{getUserDisplayName()}</p>
                      <p className="text-xs text-gray-400">{user?.email}</p>
                    </div>
                    
                    <div className="py-2">
                      <button className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-300 transition-colors hover:bg-white/10">
                        <FaUser className="w-4 h-4" />
                        Profile
                      </button>
                      <button className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-gray-300 transition-colors hover:bg-white/10">
                        <FaCog className="w-4 h-4" />
                        Settings
                      </button>
                      <button
                        onClick={handleLogout}
                        className="flex items-center w-full gap-2 px-4 py-2 text-sm text-left text-red-400 transition-colors hover:bg-red-500/10"
                      >
                        <FaSignOutAlt className="w-4 h-4" />
                        Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 right-0 border-b shadow-2xl top-full bg-slate-800 border-white/10"
          >
            <div className="container px-4 py-4 mx-auto">
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {[
                  { title: 'New Donation', message: 'You received a new donation request', time: '2 min ago', type: 'success' },
                  { title: 'Impact Update', message: 'NGO uploaded proof of donation usage', time: '1 hour ago', type: 'info' },
                  { title: 'Reminder', message: 'Don\'t forget to upload your monthly report', time: '3 hours ago', type: 'warning' }
                ].map((notification, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 transition-colors border rounded-lg cursor-pointer bg-white/5 border-white/10 hover:bg-white/10"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="text-sm font-medium text-white">{notification.title}</h4>
                        <p className="mt-1 text-xs text-gray-400">{notification.message}</p>
                        <p className="mt-2 text-xs text-gray-500">{notification.time}</p>
                      </div>
                      <div className={`w-2 h-2 rounded-full ${
                        notification.type === 'success' ? 'bg-green-500' :
                        notification.type === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;