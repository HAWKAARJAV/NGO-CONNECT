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
        <label className="block text-sm font-medium text-white mb-3">
          Pickup Availability <span className="text-red-400">*</span>
        </label>
        
        {/* Availability Type Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
          {availabilityTypes?.map((type) => (
            <button
              key={type?.id}
              type="button"
              onClick={() => handleTypeChange(type?.id)}
              className={`
                p-4 rounded-lg border-2 transition-all duration-300 text-left bg-white/10 border-white/20
                ${availability?.type === type?.id
                  ? 'border-purple-500 bg-purple-500/20 shadow-lg'
                  : 'hover:border-purple-400/50 hover:bg-white/20'
                }
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`
                  w-8 h-8 rounded-full flex items-center justify-center
                  ${availability?.type === type?.id ? 'bg-purple-500/20' : 'bg-white/20'}
                `}>
                  <Icon 
                    name={type?.icon} 
                    size={16} 
                    className={availability?.type === type?.id ? 'text-purple-400' : 'text-white'}
                  />
                </div>
                <div className="flex-1">
                  <h4 className={`
                    text-sm font-medium text-white
                    ${availability?.type === type?.id ? 'text-purple-400' : 'text-white'}
                  `}>
                    {type?.label}
                  </h4>
                  <p className="text-xs text-gray-300 font-caption">
                    {type?.description}
                  </p>
                </div>
                {availability?.type === type?.id && (
                  <Icon name="Check" size={16} className="text-purple-400" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Specific Dates Selection */}
      {availability?.type === 'specific' && (
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-white">Select Available Dates</h4>
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
                    p-3 rounded-lg border transition-all duration-300 text-center bg-white/10 border-white/20 text-white
                    ${isSelected
                      ? 'border-purple-500 bg-purple-500/20 text-white'
                      : 'hover:border-purple-400/50 hover:bg-white/20'
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
          <h4 className="text-sm font-medium text-white">Preferred Time Slots</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {timeSlots?.map((slot) => {
              const isSelected = availability?.timeSlots?.includes(slot?.id);
              
              return (
                <button
                  key={slot?.id}
                  type="button"
                  onClick={() => handleTimeSlotToggle(slot?.id)}
                  className={`
                    p-4 rounded-lg border-2 transition-all duration-300 text-left bg-white/10 border-white/20
                    ${isSelected
                      ? 'border-purple-500 bg-purple-500/20 shadow-lg'
                      : 'hover:border-purple-400/50 hover:bg-white/20'
                    }
                  `}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`
                      w-8 h-8 rounded-full flex items-center justify-center
                      ${isSelected ? 'bg-purple-500/20' : 'bg-white/20'}
                    `}>
                      <Icon 
                        name={slot?.icon} 
                        size={16} 
                        className={isSelected ? 'text-purple-400' : 'text-white'}
                      />
                    </div>
                    <div className="flex-1">
                      <h5 className={`
                        text-sm font-medium text-white
                        ${isSelected ? 'text-purple-400' : 'text-white'}
                      `}>
                        {slot?.label}
                      </h5>
                      <p className="text-xs text-gray-300 font-caption">
                        {slot?.time}
                      </p>
                    </div>
                    {isSelected && (
                      <Icon name="Check" size={16} className="text-purple-400" />
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
        <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertCircle" size={20} className="text-yellow-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-yellow-400 mb-1">Urgent Pickup Required</h4>
              <p className="text-xs text-gray-300 font-caption">
                Your donation will be prioritized and matched with nearby NGOs for immediate pickup. 
                You may receive pickup requests within 24 hours.
              </p>
            </div>
          </div>
        </div>
      )}
      {error && (
        <p className="text-sm text-red-400 font-caption">{error}</p>
      )}
    </div>
  );
};

export default AvailabilityCalendar;