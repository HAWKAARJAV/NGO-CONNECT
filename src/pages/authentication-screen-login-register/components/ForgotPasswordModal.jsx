import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('email'); // 'email', 'otp', 'reset'
  const [formData, setFormData] = useState({
    email: '',
    otp: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleEmailSubmit = (e) => {
    e?.preventDefault();
    if (!formData?.email?.trim()) {
      setErrors({ email: 'Email is required' });
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setStep('otp');
    }, 1500);
  };

  const handleOTPSubmit = (e) => {
    e?.preventDefault();
    if (!formData?.otp?.trim()) {
      setErrors({ otp: 'OTP is required' });
      return;
    }
    
    if (formData?.otp !== '123456') {
      setErrors({ otp: 'Invalid OTP. Use: 123456' });
      return;
    }
    
    setStep('reset');
  };

  const handlePasswordReset = (e) => {
    e?.preventDefault();
    const newErrors = {};
    
    if (!formData?.newPassword?.trim()) newErrors.newPassword = 'New password is required';
    else if (formData?.newPassword?.length < 8) newErrors.newPassword = 'Password must be at least 8 characters';
    
    if (formData?.newPassword !== formData?.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (Object.keys(newErrors)?.length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onClose();
      // Show success message
    }, 1500);
  };

  const resetModal = () => {
    setStep('email');
    setFormData({ email: '', otp: '', newPassword: '', confirmPassword: '' });
    setErrors({});
    setIsLoading(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md bg-card rounded-lg shadow-pronounced border border-border">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-heading font-bold text-foreground">
              Reset Password
            </h3>
            <button
              onClick={handleClose}
              className="p-2 text-muted-foreground hover:text-foreground transition-smooth"
            >
              <Icon name="X" size={20} />
            </button>
          </div>

          {step === 'email' && (
            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter your email address and we'll send you a code to reset your password.
                </p>
              </div>

              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData?.email}
                onChange={handleInputChange}
                error={errors?.email}
                required
              />

              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isLoading}
                iconName="Send"
                iconPosition="right"
              >
                Send Reset Code
              </Button>
            </form>
          )}

          {step === 'otp' && (
            <form onSubmit={handleOTPSubmit} className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={24} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  We've sent a verification code to {formData?.email}
                </p>
              </div>

              <Input
                label="Verification Code"
                type="text"
                name="otp"
                placeholder="Enter 6-digit code"
                value={formData?.otp}
                onChange={handleInputChange}
                error={errors?.otp}
                required
              />

              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  fullWidth
                  onClick={() => setStep('email')}
                  iconName="ArrowLeft"
                  iconPosition="left"
                >
                  Back
                </Button>
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  fullWidth
                  iconName="Check"
                  iconPosition="right"
                >
                  Verify Code
                </Button>
              </div>

              <div className="mt-4 p-3 bg-muted/50 rounded-lg border border-border">
                <p className="text-xs text-muted-foreground text-center">
                  <Icon name="Info" size={12} className="inline mr-1" />
                  Demo OTP: 123456
                </p>
              </div>
            </form>
          )}

          {step === 'reset' && (
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon name="Lock" size={24} className="text-success" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Create a new password for your account
                </p>
              </div>

              <Input
                label="New Password"
                type="password"
                name="newPassword"
                placeholder="Enter new password"
                value={formData?.newPassword}
                onChange={handleInputChange}
                error={errors?.newPassword}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                placeholder="Confirm new password"
                value={formData?.confirmPassword}
                onChange={handleInputChange}
                error={errors?.confirmPassword}
                required
              />

              <Button
                type="submit"
                variant="default"
                size="lg"
                fullWidth
                loading={isLoading}
                iconName="Check"
                iconPosition="right"
              >
                Reset Password
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;