import React from 'react';
import { motion } from 'framer-motion';
import { FaCheck } from 'react-icons/fa';

const RoleSelectionCard = ({ role, isSelected, onSelect, className = '' }) => {
  const IconComponent = role?.icon;

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative p-6 rounded-xl cursor-pointer transition-all duration-300 backdrop-blur-sm
        ${isSelected 
          ? 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-2 border-purple-400 shadow-lg shadow-purple-500/25' 
          : 'bg-white/10 border border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-lg'
        }
        ${className}
      `}
      onClick={() => onSelect(role?.id)}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="absolute -top-2 -right-2 flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-lg"
        >
          <FaCheck size={14} color="white" />
        </motion.div>
      )}

      <div className="flex flex-col items-center space-y-4 text-center">
        <motion.div
          whileHover={{ rotate: 5 }}
          className={`
            w-20 h-20 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-lg
            ${isSelected 
              ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-purple-500/50' 
              : 'bg-white/20 hover:bg-white/30'
            }
          `}
        >
          {IconComponent && (
            <IconComponent 
              size={32} 
              color={isSelected ? 'white' : '#e2e8f0'} 
            />
          )}
        </motion.div>

        <div>
          <h3 className="mb-2 text-xl font-bold text-white">
            {role?.title}
          </h3>
          <p className="mb-4 text-gray-300 leading-relaxed">
            {role?.description}
          </p>
        </div>

        <div className="w-full space-y-2">
          {role?.features?.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center space-x-2 text-sm"
            >
              <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0"></div>
              <span className="text-gray-300">{feature}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default RoleSelectionCard;