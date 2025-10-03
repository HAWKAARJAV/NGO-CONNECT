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
      <label className="block text-sm font-medium text-white">
        Photos <span className="text-gray-300">(Optional, max 5)</span>
      </label>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 bg-white/10 border-white/30
          ${dragActive 
            ? 'border-purple-500 bg-purple-500/20' :'hover:border-purple-400/50 hover:bg-white/20'
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
          <div className="flex items-center justify-center w-12 h-12 mx-auto rounded-full bg-white/20">
            <Icon name="ImagePlus" size={24} className="text-white" />
          </div>
          <div>
            <p className="text-sm font-medium text-white">
              Drag & drop photos here, or click to select
            </p>
            <p className="mt-1 text-xs text-gray-300 font-caption">
              PNG, JPG up to 10MB each
            </p>
          </div>
        </div>
      </div>
      {/* Photo Previews */}
      {photos?.length > 0 && (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {photos?.map((photo, index) => (
            <div key={photo?.id} className="relative group">
              <div className="overflow-hidden rounded-lg aspect-square bg-white/10">
                <Image
                  src={photo?.url}
                  alt={`Upload ${index + 1}`}
                  className="object-cover w-full h-full"
                />
              </div>
              
              {/* Photo Controls */}
              <div className="absolute inset-0 flex items-center justify-center space-x-2 transition-all duration-300 rounded-lg opacity-0 bg-black/50 group-hover:opacity-100">
                {index > 0 && (
                  <button
                    type="button"
                    onClick={() => reorderPhotos(index, index - 1)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-smooth"
                  >
                    <Icon name="ChevronLeft" size={16} color="white" />
                  </button>
                )}
                
                <button
                  type="button"
                  onClick={() => removePhoto(photo?.id)}
                  className="flex items-center justify-center w-8 h-8 transition-colors bg-red-500 rounded-full hover:bg-red-600"
                >
                  <Icon name="X" size={16} color="white" />
                </button>
                
                {index < photos?.length - 1 && (
                  <button
                    type="button"
                    onClick={() => reorderPhotos(index, index + 1)}
                    className="flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-smooth"
                  >
                    <Icon name="ChevronRight" size={16} color="white" />
                  </button>
                )}
              </div>
              
              {/* Primary Photo Indicator */}
              {index === 0 && (
                <div className="absolute px-2 py-1 text-xs text-white bg-purple-500 rounded top-2 left-2 font-caption">
                  Primary
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {error && (
        <p className="text-sm text-red-400 font-caption">{error}</p>
      )}
    </div>
  );
};

export default PhotoUpload;