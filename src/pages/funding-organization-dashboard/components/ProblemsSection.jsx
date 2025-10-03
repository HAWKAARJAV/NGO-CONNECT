import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ProblemsSection = () => {
  const [selectedUrgency, setSelectedUrgency] = useState('all');

  const problems = [
    {
      id: 1,
      ngoName: 'Green Earth Foundation',
      title: 'Urgent Need for Flood Relief Supplies',
      description: 'Due to recent floods in Maharashtra, we urgently need blankets, food items, and medical supplies to help affected families.',
      category: 'disaster-relief',
      urgency: 'high',
      requiredFunds: 500000,
      requiredItems: ['Blankets', 'Food packets', 'Medical supplies'],
      location: 'Mumbai, Maharashtra',
      postedDate: '2024-08-28',
      ngoAvatar: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      ngoName: 'Hope for Children',
      title: 'School Building Renovation',
      description: 'Our school building needs urgent renovation to provide better learning environment for 200+ children.',
      category: 'education',
      urgency: 'medium',
      requiredFunds: 800000,
      requiredItems: ['Construction materials', 'Furniture', 'Educational supplies'],
      location: 'Delhi, NCR',
      postedDate: '2024-08-25',
      ngoAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      ngoName: 'Health First Initiative',
      title: 'Mobile Medical Unit',
      description: 'We need to set up a mobile medical unit to reach remote villages and provide healthcare services.',
      category: 'healthcare',
      urgency: 'high',
      requiredFunds: 1200000,
      requiredItems: ['Medical equipment', 'Medicines', 'Vehicle'],
      location: 'Bangalore, Karnataka',
      postedDate: '2024-08-20',
      ngoAvatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop'
    }
  ];

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getUrgencyLabel = (urgency) => {
    switch (urgency) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      case 'low': return 'Low Priority';
      default: return 'Unknown';
    }
  };

  const filteredProblems = selectedUrgency === 'all' 
    ? problems 
    : problems.filter(problem => problem.urgency === selectedUrgency);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <h3 className="text-lg font-semibold text-foreground">NGO Problems & Needs</h3>
        <select
          value={selectedUrgency}
          onChange={(e) => setSelectedUrgency(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          <option value="all">All Priorities</option>
          <option value="high">High Priority</option>
          <option value="medium">Medium Priority</option>
          <option value="low">Low Priority</option>
        </select>
      </div>

      <div className="space-y-4">
        {filteredProblems.map(problem => (
          <div key={problem.id} className="bg-white border border-border rounded-lg p-6 shadow-sm">
            <div className="flex items-start space-x-4">
              <img 
                src={problem.ngoAvatar} 
                alt={problem.ngoName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-foreground text-lg mb-1">{problem.title}</h4>
                    <p className="text-sm text-muted-foreground mb-2">by {problem.ngoName}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(problem.urgency)}`}>
                    {getUrgencyLabel(problem.urgency)}
                  </span>
                </div>

                <p className="text-muted-foreground mb-4">{problem.description}</p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Required Funds</h5>
                    <p className="text-2xl font-bold text-primary">₹{problem.requiredFunds.toLocaleString()}</p>
                  </div>
                  <div>
                    <h5 className="font-medium text-foreground mb-2">Required Items</h5>
                    <div className="flex flex-wrap gap-2">
                      {problem.requiredItems.map((item, index) => (
                        <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <span className="flex items-center space-x-1">
                      <Icon name="MapPin" className="w-4 h-4" />
                      <span>{problem.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Icon name="Calendar" className="w-4 h-4" />
                      <span>{new Date(problem.postedDate).toLocaleDateString()}</span>
                    </span>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                    <Button size="sm">
                      Support This Cause
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProblemsSection;
