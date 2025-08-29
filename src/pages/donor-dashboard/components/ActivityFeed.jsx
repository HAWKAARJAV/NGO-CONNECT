import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { useAuth } from '../../../contexts/AuthContext';
import { notificationService } from '../../../services/notificationService';

const ActivityFeed = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    if (user?.id) {
      fetchActivities();
    }
  }, [user?.id]);

  const fetchActivities = async () => {
    try {
      const { data, error } = await notificationService?.getUserActivities(user?.id, 15);
      
      if (error) {
        console.error('Error fetching activities:', error);
        return;
      }

      setActivities(data || []);
    } catch (error) {
      console.error('Error in fetchActivities:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchActivities();
    setRefreshing(false);
  };

  const getActivityIcon = (activityType) => {
    const iconMap = {
      donation_created: 'Gift',
      donation_approved: 'CheckCircle',
      donation_delivered: 'Truck',
      donation_completed: 'Star',
      profile_updated: 'User',
      impact_proof_received: 'Camera',
      match_found: 'Users',
      payment_processed: 'CreditCard',
      review_received: 'MessageCircle'
    };
    return iconMap?.[activityType] || 'Bell';
  };

  const getActivityColor = (activityType) => {
    const colorMap = {
      donation_created: 'text-blue-600',
      donation_approved: 'text-green-600',
      donation_delivered: 'text-orange-600',
      donation_completed: 'text-purple-600',
      profile_updated: 'text-gray-600',
      impact_proof_received: 'text-indigo-600',
      match_found: 'text-pink-600',
      payment_processed: 'text-emerald-600',
      review_received: 'text-yellow-600'
    };
    return colorMap?.[activityType] || 'text-gray-600';
  };

  const formatActivityDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      if (diffInDays < 7) {
        return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
      } else {
        return date?.toLocaleDateString('en-IN', { 
          day: 'numeric', 
          month: 'short' 
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-heading font-semibold text-foreground mb-4">
          Recent Activity
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5]?.map((i) => (
            <div key={i} className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-muted rounded-full animate-pulse"></div>
              <div className="flex-1">
                <div className="h-4 bg-muted rounded animate-pulse mb-2"></div>
                <div className="h-3 bg-muted rounded animate-pulse w-1/2"></div>
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
          Recent Activity
        </h2>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          iconPosition="left"
          loading={refreshing}
          onClick={handleRefresh}
        >
          {refreshing ? 'Refreshing...' : 'Refresh'}
        </Button>
      </div>

      {activities?.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
            <Icon name="Activity" size={24} className="text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground mb-2">
            No Activity Yet
          </h3>
          <p className="text-muted-foreground mb-4">
            Start by creating your first donation to see activity here
          </p>
          <Button
            variant="default"
            iconName="Plus"
            iconPosition="left"
          >
            Create Donation
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3 pb-4 last:pb-0 border-b border-border last:border-b-0">
              <div className={`w-10 h-10 rounded-full bg-background border-2 flex items-center justify-center ${getActivityColor(activity?.activity_type)} flex-shrink-0`}>
                <Icon name={getActivityIcon(activity?.activity_type)} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-foreground mb-1">
                      {activity?.title}
                    </h4>
                    {activity?.description && (
                      <p className="text-sm text-muted-foreground font-caption mb-2">
                        {activity?.description}
                      </p>
                    )}
                    <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                      <Icon name="Clock" size={12} />
                      <span className="font-caption">
                        {formatActivityDate(activity?.created_at)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {activities?.length >= 10 && (
            <div className="pt-4 text-center">
              <Button
                variant="outline"
                size="sm"
              >
                View All Activity
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ActivityFeed;