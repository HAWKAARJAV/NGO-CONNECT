import React from 'react';
import Icon from '../../../components/AppIcon';

const StatsCard = ({ title, value, icon, trend, trendValue, color }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'primary': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'success': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'accent': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up': return 'TrendingUp';
      case 'down': return 'TrendingDown';
      default: return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up': return 'text-green-600';
      case 'down': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
        </div>
        <div className={`p-3 rounded-lg border ${getColorClasses(color)}`}>
          <Icon name={icon} className="w-6 h-6" />
        </div>
      </div>
      
      <div className="flex items-center mt-4">
        <Icon 
          name={getTrendIcon(trend)} 
          className={`w-4 h-4 ${getTrendColor(trend)}`} 
        />
        <span className={`text-sm font-medium ml-2 ${getTrendColor(trend)}`}>
          {trendValue}
        </span>
      </div>
    </div>
  );
};

export default StatsCard;
