import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

import { useAuth } from '../../../contexts/AuthContext';

const LoginForm = ({ onForgotPassword, onSwitchToRegister }) => {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
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
        setErrors({ 
          general: error?.message || 'Invalid email or password' 
        });
        return;
      }

      if (data?.user) {
        // Navigate based on user role from user metadata
        const userRole = data?.user?.user_metadata?.role || 'donor';
        const routes = {
          donor: '/donor-dashboard',
          ngo: '/ngo-dashboard-post-verification',
          funding_organization: '/donor-dashboard', // Can be updated when funding org dashboard exists
          admin: '/donor-dashboard'
        };
        navigate(routes?.[userRole] || '/donor-dashboard');
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
    <form onSubmit={handleSubmit} className="space-y-6">
      {errors?.general && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive">
          {errors?.general}
        </div>
      )}

      {/* Email Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Email Address
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
        />
      </div>

      {/* Password Field */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
          Password
        </label>
        <Input
          type="password"
          name="password"
          placeholder="Enter your password"
          value={formData?.password}
          onChange={handleInputChange}
          error={errors?.password}
          disabled={loading}
          required
        />
      </div>

      {/* Forgot Password Link */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary/80 transition-smooth"
          disabled={loading}
        >
          Forgot Password?
        </button>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        fullWidth
        loading={loading}
        disabled={loading}
      >
        {loading ? 'Signing In...' : 'Sign In'}
      </Button>

      {/* Switch to Register */}
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Don't have an account?{' '}
        </span>
        <button
          type="button"
          onClick={onSwitchToRegister}
          className="text-sm text-primary hover:text-primary/80 transition-smooth font-medium"
          disabled={loading}
        >
          Create Account
        </button>
      </div>

      {/* Demo Credentials */}
      <div className="bg-muted/50 border border-border rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-2">Demo Credentials</h4>
        <div className="space-y-2 text-xs text-muted-foreground">
          <div>
            <strong>Donor:</strong> donor@example.com / password123
          </div>
          <div>
            <strong>NGO:</strong> ngo@example.com / password123
          </div>
          <div>
            <strong>Funding Org:</strong> funding@example.com / password123
          </div>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;