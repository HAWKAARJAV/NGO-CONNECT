import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const AvailabilityCalendar = ({ availability, onAvailabilityChange, error }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  
  const timeSlots = [
    { id: 'morning', label: 'Morning', time: '9:00 AM - 12:00 PM', icon: 'Sunrise' },
    { id: 'afternoon', label: 'Afternoon', time: '12:00 PM - 5:00 PM', icon: 'Sun' },
    { id: 'evening', label: 'Evening', time: '5:00 PM - 8:00 PM', icon: 'Sunset' }
  ];

  const availabilityTypes = [
    { id: 'flexible', label: 'Flexible', description: 'Available most days', icon: 'Calendar' },
    { id: 'specific', label: 'Specific Dates', description: 'Only certain days', icon: 'CalendarDays' },
    { id: 'urgent', label: 'Urgent', description: 'Needs pickup ASAP', icon: 'Clock' }
  ];

  // Generate next 14 days
  const generateDates = () => {
    const dates = [];
    const today = new Date();
    
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date?.setDate(today?.getDate() + i);
      dates?.push(date);
    }
    
    return dates;
  };

  const dates = generateDates();

  const handleTypeChange = (type) => {
    onAvailabilityChange({
      ...availability,
      type,
      specificDates: type === 'specific' ? availability?.specificDates || [] : [],
      timeSlots: availability?.timeSlots || []
    });
  };

  const handleDateToggle = (date) => {
    if (availability?.type !== 'specific') return;
    
    const dateStr = date?.toISOString()?.split('T')?.[0];
    const specificDates = availability?.specificDates || [];
    
    const updatedDates = specificDates?.includes(dateStr)
      ? specificDates?.filter(d => d !== dateStr)
      : [...specificDates, dateStr];
    
    onAvailabilityChange({
      ...availability,
      specificDates: updatedDates
    });
  };

  const handleTimeSlotToggle = (slotId) => {
    const timeSlots = availability?.timeSlots || [];
    const updatedSlots = timeSlots?.includes(slotId)
      ? timeSlots?.filter(s => s !== slotId)
      : [...timeSlots, slotId];
    
    onAvailabilityChange({
      ...availability,
      timeSlots: updatedSlots
    });
  };

  const formatDate = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow?.setDate(today?.getDate() + 1);
    
    if (date?.toDateString() === today?.toDateString()) return 'Today';
    if (date?.toDateString() === tomorrow?.toDateString()) return 'Tomorrow';
    
    return date?.toLocaleDateString('en-IN', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Pickup Availability <span className="text-destructive">*</span>
        </label>
        
        {/* Availability Type Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {availabilityTypes?.map((type) => (
            <button
              key={type?.id}
              type="button"
              onClick={() => handleTypeChange(type?.id)}
              className={`
                p-4 rounded-interactive border-2 transition-smooth text-left
                ${availability?.type === type?.id
                  ? 'border-primary bg-primary/5 shadow-subtle'
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${availability?.type === type?.id ? 'bg-primary/10' : 'bg-muted'}
                `}>
                  <Icon 
                    name={type?.icon} 
                    size={16} 
                    className={availability?.type === type?.id ? 'text-primary' : 'text-muted-foreground'}
                  />
                </div>
                <div className="flex-1">
                  <h4 className={`
                    text-sm font-medium
                    ${availability?.type === type?.id ? 'text-primary' : 'text-foreground'}
                  `}>
                    {type?.label}
                  </h4>
                  <p className="text-xs text-muted-foreground font-caption">
                    {type?.description}
                  </p>
                </div>
                {availability?.type === type?.id && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Specific Dates Selection */}
      {availability?.type === 'specific' && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Select Available Dates</h4>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
            {dates?.map((date) => {
              const dateStr = date?.toISOString()?.split('T')?.[0];
              const isSelected = availability?.specificDates?.includes(dateStr);
              
              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => handleDateToggle(date)}
                  className={`
                    p-3 rounded-interactive border transition-smooth text-center
                    ${isSelected
                      ? 'border-primary bg-primary text-primary-foreground'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }
                  `}
                >
                  <div className="text-xs font-medium">
                    {formatDate(date)}
                  </div>
                  <div className="text-xs opacity-75 font-caption">
                    {date?.getDate()}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {/* Time Slots */}
      {(availability?.type === 'specific' || availability?.type === 'flexible') && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Preferred Time Slots</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {timeSlots?.map((slot) => {
              const isSelected = availability?.timeSlots?.includes(slot?.id);
              
              return (
                <button
                  key={slot?.id}
                  type="button"
                  onClick={() => handleTimeSlotToggle(slot?.id)}
                  className={`
                    p-4 rounded-interactive border-2 transition-smooth text-left
                    ${isSelected
                      ? 'border-primary bg-primary/5 shadow-subtle'
                      : 'border-border hover:border-primary/50 hover:bg-muted/50'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${isSelected ? 'bg-primary/10' : 'bg-muted'}
                    `}>
                      <Icon 
                        name={slot?.icon} 
                        size={16} 
                        className={isSelected ? 'text-primary' : 'text-muted-foreground'}
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className={`
                        text-sm font-medium
                        ${isSelected ? 'text-primary' : 'text-foreground'}
                      `}>
                        {slot?.label}
                      </h5>
                      <p className="text-xs text-muted-foreground font-caption">
                        {slot?.time}
                      </p>
                    </div>
                    {isSelected && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
      {/* Urgent Pickup Note */}
      {availability?.type === 'urgent' && (
        <div className="bg-accent/10 border border-accent/20 rounded-interactive p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-accent flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-accent mb-1">Urgent Pickup Required</h4>
              <p className="text-xs text-muted-foreground font-caption">
                Your donation will be prioritized and matched with nearby NGOs for immediate pickup. 
                You may receive pickup requests within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}
      {error && (
        <p className="text-sm text-destructive font-caption">{error}</p>
      )}
    </div>
  );
};

export default AvailabilityCalendar;