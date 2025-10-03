import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaSearch, 
  FaFilter, 
  FaMapMarkerAlt, 
  FaBuilding, 
  FaUsers,
  FaHeart,
  FaHandshake,
  FaGift,
  FaArrowLeft,
  FaStar,
  FaCheckCircle,
  FaEye,
  FaShare
} from 'react-icons/fa';

const NGONeeds = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [showNeedModal, setShowNeedModal] = useState(false);

  const categories = [
    { id: 'all', label: 'All Needs', icon: FaHeart },
    { id: 'food', label: 'Food & Nutrition', icon: FaGift },
    { id: 'clothing', label: 'Clothing', icon: FaUsers },
    { id: 'education', label: 'Education', icon: FaBuilding },
    { id: 'medical', label: 'Medical', icon: FaHeart },
    { id: 'shelter', label: 'Shelter', icon: FaHandshake }
  ];

  const nearbyNeeds = [
    {
      id: 1,
      title: 'Winter Clothing for Children',
      ngo: 'Child Care Foundation',
      location: 'Delhi, NCR',
      distance: '2.5 km',
      category: 'clothing',
      urgency: 'high',
      quantity: '200 pieces',
      description: 'Urgent need for warm clothing for children in slum areas',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=400&h=300&fit=crop',
      rating: 4.8,
      verified: true,
      postedDate: '2 days ago',
      beneficiaries: 200
    },
    {
      id: 2,
      title: 'School Books and Stationery',
      ngo: 'Education for All',
      location: 'Gurgaon, Haryana',
      distance: '5.1 km',
      category: 'education',
      urgency: 'medium',
      quantity: '500 sets',
      description: 'Books and stationery needed for rural school children',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400&h=300&fit=crop',
      rating: 4.9,
      verified: true,
      postedDate: '1 week ago',
      beneficiaries: 500
    },
    {
      id: 3,
      title: 'Medical Supplies',
      ngo: 'Healthcare Heroes',
      location: 'Noida, UP',
      distance: '8.3 km',
      category: 'medical',
      urgency: 'high',
      quantity: 'Various items',
      description: 'First aid kits and basic medical supplies for community health centers',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
      rating: 4.7,
      verified: true,
      postedDate: '3 days ago',
      beneficiaries: 150
    },
    {
      id: 4,
      title: 'Food Items for Homeless',
      ngo: 'Hunger Relief',
      location: 'Faridabad, Haryana',
      distance: '12.7 km',
      category: 'food',
      urgency: 'high',
      quantity: 'Daily meals',
      description: 'Non-perishable food items for daily meal distribution',
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=300&fit=crop',
      rating: 4.6,
      verified: true,
      postedDate: '1 day ago',
      beneficiaries: 300
    },
    {
      id: 5,
      title: 'Blankets and Bedding',
      ngo: 'Shelter Support',
      location: 'Ghaziabad, UP',
      distance: '15.2 km',
      category: 'shelter',
      urgency: 'medium',
      quantity: '100 sets',
      description: 'Warm blankets and bedding for homeless shelters',
      image: 'https://images.unsplash.com/photo-1582735689369-4fe89db7114c?w=400&h=300&fit=crop',
      rating: 4.5,
      verified: true,
      postedDate: '4 days ago',
      beneficiaries: 100
    },
    {
      id: 6,
      title: 'Computer Equipment',
      ngo: 'Digital Literacy Initiative',
      location: 'Delhi, NCR',
      distance: '3.8 km',
      category: 'education',
      urgency: 'low',
      quantity: '10 laptops',
      description: 'Used laptops for computer literacy classes',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
      rating: 4.4,
      verified: true,
      postedDate: '1 week ago',
      beneficiaries: 50
    }
  ];

  const filteredNeeds = nearbyNeeds.filter(need => {
    const matchesCategory = selectedCategory === 'all' || need.category === selectedCategory;
    const matchesSearch = need.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         need.ngo.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleViewDetails = (need) => {
    setSelectedNeed(need);
    setShowNeedModal(true);
  };

  const handleDonate = (need) => {
    // Navigate to donation page or open donation modal
    console.log('Donating to need:', need);
    setShowNeedModal(false);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'from-red-500 to-pink-500';
      case 'medium': return 'from-yellow-500 to-orange-500';
      case 'low': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
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
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <FaSearch className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Find NGO Needs</h1>
              <p className="text-gray-400">Discover nearby causes to support</p>
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
                  placeholder="Search for needs or NGOs..."
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

          {/* Needs Grid */}
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

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center space-x-2">
                      <FaBuilding className="w-4 h-4 text-blue-400" />
                      <span className="text-sm text-gray-300">{need.ngo}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaMapMarkerAlt className="w-4 h-4 text-red-400" />
                      <span className="text-sm text-gray-300">{need.location} ({need.distance})</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaUsers className="w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">{need.beneficiaries} beneficiaries</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FaGift className="w-4 h-4 text-purple-400" />
                      <span className="text-sm text-gray-300">Need: {need.quantity}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs text-gray-400">Posted {need.postedDate}</span>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleViewDetails(need)}
                      className="flex-1 flex items-center justify-center space-x-2 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                    >
                      <FaEye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>
                    <button
                      onClick={() => handleDonate(need)}
                      className="flex-1 flex items-center justify-center space-x-2 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                    >
                      <FaHandshake className="w-4 h-4" />
                      <span>Donate</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Need Details Modal */}
      {showNeedModal && selectedNeed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="presentation-card p-8 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">{selectedNeed.title}</h3>
              <button
                onClick={() => setShowNeedModal(false)}
                className="p-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
              >
                ×
              </button>
            </div>

            <img 
              src={selectedNeed.image} 
              alt={selectedNeed.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <FaBuilding className="w-4 h-4 text-blue-400" />
                  <span className="text-sm text-gray-300">{selectedNeed.ngo}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaMapMarkerAlt className="w-4 h-4 text-red-400" />
                  <span className="text-sm text-gray-300">{selectedNeed.location}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaUsers className="w-4 h-4 text-green-400" />
                  <span className="text-sm text-gray-300">{selectedNeed.beneficiaries} beneficiaries</span>
                </div>
                <div className="flex items-center space-x-2">
                  <FaGift className="w-4 h-4 text-purple-400" />
                  <span className="text-sm text-gray-300">{selectedNeed.quantity}</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-white mb-2">Description</h4>
                <p className="text-gray-300">{selectedNeed.description}</p>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FaStar className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm text-gray-300">{selectedNeed.rating} rating</span>
                </div>
                <span className="text-xs text-gray-400">Posted {selectedNeed.postedDate}</span>
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  onClick={() => setShowNeedModal(false)}
                  className="flex-1 py-3 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-colors"
                >
                  Close
                </button>
                <button
                  onClick={() => handleDonate(selectedNeed)}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                >
                  Donate Now
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default NGONeeds;
