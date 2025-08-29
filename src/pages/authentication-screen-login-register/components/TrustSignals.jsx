import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustIndicators = [
    {
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Award',
      title: 'Government Verified',
      description: 'Registered under Ministry of Corporate Affairs'
    },
    {
      icon: 'Users',
      title: '10,000+ Users',
      description: 'Trusted by donors and NGOs across India'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified NGOs',
      description: 'All NGOs undergo strict verification process'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      role: 'Regular Donor',
      content: 'DonateConnect made it so easy to find and help local NGOs. I can see exactly how my donations are being used.',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face'
    },
    {
      name: 'Helping Hands NGO',
      role: 'Verified NGO',
      content: 'This platform has transformed how we connect with donors. The verification process ensures trust and transparency.',
      avatar: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=64&h=64&fit=crop&crop=center'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Indicators */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {trustIndicators?.map((indicator, index) => (
          <div
            key={index}
            className="text-center p-4 bg-card border border-border rounded-lg hover:shadow-subtle transition-smooth"
          >
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
              <Icon name={indicator?.icon} size={20} className="text-primary" />
            </div>
            <h4 className="text-sm font-medium text-foreground mb-1">
              {indicator?.title}
            </h4>
            <p className="text-xs text-muted-foreground font-caption">
              {indicator?.description}
            </p>
          </div>
        ))}
      </div>
      {/* Statistics */}
      <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-lg p-6 border border-border">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-heading font-bold text-primary mb-1">
              ₹2.5Cr+
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Donations Facilitated
            </div>
          </div>
          <div>
            <div className="text-2xl font-heading font-bold text-primary mb-1">
              500+
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Verified NGOs
            </div>
          </div>
          <div>
            <div className="text-2xl font-heading font-bold text-primary mb-1">
              50,000+
            </div>
            <div className="text-xs text-muted-foreground font-caption">
              Lives Impacted
            </div>
          </div>
        </div>
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h4 className="text-lg font-heading font-semibold text-foreground text-center">
          Trusted by Our Community
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {testimonials?.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-subtle transition-smooth"
            >
              <div className="flex items-start space-x-3">
                <img
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h5 className="text-sm font-medium text-foreground">
                      {testimonial?.name}
                    </h5>
                    <Icon name="CheckCircle" size={14} className="text-success" />
                  </div>
                  <p className="text-xs text-muted-foreground mb-2 font-caption">
                    {testimonial?.role}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    "{testimonial?.content}"
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-6 py-4 border-t border-border">
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Lock" size={16} />
          <span className="text-xs font-caption">256-bit SSL</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Shield" size={16} />
          <span className="text-xs font-caption">Data Protected</span>
        </div>
        <div className="flex items-center space-x-2 text-muted-foreground">
          <Icon name="Award" size={16} />
          <span className="text-xs font-caption">ISO Certified</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;