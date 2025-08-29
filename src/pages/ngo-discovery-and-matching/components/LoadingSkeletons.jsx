import React from 'react';

const NGOCardSkeleton = () => {
  return (
    <div className="bg-card border border-border rounded-interactive shadow-subtle overflow-hidden animate-pulse">
      {/* Header */}
      <div className="relative">
        <div className="h-32 bg-muted"></div>
        <div className="absolute -bottom-6 left-4">
          <div className="w-12 h-12 bg-muted rounded-full border-2 border-card"></div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 pt-8">
        {/* Title and verification */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="h-5 bg-muted rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-muted rounded w-1/2 mb-1"></div>
            <div className="h-3 bg-muted rounded w-1/3"></div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2 mb-4">
          <div className="h-3 bg-muted rounded w-full"></div>
          <div className="h-3 bg-muted rounded w-4/5"></div>
        </div>

        {/* Needs */}
        <div className="mb-4">
          <div className="h-4 bg-muted rounded w-1/2 mb-2"></div>
          <div className="space-y-2">
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
        </div>

        {/* Stats */}
        <div className="flex justify-between mb-4 p-2 bg-muted/30 rounded-lg">
          <div className="text-center">
            <div className="h-4 bg-muted rounded w-8 mx-auto mb-1"></div>
            <div className="h-3 bg-muted rounded w-12 mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="h-4 bg-muted rounded w-8 mx-auto mb-1"></div>
            <div className="h-3 bg-muted rounded w-12 mx-auto"></div>
          </div>
          <div className="text-center">
            <div className="h-4 bg-muted rounded w-8 mx-auto mb-1"></div>
            <div className="h-3 bg-muted rounded w-12 mx-auto"></div>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <div className="grid grid-cols-2 gap-2">
            <div className="h-8 bg-muted rounded"></div>
            <div className="h-8 bg-muted rounded"></div>
          </div>
          <div className="h-8 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  );
};

const NGOGridSkeleton = ({ count = 6 }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count })?.map((_, index) => (
        <NGOCardSkeleton key={index} />
      ))}
    </div>
  );
};

const MapSkeleton = () => {
  return (
    <div className="w-full h-full bg-muted rounded-interactive animate-pulse flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-muted-foreground/20 rounded-full mx-auto mb-4"></div>
        <div className="h-4 bg-muted-foreground/20 rounded w-32 mx-auto mb-2"></div>
        <div className="h-3 bg-muted-foreground/20 rounded w-24 mx-auto"></div>
      </div>
    </div>
  );
};

export default NGOCardSkeleton;
export { NGOGridSkeleton, MapSkeleton };