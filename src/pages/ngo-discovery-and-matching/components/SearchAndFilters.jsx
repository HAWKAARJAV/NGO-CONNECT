import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const SearchAndFilters = ({ 
  searchQuery, 
  onSearchChange, 
  selectedRadius, 
  onRadiusChange,
  selectedCategory,
  onCategoryChange,
  selectedVerificationStatus,
  onVerificationStatusChange,
  selectedUrgency,
  onUrgencyChange,
  activeFiltersCount,
  onClearFilters,
  showMap,
  onToggleMap
}) => {
  const [showFilters, setShowFilters] = useState(false);

  const radiusOptions = [
    { value: '5', label: '5 km' },
    { value: '10', label: '10 km' },
    { value: '25', label: '25 km' },
    { value: '50', label: '50 km' },
    { value: '100', label: '100 km' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'education', label: 'Education' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'food-security', label: 'Food Security' },
    { value: 'environment', label: 'Environment' },
    { value: 'women-empowerment', label: 'Women Empowerment' },
    { value: 'child-welfare', label: 'Child Welfare' },
    { value: 'elderly-care', label: 'Elderly Care' },
    { value: 'disaster-relief', label: 'Disaster Relief' }
  ];

  const verificationOptions = [
    { value: 'all', label: 'All NGOs' },
    { value: 'verified', label: 'Verified Only' },
    { value: 'pending', label: 'Pending Verification' }
  ];

  const urgencyOptions = [
    { value: 'all', label: 'All Urgency Levels' },
    { value: 'critical', label: 'Critical' },
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' }
  ];

  return (
    <div className="bg-card border-b border-border sticky top-16 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1 relative">
            <Input
              type="search"
              placeholder="Search NGOs by name, cause, or location..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e?.target?.value)}
              className="pl-10"
            />
            <Icon 
              name="Search" 
              size={18} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            iconName="Filter"
            iconPosition="left"
            className="relative"
          >
            Filters
            {activeFiltersCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-accent text-accent-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-mono">
                {activeFiltersCount}
              </span>
            )}
          </Button>

          <Button
            variant={showMap ? "default" : "outline"}
            onClick={onToggleMap}
            iconName={showMap ? "List" : "Map"}
            iconPosition="left"
          >
            {showMap ? "List" : "Map"}
          </Button>
        </div>

        {/* Quick Radius Selector */}
        <div className="flex items-center space-x-3 mb-4">
          <Icon name="MapPin" size={16} className="text-muted-foreground" />
          <span className="text-sm text-muted-foreground font-caption">Within:</span>
          <div className="flex-1 max-w-xs">
            <Select
              options={radiusOptions}
              value={selectedRadius}
              onChange={onRadiusChange}
              placeholder="Select radius"
            />
          </div>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div className="bg-muted/50 rounded-interactive p-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Select
                label="Category"
                options={categoryOptions}
                value={selectedCategory}
                onChange={onCategoryChange}
                searchable
              />
              
              <Select
                label="Verification Status"
                options={verificationOptions}
                value={selectedVerificationStatus}
                onChange={onVerificationStatusChange}
              />
              
              <Select
                label="Urgency Level"
                options={urgencyOptions}
                value={selectedUrgency}
                onChange={onUrgencyChange}
              />
            </div>

            <div className="flex items-center justify-between pt-2">
              <span className="text-sm text-muted-foreground font-caption">
                {activeFiltersCount} filter{activeFiltersCount !== 1 ? 's' : ''} applied
              </span>
              {activeFiltersCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClearFilters}
                  iconName="X"
                  iconPosition="left"
                >
                  Clear All
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilters;