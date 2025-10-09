import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StatsCard from './components/StatsCard';
import NGOBrowseSection from './components/NGOBrowseSection';
import ProblemsSection from './components/ProblemsSection';
import ContestSection from './components/ContestSection';
import CSRReportsSection from './components/CSRReportsSection';

const FundingOrgDashboard = () => {
  const [activeTab, setActiveTab] = useState('browse');

  const orgInfo = {
    name: "TechCorp Foundation",
    type: "Corporate Foundation",
    location: "Bangalore, Karnataka",
    establishedYear: "2020",
    totalFunding: "₹5,00,00,000",
    avatar: "https://images.unsplash.com/photo-1556761175-b413da4baf72?w=100&h=100&fit=crop"
  };

  const statsData = [
    {
      title: "Total NGOs Funded",
      value: "47",
      icon: "Building",
      trend: "up",
      trendValue: "+12",
      color: "primary"
    },
    {
      title: "Active Contests",
      value: "3",
      icon: "Trophy",
      trend: "neutral",
      trendValue: "0",
      color: "warning"
    },
    {
      title: "Funds Disbursed",
      value: "₹2,45,00,000",
      icon: "IndianRupee",
      trend: "up",
      trendValue: "+18%",
      color: "success"
    },
    {
      title: "CSR Compliance",
      value: "100%",
      icon: "Shield",
      trend: "neutral",
      trendValue: "0%",
      color: "accent"
    }
  ];

  const tabs = [
    { id: 'browse', label: 'Browse NGOs', icon: 'Building' },
    { id: 'problems', label: 'View Problems', icon: 'AlertTriangle' },
    { id: 'contests', label: 'Create Contests', icon: 'Trophy' },
    { id: 'csr_funding', label: 'CSR Funding Required', icon: 'Handshake' },
    { id: 'reports', label: 'CSR Reports', icon: 'FileText' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container px-4 py-6 mx-auto">
        <Breadcrumb 
          items={[
            { label: 'Home', href: '/' },
            { label: 'Funding Organization Dashboard', href: '#', current: true }
          ]} 
        />

        {/* Organization Info */}
        <div className="p-6 mb-6 bg-white rounded-lg shadow-sm">
          <div className="flex items-center space-x-4">
            <img 
              src={orgInfo.avatar} 
              alt={orgInfo.name}
              className="object-cover w-16 h-16 rounded-full"
            />
            <div>
              <h1 className="text-2xl font-bold text-foreground">{orgInfo.name}</h1>
              <p className="text-muted-foreground">{orgInfo.type} • {orgInfo.location}</p>
              <p className="text-sm text-muted-foreground">Est. {orgInfo.establishedYear}</p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2 lg:grid-cols-4">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="mb-6 bg-white rounded-lg shadow-sm">
          <div className="border-b border-border">
            <nav className="flex px-6 space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    py-4 px-1 border-b-2 font-medium text-sm transition-colors
                    ${activeTab === tab.id
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground hover:border-border'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <Icon name={tab.icon} className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </div>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'browse' && <NGOBrowseSection />}
            {activeTab === 'problems' && <ProblemsSection />}
            {activeTab === 'contests' && <ContestSection />}
            {activeTab === 'csr_funding' && (
              <div className="p-6 bg-card border border-border rounded-lg">
                <h3 className="mb-2 text-lg font-semibold text-foreground">CSR Funding Required</h3>
                <p className="text-sm text-muted-foreground">View NGO requests that need corporate funding and filter by sector, amount and location.</p>

                <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="p-4 border rounded-lg bg-white/5">
                    <h4 className="text-sm font-medium text-foreground">No. of Requests</h4>
                    <p className="mt-1 text-2xl font-bold text-foreground">12</p>
                  </div>
                  <div className="p-4 border rounded-lg bg-white/5">
                    <h4 className="text-sm font-medium text-foreground">Suggested Match</h4>
                    <p className="mt-1 text-sm text-muted-foreground">Showcase shortlisted NGOs for corporate outreach.</p>
                  </div>
                </div>

                <div className="mt-6">
                  <Button variant="default" onClick={() => console.log('Open CSR listings')}>Browse CSR Requests</Button>
                </div>
              </div>
            )}
            {activeTab === 'reports' && <CSRReportsSection />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundingOrgDashboard;
