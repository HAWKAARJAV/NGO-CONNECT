import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, icon, trend, trendValue, color = 'primary', onClick }) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    success: 'bg-success/10 text-success border-success/20',
    warning: 'bg-warning/10 text-warning border-warning/20',
    accent: 'bg-accent/10 text-accent border-accent/20'
  };

  const trendColors = {
    up: 'text-success',
    down: 'text-error',
    neutral: 'text-muted-foreground'
  };

  return (
    <div 
      className={`bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth cursor-pointer ${onClick ? 'hover:bg-muted/20' : ''}`}
      onClick={onClick}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={`p-2 rounded-lg ${colorClasses?.[color]}`}>
          <Icon name={icon} size={20} />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${trendColors?.[trend]}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : trend === 'down' ? 'TrendingDown' : 'Minus'} size={14} />
            <span className="text-xs font-mono">{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-foreground mb-1">{value}</p>
        <p className="text-sm text-muted-foreground font-caption">{title}</p>
      </div>
    </div>
  );
};

export default StatsCard;