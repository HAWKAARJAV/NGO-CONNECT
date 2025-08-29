import React from 'react';
import Icon from '../../../components/AppIcon';


const RoleSelectionCard = ({ role, isSelected, onSelect, className = '' }) => {
  const roleConfig = {
    donor: {
      title: 'Individual Donor',
      description: 'Donate items and funds to verified NGOs in your area',
      icon: 'Heart',
      features: ['Donate items & funds', 'Track impact', 'Find nearby NGOs', 'Earn badges']
    },
    ngo: {
      title: 'NGO Organization',
      description: 'Receive donations and manage your organization profile',
      icon: 'Building',
      features: ['Receive donations', 'Post needs', 'Upload proof', 'Manage profile']
    },
    funding: {
      title: 'Funding Organization',
      description: 'Create contests and fund NGO initiatives',
      icon: 'Briefcase',
      features: ['Fund initiatives', 'Create contests', 'CSR reports', 'Browse NGOs']
    }
  };

  const config = roleConfig?.[role];

  return (
    <div
      className={`
        relative p-6 border-2 rounded-lg cursor-pointer transition-all duration-200
        ${isSelected 
          ? 'border-primary bg-primary/5 shadow-lg' 
          : 'border-border bg-card hover:border-primary/50 hover:shadow-md'
        }
        ${className}
      `}
      onClick={() => onSelect(role)}
    >
      {isSelected && (
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
          <Icon name="Check" size={14} color="white" />
        </div>
      )}
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`
          w-16 h-16 rounded-full flex items-center justify-center
          ${isSelected ? 'bg-primary text-white' : 'bg-muted text-muted-foreground'}
        `}>
          <Icon name={config?.icon} size={28} />
        </div>
        
        <div>
          <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
            {config?.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {config?.description}
          </p>
        </div>
        
        <div className="space-y-2 w-full">
          {config?.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 text-sm">
              <Icon name="Check" size={14} className="text-success flex-shrink-0" />
              <span className="text-muted-foreground">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RoleSelectionCard;