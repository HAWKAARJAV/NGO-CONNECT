import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const MapWidget = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Mock coordinates for demonstration (Mumbai area)
  const mockLat = 19.0760;
  const mockLng = 72.8777;

  const ngoLocations = [
    { id: 1, name: 'Green Earth Foundation', lat: 19.0760, lng: 72.8777, urgentNeeds: 3 },
    { id: 2, name: 'Education First NGO', lat: 19.0820, lng: 72.8850, urgentNeeds: 5 },
    { id: 3, name: 'Hope Medical Center', lat: 19.0700, lng: 72.8700, urgentNeeds: 8 },
    { id: 4, name: 'Animal Welfare Society', lat: 19.0900, lng: 72.8900, urgentNeeds: 2 }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Map" size={20} className="text-primary" />
            <h2 className="text-lg font-heading font-semibold text-foreground">Local NGO Map</h2>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName={isExpanded ? "Minimize2" : "Maximize2"}
            onClick={() => setIsExpanded(!isExpanded)}
          />
        </div>
      </div>
      <div className={`relative ${isExpanded ? 'h-96' : 'h-48'} transition-all duration-300`}>
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="NGO Locations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mockLat},${mockLng}&z=14&output=embed`}
          className="rounded-b-lg"
        />
        
        {/* Map Overlay with NGO Markers */}
        <div className="absolute top-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-3 shadow-subtle">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="MapPin" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">
              {ngoLocations?.length} NGOs nearby
            </span>
          </div>
          <div className="space-y-1">
            {ngoLocations?.slice(0, 3)?.map((ngo) => (
              <div key={ngo?.id} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-caption truncate max-w-32">
                  {ngo?.name}
                </span>
                <span className="bg-accent/10 text-accent px-1.5 py-0.5 rounded-full font-mono">
                  {ngo?.urgentNeeds}
                </span>
              </div>
            ))}
            {ngoLocations?.length > 3 && (
              <div className="text-xs text-muted-foreground font-caption">
                +{ngoLocations?.length - 3} more locations
              </div>
            )}
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <Button
            variant="outline"
            size="icon"
            className="bg-card/90 backdrop-blur-sm"
            onClick={() => {/* Handle location refresh */}}
          >
            <Icon name="RotateCcw" size={16} />
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="bg-card/90 backdrop-blur-sm"
            onClick={() => {/* Handle current location */}}
          >
            <Icon name="Navigation" size={16} />
          </Button>
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-lg p-2 shadow-subtle">
          <div className="flex items-center space-x-4 text-xs">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-primary rounded-full"></div>
              <span className="text-muted-foreground font-caption">Verified NGOs</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-accent rounded-full"></div>
              <span className="text-muted-foreground font-caption">Urgent Needs</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapWidget;