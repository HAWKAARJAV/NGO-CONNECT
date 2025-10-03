import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeart, 
  FaUsers, 
  FaBuilding, 
  FaHandshake, 
  FaChartLine, 
  FaShieldAlt,
  FaRocket,
  FaStar,
  FaGlobe,
  FaBell,
  FaCog,
  FaUser,
  FaSearch,
  FaFilter,
  FaPlus,
  FaEye,
  FaEdit,
  FaTrash,
  FaDownload,
  FaShare,
  FaCalendar,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaGift,
  FaHandHoldingHeart,
  FaAward,
  FaTrophy,
  FaMedal
} from 'react-icons/fa';

const EnhancedDashboard = ({ userType = 'donor' }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showNotifications, setShowNotifications] = useState(false);

  const dashboardData = {
    donor: {
      title: 'Donor Dashboard',
      icon: FaHeart,
      color: 'from-red-500 to-pink-500',
      stats: [
        { label: 'Total Donations', value: '₹45,000', icon: FaMoneyBillWave, color: 'from-green-500 to-emerald-500' },
        { label: 'NGOs Supported', value: '12', icon: FaBuilding, color: 'from-blue-500 to-cyan-500' },
        { label: 'Impact Score', value: '850', icon: FaStar, color: 'from-yellow-500 to-orange-500' },
        { label: 'Badges Earned', value: '8', icon: FaAward, color: 'from-purple-500 to-pink-500' }
      ],
      recentActivity: [
        { type: 'donation', amount: '₹5,000', ngo: 'Education for All', date: '2 days ago', status: 'completed' },
        { type: 'donation', amount: '₹2,500', ngo: 'Healthcare Heroes', date: '1 week ago', status: 'completed' },
        { type: 'impact', message: 'Your donation helped 50 children get school supplies', date: '3 days ago' }
      ],
      recommendedNGOs: [
        { name: 'Rural Education Trust', category: 'Education', rating: 4.8, beneficiaries: '500+', verified: true },
        { name: 'Women Empowerment Initiative', category: 'Women Welfare', rating: 4.9, beneficiaries: '300+', verified: true },
        { name: 'Environmental Conservation', category: 'Environment', rating: 4.7, beneficiaries: '200+', verified: true }
      ]
    },
    ngo: {
      title: 'NGO Dashboard',
      icon: FaBuilding,
      color: 'from-blue-500 to-cyan-500',
      stats: [
        { label: 'Total Donations', value: '₹2,50,000', icon: FaMoneyBillWave, color: 'from-green-500 to-emerald-500' },
        { label: 'Active Donors', value: '45', icon: FaUsers, color: 'from-purple-500 to-pink-500' },
        { label: 'Beneficiaries', value: '1,200', icon: FaHandHoldingHeart, color: 'from-red-500 to-pink-500' },
        { label: 'Verification Score', value: '95%', icon: FaShieldAlt, color: 'from-blue-500 to-cyan-500' }
      ],
      recentActivity: [
        { type: 'donation', amount: '₹25,000', donor: 'Anonymous Donor', date: '1 day ago', status: 'received' },
        { type: 'impact', message: 'Impact report uploaded for education program', date: '2 days ago' },
        { type: 'verification', message: 'Document verification completed', date: '1 week ago' }
      ],
      needs: [
        { item: 'Laptops for Digital Literacy', quantity: '15', priority: 'high', category: 'Technology' },
        { item: 'School Books', quantity: '200', priority: 'medium', category: 'Education' },
        { item: 'Medical Supplies', quantity: '50 kits', priority: 'high', category: 'Healthcare' }
      ]
    },
    corporate: {
      title: 'Corporate CSR Dashboard',
      icon: FaUsers,
      color: 'from-purple-500 to-indigo-500',
      stats: [
        { label: 'CSR Budget', value: '₹50L', icon: FaMoneyBillWave, color: 'from-green-500 to-emerald-500' },
        { label: 'NGO Partners', value: '8', icon: FaBuilding, color: 'from-blue-500 to-cyan-500' },
        { label: 'Employee Participation', value: '75%', icon: FaUsers, color: 'from-purple-500 to-pink-500' },
        { label: 'Impact Rating', value: '4.9/5', icon: FaStar, color: 'from-yellow-500 to-orange-500' }
      ],
      recentActivity: [
        { type: 'partnership', message: 'New partnership with Rural Education Trust', date: '3 days ago' },
        { type: 'donation', amount: '₹10L', ngo: 'Healthcare Heroes', date: '1 week ago' },
        { type: 'volunteer', message: '50 employees volunteered for tree plantation', date: '2 weeks ago' }
      ],
      projects: [
        { name: 'Digital Literacy Program', budget: '₹15L', progress: 75, status: 'active' },
        { name: 'Healthcare Initiative', budget: '₹20L', progress: 60, status: 'active' },
        { name: 'Environmental Conservation', budget: '₹10L', progress: 90, status: 'near-completion' }
      ]
    }
  };

  const currentData = dashboardData[userType];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaGlobe },
    { id: 'donations', label: 'Donations', icon: FaMoneyBillWave },
    { id: 'impact', label: 'Impact', icon: FaChartLine },
    { id: 'settings', label: 'Settings', icon: FaCog }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative z-20 flex items-center justify-between p-6 border-b border-white/10">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <div className={`w-12 h-12 bg-gradient-to-r ${currentData.color} rounded-lg flex items-center justify-center`}>
            <currentData.icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">{currentData.title}</h1>
            <p className="text-gray-400">Welcome back! Here's your impact summary</p>
          </div>
        </motion.div>
        
        <div className="flex items-center space-x-4">
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <FaBell className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </motion.button>
          
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
          >
            <FaUser className="w-5 h-5 text-white" />
          </motion.button>
        </div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          >
            {currentData.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="presentation-card p-6 rounded-2xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <FaChartLine className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-2xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-white border border-white/20 hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              >
                {/* Recent Activity */}
                <div className="lg:col-span-2">
                  <div className="presentation-card p-6 rounded-2xl">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-white">Recent Activity</h3>
                      <button className="text-purple-400 hover:text-purple-300 transition-colors">
                        View All
                      </button>
                    </div>
                    <div className="space-y-4">
                      {currentData.recentActivity.map((activity, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="flex items-center space-x-4 p-4 border border-white/10 rounded-lg hover:bg-white/5 transition-colors"
                        >
                          <div className={`w-10 h-10 bg-gradient-to-r ${activity.type === 'donation' ? 'from-green-500 to-emerald-500' : activity.type === 'impact' ? 'from-blue-500 to-cyan-500' : 'from-purple-500 to-pink-500'} rounded-full flex items-center justify-center`}>
                            {activity.type === 'donation' ? <FaMoneyBillWave className="w-5 h-5 text-white" /> : 
                             activity.type === 'impact' ? <FaChartLine className="w-5 h-5 text-white" /> : 
                             <FaShieldAlt className="w-5 h-5 text-white" />}
                          </div>
                          <div className="flex-1">
                            <p className="text-white font-medium">
                              {activity.type === 'donation' ? `${activity.amount} donated to ${activity.ngo || activity.donor}` :
                               activity.message}
                            </p>
                            <p className="text-gray-400 text-sm">{activity.date}</p>
                          </div>
                          {activity.status && (
                            <span className={`px-2 py-1 rounded-full text-xs ${
                              activity.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                              activity.status === 'received' ? 'bg-blue-500/20 text-blue-400' :
                              'bg-yellow-500/20 text-yellow-400'
                            }`}>
                              {activity.status}
                            </span>
                          )}
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div>
                  <div className="presentation-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Quick Actions</h3>
                    <div className="space-y-3">
                      <button 
                        onClick={() => window.location.href = '/direct-donation'}
                        className="w-full flex items-center space-x-3 p-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <FaPlus className="w-5 h-5 text-purple-400" />
                        <span>Make a Donation</span>
                      </button>
                      <button 
                        onClick={() => window.location.href = '/ngo-discovery-and-matching'}
                        className="w-full flex items-center space-x-3 p-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <FaSearch className="w-5 h-5 text-blue-400" />
                        <span>Find NGOs</span>
                      </button>
                      <button 
                        onClick={() => window.location.href = '/impact-tracking-and-proof-verification'}
                        className="w-full flex items-center space-x-3 p-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <FaChartLine className="w-5 h-5 text-green-400" />
                        <span>View Impact Report</span>
                      </button>
                      <button 
                        onClick={() => window.location.href = '/badges-and-achievements'}
                        className="w-full flex items-center space-x-3 p-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                      >
                        <FaShare className="w-5 h-5 text-yellow-400" />
                        <span>View Badges</span>
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'donations' && (
              <motion.div
                key="donations"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="presentation-card p-6 rounded-2xl">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Donation History</h3>
                    <div className="flex space-x-2">
                      <button className="p-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                        <FaFilter className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                        <FaDownload className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-white/10">
                          <th className="text-left p-3 text-gray-400">Date</th>
                          <th className="text-left p-3 text-gray-400">NGO</th>
                          <th className="text-left p-3 text-gray-400">Amount</th>
                          <th className="text-left p-3 text-gray-400">Status</th>
                          <th className="text-left p-3 text-gray-400">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { date: '2024-01-15', ngo: 'Education for All', amount: '₹5,000', status: 'Completed' },
                          { date: '2024-01-10', ngo: 'Healthcare Heroes', amount: '₹2,500', status: 'Completed' },
                          { date: '2024-01-05', ngo: 'Environmental Conservation', amount: '₹1,000', status: 'Completed' }
                        ].map((donation, index) => (
                          <tr key={index} className="border-b border-white/5 hover:bg-white/5">
                            <td className="p-3 text-white">{donation.date}</td>
                            <td className="p-3 text-white">{donation.ngo}</td>
                            <td className="p-3 text-green-400 font-semibold">{donation.amount}</td>
                            <td className="p-3">
                              <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-xs">
                                {donation.status}
                              </span>
                            </td>
                            <td className="p-3">
                              <div className="flex space-x-2">
                                <button className="p-1 text-blue-400 hover:text-blue-300">
                                  <FaEye className="w-4 h-4" />
                                </button>
                                <button className="p-1 text-purple-400 hover:text-purple-300">
                                  <FaDownload className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'impact' && (
              <motion.div
                key="impact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="presentation-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Impact Metrics</h3>
                    <div className="space-y-4">
                      {[
                        { label: 'Lives Impacted', value: '1,250', icon: FaHandHoldingHeart, color: 'from-red-500 to-pink-500' },
                        { label: 'Communities Served', value: '15', icon: FaGlobe, color: 'from-blue-500 to-cyan-500' },
                        { label: 'Projects Funded', value: '8', icon: FaRocket, color: 'from-purple-500 to-pink-500' }
                      ].map((metric, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 border border-white/10 rounded-lg">
                          <div className={`w-12 h-12 bg-gradient-to-r ${metric.color} rounded-lg flex items-center justify-center`}>
                            <metric.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="text-2xl font-bold text-white">{metric.value}</div>
                            <div className="text-gray-400">{metric.label}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="presentation-card p-6 rounded-2xl">
                    <h3 className="text-xl font-bold text-white mb-6">Achievements</h3>
                    <div className="space-y-4">
                      {[
                        { title: 'Top Donor', description: 'Highest contributor this month', icon: FaTrophy, color: 'from-yellow-500 to-orange-500' },
                        { title: 'Impact Champion', description: 'Helped 500+ beneficiaries', icon: FaMedal, color: 'from-purple-500 to-pink-500' },
                        { title: 'Consistent Supporter', description: '6 months of regular donations', icon: FaAward, color: 'from-blue-500 to-cyan-500' }
                      ].map((achievement, index) => (
                        <div key={index} className="flex items-center space-x-4 p-4 border border-white/10 rounded-lg">
                          <div className={`w-12 h-12 bg-gradient-to-r ${achievement.color} rounded-lg flex items-center justify-center`}>
                            <achievement.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-white">{achievement.title}</div>
                            <div className="text-gray-400 text-sm">{achievement.description}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-2xl mx-auto"
              >
                <div className="presentation-card p-6 rounded-2xl">
                  <h3 className="text-xl font-bold text-white mb-6">Account Settings</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-white mb-2">Full Name</label>
                      <input 
                        type="text" 
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        placeholder="Enter your full name"
                        defaultValue="John Doe"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Email Address</label>
                      <input 
                        type="email" 
                        className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                        placeholder="Enter your email"
                        defaultValue="john@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-white mb-2">Notification Preferences</label>
                      <div className="space-y-2">
                        {['Email notifications', 'SMS notifications', 'Push notifications', 'Impact updates'].map((pref) => (
                          <label key={pref} className="flex items-center space-x-2 cursor-pointer">
                            <input type="checkbox" defaultChecked className="w-4 h-4 text-purple-500" />
                            <span className="text-gray-300">{pref}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex space-x-4">
                      <button className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
                        Save Changes
                      </button>
                      <button className="flex-1 px-6 py-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Notifications Panel */}
      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ opacity: 0, x: 300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 300 }}
            className="fixed top-20 right-6 w-80 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-white/20 z-50"
          >
            <div className="p-4 border-b border-white/10">
              <h3 className="text-lg font-bold text-gray-800">Notifications</h3>
            </div>
            <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
              {[
                { message: 'Your donation helped 25 children get school supplies', time: '2 hours ago', type: 'impact' },
                { message: 'New NGO "Rural Education Trust" is now verified', time: '1 day ago', type: 'info' },
                { message: 'Thank you for your generous donation!', time: '3 days ago', type: 'success' }
              ].map((notification, index) => (
                <div key={index} className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <p className="text-gray-800 text-sm">{notification.message}</p>
                  <p className="text-gray-500 text-xs mt-1">{notification.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default EnhancedDashboard;
