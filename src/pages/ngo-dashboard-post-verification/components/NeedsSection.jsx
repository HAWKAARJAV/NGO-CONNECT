import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { ProgressRing } from '../../../components/ui/StatusIndicator';
import Image from '../../../components/AppImage';

const NeedsSection = ({ needs, onEdit, onDelete, onAddNew }) => {
  const [viewMode, setViewMode] = useState('grid');

  const NeedCard = ({ need }) => (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
            <Icon name={need?.icon} size={24} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">{need?.title}</h3>
            <p className="text-sm text-muted-foreground font-caption">{need?.category}</p>
          </div>
        </div>
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            iconName="Edit"
            onClick={() => onEdit(need?.id)}
          />
          <Button
            variant="ghost"
            size="sm"
            iconName="Trash2"
            onClick={() => onDelete(need?.id)}
          />
        </div>
      </div>

      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{need?.description}</p>

      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <ProgressRing progress={need?.fulfillmentProgress} size="sm" />
          <div>
            <p className="text-sm font-medium text-foreground">
              {need?.receivedQuantity} / {need?.targetQuantity} {need?.unit}
            </p>
            <p className="text-xs text-muted-foreground font-caption">
              {need?.fulfillmentProgress}% fulfilled
            </p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-medium text-foreground">{need?.urgency}</p>
          <p className="text-xs text-muted-foreground font-caption">Priority</p>
        </div>
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground font-caption">
        <span>Posted: {need?.postedDate}</span>
        <span>Expires: {need?.expiryDate}</span>
      </div>

      {need?.interestedDonors > 0 && (
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="flex -space-x-1">
              {need?.donorAvatars?.slice(0, 3)?.map((avatar, index) => (
                <Image
                  key={index}
                  src={avatar}
                  alt="Donor"
                  className="w-6 h-6 rounded-full border-2 border-card object-cover"
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground font-caption">
              {need?.interestedDonors} donors interested
            </p>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">Posted Needs</h2>
          <p className="text-sm text-muted-foreground font-caption">
            Manage your organization's requirements
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="flex items-center bg-muted rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded transition-smooth ${
                viewMode === 'grid' ? 'bg-card shadow-subtle' : 'hover:bg-card/50'
              }`}
            >
              <Icon name="Grid3X3" size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded transition-smooth ${
                viewMode === 'list' ? 'bg-card shadow-subtle' : 'hover:bg-card/50'
              }`}
            >
              <Icon name="List" size={16} />
            </button>
          </div>
          <Button
            variant="default"
            iconName="Plus"
            onClick={onAddNew}
          >
            Post New Need
          </Button>
        </div>
      </div>
      {/* Needs Grid/List */}
      {needs?.length > 0 ? (
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-4'}>
          {needs?.map((need) => (
            <NeedCard key={need?.id} need={need} />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">No needs posted yet</h3>
          <p className="text-muted-foreground mb-4">
            Start by posting your organization's requirements to connect with donors
          </p>
          <Button
            variant="default"
            iconName="Plus"
            onClick={onAddNew}
          >
            Post Your First Need
          </Button>
        </div>
      )}
    </div>
  );
};

export default NeedsSection;