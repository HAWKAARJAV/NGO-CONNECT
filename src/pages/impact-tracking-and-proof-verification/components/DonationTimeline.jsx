import React from 'react';
import Icon from '../../../components/AppIcon';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const DonationTimeline = ({ donations, selectedDonation, onSelectDonation }) => {
  const getStatusIcon = (status) => {
    switch (status) {
      case 'received': return 'Package';
      case 'in-use': return 'Activity';
      case 'impact-documented': return 'CheckCircle';
      default: return 'Clock';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'received': return 'text-warning';
      case 'in-use': return 'text-accent';
      case 'impact-documented': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">Donation Timeline</h3>
        <p className="text-sm text-muted-foreground font-caption">Track your donations and their impact</p>
      </div>
      <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
        {donations?.map((donation) => (
          <div
            key={donation?.id}
            onClick={() => onSelectDonation(donation)}
            className={`p-4 rounded-lg border cursor-pointer transition-smooth hover:shadow-subtle ${
              selectedDonation?.id === donation?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getStatusColor(donation?.status)}`}>
                  <Icon name={getStatusIcon(donation?.status)} size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{donation?.itemName}</h4>
                  <p className="text-sm text-muted-foreground font-caption">
                    To: {donation?.ngoName}
                  </p>
                </div>
              </div>
              <StatusIndicator status={donation?.status} size="sm" />
            </div>
            
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground font-caption">
                Donated: {donation?.donationDate}
              </span>
              {donation?.proofDeadline && (
                <span className="text-warning font-caption">
                  Proof due: {donation?.proofDeadline}
                </span>
              )}
            </div>
            
            {donation?.status === 'impact-documented' && donation?.impactScore && (
              <div className="mt-2 flex items-center space-x-2">
                <Icon name="TrendingUp" size={16} className="text-success" />
                <span className="text-sm text-success font-medium">
                  Impact Score: {donation?.impactScore}/100
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DonationTimeline;