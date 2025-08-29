import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      title: 'Donate Items',
      description: 'List items you want to donate',
      icon: 'Gift',
      variant: 'default',
      path: '/item-donation-listing'
    },
    {
      title: 'Find NGOs',
      description: 'Discover verified NGOs near you',
      icon: 'Search',
      variant: 'outline',
      path: '/ngo-discovery-and-matching'
    },
    {
      title: 'Track Impact',
      description: 'See how your donations helped',
      icon: 'BarChart3',
      variant: 'secondary',
      path: '/impact-tracking-and-proof-verification'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-subtle">
      <h2 className="text-lg font-heading font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {actions?.map((action) => (
          <Button
            key={action?.path}
            variant={action?.variant}
            iconName={action?.icon}
            iconPosition="left"
            fullWidth
            onClick={() => navigate(action?.path)}
            className="h-auto p-4 flex-col items-start text-left"
          >
            <div className="flex items-center space-x-2 mb-2">
              <span className="font-medium">{action?.title}</span>
            </div>
            <span className="text-xs text-muted-foreground font-caption">
              {action?.description}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;