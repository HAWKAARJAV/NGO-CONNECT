import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const NGOProfileModal = ({ ngo, isOpen, onClose, onDonate, onContact }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !ngo) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'needs', label: 'Current Needs', icon: 'Heart' },
    { id: 'impact', label: 'Impact Stories', icon: 'TrendingUp' },
    { id: 'verification', label: 'Verification', icon: 'Shield' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-3">About</h3>
              <p className="text-muted-foreground font-caption leading-relaxed">
                {ngo?.fullDescription}
              </p>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-3">Contact Information</h3>
              <div className="space-y-2">
                <div className="flex items-center space-x-3">
                  <Icon name="Mail" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-caption">{ngo?.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Phone" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-caption">{ngo?.phone}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="MapPin" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-caption">{ngo?.address}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Icon name="Globe" size={16} className="text-muted-foreground" />
                  <a href={ngo?.website} className="text-sm text-primary hover:underline font-caption">
                    {ngo?.website}
                  </a>
                </div>
              </div>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-3">Statistics</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary font-mono">{ngo?.totalDonations}</p>
                  <p className="text-sm text-muted-foreground font-caption">Total Donations</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-success font-mono">{ngo?.peopleHelped}</p>
                  <p className="text-sm text-muted-foreground font-caption">People Helped</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-accent font-mono">{ngo?.yearsActive}</p>
                  <p className="text-sm text-muted-foreground font-caption">Years Active</p>
                </div>
                <div className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-warning font-mono">{ngo?.rating}</p>
                  <p className="text-sm text-muted-foreground font-caption">Rating</p>
                </div>
              </div>
            </div>
          </div>
        );

      case 'needs':
        return (
          <div className="space-y-4">
            <h3 className="font-heading font-semibold text-foreground">Current Needs & Wishlist</h3>
            <div className="space-y-3">
              {ngo?.allNeeds?.map((need, index) => (
                <div key={index} className="border border-border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <Icon
                        name={need?.urgency === 'critical' ? 'AlertTriangle' : need?.urgency === 'high' ? 'Clock' : 'Info'}
                        size={16}
                        className={
                          need?.urgency === 'critical' ? 'text-error' :
                          need?.urgency === 'high' ? 'text-warning' : 'text-accent'
                        }
                      />
                      <h4 className="font-medium text-foreground font-heading">{need?.item}</h4>
                    </div>
                    <StatusIndicator 
                      status={need?.urgency === 'critical' ? 'error' : need?.urgency === 'high' ? 'warning' : 'accent'} 
                      size="sm" 
                    />
                  </div>
                  <p className="text-sm text-muted-foreground mb-2 font-caption">{need?.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-caption">
                      <span className="font-semibold text-foreground">{need?.quantityNeeded}</span> needed
                      {need?.quantityReceived > 0 && (
                        <span className="text-muted-foreground"> • {need?.quantityReceived} received</span>
                      )}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDonate(ngo, need)}
                      iconName="Heart"
                      iconPosition="left"
                    >
                      Donate This
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'impact':
        return (
          <div className="space-y-6">
            <h3 className="font-heading font-semibold text-foreground">Impact Stories</h3>
            <div className="space-y-4">
              {ngo?.impactStories?.map((story, index) => (
                <div key={index} className="border border-border rounded-lg overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <Image
                      src={story?.image}
                      alt={story?.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-heading font-semibold text-foreground mb-2">{story?.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3 font-caption">{story?.description}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground font-caption">
                      <span>{story?.date}</span>
                      <span>{story?.beneficiaries} people helped</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'verification':
        return (
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <StatusIndicator status={ngo?.verificationStatus} />
              <span className="text-sm text-muted-foreground font-caption">
                Verified on {ngo?.verificationDate}
              </span>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-3">Verification Documents</h3>
              <div className="space-y-3">
                {ngo?.verificationDocuments?.map((doc, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Icon name="FileText" size={16} className="text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium text-foreground font-caption">{doc?.name}</p>
                        <p className="text-xs text-muted-foreground font-caption">{doc?.type}</p>
                      </div>
                    </div>
                    <StatusIndicator status="verified" size="sm" />
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-3">Certifications</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ngo?.certifications?.map((cert, index) => (
                  <div key={index} className="p-3 border border-border rounded-lg">
                    <h4 className="font-medium text-foreground font-heading">{cert?.name}</h4>
                    <p className="text-sm text-muted-foreground font-caption">{cert?.issuer}</p>
                    <p className="text-xs text-muted-foreground font-caption">Valid until {cert?.validUntil}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-interactive shadow-pronounced w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="relative">
          <div className="h-32 overflow-hidden">
            <Image
              src={ngo?.coverImage}
              alt={`${ngo?.name} cover`}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-smooth"
          >
            <Icon name="X" size={20} />
          </button>
          
          <div className="absolute -bottom-6 left-6">
            <div className="w-16 h-16 rounded-full border-4 border-card overflow-hidden">
              <Image
                src={ngo?.profileImage}
                alt={`${ngo?.name} profile`}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* NGO Info */}
        <div className="p-6 pt-10 border-b border-border">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h2 className="text-2xl font-heading font-bold text-foreground">{ngo?.name}</h2>
                {ngo?.verificationStatus === 'verified' && (
                  <StatusIndicator status="verified" />
                )}
              </div>
              <p className="text-muted-foreground font-caption mb-2">{ngo?.category}</p>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground font-caption">
                <span className="flex items-center space-x-1">
                  <Icon name="MapPin" size={14} />
                  <span>{ngo?.distance} km away</span>
                </span>
                <span className="flex items-center space-x-1">
                  <Icon name="Star" size={14} />
                  <span>{ngo?.rating} rating</span>
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => onContact(ngo)}
                iconName="MessageCircle"
                iconPosition="left"
              >
                Contact
              </Button>
              <Button
                variant="default"
                onClick={() => onDonate(ngo)}
                iconName="Heart"
                iconPosition="left"
              >
                Donate Now
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex space-x-1 bg-muted/50 rounded-lg p-1">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-smooth ${
                  activeTab === tab?.id
                    ? 'bg-card text-foreground shadow-subtle'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="font-caption">{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-96">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default NGOProfileModal;