import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Icon from '../../components/AppIcon';

// Import components
import CategorySelector from './components/CategorySelector';
import PhotoUpload from './components/PhotoUpload';
import LocationSelector from './components/LocationSelector';
import ConditionRating from './components/ConditionRating';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import ProgressIndicator from './components/ProgressIndicator';
import ConfirmationScreen from './components/ConfirmationScreen';

const ItemDonationListing = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isDraft, setIsDraft] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    quantity: 1,
    photos: [],
    location: {
      address: '',
      coordinates: null,
      pickupRadius: '5',
      isDetected: false
    },
    condition: '',
    availability: {
      type: 'flexible',
      specificDates: [],
      timeSlots: []
    }
  });

  const steps = [
    {
      id: 'category',
      title: 'Category',
      description: 'Select item type',
      icon: 'Package'
    },
    {
      id: 'details',
      title: 'Details',
      description: 'Add description',
      icon: 'FileText'
    },
    {
      id: 'photos',
      title: 'Photos',
      description: 'Upload images',
      icon: 'Camera'
    },
    {
      id: 'location',
      title: 'Location',
      description: 'Set pickup point',
      icon: 'MapPin'
    }
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('donation-draft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setFormData(draftData);
        setIsDraft(true);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Auto-save draft every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isSubmitted && (formData?.title || formData?.description || formData?.category)) {
        localStorage.setItem('donation-draft', JSON.stringify(formData));
        setIsDraft(true);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, [formData, isSubmitted]);

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData?.category) {
          newErrors.category = 'Please select a category';
        }
        break;
      case 2:
        if (!formData?.title?.trim()) {
          newErrors.title = 'Title is required';
        } else if (formData?.title?.length < 5) {
          newErrors.title = 'Title must be at least 5 characters';
        }
        if (!formData?.description?.trim()) {
          newErrors.description = 'Description is required';
        } else if (formData?.description?.length < 20) {
          newErrors.description = 'Description must be at least 20 characters';
        }
        if (formData?.quantity < 1) {
          newErrors.quantity = 'Quantity must be at least 1';
        }
        break;
      case 3:
        // Photos are optional, no validation needed
        break;
      case 4:
        if (!formData?.location?.address?.trim()) {
          newErrors.location = 'Pickup location is required';
        }
        if (!formData?.condition) {
          newErrors.condition = 'Please select item condition';
        }
        if (!formData?.availability?.type) {
          newErrors.availability = 'Please select availability type';
        }
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < steps?.length) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft from localStorage
      localStorage.removeItem('donation-draft');
      setIsDraft(false);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveDraft = () => {
    localStorage.setItem('donation-draft', JSON.stringify(formData));
    setIsDraft(true);
    // Show success message or toast
  };

  const handleClearDraft = () => {
    localStorage.removeItem('donation-draft');
    setFormData({
      category: '',
      title: '',
      description: '',
      quantity: 1,
      photos: [],
      location: {
        address: '',
        coordinates: null,
        pickupRadius: '5',
        isDetected: false
      },
      condition: '',
      availability: {
        type: 'flexible',
        specificDates: [],
        timeSlots: []
      }
    });
    setIsDraft(false);
    setCurrentStep(1);
    setErrors({});
  };

  const handleEditDonation = () => {
    setIsSubmitted(false);
    setCurrentStep(1);
  };

  const handleNewDonation = () => {
    setIsSubmitted(false);
    setFormData({
      category: '',
      title: '',
      description: '',
      quantity: 1,
      photos: [],
      location: {
        address: '',
        coordinates: null,
        pickupRadius: '5',
        isDetected: false
      },
      condition: '',
      availability: {
        type: 'flexible',
        specificDates: [],
        timeSlots: []
      }
    });
    setCurrentStep(1);
    setErrors({});
  };

  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateNestedFormData = (field, subfield, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: {
        ...prev?.[field],
        [subfield]: value
      }
    }));
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="pt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <ConfirmationScreen
              donationData={formData}
              onEdit={handleEditDonation}
              onNewDonation={handleNewDonation}
            />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-2xl font-heading font-bold text-foreground">
                  Create Donation Listing
                </h1>
                <p className="text-muted-foreground font-caption">
                  Share your items with NGOs in need and make a difference in your community
                </p>
              </div>
              
              {/* Draft Status */}
              {isDraft && (
                <div className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Icon name="Save" size={14} />
                    <span className="font-caption">Draft saved</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleClearDraft}
                    iconName="X"
                    iconPosition="left"
                  >
                    Clear
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Progress Indicator */}
          <ProgressIndicator
            currentStep={currentStep}
            totalSteps={steps?.length}
            steps={steps}
          />

          {/* Form Content */}
          <div className="bg-card border border-border rounded-interactive shadow-subtle">
            <div className="p-6 lg:p-8">
              {/* Step 1: Category Selection */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <CategorySelector
                    selectedCategory={formData?.category}
                    onCategorySelect={(category) => updateFormData('category', category)}
                    error={errors?.category}
                  />
                </div>
              )}

              {/* Step 2: Item Details */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <Input
                    label="Item Title"
                    type="text"
                    placeholder="e.g., Winter clothes for children"
                    value={formData?.title}
                    onChange={(e) => updateFormData('title', e?.target?.value)}
                    error={errors?.title}
                    required
                    maxLength={100}
                  />

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Description <span className="text-destructive">*</span>
                    </label>
                    <textarea
                      placeholder="Describe your items in detail. Include size, brand, condition, and any other relevant information..."
                      value={formData?.description}
                      onChange={(e) => updateFormData('description', e?.target?.value)}
                      rows={4}
                      maxLength={500}
                      className="w-full px-3 py-2 border border-border rounded-interactive focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                    />
                    <div className="flex justify-between items-center">
                      {errors?.description && (
                        <p className="text-sm text-destructive font-caption">{errors?.description}</p>
                      )}
                      <p className="text-xs text-muted-foreground font-caption ml-auto">
                        {formData?.description?.length}/500 characters
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-foreground">
                      Quantity <span className="text-destructive">*</span>
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        type="button"
                        onClick={() => updateFormData('quantity', Math.max(1, formData?.quantity - 1))}
                        className="w-10 h-10 border border-border rounded-interactive flex items-center justify-center hover:bg-muted transition-smooth"
                      >
                        <Icon name="Minus" size={16} />
                      </button>
                      <span className="text-lg font-mono font-semibold text-foreground min-w-[3rem] text-center">
                        {formData?.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateFormData('quantity', formData?.quantity + 1)}
                        className="w-10 h-10 border border-border rounded-interactive flex items-center justify-center hover:bg-muted transition-smooth"
                      >
                        <Icon name="Plus" size={16} />
                      </button>
                    </div>
                    {errors?.quantity && (
                      <p className="text-sm text-destructive font-caption">{errors?.quantity}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Step 3: Photos */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <PhotoUpload
                    photos={formData?.photos}
                    onPhotosChange={(photos) => updateFormData('photos', photos)}
                    error={errors?.photos}
                  />
                </div>
              )}

              {/* Step 4: Location & Availability */}
              {currentStep === 4 && (
                <div className="space-y-8">
                  <LocationSelector
                    location={formData?.location}
                    onLocationChange={(location) => updateFormData('location', location)}
                    error={errors?.location}
                  />

                  <ConditionRating
                    condition={formData?.condition}
                    onConditionChange={(condition) => updateFormData('condition', condition)}
                    error={errors?.condition}
                  />

                  <AvailabilityCalendar
                    availability={formData?.availability}
                    onAvailabilityChange={(availability) => updateFormData('availability', availability)}
                    error={errors?.availability}
                  />
                </div>
              )}
            </div>

            {/* Form Actions */}
            <div className="border-t border-border p-6 lg:p-8">
              <div className="flex flex-col sm:flex-row gap-3 justify-between">
                <div className="flex gap-3">
                  {currentStep > 1 && (
                    <Button
                      variant="outline"
                      onClick={handlePrevious}
                      iconName="ChevronLeft"
                      iconPosition="left"
                    >
                      Previous
                    </Button>
                  )}
                  
                  <Button
                    variant="ghost"
                    onClick={handleSaveDraft}
                    iconName="Save"
                    iconPosition="left"
                  >
                    Save Draft
                  </Button>
                </div>

                <div className="flex gap-3">
                  {currentStep < steps?.length ? (
                    <Button
                      variant="default"
                      onClick={handleNext}
                      iconName="ChevronRight"
                      iconPosition="right"
                    >
                      Next Step
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      onClick={handleSubmit}
                      loading={isSubmitting}
                      iconName="Send"
                      iconPosition="left"
                    >
                      {isSubmitting ? 'Posting...' : 'Post Donation'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Help Section */}
          <div className="mt-8 bg-muted/50 rounded-interactive p-6">
            <div className="flex items-start space-x-3">
              <Icon name="HelpCircle" size={20} className="text-primary flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-foreground mb-2">Need Help?</h3>
                <p className="text-xs text-muted-foreground font-caption mb-3">
                  Having trouble creating your donation listing? Here are some tips:
                </p>
                <ul className="text-xs text-muted-foreground font-caption space-y-1">
                  <li>• Be specific in your item description to help NGOs understand what you're offering</li>
                  <li>• Add photos to increase the chances of your donation being picked up</li>
                  <li>• Set realistic pickup times that work with your schedule</li>
                  <li>• Your location is only shared with verified NGOs for pickup coordination</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ItemDonationListing;