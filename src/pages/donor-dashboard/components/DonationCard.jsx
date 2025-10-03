import React from 'react';
import { motion } from 'framer-motion';
import { FaEye, FaShare, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const DonationCard = ({ donation, onViewDetails, onShare, index }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-400 bg-green-500/10 border-green-500/20';
      case 'in_transit': return 'text-blue-400 bg-blue-500/10 border-blue-500/20';
      case 'pending': return 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20';
      default: return 'text-gray-400 bg-gray-500/10 border-gray-500/20';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.02, y: -2 }}
      className="p-4 transition-all duration-300 border rounded-xl bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10 hover:scale-105 cursor-pointer"
    >
      <div className="flex items-center space-x-4">
        <img 
          src={donation.itemImage} 
          alt={donation.itemName}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-semibold text-white">{donation.itemName}</h4>
            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(donation.status)}`}>
              {donation.status.replace('_', ' ')}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-300 mb-1">
            <img 
              src={donation.ngoAvatar} 
              alt={donation.ngoName}
              className="w-4 h-4 rounded-full"
            />
            <span>{donation.ngoName}</span>
          </div>
          <p className="text-xs text-gray-400 mb-2">{donation.quantity} • {donation.date}</p>
          <p className="text-sm text-green-400 font-medium">{donation.impact}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <button
            onClick={() => onViewDetails(donation.id)}
            className="p-2 transition-colors bg-white/10 rounded-lg hover:bg-white/20"
          >
            <FaEye className="w-4 h-4 text-gray-300" />
          </button>
          <button
            onClick={() => onShare(donation.id)}
            className="p-2 transition-colors bg-white/10 rounded-lg hover:bg-white/20"
          >
            <FaShare className="w-4 h-4 text-gray-300" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default DonationCard;
