import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaTrophy, 
  FaMedal, 
  FaStar, 
  FaHeart, 
  FaHandshake, 
  FaUsers,
  FaGift,
  FaChartLine,
  FaAward,
  FaCrown,
  FaGem,
  FaShieldAlt,
  FaArrowLeft
} from 'react-icons/fa';

const BadgesAndAchievements = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const badges = [
    {
      id: 1,
      name: 'First Donation',
      description: 'Made your first donation',
      icon: FaHeart,
      color: 'from-red-500 to-pink-500',
      category: 'milestone',
      earned: true,
      date: '2024-01-15',
      rarity: 'common'
    },
    {
      id: 2,
      name: 'Generous Donor',
      description: 'Donated ₹10,000+ in total',
      icon: FaGift,
      color: 'from-purple-500 to-indigo-500',
      category: 'donation',
      earned: true,
      date: '2024-02-20',
      rarity: 'rare'
    },
    {
      id: 3,
      name: 'NGO Supporter',
      description: 'Supported 5+ different NGOs',
      icon: FaUsers,
      color: 'from-blue-500 to-cyan-500',
      category: 'impact',
      earned: true,
      date: '2024-03-10',
      rarity: 'epic'
    },
    {
      id: 4,
      name: 'Monthly Champion',
      description: 'Donated for 3 consecutive months',
      icon: FaChartLine,
      color: 'from-green-500 to-emerald-500',
      category: 'consistency',
      earned: false,
      progress: 66,
      rarity: 'rare'
    },
    {
      id: 5,
      name: 'Impact Leader',
      description: 'Helped 100+ beneficiaries',
      icon: FaHandshake,
      color: 'from-yellow-500 to-orange-500',
      category: 'impact',
      earned: false,
      progress: 45,
      rarity: 'legendary'
    },
    {
      id: 6,
      name: 'Trusted Donor',
      description: 'Maintained 100% transparency score',
      icon: FaShieldAlt,
      color: 'from-indigo-500 to-purple-500',
      category: 'trust',
      earned: true,
      date: '2024-01-30',
      rarity: 'epic'
    },
    {
      id: 7,
      name: 'Community Hero',
      description: 'Referred 10+ new donors',
      icon: FaCrown,
      color: 'from-pink-500 to-rose-500',
      category: 'community',
      earned: false,
      progress: 30,
      rarity: 'legendary'
    },
    {
      id: 8,
      name: 'Diamond Donor',
      description: 'Donated ₹1,00,000+ in total',
      icon: FaGem,
      color: 'from-cyan-500 to-blue-500',
      category: 'donation',
      earned: false,
      progress: 25,
      rarity: 'mythic'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Badges', icon: FaTrophy },
    { id: 'milestone', label: 'Milestones', icon: FaStar },
    { id: 'donation', label: 'Donations', icon: FaGift },
    { id: 'impact', label: 'Impact', icon: FaHandshake },
    { id: 'consistency', label: 'Consistency', icon: FaChartLine },
    { id: 'trust', label: 'Trust', icon: FaShieldAlt },
    { id: 'community', label: 'Community', icon: FaUsers }
  ];

  const filteredBadges = selectedCategory === 'all' 
    ? badges 
    : badges.filter(badge => badge.category === selectedCategory);

  const earnedBadges = badges.filter(badge => badge.earned);
  const totalBadges = badges.length;
  const completionRate = Math.round((earnedBadges.length / totalBadges) * 100);

  const getRarityColor = (rarity) => {
    switch (rarity) {
      case 'common': return 'from-gray-400 to-gray-500';
      case 'rare': return 'from-blue-400 to-blue-500';
      case 'epic': return 'from-purple-400 to-purple-500';
      case 'legendary': return 'from-yellow-400 to-orange-500';
      case 'mythic': return 'from-pink-400 to-rose-500';
      default: return 'from-gray-400 to-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative z-20 flex items-center p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div className="ml-4">
            <h1 className="text-2xl font-bold text-white">Badges & Achievements</h1>
            <p className="text-gray-400">Track your impact journey</p>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          >
            <div className="presentation-card p-6 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                  <FaTrophy className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Earned Badges</p>
                  <p className="text-2xl font-bold text-white">{earnedBadges.length}</p>
                </div>
              </div>
            </div>

            <div className="presentation-card p-6 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <FaChartLine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Completion Rate</p>
                  <p className="text-2xl font-bold text-white">{completionRate}%</p>
                </div>
              </div>
            </div>

            <div className="presentation-card p-6 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <FaStar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Total Points</p>
                  <p className="text-2xl font-bold text-white">2,450</p>
                </div>
              </div>
            </div>

            <div className="presentation-card p-6 rounded-2xl">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center">
                  <FaCrown className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Rank</p>
                  <p className="text-2xl font-bold text-white">#127</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-white border border-white/20 hover:bg-white/10'
                }`}
              >
                <category.icon className="w-4 h-4" />
                <span>{category.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Badges Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredBadges.map((badge, index) => (
              <motion.div
                key={badge.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`presentation-card p-6 rounded-2xl transition-all duration-300 ${
                  badge.earned ? 'opacity-100' : 'opacity-60'
                }`}
              >
                <div className="text-center">
                  <div className={`w-20 h-20 bg-gradient-to-r ${badge.earned ? badge.color : 'from-gray-400 to-gray-500'} rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <badge.icon className="w-10 h-10 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-white mb-2">{badge.name}</h3>
                  <p className="text-gray-300 text-sm mb-4">{badge.description}</p>
                  
                  {badge.earned ? (
                    <div className="space-y-2">
                      <div className="flex items-center justify-center space-x-2">
                        <FaAward className="w-4 h-4 text-yellow-400" />
                        <span className="text-sm text-green-400 font-semibold">Earned</span>
                      </div>
                      <p className="text-xs text-gray-400">{badge.date}</p>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${badge.progress}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-400">{badge.progress}% Complete</p>
                    </div>
                  )}
                  
                  <div className={`mt-3 inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getRarityColor(badge.rarity)} text-white`}>
                    {badge.rarity.charAt(0).toUpperCase() + badge.rarity.slice(1)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BadgesAndAchievements;
