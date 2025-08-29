import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  const progressPercentage = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <div className="mb-8">
      {/* Progress Bar */}
      <div className="relative mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-primary transition-all duration-300 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        
        {/* Step Indicators */}
        <div className="absolute top-0 left-0 right-0 flex justify-between transform -translate-y-1/2">
          {steps?.map((step, index) => {
            const stepNumber = index + 1;
            const isCompleted = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;
            
            return (
              <div
                key={step?.id}
                className={`
                  w-6 h-6 rounded-full border-2 flex items-center justify-center transition-smooth
                  ${isCompleted 
                    ? 'bg-primary border-primary' 
                    : isCurrent 
                      ? 'bg-background border-primary' :'bg-background border-muted'
                  }
                `}
              >
                {isCompleted ? (
                  <Icon name="Check" size={12} color="white" />
                ) : (
                  <span className={`
                    text-xs font-mono font-semibold
                    ${isCurrent ? 'text-primary' : 'text-muted-foreground'}
                  `}>
                    {stepNumber}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
      {/* Step Labels */}
      <div className="grid grid-cols-4 gap-2 text-center">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={step?.id} className="space-y-1">
              <h4 className={`
                text-xs font-medium
                ${isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'}
              `}>
                {step?.title}
              </h4>
              <p className="text-xs text-muted-foreground font-caption hidden sm:block">
                {step?.description}
              </p>
            </div>
          );
        })}
      </div>
      {/* Current Step Info */}
      <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-interactive">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <Icon name={steps?.[currentStep - 1]?.icon || 'Info'} size={16} color="white" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-foreground">
              Step {currentStep}: {steps?.[currentStep - 1]?.title}
            </h3>
            <p className="text-xs text-muted-foreground font-caption">
              {steps?.[currentStep - 1]?.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressIndicator;