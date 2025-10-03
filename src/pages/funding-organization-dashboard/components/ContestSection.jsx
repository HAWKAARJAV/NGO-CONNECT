import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContestSection = () => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [activeTab, setActiveTab] = useState('active');

  const contests = [
    {
      id: 1,
      title: 'Environmental Innovation Challenge',
      description: 'Supporting innovative environmental projects that promote sustainability and conservation.',
      totalPrize: 1000000,
      deadline: '2024-12-31',
      status: 'active',
      applications: 23,
      category: 'Environment',
      requirements: [
        'Project must be innovative and scalable',
        'Focus on environmental impact',
        'Detailed implementation plan required',
        'Budget breakdown needed'
      ]
    },
    {
      id: 2,
      title: 'Education for All Initiative',
      description: 'Funding educational projects that improve access to quality education in rural areas.',
      totalPrize: 800000,
      deadline: '2024-11-30',
      status: 'active',
      applications: 18,
      category: 'Education',
      requirements: [
        'Must serve rural communities',
        'Include teacher training component',
        'Measurable learning outcomes',
        'Sustainability plan required'
      ]
    },
    {
      id: 3,
      title: 'Healthcare Access Program',
      description: 'Supporting healthcare initiatives that improve access to medical services.',
      totalPrize: 1200000,
      deadline: '2024-10-15',
      status: 'closed',
      applications: 31,
      category: 'Healthcare',
      requirements: [
        'Focus on underserved areas',
        'Include preventive care',
        'Partnership with local health workers',
        'Impact measurement plan'
      ]
    }
  ];

  const activeContests = contests.filter(contest => contest.status === 'active');
  const closedContests = contests.filter(contest => contest.status === 'closed');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Funding Contests & Challenges</h3>
        <Button onClick={() => setShowCreateForm(true)}>
          <Icon name="Plus" className="w-4 h-4 mr-2" />
          Create New Contest
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'active'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Active Contests ({activeContests.length})
          </button>
          <button
            onClick={() => setActiveTab('closed')}
            className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
              activeTab === 'closed'
                ? 'border-primary text-primary'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            Closed Contests ({closedContests.length})
          </button>
        </nav>
      </div>

      {/* Contest List */}
      <div className="space-y-4">
        {(activeTab === 'active' ? activeContests : closedContests).map(contest => (
          <div key={contest.id} className="p-6 bg-white border rounded-lg shadow-sm border-border">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h4 className="mb-2 text-lg font-semibold text-foreground">{contest.title}</h4>
                <p className="mb-3 text-muted-foreground">{contest.description}</p>
                
                <div className="flex items-center mb-4 space-x-6 text-sm text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Tag" className="w-4 h-4" />
                    <span>{contest.category}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Calendar" className="w-4 h-4" />
                    <span>Deadline: {new Date(contest.deadline).toLocaleDateString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Users" className="w-4 h-4" />
                    <span>{contest.applications} applications</span>
                  </span>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-2xl font-bold text-primary">₹{contest.totalPrize.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Total Prize</p>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="mb-2 font-medium text-foreground">Requirements:</h5>
              <ul className="space-y-1 text-sm list-disc list-inside text-muted-foreground">
                {contest.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">
                  View Applications
                </Button>
                <Button variant="outline" size="sm">
                  Edit Contest
                </Button>
              </div>
              
              {contest.status === 'active' && (
                <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50">
                  Close Contest
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Create Contest Form Modal */}
      {showCreateForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-foreground">Create New Contest</h3>
              <button
                onClick={() => setShowCreateForm(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                <Icon name="X" className="w-6 h-6" />
              </button>
            </div>

            <form className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-foreground">Contest Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-lg border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Enter contest title"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-foreground">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border rounded-lg border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe the contest and its objectives"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-2 text-sm font-medium text-foreground">Total Prize Amount</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border rounded-lg border-border focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="₹"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm font-medium text-foreground">Deadline</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-lg border-border focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-foreground">Category</label>
                <select className="w-full px-3 py-2 border rounded-lg border-border focus:outline-none focus:ring-2 focus:ring-primary">
                  <option>Environment</option>
                  <option>Education</option>
                  <option>Healthcare</option>
                  <option>Poverty</option>
                  <option>Disaster Relief</option>
                  <option>Women Empowerment</option>
                </select>
              </div>

              <div className="flex justify-end pt-4 space-x-3">
                <Button variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
                <Button>
                  Create Contest
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContestSection;
