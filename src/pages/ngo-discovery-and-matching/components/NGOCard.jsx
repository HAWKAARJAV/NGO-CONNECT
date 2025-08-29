import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';

const NGOCard = ({ ngo, onViewProfile, onDonateNow, onContact, onToggleFavorite }) => {
  const [isFavorited, setIsFavorited] = useState(ngo?.isFavorited || false);

  const handleFavoriteClick = () => {
    setIsFavorited(!isFavorited);
    onToggleFavorite(ngo?.id, !isFavorited);
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'critical': return 'text-error';
      case 'high': return 'text-warning';
      case 'medium': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getUrgencyIcon = (urgency) => {
    switch (urgency) {
      case 'critical': return 'AlertTriangle';
      case 'high': return 'Clock';
      case 'medium': return 'Info';
      default: return 'Minus';
    }
  };

  return (
    <div className="bg-card border border-border rounded-interactive shadow-subtle hover:shadow-pronounced transition-all duration-300 overflow-hidden">
      {/* Header with Image and Favorite */}
      <div className="relative">
        <div className="h-32 overflow-hidden">
          <Image
            src={ngo?.coverImage}
            alt={`${ngo?.name} cover`}
            className="w-full h-full object-cover"
          />
        </div>
        <button
          onClick={handleFavoriteClick}
          className="absolute top-3 right-3 p-2 bg-card/90 backdrop-blur-sm rounded-full hover:bg-card transition-smooth"
        >
          <Icon
            name="Heart"
            size={18}
            className={isFavorited ? 'text-error fill-current' : 'text-muted-foreground'}
          />
        </button>
        
        {/* Profile Image */}
        <div className="absolute -bottom-6 left-4">
          <div className="w-12 h-12 rounded-full border-2 border-card overflow-hidden">
            <Image
              src={ngo?.profileImage}
              alt={`${ngo?.name} profile`}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      {/* Content */}
      <div className="p-4 pt-8">
        {/* NGO Info */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h3 className="font-heading font-semibold text-foreground text-lg leading-tight">
                {ngo?.name}
              </h3>
              {ngo?.verificationStatus === 'verified' && (
                <StatusIndicator status="verified" size="sm" showText={false} />
              )}
            </div>
            <p className="text-sm text-muted-foreground font-caption mb-1">
              {ngo?.category}
            </p>
            <div className="flex items-center space-x-1 text-xs text-muted-foreground font-caption">
              <Icon name="MapPin" size={12} />
              <span>{ngo?.distance} km away</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2 font-caption">
          {ngo?.description}
        </p>

        {/* Current Needs */}
        <div className="mb-4">
          <h4 className="text-sm font-medium text-foreground mb-2 font-heading">
            Current Urgent Needs
          </h4>
          <div className="space-y-2">
            {ngo?.urgentNeeds?.slice(0, 2)?.map((need, index) => (
              <div key={index} className="flex items-center justify-between p-2 bg-muted/50 rounded-lg">
                <div className="flex items-center space-x-2">
                  <Icon
                    name={getUrgencyIcon(need?.urgency)}
                    size={14}
                    className={getUrgencyColor(need?.urgency)}
                  />
                  <span className="text-sm font-caption">{need?.item}</span>
                </div>
                <span className="text-xs text-muted-foreground font-mono">
                  {need?.quantity} needed
                </span>
              </div>
            ))}
            {ngo?.urgentNeeds?.length > 2 && (
              <p className="text-xs text-muted-foreground font-caption">
                +{ngo?.urgentNeeds?.length - 2} more needs
              </p>
            )}
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mb-4 p-2 bg-muted/30 rounded-lg">
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground font-mono">{ngo?.totalDonations}</p>
            <p className="text-xs text-muted-foreground font-caption">Donations</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground font-mono">{ngo?.peopleHelped}</p>
            <p className="text-xs text-muted-foreground font-caption">People Helped</p>
          </div>
          <div className="text-center">
            <p className="text-sm font-semibold text-foreground font-mono">{ngo?.rating}</p>
            <p className="text-xs text-muted-foreground font-caption">Rating</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onViewProfile(ngo)}
              iconName="Eye"
              iconPosition="left"
            >
              View Profile
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => onContact(ngo)}
              iconName="MessageCircle"
              iconPosition="left"
            >
              Contact
            </Button>
          </div>
          <Button
            variant="default"
            size="sm"
            fullWidth
            onClick={() => onDonateNow(ngo)}
            iconName="Heart"
            iconPosition="left"
          >
            Donate Now
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NGOCard;