import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchAndFilter = ({ onSearch, onFilter, filters }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    donationType: 'all',
    status: 'all',
    dateRange: 'all',
    ngo: 'all',
    verificationStatus: 'all'
  });

  const donationTypes = [
    { value: 'all', label: 'All Types' },
    { value: 'food', label: 'Food' },
    { value: 'clothes', label: 'Clothes' },
    { value: 'books', label: 'Books' },
    { value: 'medicines', label: 'Medicines' },
    { value: 'furniture', label: 'Furniture' },
    { value: 'electronics', label: 'Electronics' }
  ];

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'received', label: 'Received' },
    { value: 'in-use', label: 'In Use' },
    { value: 'impact-documented', label: 'Impact Documented' },
    { value: 'pending-proof', label: 'Pending Proof' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const dateRanges = [
    { value: 'all', label: 'All Time' },
    { value: 'today', label: 'Today' },
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const verificationStatuses = [
    { value: 'all', label: 'All Verification' },
    { value: 'verified', label: 'Verified' },
    { value: 'pending-verification', label: 'Pending Verification' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const handleSearch = (query) => {
    setSearchQuery(query);
    onSearch(query);
  };

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...activeFilters, [filterType]: value };
    setActiveFilters(newFilters);
    onFilter(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      donationType: 'all',
      status: 'all',
      dateRange: 'all',
      ngo: 'all',
      verificationStatus: 'all'
    };
    setActiveFilters(clearedFilters);
    setSearchQuery('');
    onFilter(clearedFilters);
    onSearch('');
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.filter(value => value !== 'all')?.length;
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-4">
        {/* Search Bar */}
        <div className="flex items-center space-x-3 mb-4">
          <div className="flex-1 relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="search"
              placeholder="Search donations, NGOs, or impact descriptions..."
              value={searchQuery}
              onChange={(e) => handleSearch(e?.target?.value)}
              className="pl-10"
            />
          </div>
          
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            iconName="Filter"
            iconPosition="left"
            className="relative"
          >
            Filters
            {getActiveFilterCount() > 0 && (
              <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                {getActiveFilterCount()}
              </span>
            )}
          </Button>
        </div>

        {/* Filter Panel */}
        {isFilterOpen && (
          <div className="border-t border-border pt-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              {/* Donation Type Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Donation Type
                </label>
                <select
                  value={activeFilters?.donationType}
                  onChange={(e) => handleFilterChange('donationType', e?.target?.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground"
                >
                  {donationTypes?.map(type => (
                    <option key={type?.value} value={type?.value}>
                      {type?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Status
                </label>
                <select
                  value={activeFilters?.status}
                  onChange={(e) => handleFilterChange('status', e?.target?.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground"
                >
                  {statusOptions?.map(status => (
                    <option key={status?.value} value={status?.value}>
                      {status?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Date Range Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Date Range
                </label>
                <select
                  value={activeFilters?.dateRange}
                  onChange={(e) => handleFilterChange('dateRange', e?.target?.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground"
                >
                  {dateRanges?.map(range => (
                    <option key={range?.value} value={range?.value}>
                      {range?.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* NGO Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  NGO
                </label>
                <select
                  value={activeFilters?.ngo}
                  onChange={(e) => handleFilterChange('ngo', e?.target?.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground"
                >
                  <option value="all">All NGOs</option>
                  {filters?.ngos?.map(ngo => (
                    <option key={ngo?.id} value={ngo?.id}>
                      {ngo?.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Verification Status Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Verification
                </label>
                <select
                  value={activeFilters?.verificationStatus}
                  onChange={(e) => handleFilterChange('verificationStatus', e?.target?.value)}
                  className="w-full px-3 py-2 text-sm border border-border rounded-lg bg-background text-foreground"
                >
                  {verificationStatuses?.map(status => (
                    <option key={status?.value} value={status?.value}>
                      {status?.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Filter Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="text-sm text-muted-foreground font-caption">
                {getActiveFilterCount() > 0 ? (
                  `${getActiveFilterCount()} filter${getActiveFilterCount() > 1 ? 's' : ''} applied`
                ) : (
                  'No filters applied'
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearAllFilters}
                  disabled={getActiveFilterCount() === 0}
                >
                  Clear All
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsFilterOpen(false)}
                >
                  Done
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Active Filter Tags */}
        {getActiveFilterCount() > 0 && !isFilterOpen && (
          <div className="flex flex-wrap gap-2 mt-3">
            {Object.entries(activeFilters)?.map(([key, value]) => {
              if (value === 'all') return null;
              
              const getFilterLabel = () => {
                switch (key) {
                  case 'donationType':
                    return donationTypes?.find(t => t?.value === value)?.label;
                  case 'status':
                    return statusOptions?.find(s => s?.value === value)?.label;
                  case 'dateRange':
                    return dateRanges?.find(d => d?.value === value)?.label;
                  case 'verificationStatus':
                    return verificationStatuses?.find(v => v?.value === value)?.label;
                  case 'ngo':
                    return filters?.ngos?.find(n => n?.id === value)?.name || value;
                  default:
                    return value;
                }
              };

              return (
                <span
                  key={key}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-primary/10 text-primary border border-primary/20"
                >
                  {getFilterLabel()}
                  <button
                    onClick={() => handleFilterChange(key, 'all')}
                    className="ml-2 hover:text-primary/80"
                  >
                    <Icon name="X" size={12} />
                  </button>
                </span>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;