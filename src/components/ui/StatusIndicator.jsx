import React from 'react';
import Icon from '../AppIcon';

const StatusIndicator = ({ 
  status, 
  type = 'default', 
  size = 'default', 
  showIcon = true, 
  showText = true,
  className = '' 
}) => {
  const statusConfig = {
    // Verification Status
    verified: {
      color: 'success',
      icon: 'CheckCircle',
      text: 'Verified',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      borderColor: 'border-success/20'
    },
    pending: {
      color: 'warning',
      icon: 'Clock',
      text: 'Pending Verification',
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      borderColor: 'border-warning/20'
    },
    rejected: {
      color: 'error',
      icon: 'XCircle',
      text: 'Verification Failed',
      bgColor: 'bg-error/10',
      textColor: 'text-error',
      borderColor: 'border-error/20'
    },
    
    // Donation Status
    active: {
      color: 'success',
      icon: 'CheckCircle',
      text: 'Active',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      borderColor: 'border-success/20'
    },
    completed: {
      color: 'primary',
      icon: 'Check',
      text: 'Completed',
      bgColor: 'bg-primary/10',
      textColor: 'text-primary',
      borderColor: 'border-primary/20'
    },
    cancelled: {
      color: 'error',
      icon: 'X',
      text: 'Cancelled',
      bgColor: 'bg-error/10',
      textColor: 'text-error',
      borderColor: 'border-error/20'
    },
    
    // Progress Status
    'in-progress': {
      color: 'accent',
      icon: 'Loader',
      text: 'In Progress',
      bgColor: 'bg-accent/10',
      textColor: 'text-accent',
      borderColor: 'border-accent/20'
    },
    draft: {
      color: 'muted',
      icon: 'Edit',
      text: 'Draft',
      bgColor: 'bg-muted',
      textColor: 'text-muted-foreground',
      borderColor: 'border-muted'
    },
    
    // Impact Status
    'high-impact': {
      color: 'success',
      icon: 'TrendingUp',
      text: 'High Impact',
      bgColor: 'bg-success/10',
      textColor: 'text-success',
      borderColor: 'border-success/20'
    },
    'medium-impact': {
      color: 'warning',
      icon: 'Minus',
      text: 'Medium Impact',
      bgColor: 'bg-warning/10',
      textColor: 'text-warning',
      borderColor: 'border-warning/20'
    },
    'low-impact': {
      color: 'muted',
      icon: 'TrendingDown',
      text: 'Low Impact',
      bgColor: 'bg-muted',
      textColor: 'text-muted-foreground',
      borderColor: 'border-muted'
    }
  };

  const sizeConfig = {
    sm: {
      padding: 'px-2 py-1',
      text: 'text-xs',
      icon: 12
    },
    default: {
      padding: 'px-3 py-1.5',
      text: 'text-sm',
      icon: 14
    },
    lg: {
      padding: 'px-4 py-2',
      text: 'text-base',
      icon: 16
    }
  };

  const config = statusConfig?.[status] || statusConfig?.draft;
  const sizeStyles = sizeConfig?.[size];

  const baseClasses = `
    inline-flex items-center space-x-1.5 rounded-full border font-medium font-caption transition-smooth
    ${config?.bgColor} ${config?.textColor} ${config?.borderColor}
    ${sizeStyles?.padding} ${sizeStyles?.text}
    ${className}
  `;

  return (
    <span className={baseClasses}>
      {showIcon && (
        <Icon 
          name={config?.icon} 
          size={sizeStyles?.icon} 
          className={status === 'in-progress' ? 'animate-spin' : ''}
        />
      )}
      {showText && <span>{config?.text}</span>}
    </span>
  );
};

// Progress Ring Component for donation/impact progress
const ProgressRing = ({ 
  progress = 0, 
  size = 'default', 
  showPercentage = true, 
  color = 'primary',
  className = '' 
}) => {
  const sizeConfig = {
    sm: { width: 40, height: 40, strokeWidth: 3, fontSize: 'text-xs' },
    default: { width: 60, height: 60, strokeWidth: 4, fontSize: 'text-sm' },
    lg: { width: 80, height: 80, strokeWidth: 5, fontSize: 'text-base' }
  };

  const colorConfig = {
    primary: 'stroke-primary',
    success: 'stroke-success',
    warning: 'stroke-warning',
    accent: 'stroke-accent'
  };

  const { width, height, strokeWidth, fontSize } = sizeConfig?.[size];
  const radius = (width - strokeWidth * 2) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDasharray = circumference;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <svg width={width} height={height} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          className="text-muted opacity-20"
        />
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={height / 2}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          className={`${colorConfig?.[color]} transition-all duration-300 ease-in-out`}
        />
      </svg>
      {showPercentage && (
        <span className={`absolute inset-0 flex items-center justify-center font-mono font-semibold ${fontSize}`}>
          {Math.round(progress)}%
        </span>
      )}
    </div>
  );
};

// Badge Component for counts and notifications
const Badge = ({ 
  count, 
  variant = 'default', 
  size = 'default',
  className = '' 
}) => {
  const variantConfig = {
    default: 'bg-primary text-primary-foreground',
    success: 'bg-success text-success-foreground',
    warning: 'bg-warning text-warning-foreground',
    error: 'bg-error text-error-foreground',
    accent: 'bg-accent text-accent-foreground'
  };

  const sizeConfig = {
    sm: 'text-xs px-1.5 py-0.5 min-w-[16px] h-4',
    default: 'text-xs px-2 py-1 min-w-[20px] h-5',
    lg: 'text-sm px-2.5 py-1 min-w-[24px] h-6'
  };

  if (!count || count === 0) return null;

  return (
    <span className={`
      inline-flex items-center justify-center rounded-full font-mono font-semibold
      ${variantConfig?.[variant]} ${sizeConfig?.[size]} ${className}
    `}>
      {count > 99 ? '99+' : count}
    </span>
  );
};

export default StatusIndicator;
export { ProgressRing, Badge };