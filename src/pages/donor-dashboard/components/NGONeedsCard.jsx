import React from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaUsers, FaHeart, FaGift } from 'react-icons/fa';

const NGONeedsCard = ({ need, onDonate, index }) => {
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-400 bg-red-500/10 border-red-500/20';
      case 'medium': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      case 'low': return 'text-green-400 bg-green-500/10 border-green-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  const getCategoryIcon = (category) => {
    switch (category.toLowerCase()) {
      case 'food': return FaGift;
      case 'medical': return FaHeart;
      case 'education': return FaUsers;
      default: return FaGift;
    }
  };

  const CategoryIcon = getCategoryIcon(need.category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -5 }}
      className="p-6 transition-all duration-300 border rounded-2xl bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-105"
    >
      {/* NGO Header */}
      <div className="flex items-center space-x-3 mb-4">
        <img 
          src={need.ngoAvatar} 
          alt={need.ngoName}
          className="w-10 h-10 rounded-full object-cover"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-white text-sm">{need.ngoName}</h4>
          <div className="flex items-center space-x-2 text-xs text-gray-300">
            <FaMapMarkerAlt className="w-3 h-3" />
            <span>{need.distance}</span>
          </div>
        </div>
        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(need.urgency)}`}>
          {need.urgency}
        </span>
      </div>

      {/* Need Details */}
      <div className="mb-4">
        <div className="flex items-center space-x-2 mb-2">
          <CategoryIcon className="w-4 h-4 text-purple-400" />
          <span className="text-xs text-gray-300 uppercase tracking-wide">{need.category}</span>
        </div>
        <h3 className="font-bold text-white text-lg mb-2">{need.title}</h3>
        <p className="text-sm text-gray-300 mb-3 line-clamp-2">{need.description}</p>
        
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-300">Quantity: <span className="text-white font-medium">{need.quantity}</span></span>
          <div className="flex items-center space-x-1 text-gray-300">
            <FaUsers className="w-3 h-3" />
            <span>{need.interestedDonors}</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-white/10">
        <div className="flex items-center space-x-2 text-xs text-gray-300">
          <FaClock className="w-3 h-3" />
          <span>{need.postedDate}</span>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onDonate(need.id)}
          className="px-4 py-2 text-white font-medium text-sm transition-all duration-300 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:shadow-lg flex items-center space-x-2"
        >
          <FaHeart className="w-3 h-3" />
          <span>Donate Now</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default NGONeedsCard;
