import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';


import RoleSelectionCard from './RoleSelectionCard';

import { useAuth } from '../../../contexts/AuthContext';

const RegisterForm = ({ onSwitchToLogin }) => {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1); // 1: Role, 2: Details
  const [formData, setFormData] = useState({
    role: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    organizationName: '', // For NGO/Funding org
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
      icon: 'Heart',
      features: [
        'Donate items & funds',
        'Track donation impact',
        'Discover nearby NGOs',
        'Get tax receipts'
      ]
    },
    {
      id: 'ngo',
      title: 'NGO',
      description: 'I represent an NGO looking for donations',
      icon: 'Users',
      features: [
        'Post specific needs',
        'Receive donations',
        'Upload impact proofs',
        'Manage beneficiaries'
      ]
    },
    {
      id: 'funding_organization',
      title: 'Funding Organization',
      description: 'I represent a corporate or foundation',
      icon: 'Building',
      features: [
        'Fund multiple NGOs',
        'CSR compliance',
        'Impact reporting',
        'Partnership opportunities'
      ]
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
    
    // Clear error when user starts typing
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
    
    // Organization name required for NGO and funding organizations
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

      // Registration successful - show success message
      alert('Registration successful! Please check your email to verify your account, then sign in.');
      onSwitchToLogin();
      
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
      <div className="space-y-6">
        <div className="text-center mb-6">
          <h2 className="text-xl font-heading font-semibold text-foreground mb-2">
            Choose Your Role
          </h2>
          <p className="text-sm text-muted-foreground">
            Select how you would like to use DonateConnect
          </p>
        </div>

        {errors?.general && (
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive">
            {errors?.general}
          </div>
        )}

        <div className="space-y-4">
          {roles?.map((role) => (
            <RoleSelectionCard
              key={role?.id}
              role={role}
              isSelected={formData?.role === role?.id}
              onSelect={handleRoleSelect}
            />
          ))}
        </div>

        {errors?.role && (
          <p className="text-sm text-destructive">{errors?.role}</p>
        )}

        <div className="flex space-x-3">
          <Button
            type="button"
            variant="outline"
            onClick={onSwitchToLogin}
            disabled={loading}
            fullWidth
          >
            Back to Login
          </Button>
          <Button
            type="button"
            variant="default"
            onClick={handleNext}
            disabled={!formData?.role || loading}
            fullWidth
          >
            Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-heading font-semibold text-foreground">
          Create Account
        </h2>
        <div className="text-sm text-muted-foreground">
          Step 2 of 2
        </div>
      </div>

      {errors?.general && (
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 text-sm text-destructive">
          {errors?.general}
        </div>
      )}

      {/* Full Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
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
        />
      </div>

      {/* Organization Name (for NGO/Funding org) */}
      {(formData?.role === 'ngo' || formData?.role === 'funding_organization') && (
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
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
          />
        </div>
      )}

      {/* Email */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
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
        />
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
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
        />
      </div>

      {/* Location */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
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
          />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
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
          />
        </div>
      </div>

      {/* Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
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
        />
      </div>

      {/* Confirm Password */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">
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
        />
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleBack}
          disabled={loading}
          iconName="ArrowLeft"
          iconPosition="left"
        >
          Back
        </Button>
        <Button
          type="submit"
          variant="default"
          loading={loading}
          disabled={loading}
          fullWidth
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>

      {/* Switch to Login */}
      <div className="text-center">
        <span className="text-sm text-muted-foreground">
          Already have an account?{' '}
        </span>
        <button
          type="button"
          onClick={onSwitchToLogin}
          className="text-sm text-primary hover:text-primary/80 transition-smooth font-medium"
          disabled={loading}
        >
          Sign In
        </button>
      </div>
    </form>
  );
};

export default RegisterForm;