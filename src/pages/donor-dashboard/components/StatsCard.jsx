import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import { useAuth } from '../../../contexts/AuthContext';
import { donationService } from '../../../services/donationService';
import { impactService } from '../../../services/impactService';

const StatsCard = ({ title, value, subtitle, icon, trend, color = 'primary', onClick }) => {
  const { user } = useAuth();
  const [realValue, setRealValue] = useState(value);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchRealData();
    }
  }, [user?.id, title]);

  const fetchRealData = async () => {
    if (!user?.id) return;
    
    setLoading(true);
    try {
      switch (title) {
        case 'Total Donations':
          const { data: donationStats } = await donationService?.getUserDonationStats(user?.id);
          setRealValue(donationStats?.totalDonations?.toString() || '0');
          break;
          
        case 'Items Donated':
          const { data: stats } = await donationService?.getUserDonationStats(user?.id);
          setRealValue(stats?.completedDonations?.toString() || '0');
          break;
          
        case 'Funds Contributed':
          const { data: fundStats } = await donationService?.getUserDonationStats(user?.id);
          const totalValue = Math.floor(fundStats?.totalValue || 0);
          setRealValue(`₹${totalValue?.toLocaleString()}`);
          break;
          
        case 'Impact Score':
          const { data: impactMetrics } = await impactService?.getUserImpactMetrics(user?.id);
          setRealValue(impactMetrics?.impactScore?.toString() || '0');
          break;
          
        default:
          setRealValue(value);
          break;
      }
    } catch (error) {
      console.error('Error fetching stat data:', error);
      setRealValue(value); // Fallback to original value
    } finally {
      setLoading(false);
    }
  };

  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    accent: 'bg-accent/10 text-accent border-accent/20'
  };

  const trendColorClasses = {
    up: 'text-success',
    down: 'text-destructive',
    neutral: 'text-muted-foreground'
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-6 hover:shadow-subtle transition-smooth cursor-pointer ${
        onClick ? 'hover:border-primary/30' : ''
      }`}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <div className={`w-10 h-10 rounded-lg border flex items-center justify-center ${colorClasses?.[color] || colorClasses?.primary}`}>
              <Icon name={icon} size={20} />
            </div>
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">
                {title}
              </h3>
            </div>
          </div>
          
          <div className="space-y-1">
            <div className="flex items-baseline space-x-2">
              <span className="text-2xl font-heading font-bold text-foreground">
                {loading ? '...' : realValue}
              </span>
              {trend && !loading && (
                <div className={`flex items-center space-x-1 text-xs ${trendColorClasses?.[trend?.type] || trendColorClasses?.neutral}`}>
                  <Icon 
                    name={trend?.type === 'up' ? 'TrendingUp' : trend?.type === 'down' ? 'TrendingDown' : 'Minus'} 
                    size={12}
                  />
                  <span>{trend?.value}</span>
                </div>
              )}
            </div>
            <p className="text-sm text-muted-foreground font-caption">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCard;