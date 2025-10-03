import React from 'react';
import { motion } from 'framer-motion';
import { FaChartLine, FaUsers, FaHeart, FaGift, FaTrophy } from 'react-icons/fa';

const ImpactChart = () => {
  const impactData = [
    { month: 'Jan', donations: 12, impact: 240 },
    { month: 'Feb', donations: 19, impact: 380 },
    { month: 'Mar', donations: 15, impact: 300 },
    { month: 'Apr', donations: 25, impact: 500 },
    { month: 'May', donations: 22, impact: 440 },
    { month: 'Jun', donations: 30, impact: 600 },
  ];

  const maxImpact = Math.max(...impactData.map(d => d.impact));
  const maxDonations = Math.max(...impactData.map(d => d.donations));

  return (
    <div className="space-y-8">
      {/* Impact Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <FaUsers className="w-8 h-8 text-blue-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">1,250</div>
          <div className="text-sm text-gray-400">People Helped</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <FaGift className="w-8 h-8 text-purple-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">47</div>
          <div className="text-sm text-gray-400">Donations Made</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <FaHeart className="w-8 h-8 text-red-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">23</div>
          <div className="text-sm text-gray-400">NGOs Supported</div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass rounded-2xl p-6 text-center"
        >
          <FaTrophy className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
          <div className="text-2xl font-bold text-white mb-1">8</div>
          <div className="text-sm text-gray-400">Badges Earned</div>
        </motion.div>
      </div>

      {/* Chart */}
      <div className="glass rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-white">Impact Over Time</h3>
          <div className="flex space-x-2">
            <button className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-lg text-sm">6 Months</button>
            <button className="px-3 py-1 bg-white/5 text-gray-400 rounded-lg text-sm">1 Year</button>
          </div>
        </div>

        <div className="h-64 flex items-end justify-between space-x-2">
          {impactData.map((data, index) => (
            <motion.div
              key={data.month}
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex-1 flex flex-col items-center"
            >
              <div className="w-full bg-gradient-to-t from-purple-500 to-pink-500 rounded-t-lg mb-2"
                   style={{ height: `${(data.impact / maxImpact) * 200}px` }}>
              </div>
              <div className="text-xs text-gray-400">{data.month}</div>
              <div className="text-xs text-white font-medium">{data.impact}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recent Achievements */}
      <div className="glass rounded-2xl p-6">
        <h3 className="text-xl font-bold text-white mb-6">Recent Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
              <FaTrophy className="w-5 h-5 text-yellow-400" />
            </div>
            <div>
              <div className="text-white font-medium">Compassionate Donor</div>
              <div className="text-sm text-gray-400">Earned for 10+ donations</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
              <FaHeart className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <div className="text-white font-medium">Community Hero</div>
              <div className="text-sm text-gray-400">Helped 100+ people</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-blue-500/20 rounded-full flex items-center justify-center">
              <FaUsers className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="text-white font-medium">NGO Supporter</div>
              <div className="text-sm text-gray-400">Supported 5+ NGOs</div>
            </div>
          </div>

          <div className="flex items-center space-x-3 p-3 bg-white/5 rounded-lg">
            <div className="w-10 h-10 bg-purple-500/20 rounded-full flex items-center justify-center">
              <FaGift className="w-5 h-5 text-purple-400" />
            </div>
            <div>
              <div className="text-white font-medium">Regular Donor</div>
              <div className="text-sm text-gray-400">3+ months of donations</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpactChart;
