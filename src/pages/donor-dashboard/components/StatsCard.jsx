import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ title, value, icon: Icon, color, trend, trendValue, bgColor, borderColor, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`${bgColor} ${borderColor} border rounded-2xl p-6 backdrop-blur-sm hover:shadow-xl transition-all duration-300 interactive-card cursor-pointer`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-12 h-12 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className={`text-sm font-medium px-2 py-1 rounded-full ${
          trend === 'up' ? 'text-green-400 bg-green-500/10' : 
          trend === 'down' ? 'text-red-400 bg-red-500/10' : 'text-gray-400 bg-gray-500/10'
        }`}>
          {trendValue}
        </div>
      </div>
      <div className="text-2xl font-bold text-white mb-1">{value}</div>
      <div className="text-sm text-gray-400">{title}</div>
    </motion.div>
  );
};

export default StatsCard;