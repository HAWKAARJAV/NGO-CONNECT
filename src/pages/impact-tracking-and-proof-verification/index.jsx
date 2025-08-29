import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import DonationTimeline from './components/DonationTimeline';
import ProofUploadComponent from './components/ProofUploadComponent';
import ImpactVisualization from './components/ImpactVisualization';
import ComplianceTracker from './components/ComplianceTracker';
import SearchAndFilter from './components/SearchAndFilter';

const ImpactTrackingAndProofVerification = () => {
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [activeTab, setActiveTab] = useState('timeline');
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  // Mock data for donations
  const mockDonations = [
    {
      id: 1,
      itemName: "Winter Clothes Bundle",
      ngoName: "Hope Foundation",
      ngoId: "ngo_001",
      donationDate: "15/08/2024",
      status: "impact-documented",
      proofDeadline: null,
      impactScore: 85,
      proofData: {
        description: `The winter clothes bundle was distributed to 25 homeless individuals during the cold wave in Delhi. The items included warm jackets, sweaters, and blankets that provided essential protection against the harsh weather conditions.\n\nThe distribution was conducted at our shelter facility and nearby areas where homeless people gather. Each recipient was provided with a complete set including jacket, sweater, and blanket. The impact was immediate as temperatures had dropped to 5°C.\n\nFollow-up visits showed that all recipients were still using the items and reported significant improvement in their comfort and health during the cold nights.`,
        beforeImages: [
          "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400",
          "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400"
        ],
        afterImages: [
          "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400",
          "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400"
        ],
        beneficiaries: 25,
        duration: 30,
        locations: 3,
        verifiedBy: "Regional Coordinator",
        verificationDate: "20/08/2024"
      }
    },
    {
      id: 2,
      itemName: "Educational Books Set",
      ngoName: "Learn & Grow NGO",
      ngoId: "ngo_002",
      donationDate: "10/08/2024",
      status: "in-use",
      proofDeadline: "17/08/2024",
      impactScore: 72,
      proofData: {
        description: `The educational books were distributed to our learning center serving underprivileged children. The collection included textbooks for grades 1-5, story books, and activity books that have significantly enhanced our teaching resources.\n\nWe have integrated these books into our daily curriculum and the children show great enthusiasm while using them. The colorful illustrations and age-appropriate content have made learning more engaging.`,
        beforeImages: ["https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400"],
        afterImages: [
          "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400",
          "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400"
        ],
        beneficiaries: 45,
        duration: 15,
        locations: 1,
        verifiedBy: "Education Officer",
        verificationDate: "12/08/2024"
      }
    },
    {
      id: 3,
      itemName: "Medical Supplies",
      ngoName: "Health First Foundation",
      ngoId: "ngo_003",
      donationDate: "05/08/2024",
      status: "received",
      proofDeadline: "12/08/2024",
      impactScore: null,
      proofData: null
    },
    {
      id: 4,
      itemName: "Food Packets",
      ngoName: "Hunger Relief Society",
      ngoId: "ngo_004",
      donationDate: "01/08/2024",
      status: "pending-proof",
      proofDeadline: "08/08/2024",
      impactScore: null,
      proofData: null,
      isOverdue: true,
      daysOverdue: 21
    }
  ];

  // Mock data for NGOs compliance tracking
  const mockNgos = [
    {
      id: "ngo_001",
      name: "Hope Foundation",
      location: "Delhi, India",
      verificationDate: "Jan 2024",
      complianceRate: 95,
      averageResponseTime: "2.3 days",
      donations: [
        { id: 1, itemName: "Winter Clothes", status: "completed", isOverdue: false },
        { id: 5, itemName: "Blankets", status: "pending-proof", isOverdue: false, daysRemaining: 3 }
      ]
    },
    {
      id: "ngo_002",
      name: "Learn & Grow NGO",
      location: "Mumbai, India",
      verificationDate: "Feb 2024",
      complianceRate: 88,
      averageResponseTime: "3.1 days",
      donations: [
        { id: 2, itemName: "Educational Books", status: "completed", isOverdue: false },
        { id: 6, itemName: "Stationery", status: "pending-proof", isOverdue: false, daysRemaining: 5 }
      ]
    },
    {
      id: "ngo_003",
      name: "Health First Foundation",
      location: "Bangalore, India",
      verificationDate: "Mar 2024",
      complianceRate: 76,
      averageResponseTime: "4.2 days",
      donations: [
        { id: 3, itemName: "Medical Supplies", status: "pending-proof", isOverdue: false, daysRemaining: 1 },
        { id: 7, itemName: "First Aid Kits", status: "pending-proof", isOverdue: true, daysOverdue: 5 }
      ]
    },
    {
      id: "ngo_004",
      name: "Hunger Relief Society",
      location: "Chennai, India",
      verificationDate: "Apr 2024",
      complianceRate: 45,
      averageResponseTime: "8.5 days",
      donations: [
        { id: 4, itemName: "Food Packets", status: "pending-proof", isOverdue: true, daysOverdue: 21 },
        { id: 8, itemName: "Grocery Items", status: "pending-proof", isOverdue: true, daysOverdue: 12 },
        { id: 9, itemName: "Cooking Oil", status: "pending-proof", isOverdue: true, daysOverdue: 8 }
      ]
    }
  ];

  const tabs = [
    { id: 'timeline', label: 'Donation Timeline', icon: 'Clock' },
    { id: 'upload', label: 'Upload Proof', icon: 'Upload' },
    { id: 'visualization', label: 'Impact Visualization', icon: 'BarChart3' },
    { id: 'compliance', label: 'NGO Compliance', icon: 'Shield' }
  ];

  useEffect(() => {
    setFilteredDonations(mockDonations);
    if (mockDonations?.length > 0) {
      setSelectedDonation(mockDonations?.[0]);
    }
  }, []);

  const handleSearch = (query) => {
    setSearchQuery(query);
    filterDonations(query, filters);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
    filterDonations(searchQuery, newFilters);
  };

  const filterDonations = (query, filterOptions) => {
    let filtered = mockDonations;

    // Search filter
    if (query) {
      filtered = filtered?.filter(donation =>
        donation?.itemName?.toLowerCase()?.includes(query?.toLowerCase()) ||
        donation?.ngoName?.toLowerCase()?.includes(query?.toLowerCase()) ||
        (donation?.proofData?.description || '')?.toLowerCase()?.includes(query?.toLowerCase())
      );
    }

    // Status filter
    if (filterOptions?.status && filterOptions?.status !== 'all') {
      filtered = filtered?.filter(donation => donation?.status === filterOptions?.status);
    }

    // Date range filter (simplified)
    if (filterOptions?.dateRange && filterOptions?.dateRange !== 'all') {
      // Implementation would depend on actual date filtering logic
    }

    // NGO filter
    if (filterOptions?.ngo && filterOptions?.ngo !== 'all') {
      filtered = filtered?.filter(donation => donation?.ngoId === filterOptions?.ngo);
    }

    setFilteredDonations(filtered);
  };

  const handleProofSubmit = (proofData) => {
    // Update donation with proof data
    const updatedDonations = mockDonations?.map(donation => {
      if (donation?.id === proofData?.donationId) {
        return {
          ...donation,
          status: 'impact-documented',
          proofData: {
            description: proofData?.description,
            beforeImages: [],
            afterImages: proofData?.images?.map(img => img?.url),
            beneficiaries: Math.floor(Math.random() * 50) + 10,
            duration: Math.floor(Math.random() * 30) + 1,
            locations: Math.floor(Math.random() * 3) + 1,
            verifiedBy: 'System Auto-Verification',
            verificationDate: new Date()?.toLocaleDateString('en-GB')
          },
          impactScore: Math.floor(Math.random() * 40) + 60
        };
      }
      return donation;
    });
    
    setFilteredDonations(updatedDonations);
    alert('Proof submitted successfully! It will be reviewed and verified shortly.');
  };

  const handleSendReminder = (ngoId, donationId) => {
    alert(`Reminder sent to NGO for donation ID: ${donationId}`);
  };

  const handleFlagNgo = (ngoId) => {
    const ngo = mockNgos?.find(n => n?.id === ngoId);
    alert(`NGO "${ngo?.name}" has been flagged for non-compliance. Admin team will review.`);
  };

  const filterData = {
    ngos: mockNgos
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-heading font-bold text-foreground">
                  Impact Tracking & Proof Verification
                </h1>
                <p className="text-muted-foreground mt-2 font-caption">
                  Monitor donation utilization and verify impact through comprehensive proof documentation
                </p>
              </div>
              
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Download"
                  iconPosition="left"
                >
                  Export Report
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  iconPosition="left"
                >
                  New Verification
                </Button>
              </div>
            </div>
          </div>

          {/* Search and Filter */}
          <div className="mb-6">
            <SearchAndFilter
              onSearch={handleSearch}
              onFilter={handleFilter}
              filters={filterData}
            />
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-caption">Total Donations</p>
                  <p className="text-2xl font-bold text-foreground">{mockDonations?.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Package" size={24} className="text-primary" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-caption">Verified Impact</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockDonations?.filter(d => d?.status === 'impact-documented')?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-caption">Pending Proof</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockDonations?.filter(d => d?.status === 'received' || d?.status === 'pending-proof')?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg border border-border shadow-subtle p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground font-caption">Overdue</p>
                  <p className="text-2xl font-bold text-foreground">
                    {mockDonations?.filter(d => d?.isOverdue)?.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                  <Icon name="AlertTriangle" size={24} className="text-destructive" />
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="mb-6">
            <div className="border-b border-border">
              <nav className="flex space-x-8 overflow-x-auto">
                {tabs?.map((tab) => (
                  <button
                    key={tab?.id}
                    onClick={() => setActiveTab(tab?.id)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-smooth whitespace-nowrap ${
                      activeTab === tab?.id
                        ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted'
                    }`}
                  >
                    <Icon name={tab?.icon} size={18} />
                    <span>{tab?.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column - Timeline/List */}
            <div className="lg:col-span-1">
              {activeTab === 'timeline' && (
                <DonationTimeline
                  donations={filteredDonations}
                  selectedDonation={selectedDonation}
                  onSelectDonation={setSelectedDonation}
                />
              )}
              
              {activeTab === 'upload' && selectedDonation && (
                <ProofUploadComponent
                  donation={selectedDonation}
                  onProofSubmit={handleProofSubmit}
                />
              )}
              
              {activeTab === 'compliance' && (
                <ComplianceTracker
                  ngos={mockNgos}
                  onSendReminder={handleSendReminder}
                  onFlagNgo={handleFlagNgo}
                />
              )}
            </div>

            {/* Right Column - Details/Visualization */}
            <div className="lg:col-span-2">
              {(activeTab === 'timeline' || activeTab === 'visualization') && (
                <ImpactVisualization donation={selectedDonation} />
              )}
              
              {activeTab === 'upload' && (
                <div className="bg-card rounded-lg border border-border shadow-subtle p-8 text-center">
                  <Icon name="Upload" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    Upload Proof Documentation
                  </h3>
                  <p className="text-muted-foreground font-caption">
                    Use the form on the left to upload photos and descriptions of how the donation was utilized. 
                    Include before/after images and detailed impact descriptions.
                  </p>
                </div>
              )}
              
              {activeTab === 'compliance' && (
                <div className="bg-card rounded-lg border border-border shadow-subtle p-8 text-center">
                  <Icon name="Shield" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    NGO Compliance Overview
                  </h3>
                  <p className="text-muted-foreground font-caption mb-6">
                    Monitor NGO compliance rates and proof submission timelines. 
                    Send reminders and flag non-compliant organizations.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="p-4 bg-success/10 rounded-lg">
                      <div className="text-2xl font-bold text-success">
                        {mockNgos?.filter(ngo => ngo?.complianceRate >= 80)?.length}
                      </div>
                      <div className="text-sm text-muted-foreground font-caption">
                        Compliant NGOs
                      </div>
                    </div>
                    <div className="p-4 bg-warning/10 rounded-lg">
                      <div className="text-2xl font-bold text-warning">
                        {mockNgos?.filter(ngo => ngo?.complianceRate < 80)?.length}
                      </div>
                      <div className="text-sm text-muted-foreground font-caption">
                        Need Attention
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ImpactTrackingAndProofVerification;