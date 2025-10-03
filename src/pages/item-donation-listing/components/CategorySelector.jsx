import React from 'react';
import Icon from '../../../components/AppIcon';

const CategorySelector = ({ selectedCategory, onCategorySelect, error }) => {
  const categories = [
    { id: 'food', name: 'Food', icon: 'UtensilsCrossed', color: 'text-orange-600', bgColor: 'bg-orange-50' },
    { id: 'clothes', name: 'Clothes', icon: 'Shirt', color: 'text-blue-600', bgColor: 'bg-blue-50' },
    { id: 'books', name: 'Books', icon: 'BookOpen', color: 'text-purple-600', bgColor: 'bg-purple-50' },
    { id: 'medicines', name: 'Medicines', icon: 'Pill', color: 'text-red-600', bgColor: 'bg-red-50' },
    { id: 'furniture', name: 'Furniture', icon: 'Armchair', color: 'text-amber-600', bgColor: 'bg-amber-50' },
    { id: 'electronics', name: 'Electronics', icon: 'Smartphone', color: 'text-green-600', bgColor: 'bg-green-50' }
  ];

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-white">
        Category <span className="text-red-400">*</span>
      </label>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories?.map((category) => (
          <button
            key={category?.id}
            type="button"
            onClick={() => onCategorySelect(category?.id)}
            className={`
              relative p-4 rounded-lg border-2 transition-all duration-300 text-center bg-white/10 border-white/20
              ${selectedCategory === category?.id
                ? 'border-purple-500 bg-purple-500/20 shadow-lg'
                : 'hover:border-purple-400/50 hover:bg-white/20'
              }
            `}
          >
            <div className={`
              w-12 h-12 mx-auto mb-2 rounded-full flex items-center justify-center
              ${selectedCategory === category?.id ? 'bg-purple-500/20' : 'bg-white/20'}
            `}>
              <Icon 
                name={category?.icon} 
                size={24} 
                className={selectedCategory === category?.id ? 'text-purple-400' : 'text-white'}
              />
            </div>
            <span className={`
              text-sm font-medium text-white
              ${selectedCategory === category?.id ? 'text-purple-400' : 'text-white'}
            `}>
              {category?.name}
            </span>
            {selectedCategory === category?.id && (
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-purple-500 rounded-full flex items-center justify-center">
                <Icon name="Check" size={12} color="white" />
              </div>
            )}
          </button>
        ))}
      </div>
      {error && (
        <p className="text-sm text-red-400 font-caption">{error}</p>
      )}
    </div>
  );
};

export default CategorySelector;