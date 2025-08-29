import React from 'react';
import Icon from '../../../components/AppIcon';
import { ProgressRing } from '../../../components/ui/StatusIndicator';

const GamificationPanel = () => {
  const currentLevel = {
    name: 'Generous Giver',
    current: 12,
    target: 20,
    progress: 60
  };

  const badges = [
    {
      id: 1,
      name: 'First Donation',
      description: 'Made your first donation',
      icon: 'Gift',
      earned: true,
      earnedDate: '2025-08-15'
    },
    {
      id: 2,
      name: 'Local Hero',
      description: 'Helped 5 local NGOs',
      icon: 'MapPin',
      earned: true,
      earnedDate: '2025-08-20'
    },
    {
      id: 3,
      name: 'Generous Giver',
      description: 'Made 10+ donations',
      icon: 'Heart',
      earned: true,
      earnedDate: '2025-08-25'
    },
    {
      id: 4,
      name: 'Impact Maker',
      description: 'Helped 100+ people',
      icon: 'Users',
      earned: false,
      progress: 75
    },
    {
      id: 5,
      name: 'Community Champion',
      description: 'Made 50+ donations',
      icon: 'Award',
      earned: false,
      progress: 24
    }
  ];

  const achievements = [
    {
      id: 1,
      title: 'Streak Master!',
      description: 'You donated for 7 consecutive days',
      icon: 'Zap',
      type: 'recent',
      date: '2 days ago'
    },
    {
      id: 2,
      title: 'Category Explorer',
      description: 'Donated to all 6 categories',
      icon: 'Compass',
      type: 'milestone',
      date: '1 week ago'
    }
  ];

  return (
    <div className="bg-card border border-border rounded-lg shadow-subtle">
      <div className="p-6 border-b border-border">
        <div className="flex items-center space-x-2 mb-4">
          <Icon name="Trophy" size={20} className="text-warning" />
          <h2 className="text-lg font-heading font-semibold text-foreground">Your Impact Journey</h2>
        </div>
        
        {/* Current Level Progress */}
        <div className="flex items-center space-x-4 mb-6">
          <ProgressRing 
            progress={currentLevel?.progress} 
            size="lg" 
            color="primary"
            className="flex-shrink-0"
          />
          <div className="flex-1">
            <h3 className="font-medium text-foreground mb-1">{currentLevel?.name}</h3>
            <p className="text-sm text-muted-foreground font-caption mb-2">
              {currentLevel?.current} of {currentLevel?.target} donations to next level
            </p>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className="bg-primary h-2 rounded-full transition-all duration-300"
                style={{ width: `${currentLevel?.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      {/* Badges Section */}
      <div className="p-6 border-b border-border">
        <h3 className="font-medium text-foreground mb-4">Badges Earned</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {badges?.map((badge) => (
            <div
              key={badge?.id}
              className={`relative p-3 rounded-lg border transition-smooth ${
                badge?.earned
                  ? 'bg-success/10 border-success/20 text-success' :'bg-muted/50 border-border text-muted-foreground'
              }`}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`p-2 rounded-full mb-2 ${
                  badge?.earned ? 'bg-success/20' : 'bg-muted'
                }`}>
                  <Icon 
                    name={badge?.icon} 
                    size={16} 
                    className={badge?.earned ? 'text-success' : 'text-muted-foreground'}
                  />
                </div>
                <h4 className="text-xs font-medium mb-1">{badge?.name}</h4>
                <p className="text-xs opacity-80 font-caption">{badge?.description}</p>
                {badge?.earned && badge?.earnedDate && (
                  <span className="text-xs mt-1 font-caption opacity-60">
                    {new Date(badge.earnedDate)?.toLocaleDateString()}
                  </span>
                )}
                {!badge?.earned && badge?.progress && (
                  <div className="w-full mt-2">
                    <div className="w-full bg-muted rounded-full h-1">
                      <div 
                        className="bg-accent h-1 rounded-full transition-all duration-300"
                        style={{ width: `${badge?.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-xs mt-1 font-mono">{badge?.progress}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Recent Achievements */}
      <div className="p-6">
        <h3 className="font-medium text-foreground mb-4">Recent Achievements</h3>
        <div className="space-y-3">
          {achievements?.map((achievement) => (
            <div key={achievement?.id} className="flex items-center space-x-3 p-3 bg-muted/30 rounded-lg">
              <div className="p-2 bg-warning/10 rounded-full">
                <Icon name={achievement?.icon} size={16} className="text-warning" />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-medium text-foreground">{achievement?.title}</h4>
                <p className="text-xs text-muted-foreground font-caption">{achievement?.description}</p>
              </div>
              <span className="text-xs text-muted-foreground font-caption">{achievement?.date}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamificationPanel;