import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ConfirmationScreen = ({ donationData, onEdit, onNewDonation }) => {
  const getCategoryIcon = (category) => {
    const icons = {
      food: 'UtensilsCrossed',
      clothes: 'Shirt',
      books: 'BookOpen',
      medicines: 'Pill',
      furniture: 'Armchair',
      electronics: 'Smartphone'
    };
    return icons?.[category] || 'Package';
  };

  const getConditionColor = (condition) => {
    const colors = {
      excellent: 'text-green-600',
      good: 'text-blue-600',
      fair: 'text-yellow-600',
      poor: 'text-orange-600'
    };
    return colors?.[condition] || 'text-muted-foreground';
  };

  const formatAvailability = (availability) => {
    if (availability?.type === 'urgent') return 'Urgent pickup required';
    if (availability?.type === 'flexible') return 'Flexible timing';
    if (availability?.type === 'specific') {
      const dateCount = availability?.specificDates?.length || 0;
      return `${dateCount} specific date${dateCount !== 1 ? 's' : ''} selected`;
    }
    return 'Not specified';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      {/* Success Header */}
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto">
          <Icon name="CheckCircle" size={32} className="text-green-400" />
        </div>
        <div>
          <h1 className="text-2xl font-heading font-bold text-white mb-2">
            Donation Posted Successfully!
          </h1>
          <p className="text-gray-300 font-caption">
            Your donation is now live and visible to nearby NGOs
          </p>
        </div>
      </div>
      {/* Donation Summary Card */}
      <div className="presentation-card border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Icon 
                  name={getCategoryIcon(donationData?.category)} 
                  size={24} 
                  className="text-purple-400" 
                />
              </div>
              <div>
                <h2 className="text-lg font-heading font-semibold text-white">
                  {donationData?.title}
                </h2>
                <p className="text-sm text-gray-300 font-caption capitalize">
                  {donationData?.category}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-white">
                Donation ID
              </p>
              <p className="text-xs text-gray-300 font-mono">
                DN{Date.now()?.toString()?.slice(-6)}
              </p>
            </div>
          </div>

          {/* Photos */}
          {donationData?.photos && donationData?.photos?.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-white mb-3">Photos</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {donationData?.photos?.slice(0, 4)?.map((photo, index) => (
                  <div key={photo?.id} className="aspect-square rounded-lg overflow-hidden bg-white/10">
                    <Image
                      src={photo?.url}
                      alt={`Donation photo ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                {donationData?.photos?.length > 4 && (
                  <div className="aspect-square rounded-lg bg-white/10 flex items-center justify-center">
                    <span className="text-xs text-gray-300 font-caption">
                      +{donationData?.photos?.length - 4} more
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-white mb-1">Description</h3>
                <p className="text-sm text-gray-300 font-caption">
                  {donationData?.description}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-white mb-1">Quantity</h3>
                <p className="text-sm text-gray-300 font-caption">
                  {donationData?.quantity} item{donationData?.quantity !== 1 ? 's' : ''}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-white mb-1">Condition</h3>
                <p className={`text-sm font-caption capitalize text-white`}>
                  {donationData?.condition}
                </p>
              </div>
              
              <div>
                <h3 className="text-sm font-medium text-white mb-1">Availability</h3>
                <p className="text-sm text-gray-300 font-caption">
                  {formatAvailability(donationData?.availability)}
                </p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div>
            <h3 className="text-sm font-medium text-white mb-2">Pickup Location</h3>
            <div className="flex items-start space-x-2">
              <Icon name="MapPin" size={16} className="text-purple-400 mt-0.5" />
              <div>
                <p className="text-sm text-gray-300 font-caption">
                  {donationData?.location?.address}
                </p>
                <p className="text-xs text-gray-300 font-caption">
                  Pickup radius: {donationData?.location?.pickupRadius} km
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* What Happens Next */}
      <div className="presentation-card p-6">
        <h3 className="text-lg font-heading font-semibold text-white mb-4">
          What happens next?
        </h3>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-white font-mono font-semibold">1</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">NGO Matching</p>
              <p className="text-xs text-gray-300 font-caption">
                Nearby NGOs will be notified about your donation within 2-4 hours
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-white font-mono font-semibold">2</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Pickup Requests</p>
              <p className="text-xs text-gray-300 font-caption">
                You'll receive pickup requests from interested NGOs
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs text-white font-mono font-semibold">3</span>
            </div>
            <div>
              <p className="text-sm font-medium text-white">Impact Tracking</p>
              <p className="text-xs text-gray-300 font-caption">
                Track how your donation helps the community through our impact dashboard
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          variant="outline"
          onClick={onEdit}
          iconName="Edit"
          iconPosition="left"
          className="flex-1"
        >
          Edit Donation
        </Button>
        <Button
          variant="default"
          onClick={onNewDonation}
          iconName="Plus"
          iconPosition="left"
          className="flex-1"
        >
          Create New Donation
        </Button>
      </div>
      {/* Estimated Timeline */}
      <div className="text-center p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
        <div className="flex items-center justify-center space-x-2 mb-2">
          <Icon name="Clock" size={16} className="text-yellow-400" />
          <span className="text-sm font-medium text-yellow-400">Estimated Timeline</span>
        </div>
        <p className="text-xs text-gray-300 font-caption">
          Most donations receive their first pickup request within 24 hours
        </p>
      </div>
    </div>
  );
};

export default ConfirmationScreen;