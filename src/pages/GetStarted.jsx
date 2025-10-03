import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaHeart, 
  FaUsers, 
  FaBuilding, 
  FaHandshake, 
  FaArrowRight, 
  FaCheck,
  FaShieldAlt,
  FaChartLine,
  FaRocket,
  FaStar,
  FaGlobe
} from 'react-icons/fa';

const GetStarted = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const userTypes = [
    {
      id: 'donor',
      title: 'Individual Donor',
      icon: FaHeart,
      color: 'from-red-500 to-pink-500',
      description: 'Make a difference with your donations',
      features: [
        'AI-powered NGO matching',
        'Real-time impact tracking',
        'Secure payment processing',
        'Tax benefits & receipts',
        'Personalized dashboard'
      ],
      benefits: [
        'Transparent donation tracking',
        'Verified NGO connections',
        'Impact visualization',
        'Recurring donation options'
      ]
    },
    {
      id: 'ngo',
      title: 'NGO Organization',
      icon: FaBuilding,
      color: 'from-blue-500 to-cyan-500',
      description: 'Connect with donors and manage resources',
      features: [
        'Donor discovery & matching',
        'Resource management',
        'Impact reporting tools',
        'Verification system',
        'Collaboration network'
      ],
      benefits: [
        'Increased donor reach',
        'Efficient resource allocation',
        'Professional credibility',
        'Inter-NGO collaboration'
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate CSR',
      icon: FaUsers,
      color: 'from-purple-500 to-indigo-500',
      description: 'Manage CSR initiatives effectively',
      features: [
        'CSR budget management',
        'NGO verification & selection',
        'Impact measurement',
        'Employee engagement',
        'Compliance reporting'
      ],
      benefits: [
        'Strategic CSR planning',
        'Measurable impact',
        'Employee participation',
        'Regulatory compliance'
      ]
    }
  ];



  const handleRoleSelect = (role) => {
    setSelectedRole(role);
  };

  const handleGetStarted = () => {
    // Redirect to dashboard with role parameter
    navigate(`/dashboard?role=${selectedRole.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative z-20 flex items-center justify-between p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <FaHandshake className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">NGO-CONNECT</span>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-white transition-all duration-300 border rounded-lg border-white/20 hover:bg-white/10"
        >
          ← Back
        </motion.button>
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white">Choose Your Role</h2>
            <p className="text-xl text-gray-300">Select how you want to contribute to social impact</p>
          </motion.div>

          {/* Role Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 gap-8 md:grid-cols-3"
          >
            {userTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleRoleSelect(type)}
                className="p-8 transition-all duration-300 cursor-pointer presentation-card rounded-2xl hover:scale-105"
              >
                <div className={`w-20 h-20 bg-gradient-to-r ${type.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <type.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="mb-4 text-2xl font-bold text-center text-white">{type.title}</h3>
                <p className="mb-6 text-center text-gray-300">{type.description}</p>
                
                <div className="mb-6 space-y-3">
                  <h4 className="mb-3 font-semibold text-white">Key Features:</h4>
                  {type.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <FaCheck className="flex-shrink-0 w-4 h-4 text-green-400" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-3">
                  <h4 className="mb-3 font-semibold text-white">Benefits:</h4>
                  {type.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-center space-x-3">
                      <FaStar className="flex-shrink-0 w-4 h-4 text-yellow-400" />
                      <span className="text-sm text-gray-300">{benefit}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-center mt-6 space-x-2 font-semibold text-purple-400">
                  <span>Get Started</span>
                  <FaArrowRight className="w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Selected Role Action */}
          {selectedRole && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-12 text-center"
            >
              <div className="max-w-2xl p-8 mx-auto presentation-card rounded-2xl">
                <div className={`w-20 h-20 bg-gradient-to-r ${selectedRole.color} rounded-full flex items-center justify-center mx-auto mb-6`}>
                  <selectedRole.icon className="w-10 h-10 text-white" />
                </div>
                
                <h3 className="mb-4 text-2xl font-bold text-white">Ready to join as {selectedRole.title}?</h3>
                <p className="mb-8 text-gray-300">You'll be redirected to our secure registration page to create your account.</p>
                
                <div className="flex space-x-4">
                  <button
                    onClick={() => setSelectedRole(null)}
                    className="flex-1 px-6 py-3 text-white transition-colors border rounded-lg border-white/20 hover:bg-white/10"
                  >
                    Choose Different Role
                  </button>
                  <button
                    onClick={handleGetStarted}
                    className="flex-1 px-6 py-3 text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    Continue to Registration
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GetStarted;
