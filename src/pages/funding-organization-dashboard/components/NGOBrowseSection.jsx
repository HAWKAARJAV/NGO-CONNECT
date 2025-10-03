import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const NGOBrowseSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all', 'education', 'healthcare', 'environment', 'poverty', 'disaster-relief', 'women-empowerment'
  ];

  const ngos = [
    {
      id: 1,
      name: 'Green Earth Foundation',
      category: 'environment',
      location: 'Mumbai, Maharashtra',
      verified: true,
      rating: 4.8,
      totalProjects: 23,
      establishedYear: 2019,
      description: 'Working towards environmental conservation and sustainable development.',
      avatar: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop'
    },
    {
      id: 2,
      name: 'Hope for Children',
      category: 'education',
      location: 'Delhi, NCR',
      verified: true,
      rating: 4.6,
      totalProjects: 18,
      establishedYear: 2018,
      description: 'Providing quality education to underprivileged children.',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop'
    },
    {
      id: 3,
      name: 'Health First Initiative',
      category: 'healthcare',
      location: 'Bangalore, Karnataka',
      verified: true,
      rating: 4.9,
      totalProjects: 31,
      establishedYear: 2020,
      description: 'Improving healthcare access in rural areas.',
      avatar: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=100&h=100&fit=crop'
    }
  ];

  const filteredNGOs = ngos.filter(ngo => {
    const matchesSearch = ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         ngo.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || ngo.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search NGOs by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category === 'all' ? 'All Categories' : category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredNGOs.map(ngo => (
          <div key={ngo.id} className="bg-white border border-border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-start space-x-4">
              <img 
                src={ngo.avatar} 
                alt={ngo.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-semibold text-foreground">{ngo.name}</h3>
                  {ngo.verified && (
                    <Icon name="CheckCircle" className="w-4 h-4 text-green-500" />
                  )}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">{ngo.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" className="w-4 h-4" />
                    <span>{ngo.location}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Star" className="w-4 h-4 text-yellow-500" />
                    <span>{ngo.rating}</span>
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm text-muted-foreground">
                    <span className="font-medium">{ngo.totalProjects}</span> projects
                  </div>
                  <Button variant="outline" size="sm">
                    View Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NGOBrowseSection;
