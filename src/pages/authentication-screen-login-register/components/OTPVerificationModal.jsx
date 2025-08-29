import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OTPVerificationModal = ({ isOpen, onClose, onVerified, email, phone }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  const correctOTP = '123456'; // Mock OTP

  useEffect(() => {
    if (isOpen && resendTimer > 0) {
      const timer = setTimeout(() => {
        setResendTimer(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (resendTimer === 0) {
      setCanResend(true);
    }
  }, [isOpen, resendTimer]);

  const handleOTPChange = (index, value) => {
    if (value?.length > 1) return;
    
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput?.focus();
    }
    
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleKeyDown = (index, e) => {
    if (e?.key === 'Backspace' && !otp?.[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput?.focus();
    }
  };

  const handleVerify = () => {
    const enteredOTP = otp?.join('');
    
    if (enteredOTP?.length !== 6) {
      setError('Please enter complete OTP');
      return;
    }
    
    setIsLoading(true);
    
    setTimeout(() => {
      if (enteredOTP === correctOTP) {
        onVerified();
      } else {
        setError('Invalid OTP. Please try again. (Use: 123456)');
      }
      setIsLoading(false);
    }, 1500);
  };

  const handleResend = () => {
    setResendTimer(30);
    setCanResend(false);
    setError('');
    setOtp(['', '', '', '', '', '']);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="w-full max-w-md bg-card rounded-lg shadow-pronounced border border-border">
        <div className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="Smartphone" size={24} className="text-primary" />
            </div>
            <h3 className="text-xl font-heading font-bold text-foreground mb-2">
              Verify Your Account
            </h3>
            <p className="text-sm text-muted-foreground">
              We've sent a verification code to
            </p>
            <p className="text-sm font-medium text-foreground">
              {email} and {phone}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-error/10 border border-error/20 rounded-lg">
              <div className="flex items-start space-x-2">
                <Icon name="AlertCircle" size={16} className="text-error mt-0.5 flex-shrink-0" />
                <p className="text-sm text-error">{error}</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-foreground mb-3">
              Enter 6-digit code
            </label>
            <div className="flex space-x-2 justify-center">
              {otp?.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  maxLength="1"
                  value={digit}
                  onChange={(e) => handleOTPChange(index, e?.target?.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="w-12 h-12 text-center text-lg font-mono font-semibold border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-smooth"
                />
              ))}
            </div>
          </div>

          <Button
            onClick={handleVerify}
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            iconName="Check"
            iconPosition="right"
          >
            Verify Account
          </Button>

          <div className="mt-4 text-center">
            {canResend ? (
              <button
                onClick={handleResend}
                className="text-sm text-primary hover:text-primary/80 font-medium transition-smooth"
              >
                Resend Code
              </button>
            ) : (
              <p className="text-sm text-muted-foreground">
                Resend code in {resendTimer}s
              </p>
            )}
          </div>

          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>

          {/* Mock OTP Helper */}
          <div className="mt-6 p-3 bg-muted/50 rounded-lg border border-border">
            <p className="text-xs text-muted-foreground text-center">
              <Icon name="Info" size={12} className="inline mr-1" />
              Demo OTP: 123456
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OTPVerificationModal;