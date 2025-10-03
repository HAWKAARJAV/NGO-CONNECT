import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHandshake, 
  FaHeart, 
  FaUsers, 
  FaBuilding, 
  FaMapMarkerAlt,
  FaSearch,
  FaFilter,
  FaArrowLeft,
  FaMoneyBillWave,
  FaGift,
  FaShieldAlt,
  FaCheckCircle,
  FaStar,
  FaEye
} from 'react-icons/fa';

const DirectDonation = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [showDonationModal, setShowDonationModal] = useState(false);

  const categories = [
    { id: 'all', label: 'All Causes', icon: FaHeart },
    { id: 'education', label: 'Education', icon: FaUsers },
    { id: 'healthcare', label: 'Healthcare', icon: FaHeart },
    { id: 'environment', label: 'Environment', icon: FaBuilding },
    { id: 'poverty', label: 'Poverty Relief', icon: FaHandshake }
  ];

  const urgentNeeds = [
    {
      id: 1,
      title: 'Emergency Medical Supplies',
      ngo: 'Healthcare Heroes',
      location: 'Mumbai, Maharashtra',
      category: 'healthcare',
      urgency: 'high',
      amount: '₹25,000',
      raised: '₹18,500',
      beneficiaries: 150,
      description: 'Urgent need for medical supplies for rural healthcare centers',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      rating: 4.8,
      verified: true
    },
    {
      id: 2,
      title: 'School Supplies for Rural Children',
      ngo: 'Education for All',
      location: 'Bhopal, Madhya Pradesh',
      category: 'education',
      urgency: 'medium',
      amount: '₹15,000',
      raised: '₹8,200',
      beneficiaries: 200,
      description: 'Providing essential school supplies to underprivileged children',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      rating: 4.9,
      verified: true
    },
    {
      id: 3,
      title: 'Clean Water Initiative',
      ngo: 'Water for Life',
      location: 'Jaipur, Rajasthan',
      category: 'environment',
      urgency: 'high',
      amount: '₹50,000',
      raised: '₹32,000',
      beneficiaries: 500,
      description: 'Installing water purification systems in drought-affected villages',
      image: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop',
      rating: 4.7,
      verified: true
    },
    {
      id: 4,
      title: 'Food Distribution Program',
      ngo: 'Hunger Relief Foundation',
      location: 'Delhi, NCR',
      category: 'poverty',
      urgency: 'high',
      amount: '₹30,000',
      raised: '₹22,500',
      beneficiaries: 300,
      description: 'Daily meal distribution to homeless and underprivileged families',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      rating: 4.6,
      verified: true
    }
  ];

  const filteredNeeds = urgentNeeds.filter(need => {
    const matchesCategory = selectedCategory === 'all' || need.category === selectedCategory;
    const matchesSearch = need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         need.ngo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleDonate = (need) => {
    setSelectedNGO(need);
    setShowDonationModal(true);
  };

  const handleDonationSubmit = () => {
    // Handle donation submission
    console.log('Donation submitted:', { ngo: selectedNGO, amount: donationAmount });
    setShowDonationModal(false);
    setSelectedNGO(null);
    setDonationAmount('');
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getProgressPercentage = (raised, amount) => {
    const raisedNum = parseInt(raised.replace('₹', '').replace(',', ''));
    const amountNum = parseInt(amount.replace('₹', '').replace(',', ''));
    return Math.round((raisedNum / amountNum) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative z-20 flex items-center justify-between p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-4"
        >
          <button
            onClick={() => navigate('/dashboard')}
            className="p-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
          >
            <FaArrowLeft className="w-5 h-5" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
              <FaHandshake className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Direct Donation</h1>
              <p className="text-gray-400">Support urgent causes immediately</p>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for causes or NGOs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center space-x-2 px-4 py-3 rounded-lg transition-all duration-300 ${
                      selectedCategory === category.id
                        ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                        : 'text-white border border-white/20 hover:bg-white/10'
                    }`}
                  >
                    <category.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{category.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Urgent Needs Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredNeeds.map((need, index) => (
              <motion.div
                key={need.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="presentation-card rounded-2xl overflow-hidden"
              >
                <div className="relative">
                  <img 
                    src={need.image} 
                    alt={need.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute top-4 left-4 px-3 py-1 bg-gradient-to-r ${getUrgencyColor(need.urgency)} text-white text-xs font-semibold rounded-full`}>
                    {need.urgency.toUpperCase()} PRIORITY
                  </div>
                  {need.verified && (
                    <div className="absolute top-4 right-4 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                      <FaCheckCircle className="w-4 h-4 text-white" />
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-lg font-bold text-white">{need.title}</h3>
                    <div className="flex items-center space-x-1">
                      <FaStar className="w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">{need.rating}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 text-sm mb-4">{need.description}</p>

                  <div className="flex items-center space-x-2 mb-4">
                    <FaBuilding className="w-4 h-4 text-blue-400" />
                    <span className="text-sm text-gray-300">{need.ngo}</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <FaMapMarkerAlt className="w-4 h-4 text-red-400" />
                    <span className="text-sm text-gray-300">{need.location}</span>
                  </div>

                  <div className="flex items-center space-x-2 mb-4">
                    <FaUsers className="w-4 h-4 text-green-400" />
                    <span className="text-sm text-gray-300">{need.beneficiaries} beneficiaries</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-gray-300">Raised: {need.raised}</span>
                      <span className="text-gray-300">Goal: {need.amount}</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-emerald-500 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${getProgressPercentage(need.raised, need.amount)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1">
                      {getProgressPercentage(need.raised, need.amount)}% of goal reached
                    </p>
                  </div>

                  <button
                    onClick={() => handleDonate(need)}
                    className="w-full flex items-center justify-center space-x-2 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-semibold"
                  >
                    <FaMoneyBillWave className="w-4 h-4" />
                    <span>Donate Now</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Donation Modal */}
      {showDonationModal && selectedNGO && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="presentation-card p-8 rounded-2xl max-w-md w-full"
          >
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaGift className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Make a Donation</h3>
              <p className="text-gray-300">{selectedNGO.title}</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-white mb-2">Donation Amount (₹)</label>
                <input
                  type="number"
                  value={donationAmount}
                  onChange={(e) => setDonationAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
                />
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setDonationAmount('500')}
                  className="flex-1 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  ₹500
                </button>
                <button
                  onClick={() => setDonationAmount('1000')}
                  className="flex-1 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  ₹1,000
                </button>
                <button
                  onClick={() => setDonationAmount('2500')}
                  className="flex-1 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  ₹2,500
                </button>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowDonationModal(false)}
                  className="flex-1 py-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDonationSubmit}
                  disabled={!donationAmount}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm Donation
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default DirectDonation;
