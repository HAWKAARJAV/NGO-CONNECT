import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const UsageTrackingSection = ({ trackingItems, onUploadProof }) => {
  const [selectedItem, setSelectedItem] = useState(null);
  const [proofData, setProofData] = useState({
    description: '',
    photos: []
  });

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getUrgencyColor = (days) => {
    if (days <= 1) return 'error';
    if (days <= 3) return 'warning';
    return 'success';
  };

  const handleFileUpload = (files) => {
    const newPhotos = Array.from(files)?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      preview: URL.createObjectURL(file)
    }));
    setProofData(prev => ({
      ...prev,
      photos: [...prev?.photos, ...newPhotos]
    }));
  };

  const removePhoto = (photoId) => {
    setProofData(prev => ({
      ...prev,
      photos: prev?.photos?.filter(photo => photo?.id !== photoId)
    }));
  };

  const handleSubmitProof = () => {
    if (selectedItem && proofData?.description && proofData?.photos?.length > 0) {
      onUploadProof(selectedItem?.id, proofData);
      setSelectedItem(null);
      setProofData({ description: '', photos: [] });
    }
  };

  const TrackingCard = ({ item }) => {
    const daysRemaining = getDaysRemaining(item?.deadline);
    const urgencyColor = getUrgencyColor(daysRemaining);

    return (
      <div className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Image
              src={item?.itemImage}
              alt={item?.itemName}
              className="w-12 h-12 rounded-lg object-cover"
            />
            <div>
              <h3 className="font-heading font-semibold text-foreground">{item?.itemName}</h3>
              <p className="text-sm text-muted-foreground font-caption">
                From: {item?.donorName}
              </p>
            </div>
          </div>
          <div className={`px-2 py-1 rounded-full text-xs font-medium font-caption ${
            urgencyColor === 'error' ? 'bg-error/10 text-error' :
            urgencyColor === 'warning'? 'bg-warning/10 text-warning' : 'bg-success/10 text-success'
          }`}>
            {daysRemaining > 0 ? `${daysRemaining} days left` : 'Overdue'}
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Received Date:</span>
            <span className="text-foreground font-medium">{item?.receivedDate}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Proof Deadline:</span>
            <span className="text-foreground font-medium">{item?.deadline}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Quantity:</span>
            <span className="text-foreground font-medium">{item?.quantity} {item?.unit}</span>
          </div>
        </div>
        {item?.status === 'pending_proof' ? (
          <Button
            variant="default"
            size="sm"
            iconName="Upload"
            fullWidth
            onClick={() => setSelectedItem(item)}
          >
            Upload Usage Proof
          </Button>
        ) : (
          <div className="flex items-center space-x-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm text-success font-medium">Proof Submitted</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">Usage Tracking</h2>
          <p className="text-sm text-muted-foreground font-caption">
            Upload proof of donation usage within 7 days
          </p>
        </div>
        <div className="flex items-center space-x-2 text-sm">
          <Icon name="Clock" size={16} className="text-warning" />
          <span className="text-muted-foreground">
            {trackingItems?.filter(item => item?.status === 'pending_proof')?.length} items pending proof
          </span>
        </div>
      </div>
      {/* Tracking Items */}
      {trackingItems?.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {trackingItems?.map((item) => (
            <TrackingCard key={item?.id} item={item} />
          ))}
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <Icon name="CheckCircle" size={48} className="text-success mx-auto mb-4" />
          <h3 className="font-heading font-semibold text-foreground mb-2">All caught up!</h3>
          <p className="text-muted-foreground">
            No pending usage proof uploads at the moment
          </p>
        </div>
      )}
      {/* Upload Proof Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card border border-border rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-heading font-bold text-foreground">
                  Upload Usage Proof
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => setSelectedItem(null)}
                />
              </div>
              <p className="text-sm text-muted-foreground mt-1 font-caption">
                For: {selectedItem?.itemName} from {selectedItem?.donorName}
              </p>
            </div>

            <div className="p-6 space-y-4">
              {/* Description */}
              <Input
                label="Usage Description"
                type="text"
                placeholder="Describe how the donation was used..."
                value={proofData?.description}
                onChange={(e) => setProofData(prev => ({ ...prev, description: e?.target?.value }))}
                description="Provide details about how the donated items were utilized"
                required
              />

              {/* Photo Upload */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Upload Photos <span className="text-error">*</span>
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary/50 transition-smooth">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e?.target?.files)}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Icon name="Upload" size={32} className="text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      Click to upload photos or drag and drop
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 font-caption">
                      PNG, JPG up to 10MB each
                    </p>
                  </label>
                </div>
              </div>

              {/* Photo Previews */}
              {proofData?.photos?.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {proofData?.photos?.map((photo) => (
                    <div key={photo?.id} className="relative group">
                      <Image
                        src={photo?.preview}
                        alt="Proof photo"
                        className="w-full h-24 object-cover rounded-lg"
                      />
                      <button
                        onClick={() => removePhoto(photo?.id)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-error text-error-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-border flex items-center justify-end space-x-3">
              <Button
                variant="outline"
                onClick={() => setSelectedItem(null)}
              >
                Cancel
              </Button>
              <Button
                variant="default"
                iconName="Upload"
                onClick={handleSubmitProof}
                disabled={!proofData?.description || proofData?.photos?.length === 0}
              >
                Submit Proof
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UsageTrackingSection;