import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash, FaRocket, FaHeart, FaUsers, FaBuilding } from 'react-icons/fa';
import { useAuth } from '../../../contexts/AuthContext';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const LoginForm = ({ onSwitchToRegister }) => {
  const navigate = useNavigate();
  const { signIn, ensureUserReady } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setErrors({});

    try {
      const { data, error } = await signIn(formData?.email, formData?.password);
      
      if (error) {
        if (error?.message?.includes('Invalid login credentials')) {
          setErrors({ 
            general: 'Invalid login credentials. If you just registered, please check your email and verify your account first.' 
          });
        } else {
          setErrors({ 
            general: error?.message || 'Login failed' 
          });
        }
        return;
      }

      // Check if login was successful
      if (data?.user) {
        console.log('Login successful, ensuring user profile is ready...');
        
        // Wait for user profile to be fully loaded
        const isReady = await ensureUserReady();
        
        if (isReady) {
          console.log('User ready, navigating to dashboard...');
          navigate('/dashboard', { replace: true });
        } else {
          console.log('User profile not ready, redirecting with delay...');
          // Fallback: navigate after a longer delay
          setTimeout(() => {
            navigate('/dashboard', { replace: true });
          }, 500);
        }
      } else {
        setErrors({ 
          general: 'Login failed. Please try again.' 
        });
      }
      
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ 
        general: 'An unexpected error occurred. Please try again.' 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
      onSubmit={handleSubmit}
    >
      {errors?.general && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 text-sm text-red-300 border bg-red-500/20 border-red-500/30 rounded-xl backdrop-blur-sm"
        >
          {errors?.general}
        </motion.div>
      )}

      {/* Email Field */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
          <FaEnvelope className="w-4 h-4 text-purple-400" />
          Email Address
        </label>
        <div className="relative">
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
        </div>
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

      {/* Password Field */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="space-y-2"
      >
        <label className="flex items-center gap-2 text-sm font-medium text-gray-200">
          <FaLock className="w-4 h-4 text-purple-400" />
          Password
        </label>
        <div className="relative">
          <Input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Enter your password"
            value={formData?.password}
            onChange={handleInputChange}
            error={errors?.password}
            disabled={loading}
            required
            className="pr-12 text-white placeholder-gray-400 bg-white/10 border-white/20 focus:border-purple-400 focus:ring-purple-400/20"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute text-gray-400 transition-colors transform -translate-y-1/2 right-3 top-1/2 hover:text-white"
          >
            {showPassword ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
          </button>
        </div>
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

      {/* Forgot Password Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex items-center justify-between"
      >
        <button
          type="button"
          className="text-sm text-purple-400 transition-colors hover:text-purple-300 hover:underline"
          disabled={loading}
        >
          Forgot Password?
        </button>
      </motion.div>

      {/* Submit Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Button
          type="submit"
          variant="default"
          fullWidth
          loading={loading}
          disabled={loading}
          className="py-3 font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl hover:shadow-xl hover:scale-105"
        >
          {loading ? (
            <div className="flex items-center gap-2">
              <FaRocket className="w-4 h-4 animate-bounce" />
              Signing In...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FaRocket className="w-4 h-4" />
              Sign In
            </div>
          )}
        </Button>
      </motion.div>

      {/* Switch to Register */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-center"
      >
        <span className="text-sm text-gray-400">
          Don't have an account?{' '}
        </span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-sm font-medium text-purple-400 transition-colors hover:text-purple-300 hover:underline"
          disabled={loading}
        >
          Create Account
        </button>
      </motion.div>

      {/* Demo Credentials with Auto-fill */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="p-4 border bg-white/5 border-white/10 rounded-xl backdrop-blur-sm"
      >
        <h4 className="mb-3 text-sm font-medium text-center text-gray-200">🚀 Quick Demo Access</h4>
        <div className="grid grid-cols-1 gap-2">
          <button
            type="button"
            onClick={() => {
              setFormData({
                email: 'donor@example.com',
                password: 'password123'
              });
              setErrors({});
            }}
            disabled={loading}
            className="flex items-center justify-between p-2 text-xs transition-all duration-200 border rounded-lg bg-gradient-to-r from-red-500/20 to-pink-500/20 border-red-500/30 hover:from-red-500/30 hover:to-pink-500/30 hover:border-red-400/50 disabled:opacity-50"
          >
            <div className="flex items-center space-x-2">
              <FaHeart className="w-3 h-3 text-red-400" />
              <span className="font-medium text-white">Donor Login</span>
            </div>
            <span className="text-gray-300">Auto-fill →</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setFormData({
                email: 'ngo@example.com',
                password: 'password123'
              });
              setErrors({});
            }}
            disabled={loading}
            className="flex items-center justify-between p-2 text-xs transition-all duration-200 border rounded-lg bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border-blue-500/30 hover:from-blue-500/30 hover:to-cyan-500/30 hover:border-blue-400/50 disabled:opacity-50"
          >
            <div className="flex items-center space-x-2">
              <FaUsers className="w-3 h-3 text-blue-400" />
              <span className="font-medium text-white">NGO Login</span>
            </div>
            <span className="text-gray-300">Auto-fill →</span>
          </button>
          
          <button
            type="button"
            onClick={() => {
              setFormData({
                email: 'funding@example.com',
                password: 'password123'
              });
              setErrors({});
            }}
            disabled={loading}
            className="flex items-center justify-between p-2 text-xs transition-all duration-200 border rounded-lg bg-gradient-to-r from-green-500/20 to-emerald-500/20 border-green-500/30 hover:from-green-500/30 hover:to-emerald-500/30 hover:border-green-400/50 disabled:opacity-50"
          >
            <div className="flex items-center space-x-2">
              <FaBuilding className="w-3 h-3 text-green-400" />
              <span className="font-medium text-white">Funding Org Login</span>
            </div>
            <span className="text-gray-300">Auto-fill →</span>
          </button>
        </div>
        
        <div className="mt-3 text-center">
          <p className="text-xs text-gray-400">
            💡 Click any button above to auto-fill login credentials
          </p>
        </div>
      </motion.div>
    </motion.form>
  );
};

export default LoginForm;