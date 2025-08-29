import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StatsCard from './components/StatsCard';
import QuickActions from './components/QuickActions';
import ActivityFeed from './components/ActivityFeed';
import NearbyNGOs from './components/NearbyNGOs';
import MapWidget from './components/MapWidget';
import GamificationPanel from './components/GamificationPanel';

const DonorDashboard = () => {
  const navigate = useNavigate();
  const [refreshing, setRefreshing] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  // Mock user data
  const userData = {
    name: 'John Donor',
    location: 'Mumbai, Maharashtra',
    memberSince: '2024-01-15',
    totalDonations: 47,
    itemsDonated: 32,
    fundsContributed: 15750,
    impactScore: 892,
    currentStreak: 7,
    nextBadge: 'Community Champion'
  };

  const dashboardStats = [
    {
      title: 'Total Donations',
      value: userData?.totalDonations?.toString(),
      subtitle: `${userData?.currentStreak} day streak`,
      icon: 'Gift',
      color: 'primary',
      trend: { type: 'up', value: 12 }
    },
    {
      title: 'Items Donated',
      value: userData?.itemsDonated?.toString(),
      subtitle: 'Across 6 categories',
      icon: 'Package',
      color: 'success',
      trend: { type: 'up', value: 8 }
    },
    {
      title: 'Funds Contributed',
      value: `₹${userData?.fundsContributed?.toLocaleString()}`,
      subtitle: 'To verified NGOs',
      icon: 'CreditCard',
      color: 'accent',
      trend: { type: 'up', value: 15 }
    },
    {
      title: 'Impact Score',
      value: userData?.impactScore?.toString(),
      subtitle: `Next: ${userData?.nextBadge}`,
      icon: 'TrendingUp',
      color: 'warning',
      trend: { type: 'up', value: 5 }
    }
  ];

  const handlePullToRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setRefreshing(false);
  };

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-IN', { 
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4">
              <div>
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-foreground mb-2">
                  Welcome back, {userData?.name}! 👋
                </h1>
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-2">
                    <Icon name="MapPin" size={16} />
                    <span className="font-caption">{userData?.location}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                    <Icon name="Clock" size={16} />
                    <span className="font-caption">{formatTime(currentTime)}</span>
                  </div>
                  <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                    <Icon name="Calendar" size={16} />
                    <span className="font-caption">{formatDate(currentTime)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3 mt-4 sm:mt-0">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="RotateCcw"
                  iconPosition="left"
                  loading={refreshing}
                  onClick={handlePullToRefresh}
                >
                  {refreshing ? 'Refreshing...' : 'Refresh'}
                </Button>
                <Button
                  variant="default"
                  size="sm"
                  iconName="Plus"
                  iconPosition="left"
                  onClick={() => navigate('/item-donation-listing')}
                >
                  New Donation
                </Button>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {dashboardStats?.map((stat, index) => (
              <StatsCard
                key={index}
                title={stat?.title}
                value={stat?.value}
                subtitle={stat?.subtitle}
                icon={stat?.icon}
                color={stat?.color}
                trend={stat?.trend}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <QuickActions />
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Activity Feed */}
            <div className="lg:col-span-2 space-y-8">
              <ActivityFeed />
              
              {/* Map Widget */}
              <div className="block lg:hidden">
                <MapWidget />
              </div>
            </div>

            {/* Right Column - Sidebar */}
            <div className="space-y-8">
              {/* Nearby NGOs */}
              <NearbyNGOs />
              
              {/* Map Widget - Desktop Only */}
              <div className="hidden lg:block">
                <MapWidget />
              </div>
              
              {/* Gamification Panel */}
              <GamificationPanel />
            </div>
          </div>

          {/* Member Since Footer */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Heart" size={16} className="text-primary" />
              <span className="font-caption">
                Member since {new Date(userData.memberSince)?.toLocaleDateString('en-IN', { 
                  month: 'long', 
                  year: 'numeric' 
                })}
              </span>
              <Icon name="Heart" size={16} className="text-primary" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DonorDashboard;