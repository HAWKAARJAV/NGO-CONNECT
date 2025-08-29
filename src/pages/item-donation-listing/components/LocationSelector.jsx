import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const LocationSelector = ({ location, onLocationChange, error }) => {
  const [isDetecting, setIsDetecting] = useState(false);
  const [manualEntry, setManualEntry] = useState(false);

  const radiusOptions = [
    { value: '1', label: '1 km' },
    { value: '2', label: '2 km' },
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '15', label: '15 km' },
    { value: '25', label: '25 km' }
  ];

  const detectLocation = () => {
    setIsDetecting(true);
    
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          // Mock reverse geocoding - in real app would use Google Maps API
          const mockAddress = "123 MG Road, Bangalore, Karnataka 560001";
          onLocationChange({
            ...location,
            address: mockAddress,
            coordinates: {
              lat: position?.coords?.latitude,
              lng: position?.coords?.longitude
            },
            isDetected: true
          });
          setIsDetecting(false);
        },
        (error) => {
          console.error('Location detection failed:', error);
          setIsDetecting(false);
          // Fallback to manual entry
          setManualEntry(true);
        }
      );
    } else {
      setIsDetecting(false);
      setManualEntry(true);
    }
  };

  useEffect(() => {
    // Auto-detect location on component mount
    if (!location?.address && !manualEntry) {
      detectLocation();
    }
  }, []);

  const handleAddressChange = (value) => {
    onLocationChange({
      ...location,
      address: value,
      isDetected: false
    });
  };

  const handleRadiusChange = (value) => {
    onLocationChange({
      ...location,
      pickupRadius: value
    });
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-foreground">
        Pickup Location <span className="text-destructive">*</span>
      </label>
      {/* Current Location Display */}
      <div className="bg-muted/50 rounded-interactive p-4 border border-border">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span className="text-sm font-medium text-foreground">
                {location?.isDetected ? 'Auto-detected Location' : 'Manual Location'}
              </span>
            </div>
            
            {location?.address ? (
              <p className="text-sm text-muted-foreground font-caption">
                {location?.address}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground font-caption">
                No location set
              </p>
            )}
          </div>
          
          <button
            type="button"
            onClick={detectLocation}
            disabled={isDetecting}
            className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-smooth disabled:opacity-50"
          >
            <Icon 
              name={isDetecting ? "Loader" : "Navigation"} 
              size={14} 
              className={isDetecting ? "animate-spin" : ""}
            />
            <span>{isDetecting ? 'Detecting...' : 'Detect'}</span>
          </button>
        </div>
      </div>
      {/* Manual Address Entry */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-foreground">Manual Entry</span>
          <button
            type="button"
            onClick={() => setManualEntry(!manualEntry)}
            className="text-sm text-primary hover:text-primary/80 transition-smooth"
          >
            {manualEntry ? 'Cancel' : 'Enter Manually'}
          </button>
        </div>
        
        {manualEntry && (
          <Input
            type="text"
            placeholder="Enter your complete address"
            value={location?.address || ''}
            onChange={(e) => handleAddressChange(e?.target?.value)}
            className="w-full"
          />
        )}
      </div>
      {/* Pickup Radius */}
      <Select
        label="Pickup Radius"
        description="How far are you willing to travel for pickup?"
        options={radiusOptions}
        value={location?.pickupRadius || '5'}
        onChange={handleRadiusChange}
        placeholder="Select radius"
      />
      {/* Map Preview */}
      {location?.coordinates && (
        <div className="h-48 rounded-interactive overflow-hidden border border-border">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Pickup Location"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${location?.coordinates?.lat},${location?.coordinates?.lng}&z=14&output=embed`}
            className="w-full h-full"
          />
        </div>
      )}
      {error && (
        <p className="text-sm text-destructive font-caption">{error}</p>
      )}
    </div>
  );
};

export default LocationSelector;