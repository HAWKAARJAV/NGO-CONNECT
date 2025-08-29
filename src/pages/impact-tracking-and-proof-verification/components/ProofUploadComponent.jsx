import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Image from '../../../components/AppImage';

const ProofUploadComponent = ({ donation, onProofSubmit }) => {
  const [uploadedImages, setUploadedImages] = useState([]);
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [location, setLocation] = useState(null);
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const files = Array.from(event?.target?.files);
    files?.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e?.target?.result,
          file: file,
          type: 'gallery'
        }]);
      };
      reader?.readAsDataURL(file);
    });
  };

  const handleCameraCapture = (event) => {
    const files = Array.from(event?.target?.files);
    files?.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImages(prev => [...prev, {
          id: Date.now() + Math.random(),
          url: e?.target?.result,
          file: file,
          type: 'camera'
        }]);
      };
      reader?.readAsDataURL(file);
    });
  };

  const removeImage = (imageId) => {
    setUploadedImages(prev => prev?.filter(img => img?.id !== imageId));
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation?.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position?.coords?.latitude,
            longitude: position?.coords?.longitude,
            accuracy: position?.coords?.accuracy
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  const handleSubmit = async () => {
    if (uploadedImages?.length === 0 || description?.length < 50) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      onProofSubmit({
        donationId: donation?.id,
        images: uploadedImages,
        description,
        location,
        timestamp: new Date()?.toISOString()
      });
      setIsSubmitting(false);
      setUploadedImages([]);
      setDescription('');
      setLocation(null);
    }, 2000);
  };

  React.useEffect(() => {
    getCurrentLocation();
  }, []);

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-4 border-b border-border">
        <h3 className="text-lg font-heading font-semibold text-foreground">Upload Usage Proof</h3>
        <p className="text-sm text-muted-foreground font-caption">
          Document how the donation was utilized
        </p>
      </div>
      <div className="p-4 space-y-6">
        {/* Photo Upload Section */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            Upload Photos <span className="text-destructive">*</span>
          </label>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            <Button
              variant="outline"
              onClick={() => cameraInputRef?.current?.click()}
              iconName="Camera"
              iconPosition="left"
              className="h-12"
            >
              Take Photo
            </Button>
            <Button
              variant="outline"
              onClick={() => fileInputRef?.current?.click()}
              iconName="Upload"
              iconPosition="left"
              className="h-12"
            >
              From Gallery
            </Button>
          </div>

          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            multiple
            onChange={handleCameraCapture}
            className="hidden"
          />
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Image Preview Grid */}
          {uploadedImages?.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
              {uploadedImages?.map((image) => (
                <div key={image?.id} className="relative group">
                  <div className="aspect-square rounded-lg overflow-hidden border border-border">
                    <Image
                      src={image?.url}
                      alt="Proof upload"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <button
                    onClick={() => removeImage(image?.id)}
                    className="absolute -top-2 -right-2 w-6 h-6 bg-destructive text-destructive-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth"
                  >
                    <Icon name="X" size={14} />
                  </button>
                  <div className="absolute bottom-2 left-2">
                    <span className="inline-flex items-center px-2 py-1 rounded text-xs bg-black/50 text-white">
                      <Icon 
                        name={image?.type === 'camera' ? 'Camera' : 'Image'} 
                        size={12} 
                        className="mr-1" 
                      />
                      {image?.type === 'camera' ? 'Camera' : 'Gallery'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Description Section */}
        <div>
          <Input
            label="Usage Description"
            type="textarea"
            placeholder="Describe how the donation was used, who benefited, and what impact it created. Minimum 50 characters required."
            value={description}
            onChange={(e) => setDescription(e?.target?.value)}
            required
            minLength={50}
            description={`${description?.length}/50 characters minimum`}
            error={description?.length > 0 && description?.length < 50 ? "Description must be at least 50 characters" : ""}
            className="min-h-[120px]"
          />
        </div>

        {/* Location Section */}
        <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="MapPin" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground font-caption">
              {location ? 'Location captured' : 'Getting location...'}
            </span>
          </div>
          {location && (
            <span className="text-xs text-success font-mono">
              ±{Math.round(location?.accuracy)}m accuracy
            </span>
          )}
        </div>

        {/* Submit Section */}
        <div className="flex flex-col space-y-3">
          <div className="text-sm text-muted-foreground font-caption">
            <Icon name="Info" size={16} className="inline mr-1" />
            Proof must be submitted within 7 days of receiving the donation
          </div>
          
          <Button
            onClick={handleSubmit}
            disabled={uploadedImages?.length === 0 || description?.length < 50 || isSubmitting}
            loading={isSubmitting}
            iconName="Upload"
            iconPosition="left"
            className="w-full"
          >
            {isSubmitting ? 'Submitting Proof...' : 'Submit Usage Proof'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProofUploadComponent;