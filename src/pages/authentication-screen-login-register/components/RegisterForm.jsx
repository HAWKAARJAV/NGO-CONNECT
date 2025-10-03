import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaUsers, FaBuilding, FaArrowRight, FaCheck } from 'react-icons/fa';
import RoleSelectionCard from './RoleSelectionCard';
import { useAuth } from '../../../contexts/AuthContext';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const RegisterForm = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    organizationName: '',
    city: '',
    state: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const roles = [
    {
      id: 'donor',
      title: 'Donor',
      description: 'I want to donate items or funds to NGOs',
      icon: FaHeart,
      features: [
        'Donate items & funds',
        'Track donation impact',
        'Discover nearby NGOs',
        'Get tax receipts'
      ],
      color: 'from-red-500 to-pink-500'
    },
    {
      id: 'ngo',
      title: 'NGO',
      description: 'I represent an NGO looking for donations',
      icon: FaUsers,
      features: [
        'Post specific needs',
        'Receive donations',
        'Upload impact proofs',
        'Manage beneficiaries'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'funding_organization',
      title: 'Funding Organization',
      description: 'I represent a corporate or foundation',
      icon: FaBuilding,
      features: [
        'Fund multiple NGOs',
        'CSR compliance',
        'Impact reporting',
        'Partnership opportunities'
      ],
      color: 'from-green-500 to-emerald-500'
    }
  ];

  const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
    'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
    'Uttarakhand', 'West Bengal'
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleRoleSelect = (roleId) => {
    setFormData(prev => ({
      ...prev,
      role: roleId
    }));
  };

  const validateStep1 = () => {
    const newErrors = {};
    
    if (!formData?.role) {
      newErrors.role = 'Please select your role';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    
    if (!formData?.fullName) {
      newErrors.fullName = 'Full name is required';
    }
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    } else if (formData?.password?.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (!formData?.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData?.password !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!formData?.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/?.test(formData?.phoneNumber?.replace(/\D/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid Indian mobile number';
    }
    
    if ((formData?.role === 'ngo' || formData?.role === 'funding_organization') && !formData?.organizationName) {
      newErrors.organizationName = 'Organization name is required';
    }
    
    if (!formData?.city) {
      newErrors.city = 'City is required';
    }
    
    if (!formData?.state) {
      newErrors.state = 'State is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1 && validateStep1()) {
      setCurrentStep(2);
    }
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep2()) return;
    
    setLoading(true);
    setErrors({});

    try {
      const { data, error } = await signUp(
        formData?.email, 
        formData?.password, 
        {
          full_name: formData?.fullName,
          role: formData?.role
        }
      );
      
      if (error) {
        setErrors({ 
          general: error?.message || 'Registration failed' 
        });
        return;
      }

      // Check if user was created or signed in
      if (data?.session) {
        // User is signed in, redirect to dashboard
        navigate('/dashboard');
      } else if (data?.user) {
        // User was created successfully, show success message and switch to login
        setErrors({ 
          success: 'Registration successful! You can now sign in with your email and password.' 
        });
        
        // Switch to login form after 2 seconds
        setTimeout(() => {
          onSwitchToLogin();
        }, 2000);
      }
      
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ 
        general: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  if (currentStep === 1) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-6"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          <h2 className="mb-3 text-2xl font-bold text-white">
            Choose Your Role
          </h2>
          <p className="text-gray-300">
            Select how you would like to use NGO-CONNECT
          </p>
        </motion.div>

        {errors?.general && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 text-sm text-red-300 border bg-red-500/20 border-red-500/30 rounded-xl backdrop-blur-sm"
          >
            {errors?.general}
          </motion.div>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          {roles?.map((role, index) => (
            <motion.div
              key={role?.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + index * 0.1 }}
            >
              <RoleSelectionCard
                role={role}
                isSelected={formData?.role === role?.id}
                onSelect={handleRoleSelect}
              />
            </motion.div>
          ))}
        </motion.div>

        {errors?.role && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-center text-red-400"
          >
            {errors?.role}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex space-x-3"
        >
          <Button
            type="button"
            variant="outline"
            onClick={onSwitchToLogin}
            disabled={loading}
            fullWidth
            className="text-white border-white/20 hover:bg-white/10 hover:border-white/30"
          >
            Back to Login
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handleNext}
            disabled={!formData?.role || loading}
            fullWidth
            className="font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <span>Continue</span>
            <FaArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-6"
      >
        <h2 className="text-2xl font-bold text-white">
          Create Account
        </h2>
        <div className="px-3 py-1 text-sm text-gray-300 rounded-full bg-white/10">
          Step 2 of 2
        </div>
      </motion.div>

      {errors?.general && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 text-sm text-red-300 border bg-red-500/20 border-red-500/30 rounded-xl backdrop-blur-sm"
        >
          {errors?.general}
        </motion.div>
      )}

      {errors?.success && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-4 text-sm text-green-300 border bg-green-500/20 border-green-500/30 rounded-xl backdrop-blur-sm"
        >
          {errors?.success}
        </motion.div>
      )}

      {/* Auto-fill Demo Data Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="p-4 border bg-white/5 border-white/10 rounded-xl backdrop-blur-sm"
      >
        <h4 className="mb-3 text-sm font-medium text-center text-gray-200">🚀 Quick Demo Data</h4>
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={() => {
              setFormData({
                ...formData,
                fullName: 'Demo User',
                email: 'demo@example.com',
                password: 'password123',
                confirmPassword: 'password123',
                phoneNumber: '9876543210',
                organizationName: formData?.role === 'ngo' ? 'Demo NGO Foundation' : 'Demo Funding Corp',
                city: 'Mumbai',
                state: 'Maharashtra'
              });
              setErrors({});
            }}
            disabled={loading}
            className="flex items-center justify-center p-2 text-xs transition-all duration-200 border rounded-lg bg-gradient-to-r from-purple-500/20 to-pink-500/20 border-purple-500/30 hover:from-purple-500/30 hover:to-pink-500/30 hover:border-purple-400/50 disabled:opacity-50"
          >
            <div className="flex items-center space-x-2">
              <FaCheck className="w-3 h-3 text-purple-400" />
              <span className="font-medium text-white">Auto-fill Demo Data</span>
            </div>
          </button>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-400">
            💡 Fills all required fields with sample data for quick testing
          </p>
        </div>
      </motion.div>

      {/* Full Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <label className="text-sm font-medium text-gray-200">
          Full Name *
        </label>
        <Input
          type="text"
          name="fullName"
          placeholder="Enter your full name"
          value={formData?.fullName}
          onChange={handleInputChange}
          error={errors?.fullName}
          disabled={loading}
          required
          className="text-white placeholder-gray-400 bg-white/10 border-white/20 focus:border-purple-400 focus:ring-purple-400/20"
        />
        {errors?.fullName && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-400"
          >
            {errors?.fullName}
          </motion.p>
        )}
      </motion.div>

      {/* Organization Name (for NGO/Funding org) */}
      {(formData?.role === 'ngo' || formData?.role === 'funding_organization') && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="space-y-2"
        >
          <label className="text-sm font-medium text-gray-200">
            Organization Name *
          </label>
          <Input
            type="text"
            name="organizationName"
            placeholder="Enter organization name"
            value={formData?.organizationName}
            onChange={handleInputChange}
            error={errors?.organizationName}
            disabled={loading}
            required
            className="text-white placeholder-gray-400 bg-white/10 border-white/20 focus:border-purple-400 focus:ring-purple-400/20"
          />
          {errors?.organizationName && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400"
            >
              {errors?.organizationName}
            </motion.p>
          )}
        </motion.div>
      )}

      {/* Email */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <label className="text-sm font-medium text-gray-200">
          Email Address *
        </label>
        <Input
          type="email"
          name="email"
          placeholder="Enter your email"
          value={formData?.email}
          onChange={handleInputChange}
          error={errors?.email}
          disabled={loading}
          required
          className="text-white placeholder-gray-400 bg-white/10 border-white/20 focus:border-purple-400 focus:ring-purple-400/20"
        />
        {errors?.email && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-400"
          >
            {errors?.email}
          </motion.p>
        )}
      </motion.div>

      {/* Phone Number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="space-y-2"
      >
        <label className="text-sm font-medium text-gray-200">
          Phone Number *
        </label>
        <Input
          type="tel"
          name="phoneNumber"
          placeholder="Enter your mobile number"
          value={formData?.phoneNumber}
          onChange={handleInputChange}
          error={errors?.phoneNumber}
          disabled={loading}
          required
          className="text-white placeholder-gray-400 bg-white/10 border-white/20 focus:border-purple-400 focus:ring-purple-400/20"
        />
        {errors?.phoneNumber && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-400"
          >
            {errors?.phoneNumber}
          </motion.p>
        )}
      </motion.div>

      {/* Location */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-4"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">
            City *
          </label>
          <Input
            type="text"
            name="city"
            placeholder="Enter city"
            value={formData?.city}
            onChange={handleInputChange}
            error={errors?.city}
            disabled={loading}
            required
            className="text-white placeholder-gray-400 bg-white/10 border-white/20 focus:border-purple-400 focus:ring-purple-400/20"
          />
          {errors?.city && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400"
            >
              {errors?.city}
            </motion.p>
          )}
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">
            State *
          </label>
          <Select
            name="state"
            value={formData?.state}
            onChange={handleInputChange}
            error={errors?.state}
            disabled={loading}
            options={indianStates?.map(state => ({ value: state, label: state }))}
            placeholder="Select state"
            required
            className="text-white placeholder-gray-400 bg-white/10 border-white/20 focus:border-purple-400 focus:ring-purple-400/20"
          />
          {errors?.state && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-red-400"
            >
              {errors?.state}
            </motion.p>
          )}
        </div>
      </motion.div>

      {/* Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
        className="space-y-2"
      >
        <label className="text-sm font-medium text-gray-200">
          Password *
        </label>
        <Input
          type="password"
          name="password"
          placeholder="Create a password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          disabled={loading}
          required
          className="text-white placeholder-gray-400 bg-white/10 border-white/20 focus:border-purple-400 focus:ring-purple-400/20"
        />
        {errors?.password && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-400"
          >
            {errors?.password}
          </motion.p>
        )}
      </motion.div>

      {/* Confirm Password */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="space-y-2"
      >
        <label className="text-sm font-medium text-gray-200">
          Confirm Password *
        </label>
        <Input
          type="password"
          name="confirmPassword"
          placeholder="Confirm your password"
          value={formData?.confirmPassword}
          onChange={handleInputChange}
          error={errors?.confirmPassword}
          disabled={loading}
          required
          className="text-white placeholder-gray-400 bg-white/10 border-white/20 focus:border-purple-400 focus:ring-purple-400/20"
        />
        {errors?.confirmPassword && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-red-400"
          >
            {errors?.confirmPassword}
          </motion.p>
        )}
      </motion.div>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
        className="flex space-x-3"
      >
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={loading}
          iconName="ArrowLeft"
          iconPosition="left"
          className="text-white border-white/20 hover:bg-white/10 hover:border-white/30"
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="default"
          loading={loading}
          disabled={loading}
          fullWidth
          className="font-semibold text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </motion.div>

      {/* Switch to Login */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <span className="text-sm text-gray-400">
          Already have an account?{' '}
        </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm font-medium text-purple-400 transition-colors hover:text-purple-300 hover:underline"
          disabled={loading}
        >
          Sign In
        </button>
      </motion.div>
    </motion.form>
  );
};

export default RegisterForm;