import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoUpload = ({ photos, onPhotosChange, error }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    const files = Array.from(e?.dataTransfer?.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e?.target?.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    const imageFiles = files?.filter(file => file?.type?.startsWith('image/'));
    
    if (photos?.length + imageFiles?.length > 5) {
      alert('Maximum 5 photos allowed');
      return;
    }

    const newPhotos = imageFiles?.map(file => ({
      id: Date.now() + Math.random(),
      file,
      url: URL.createObjectURL(file),
      name: file?.name
    }));

    onPhotosChange([...photos, ...newPhotos]);
  };

  const removePhoto = (photoId) => {
    const updatedPhotos = photos?.filter(photo => photo?.id !== photoId);
    onPhotosChange(updatedPhotos);
  };

  const reorderPhotos = (fromIndex, toIndex) => {
    const updatedPhotos = [...photos];
    const [movedPhoto] = updatedPhotos?.splice(fromIndex, 1);
    updatedPhotos?.splice(toIndex, 0, movedPhoto);
    onPhotosChange(updatedPhotos);
  };

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-foreground">
        Photos <span className="text-muted-foreground">(Optional, max 5)</span>
      </label>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-interactive p-6 text-center transition-smooth
          ${dragActive 
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/30'
          }
        `}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        
        <div className="space-y-3">
          <div className="w-12 h-12 mx-auto bg-muted rounded-full flex items-center justify-center">
            <Icon name="ImagePlus" size={24} className="text-muted-foreground" />
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">
              Drag & drop photos here, or click to select
            </p>
            <p className="text-xs text-muted-foreground mt-1 font-caption">
              PNG, JPG up to 10MB each
            </p>
          </div>
        </div>
      </div>
      {/* Photo Previews */}
      {photos?.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {photos?.map((photo, index) => (
            <div key={photo?.id} className="relative group">
              <div className="aspect-square rounded-interactive overflow-hidden bg-muted">
                <Image
                  src={photo?.url}
                  alt={`Upload ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Photo Controls */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth rounded-interactive flex items-center justify-center space-x-2">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => reorderPhotos(index, index - 1)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-smooth"
                  >
                    <Icon name="ChevronLeft" size={16} color="white" />
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => removePhoto(photo?.id)}
                  className="w-8 h-8 bg-destructive rounded-full flex items-center justify-center hover:bg-destructive/80 transition-smooth"
                >
                  <Icon name="X" size={16} color="white" />
                </button>
                
                {index < photos?.length - 1 && (
                  <button
                    type="button"
                    onClick={() => reorderPhotos(index, index + 1)}
                    className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-smooth"
                  >
                    <Icon name="ChevronRight" size={16} color="white" />
                  </button>
                )}
              </div>
              
              {/* Primary Photo Indicator */}
              {index === 0 && (
                <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded font-caption">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {error && (
        <p className="text-sm text-destructive font-caption">{error}</p>
      )}
    </div>
  );
};

export default PhotoUpload;