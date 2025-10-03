import React from 'react';
import Icon from '../../../components/AppIcon';

const ConditionRating = ({ condition, onConditionChange, error }) => {
  const conditions = [
    { 
      id: 'excellent', 
      label: 'Excellent', 
      description: 'Like new, no visible wear',
      icon: 'Star',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    { 
      id: 'good', 
      label: 'Good', 
      description: 'Minor signs of use, fully functional',
      icon: 'ThumbsUp',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    { 
      id: 'fair', 
      label: 'Fair', 
      description: 'Noticeable wear but still usable',
      icon: 'Minus',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    { 
      id: 'poor', 
      label: 'Poor', 
      description: 'Significant wear, may need repair',
      icon: 'AlertTriangle',
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white">
        Item Condition <span className="text-red-400">*</span>
      </label>
      <p className="text-xs text-gray-300 font-caption">
        Please be honest about the condition to help NGOs make informed decisions
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {conditions?.map((conditionOption) => (
          <button
            key={conditionOption?.id}
            type="button"
            onClick={() => onConditionChange(conditionOption?.id)}
            className={`
              p-4 rounded-lg border-2 transition-all duration-300 text-left bg-white/10 border-white/20
              ${condition === conditionOption?.id
                ? 'border-purple-500 bg-purple-500/20 shadow-lg'
                : 'hover:border-purple-400/50 hover:bg-white/20'
              }
            `}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
                ${condition === conditionOption?.id ? 'bg-purple-500/20' : 'bg-white/20'}
              `}>
                <Icon 
                  name={conditionOption?.icon} 
                  size={20} 
                  className={condition === conditionOption?.id ? 'text-purple-400' : 'text-white'}
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className={`
                    text-sm font-medium text-white
                    ${condition === conditionOption?.id ? 'text-purple-400' : 'text-white'}
                  `}>
                    {conditionOption?.label}
                  </h4>
                  {condition === conditionOption?.id && (
                    <Icon name="Check" size={16} className="text-purple-400" />
                  )}
                </div>
                <p className="text-xs text-gray-300 mt-1 font-caption">
                  {conditionOption?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-400 font-caption">{error}</p>
      )}
    </div>
  );
};

export default ConditionRating;