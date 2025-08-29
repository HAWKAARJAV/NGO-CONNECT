import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NGOMap = ({ ngos, onNGOSelect, selectedNGO }) => {
  const [mapCenter] = useState({ lat: 28.6139, lng: 77.2090 }); // Delhi coordinates

  const handleMarkerClick = (ngo) => {
    onNGOSelect(ngo);
  };

  return (
    <div className="relative w-full h-full bg-muted rounded-interactive overflow-hidden">
      {/* Map Container */}
      <div className="w-full h-full">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title="NGO Locations Map"
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${mapCenter?.lat},${mapCenter?.lng}&z=12&output=embed`}
          className="border-0"
        />
      </div>
      {/* Map Overlay with NGO Markers Simulation */}
      <div className="absolute inset-0 pointer-events-none">
        {ngos?.slice(0, 8)?.map((ngo, index) => (
          <div
            key={ngo?.id}
            className="absolute pointer-events-auto"
            style={{
              left: `${20 + (index % 4) * 20}%`,
              top: `${20 + Math.floor(index / 4) * 30}%`
            }}
          >
            <button
              onClick={() => handleMarkerClick(ngo)}
              className={`relative p-2 rounded-full shadow-pronounced transition-all duration-200 hover:scale-110 ${
                selectedNGO?.id === ngo?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-card text-foreground hover:bg-primary hover:text-primary-foreground'
              }`}
            >
              <Icon name="MapPin" size={20} />
              
              {/* NGO Info Popup */}
              {selectedNGO?.id === ngo?.id && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 bg-card border border-border rounded-interactive shadow-pronounced p-3 z-50">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img
                        src={ngo?.profileImage}
                        alt={ngo?.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.src = '/assets/images/no_image.png';
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading font-semibold text-sm text-foreground mb-1">
                        {ngo?.name}
                      </h4>
                      <p className="text-xs text-muted-foreground font-caption mb-2">
                        {ngo?.category} • {ngo?.distance} km away
                      </p>
                      <div className="space-y-1">
                        {ngo?.urgentNeeds?.slice(0, 2)?.map((need, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-muted-foreground font-caption">{need?.item}</span>
                            <span className="text-foreground font-mono">{need?.quantity}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex space-x-1 mt-2">
                        <Button
                          variant="outline"
                          size="xs"
                          onClick={(e) => {
                            e?.stopPropagation();
                            // Handle view profile
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="default"
                          size="xs"
                          onClick={(e) => {
                            e?.stopPropagation();
                            // Handle donate
                          }}
                        >
                          Donate
                        </Button>
                      </div>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-border"></div>
                </div>
              )}
            </button>
          </div>
        ))}
      </div>
      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <Button
          variant="outline"
          size="icon"
          className="bg-card/90 backdrop-blur-sm"
          onClick={() => {
            // Handle zoom in
          }}
        >
          <Icon name="Plus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-card/90 backdrop-blur-sm"
          onClick={() => {
            // Handle zoom out
          }}
        >
          <Icon name="Minus" size={16} />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="bg-card/90 backdrop-blur-sm"
          onClick={() => {
            // Handle center map
          }}
        >
          <Icon name="Navigation" size={16} />
        </Button>
      </div>
      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm border border-border rounded-interactive p-3">
        <h4 className="text-sm font-heading font-semibold text-foreground mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full"></div>
            <span className="text-xs text-muted-foreground font-caption">Verified NGO</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-warning rounded-full"></div>
            <span className="text-xs text-muted-foreground font-caption">Pending Verification</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-error rounded-full"></div>
            <span className="text-xs text-muted-foreground font-caption">Critical Needs</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NGOMap;