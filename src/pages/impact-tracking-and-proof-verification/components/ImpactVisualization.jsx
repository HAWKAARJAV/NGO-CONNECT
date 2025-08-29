import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import { ProgressRing } from '../../../components/ui/StatusIndicator';
import Button from '../../../components/ui/Button';


const ImpactVisualization = ({ donation }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showComparison, setShowComparison] = useState(false);

  if (!donation || !donation?.proofData) {
    return (
      <div className="bg-card rounded-lg border border-border shadow-subtle p-8 text-center">
        <Icon name="ImageOff" size={48} className="text-muted-foreground mx-auto mb-4" />
        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
          No Impact Data Available
        </h3>
        <p className="text-muted-foreground font-caption">
          Select a donation with submitted proof to view impact visualization
        </p>
      </div>
    );
  }

  const { proofData } = donation;
  const beforeImages = proofData?.beforeImages || [];
  const afterImages = proofData?.afterImages || [];
  const allImages = [...beforeImages, ...afterImages];

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              Impact Visualization
            </h3>
            <p className="text-sm text-muted-foreground font-caption">
              {donation?.itemName} - {donation?.ngoName}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <ProgressRing 
              progress={donation?.impactScore || 0} 
              size="sm" 
              color="success"
            />
            <span className="text-sm font-medium text-foreground">
              Impact Score
            </span>
          </div>
        </div>
      </div>
      <div className="p-4 space-y-6">
        {/* Image Gallery */}
        {allImages?.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-foreground">Proof Images</h4>
              {beforeImages?.length > 0 && afterImages?.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowComparison(!showComparison)}
                  iconName={showComparison ? "Eye" : "GitCompare"}
                  iconPosition="left"
                >
                  {showComparison ? 'Gallery View' : 'Compare'}
                </Button>
              )}
            </div>

            {showComparison && beforeImages?.length > 0 && afterImages?.length > 0 ? (
              /* Before/After Comparison */
              (<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-2">Before</h5>
                  <div className="aspect-video rounded-lg overflow-hidden border border-border">
                    <Image
                      src={beforeImages?.[0]}
                      alt="Before donation impact"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
                <div>
                  <h5 className="text-sm font-medium text-foreground mb-2">After</h5>
                  <div className="aspect-video rounded-lg overflow-hidden border border-border">
                    <Image
                      src={afterImages?.[0]}
                      alt="After donation impact"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>)
            ) : (
              /* Regular Gallery */
              (<div>
                <div className="aspect-video rounded-lg overflow-hidden border border-border mb-3">
                  <Image
                    src={allImages?.[selectedImageIndex]}
                    alt={`Proof image ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                {allImages?.length > 1 && (
                  <div className="flex space-x-2 overflow-x-auto pb-2">
                    {allImages?.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImageIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-smooth ${
                          selectedImageIndex === index
                            ? 'border-primary' :'border-border hover:border-primary/50'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`Thumbnail ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>)
            )}
          </div>
        )}

        {/* Impact Description */}
        <div>
          <h4 className="font-medium text-foreground mb-2">Impact Description</h4>
          <div className="bg-muted rounded-lg p-4">
            <p className="text-sm text-foreground leading-relaxed">
              {proofData?.description}
            </p>
          </div>
        </div>

        {/* Impact Metrics */}
        <div>
          <h4 className="font-medium text-foreground mb-3">Impact Metrics</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-success/10 rounded-lg">
              <Icon name="Users" size={24} className="text-success mx-auto mb-2" />
              <div className="text-lg font-bold text-success">
                {proofData?.beneficiaries || 0}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                People Helped
              </div>
            </div>
            
            <div className="text-center p-3 bg-primary/10 rounded-lg">
              <Icon name="Calendar" size={24} className="text-primary mx-auto mb-2" />
              <div className="text-lg font-bold text-primary">
                {proofData?.duration || 0}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                Days Used
              </div>
            </div>
            
            <div className="text-center p-3 bg-accent/10 rounded-lg">
              <Icon name="MapPin" size={24} className="text-accent mx-auto mb-2" />
              <div className="text-lg font-bold text-accent">
                {proofData?.locations || 1}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                Locations
              </div>
            </div>
            
            <div className="text-center p-3 bg-warning/10 rounded-lg">
              <Icon name="Star" size={24} className="text-warning mx-auto mb-2" />
              <div className="text-lg font-bold text-warning">
                {donation?.impactScore || 0}
              </div>
              <div className="text-xs text-muted-foreground font-caption">
                Impact Score
              </div>
            </div>
          </div>
        </div>

        {/* Verification Status */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">
              Verified by {proofData?.verifiedBy || 'System'}
            </span>
          </div>
          <span className="text-xs text-muted-foreground font-caption">
            {proofData?.verificationDate || 'Recently verified'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ImpactVisualization;