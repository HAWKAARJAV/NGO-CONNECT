import React from 'react';
import { motion } from 'framer-motion';

const ActivityFeed = ({ activities }) => {
  return (
    <div className="space-y-4">
      {activities.map((activity, index) => (
        <motion.div
          key={activity.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="flex items-start p-3 space-x-3 transition-colors border rounded-lg cursor-pointer bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10"
        >
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.color.replace('text-', 'bg-').replace('400', '500/20')}`}>
            <activity.icon className="w-4 h-4" />
          </div>
          <div className="flex-1">
            <p className="text-sm text-white">{activity.message}</p>
            <p className="mt-1 text-xs text-gray-300">{activity.timestamp}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ActivityFeed;