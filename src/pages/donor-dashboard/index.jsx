import NGONeedsCard from './components/NGONeedsCard';
import ActivityFeed from './components/ActivityFeed';
import ImpactChart from './components/ImpactChart';
import StatsCard from './components/StatsCard';
import DonationCard from './components/DonationCard';
import Button from '../../components/ui/Button';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Header from '../../components/ui/Header';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeart, FaUsers, FaBuilding, FaGift, FaMapMarkerAlt, 
  FaSearch, FaFilter, FaPlus, FaBell, FaTrophy, FaStar,
  FaClock, FaCheckCircle, FaExclamationTriangle, FaEye,
  FaShare, FaDownload, FaUpload, FaChartLine, FaHandshake, FaList
} from 'react-icons/fa';
import ListedItemsModal from '../item-donation-listing/ListedItemsModal';

const DonorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showListedModal, setShowListedModal] = useState(false);
  const navigate = useNavigate();

  const { user } = useAuth();
  const userId = user?.id;
  const [filterCategory, setFilterCategory] = useState('all');

  // Mock data for donor dashboard
  const donorStats = [
    {
      title: "Total Donations",
      value: "47",
      icon: FaGift,
      color: "from-purple-500 to-pink-500",
      trend: "up",
      trendValue: "+12%",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/20"
    },
    {
      title: "Impact Score",
      value: "1,250",
      icon: FaHeart,
      color: "from-red-500 to-pink-500",
      trend: "up",
      trendValue: "+8%",
      bgColor: "bg-red-500/10",
      borderColor: "border-red-500/20"
    },
    {
      title: "NGOs Supported",
      value: "23",
      icon: FaBuilding,
      color: "from-blue-500 to-cyan-500",
      trend: "up",
      trendValue: "+3",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/20"
    },
    {
      title: "Badges Earned",
      value: "8",
      icon: FaTrophy,
      color: "from-green-500 to-emerald-500",
      trend: "neutral",
      trendValue: "0",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/20"
    }
  ];

  const recentDonations = [
    {
      id: 1,
      itemName: "Rice & Dal",
      itemImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop",
      ngoName: "Green Earth Foundation",
      ngoAvatar: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=50&h=50&fit=crop",
      quantity: "50 kg",
      status: "delivered",
      date: "2 days ago",
      impact: "Feeds 100 families for 1 week"
    },
    {
      id: 2,
      itemName: "Winter Blankets",
      itemImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=100&h=100&fit=crop",
      ngoName: "Hope Shelter",
      ngoAvatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop",
      quantity: "25 pieces",
      status: "in_transit",
      date: "5 days ago",
      impact: "Keeps 25 people warm"
    },
    {
      id: 3,
      itemName: "School Books",
      itemImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=100&h=100&fit=crop",
      ngoName: "Education First",
      ngoAvatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=50&h=50&fit=crop",
      quantity: "100 books",
      status: "pending",
      date: "1 week ago",
      impact: "Educates 50 children"
    }
  ];

  const nearbyNeeds = [
    {
      id: 1,
      ngoName: "Green Earth Foundation",
      ngoAvatar: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=50&h=50&fit=crop",
      title: "Emergency Food Supplies",
      description: "Urgent need for rice, dal, and cooking oil for flood-affected families",
      category: "Food",
      quantity: "500 kg",
      urgency: "high",
      distance: "2.3 km",
      postedDate: "2 hours ago",
      interestedDonors: 8
    },
    {
      id: 2,
      ngoName: "Hope Shelter",
      ngoAvatar: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=50&h=50&fit=crop",
      title: "Medical Supplies",
      description: "Need basic medical supplies for health camp in rural area",
      category: "Medical",
      quantity: "50 kits",
      urgency: "medium",
      distance: "4.1 km",
      postedDate: "6 hours ago",
      interestedDonors: 5
    },
    {
      id: 3,
      ngoName: "Education First",
      ngoAvatar: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=50&h=50&fit=crop",
      title: "School Stationery",
      description: "Required for underprivileged children in our education program",
      category: "Education",
      quantity: "200 sets",
      urgency: "low",
      distance: "1.8 km",
      postedDate: "1 day ago",
      interestedDonors: 12
    }
  ];

  const activities = [
    {
      id: 1,
      type: "donation",
      message: "Your rice donation was delivered to Green Earth Foundation",
      timestamp: "2 hours ago",
      icon: FaCheckCircle,
      color: "text-green-400"
    },
    {
      id: 2,
      type: "impact",
      message: "You've earned the 'Compassionate Donor' badge!",
      timestamp: "1 day ago",
      icon: FaTrophy,
      color: "text-yellow-400"
    },
    {
      id: 3,
      type: "notification",
      message: "New NGO need posted nearby: Emergency Food Supplies",
      timestamp: "2 days ago",
      icon: FaBell,
      color: "text-blue-400"
    }
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaHeart },
    { id: 'donations', label: 'My Donations', icon: FaGift },
    { id: 'needs', label: 'Nearby Needs', icon: FaMapMarkerAlt },
    { id: 'impact', label: 'Impact', icon: FaChartLine },
    { id: 'badges', label: 'Badges', icon: FaTrophy }
  ];

  const categories = [
    { id: 'all', label: 'All Categories', icon: FaFilter },
    { id: 'food', label: 'Food', icon: FaGift },
    { id: 'clothing', label: 'Clothing', icon: FaUsers },
    { id: 'education', label: 'Education', icon: FaBuilding },
    { id: 'medical', label: 'Medical', icon: FaHeart }
  ];

  const handleDonate = (needId) => {
    console.log('Donating to need:', needId);
  };

  const handleViewDetails = (donationId) => {
    console.log('Viewing donation details:', donationId);
  };

  const handleShare = (itemId) => {
    console.log('Sharing item:', itemId);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Animated Background Elements - Same as home page */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bg-purple-500 rounded-full -top-40 -right-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bg-pink-500 rounded-full -bottom-40 -left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bg-blue-500 rounded-full top-40 left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      {/* Floating Particles - Same as home page */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-20"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <Header />
      
      <main className="relative z-10 pt-20">
        <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <Breadcrumb 
            items={[
              { label: 'Home', href: '/' },
              { label: 'Donor Dashboard', href: '#', current: true }
            ]} 
          />

          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl">
              Welcome back,{" "}
              <span className="text-transparent bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text">
                Compassionate Donor!
              </span>
            </h1>
            <p className="max-w-2xl mx-auto text-xl leading-relaxed text-gray-300">
              Continue making a difference in people's lives. Your generosity creates lasting impact.
            </p>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4"
          >
            {donorStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.1 }}
                whileHover={{ scale: 1.02, y: -5 }}
                className="p-6 transition-all duration-300 border rounded-2xl bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-105"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 bg-gradient-to-r ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`text-sm font-medium px-2 py-1 rounded-full ${
                    stat.trend === 'up' ? 'text-green-400 bg-green-500/10' : 
                    stat.trend === 'down' ? 'text-red-400 bg-red-500/10' : 'text-gray-400 bg-gray-500/10'
                  }`}>
                    {stat.trendValue}
                  </div>
                </div>
                <div className="mb-1 text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-300">{stat.title}</div>
              </motion.div>
            ))}
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 gap-4 mb-8 md:grid-cols-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/item-donation-listing')}
              className="flex items-center justify-center p-4 space-x-2 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:shadow-lg"
            >
              <FaPlus className="w-5 h-5" />
              <span>List Item</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowListedModal(true)}
              className="flex items-center justify-center p-4 space-x-2 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl hover:shadow-lg"
            >
              <FaList className="w-5 h-5" />
              <span>Listed Item</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/ngo-needs')}
              className="flex items-center justify-center p-4 space-x-2 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl hover:shadow-lg"
            >
              <FaSearch className="w-5 h-5" />
              <span>Find Needs</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/direct-donation')}
              className="flex items-center justify-center p-4 space-x-2 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl hover:shadow-lg"
            >
              <FaHandshake className="w-5 h-5" />
              <span>Direct Donate</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate('/badges-and-achievements')}
              className="flex items-center justify-center p-4 space-x-2 font-semibold text-white transition-all duration-300 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl hover:shadow-lg"
            >
              <FaTrophy className="w-5 h-5" />
              <span>View Badges</span>
            </motion.button>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="p-2 mb-8 border rounded-2xl bg-white/10 backdrop-blur-sm border-white/20"
          >
            <nav className="flex space-x-2 overflow-x-auto">
              {tabs.map((tab) => (
                <motion.button
                  key={tab.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-medium text-sm transition-all duration-300 whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-300 hover:text-white hover:bg-white/20'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </motion.button>
              ))}
            </nav>
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 gap-8 lg:grid-cols-3"
              >
                {/* Recent Donations */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="p-6 border lg:col-span-2 rounded-2xl bg-white/10 backdrop-blur-sm border-white/20"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-white">Recent Donations</h3>
                    <Button variant="outline" size="sm" className="text-white border-white/20 hover:bg-white/20">
                      View All
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentDonations.map((donation, index) => (
                      <DonationCard
                        key={donation.id}
                        donation={donation}
                        onViewDetails={handleViewDetails}
                        onShare={handleShare}
                        index={index}
                      />
                    ))}
                  </div>
                </motion.div>

                {/* Activity Feed */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="p-6 border rounded-2xl bg-white/10 backdrop-blur-sm border-white/20"
                >
                  <h3 className="mb-6 text-xl font-bold text-white">Recent Activity</h3>
                  <ActivityFeed activities={activities} />
                </motion.div>
              </motion.div>
            )}

            {activeTab === 'needs' && (
              <motion.div
                key="needs"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                {/* Search and Filter */}
                <div className="p-6 border rounded-2xl bg-white/10 backdrop-blur-sm border-white/20">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="relative flex-1">
                      <FaSearch className="absolute w-5 h-5 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                      <input
                        type="text"
                        placeholder="Search for NGO needs..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full py-3 pl-10 pr-4 text-white placeholder-gray-400 border bg-white/10 border-white/20 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      />
                    </div>
                    <div className="flex gap-2 overflow-x-auto">
                      {categories.map((category) => (
                        <button
                          key={category.id}
                          onClick={() => setFilterCategory(category.id)}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                            filterCategory === category.id
                              ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                              : 'bg-white/10 text-gray-300 hover:text-white hover:bg-white/20'
                          }`}
                        >
                          <category.icon className="w-4 h-4" />
                          <span>{category.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Needs Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {nearbyNeeds.map((need, index) => (
                    <NGONeedsCard
                      key={need.id}
                      need={need}
                      onDonate={handleDonate}
                      index={index}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'impact' && (
              <motion.div
                key="impact"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-8"
              >
                <ImpactChart />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    {/* Listed Items Modal */}
    <ListedItemsModal
      isOpen={showListedModal}
      onClose={() => setShowListedModal(false)}
      userId={userId}
      onStartListing={() => {
        setShowListedModal(false);
        navigate('/item-donation-listing');
      }}
    />
  </div>
  );
};

export default DonorDashboard;