import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';
import { useAuth } from '../../../contexts/AuthContext';
import { ngoService } from '../../../services/ngoService';

const NearbyNGOs = () => {
  const { userProfile } = useAuth();
  const [ngos, setNgos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userProfile?.city) {
      fetchNearbyNGOs();
    }
  }, [userProfile?.city]);

  const fetchNearbyNGOs = async () => {
    try {
      const { data, error } = await ngoService?.getNearbyNGOs(userProfile?.city, 6);
      
      if (error) {
        console.error('Error fetching nearby NGOs:', error);
        return;
      }

      setNgos(data || []);
    } catch (error) {
      console.error('Error in fetchNearbyNGOs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewNGO = (ngoId) => {
    // Navigate to NGO profile or details page
    console.log('View NGO:', ngoId);
  };

  const handleDonate = (ngoId) => {
    // Navigate to donation form with pre-selected NGO
    console.log('Donate to NGO:', ngoId);
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          Nearby NGOs
        </h2>
        <div className="space-y-4">
          {[1, 2, 3]?.map((i) => (
            <div key={i} className="animate-pulse">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-12 h-12 bg-muted rounded-lg"></div>
                <div className="flex-1">
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-3 bg-muted rounded w-3/4"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-heading font-semibold text-foreground">
          Nearby NGOs
        </h2>
        <Button
          variant="outline"
          size="sm"
          iconName="MapPin"
          iconPosition="left"
        >
          {userProfile?.city || 'Your City'}
        </Button>
      </div>

      {ngos?.length === 0 ? (
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="MapPin" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-base font-medium text-foreground mb-2">
            No NGOs Found
          </h3>
          <p className="text-sm text-muted-foreground">
            No verified NGOs found in {userProfile?.city || 'your area'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {ngos?.slice(0, 4)?.map((ngo) => (
            <div key={ngo?.id} className="border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  {ngo?.logo_url ? (
                    <img 
                      src={ngo?.logo_url} 
                      alt={ngo?.organization_name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  ) : (
                    <Icon name="Building" size={20} className="text-primary" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="text-sm font-medium text-foreground truncate">
                          {ngo?.organization_name}
                        </h3>
                        <StatusIndicator 
                          status={ngo?.user_profiles?.verification_status} 
                          size="sm" 
                        />
                      </div>
                      <p className="text-xs text-muted-foreground font-caption">
                        {ngo?.user_profiles?.city}, {ngo?.user_profiles?.state}
                      </p>
                    </div>
                  </div>

                  {/* Focus Areas */}
                  {ngo?.focus_areas?.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {ngo?.focus_areas?.slice(0, 2)?.map((area, index) => (
                        <span 
                          key={index}
                          className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full font-caption"
                        >
                          {area}
                        </span>
                      ))}
                      {ngo?.focus_areas?.length > 2 && (
                        <span className="text-xs text-muted-foreground font-caption">
                          +{ngo?.focus_areas?.length - 2} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Active Needs */}
                  {ngo?.ngo_needs?.length > 0 && (
                    <div className="mb-3">
                      <p className="text-xs text-muted-foreground font-caption mb-1">
                        Current Needs:
                      </p>
                      <div className="space-y-1">
                        {ngo?.ngo_needs?.filter(need => need?.status === 'active')?.slice(0, 2)?.map((need) => (
                          <div key={need?.id} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${
                              need?.urgency === 'high' || need?.urgency === 'critical' ? 'bg-destructive' :
                              need?.urgency === 'medium' ? 'bg-warning' : 'bg-success'
                            }`}></div>
                            <span className="text-xs text-foreground font-caption truncate">
                              {need?.title}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Compliance Score */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-muted-foreground font-caption">
                      Compliance Score
                    </span>
                    <div className="flex items-center space-x-1">
                      <div className="w-8 h-1 bg-muted rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            ngo?.compliance_score >= 90 ? 'bg-success' :
                            ngo?.compliance_score >= 70 ? 'bg-warning' : 'bg-destructive'
                          }`}
                          style={{ width: `${ngo?.compliance_score || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-foreground">
                        {ngo?.compliance_score || 0}%
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewNGO(ngo?.id)}
                      fullWidth
                    >
                      View Profile
                    </Button>
                    <Button
                      variant="default"
                      size="sm"
                      iconName="Heart"
                      iconPosition="left"
                      onClick={() => handleDonate(ngo?.id)}
                      fullWidth
                    >
                      Donate
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {ngos?.length > 4 && (
            <div className="text-center pt-2">
              <Button
                variant="outline"
                size="sm"
                iconName="ArrowRight"
                iconPosition="right"
              >
                View All NGOs
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default NearbyNGOs;