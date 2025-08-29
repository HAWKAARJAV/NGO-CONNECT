import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import StatusIndicator from '../../components/ui/StatusIndicator';
import StatsCard from './components/StatsCard';
import DonationTable from './components/DonationTable';
import NeedsSection from './components/NeedsSection';
import UsageTrackingSection from './components/UsageTrackingSection';
import ReportsSection from './components/ReportsSection';
import ActivityPanel from './components/ActivityPanel';

const NGODashboard = () => {
  const [activeTab, setActiveTab] = useState('donations');

  // Mock data for NGO dashboard
  const ngoInfo = {
    name: "Green Earth Foundation",
    verificationStatus: "verified",
    registrationNumber: "NGO/2019/0012345",
    location: "Mumbai, Maharashtra",
    establishedYear: "2019",
    category: "Environmental Conservation",
    avatar: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=100&h=100&fit=crop&crop=center"
  };

  const statsData = [
    {
      title: "Pending Donations",
      value: "23",
      icon: "Clock",
      trend: "up",
      trendValue: "+5",
      color: "warning"
    },
    {
      title: "Approved Items",
      value: "156",
      icon: "CheckCircle",
      trend: "up",
      trendValue: "+12",
      color: "success"
    },
    {
      title: "Funds Received",
      value: "₹2,45,000",
      icon: "IndianRupee",
      trend: "up",
      trendValue: "+8%",
      color: "primary"
    },
    {
      title: "Compliance Score",
      value: "98%",
      icon: "Shield",
      trend: "neutral",
      trendValue: "0%",
      color: "accent"
    }
  ];

  const donationsData = [
    {
      id: 1,
      donorName: "Rajesh Kumar",
      donorAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      donorLocation: "Andheri, Mumbai",
      itemName: "Rice Bags",
      itemImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop",
      category: "Food",
      date: "28 Aug 2024",
      time: "2:30 PM",
      status: "pending",
      quantity: "50 kg"
    },
    {
      id: 2,
      donorName: "Priya Sharma",
      donorAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      donorLocation: "Bandra, Mumbai",
      itemName: "Winter Clothes",
      itemImage: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=100&h=100&fit=crop",
      category: "Clothing",
      date: "27 Aug 2024",
      time: "11:15 AM",
      status: "approved",
      quantity: "25 pieces"
    },
    {
      id: 3,
      donorName: "Amit Patel",
      donorAvatar: "https://randomuser.me/api/portraits/men/56.jpg",
      donorLocation: "Powai, Mumbai",
      itemName: "Medical Supplies",
      itemImage: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop",
      category: "Medicine",
      date: "26 Aug 2024",
      time: "4:45 PM",
      status: "pending",
      quantity: "1 box"
    }
  ];

  const needsData = [
    {
      id: 1,
      title: "Emergency Food Supplies",
      category: "Food",
      description: "Urgent need for rice, dal, and cooking oil for flood-affected families in our area. We are currently supporting 150 families who have lost their homes.",
      icon: "Utensils",
      targetQuantity: 500,
      receivedQuantity: 320,
      unit: "kg",
      fulfillmentProgress: 64,
      urgency: "High",
      postedDate: "20 Aug 2024",
      expiryDate: "05 Sep 2024",
      interestedDonors: 12,
      donorAvatars: [
        "https://randomuser.me/api/portraits/men/32.jpg",
        "https://randomuser.me/api/portraits/women/44.jpg",
        "https://randomuser.me/api/portraits/men/56.jpg"
      ]
    },
    {
      id: 2,
      title: "School Books & Stationery",
      category: "Education",
      description: "Required for our education program serving 200 underprivileged children. Need textbooks for grades 1-10 and basic stationery items.",
      icon: "BookOpen",
      targetQuantity: 200,
      receivedQuantity: 85,
      unit: "sets",
      fulfillmentProgress: 43,
      urgency: "Medium",
      postedDate: "18 Aug 2024",
      expiryDate: "15 Sep 2024",
      interestedDonors: 8,
      donorAvatars: [
        "https://randomuser.me/api/portraits/women/28.jpg",
        "https://randomuser.me/api/portraits/men/41.jpg"
      ]
    }
  ];

  const trackingData = [
    {
      id: 1,
      itemName: "Rice Bags",
      itemImage: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=100&h=100&fit=crop",
      donorName: "Rajesh Kumar",
      receivedDate: "22 Aug 2024",
      deadline: "29 Aug 2024",
      quantity: 50,
      unit: "kg",
      status: "pending_proof"
    },
    {
      id: 2,
      itemName: "Blankets",
      itemImage: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=100&h=100&fit=crop",
      donorName: "Meera Singh",
      receivedDate: "20 Aug 2024",
      deadline: "27 Aug 2024",
      quantity: 30,
      unit: "pieces",
      status: "pending_proof"
    }
  ];

  const messagesData = [
    {
      id: 1,
      senderName: "Rajesh Kumar",
      senderAvatar: "https://randomuser.me/api/portraits/men/32.jpg",
      content: "Hi, I wanted to know if you received the rice bags I donated last week. Please confirm the delivery status.",
      timestamp: "2 hours ago",
      unread: true
    },
    {
      id: 2,
      senderName: "Priya Sharma",
      senderAvatar: "https://randomuser.me/api/portraits/women/44.jpg",
      content: "Thank you for accepting my clothing donation. When would be a good time for pickup?",
      timestamp: "5 hours ago",
      unread: true
    }
  ];

  const notificationsData = [
    {
      id: 1,
      title: "Compliance Reminder",
      message: "Upload usage proof for 2 donations expiring in 24 hours",
      timestamp: "1 hour ago",
      type: "warning",
      icon: "AlertTriangle",
      unread: true
    },
    {
      id: 2,
      title: "New Donation Request",
      message: "Amit Patel wants to donate medical supplies",
      timestamp: "3 hours ago",
      type: "success",
      icon: "Gift",
      unread: true
    }
  ];

  const inquiriesData = [
    {
      id: 1,
      organizationName: "TechCorp Foundation",
      subject: "CSR Partnership Opportunity",
      message: "We are interested in partnering with your organization for our CSR initiatives. Could we schedule a meeting to discuss potential collaboration?",
      timestamp: "6 hours ago",
      unread: true
    }
  ];

  const tabs = [
    { id: 'donations', label: 'Incoming Donations', icon: 'Gift' },
    { id: 'needs', label: 'Posted Needs', icon: 'List' },
    { id: 'tracking', label: 'Usage Tracking', icon: 'Camera' },
    { id: 'reports', label: 'Reports', icon: 'BarChart3' }
  ];

  const handleApproveDonation = (donationId) => {
    console.log('Approving donation:', donationId);
  };

  const handleDenyDonation = (donationId) => {
    console.log('Denying donation:', donationId);
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log(`Bulk ${action}:`, selectedIds);
  };

  const handleEditNeed = (needId) => {
    console.log('Editing need:', needId);
  };

  const handleDeleteNeed = (needId) => {
    console.log('Deleting need:', needId);
  };

  const handleAddNewNeed = () => {
    console.log('Adding new need');
  };

  const handleUploadProof = (itemId, proofData) => {
    console.log('Uploading proof for item:', itemId, proofData);
  };

  const handleGenerateReport = (reportType, period) => {
    console.log('Generating report:', reportType, period);
  };

  const handleDownloadReport = (reportType, period) => {
    console.log('Downloading report:', reportType, period);
  };

  const handleMarkAsRead = (id) => {
    console.log('Marking as read:', id);
  };

  const handleReply = (id) => {
    console.log('Replying to:', id);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb />
          
          {/* NGO Header */}
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Icon name="Building" size={32} className="text-primary" />
                </div>
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <h1 className="text-2xl font-heading font-bold text-foreground">
                      {ngoInfo?.name}
                    </h1>
                    <StatusIndicator status={ngoInfo?.verificationStatus} />
                  </div>
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground font-caption">
                    <span>Reg: {ngoInfo?.registrationNumber}</span>
                    <span>•</span>
                    <span>{ngoInfo?.location}</span>
                    <span>•</span>
                    <span>Est. {ngoInfo?.establishedYear}</span>
                    <span>•</span>
                    <span>{ngoInfo?.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Button
                  variant="outline"
                  iconName="Settings"
                >
                  Settings
                </Button>
                <Button
                  variant="default"
                  iconName="Plus"
                  onClick={handleAddNewNeed}
                >
                  Post New Need
                </Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-8">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statsData?.map((stat, index) => (
                  <StatsCard
                    key={index}
                    title={stat?.title}
                    value={stat?.value}
                    icon={stat?.icon}
                    trend={stat?.trend}
                    trendValue={stat?.trendValue}
                    color={stat?.color}
                    onClick={() => console.log('Stat card clicked:', stat?.title)}
                  />
                ))}
              </div>

              {/* Tabbed Content */}
              <div className="bg-card border border-border rounded-lg overflow-hidden">
                {/* Tab Navigation */}
                <div className="border-b border-border">
                  <nav className="flex">
                    {tabs?.map((tab) => (
                      <button
                        key={tab?.id}
                        onClick={() => setActiveTab(tab?.id)}
                        className={`flex items-center space-x-2 px-6 py-4 text-sm font-medium border-b-2 transition-smooth ${
                          activeTab === tab?.id
                            ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/20'
                        }`}
                      >
                        <Icon name={tab?.icon} size={16} />
                        <span>{tab?.label}</span>
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Tab Content */}
                <div className="p-6">
                  {activeTab === 'donations' && (
                    <DonationTable
                      donations={donationsData}
                      onApprove={handleApproveDonation}
                      onDeny={handleDenyDonation}
                      onBulkAction={handleBulkAction}
                    />
                  )}
                  
                  {activeTab === 'needs' && (
                    <NeedsSection
                      needs={needsData}
                      onEdit={handleEditNeed}
                      onDelete={handleDeleteNeed}
                      onAddNew={handleAddNewNeed}
                    />
                  )}
                  
                  {activeTab === 'tracking' && (
                    <UsageTrackingSection
                      trackingItems={trackingData}
                      onUploadProof={handleUploadProof}
                    />
                  )}
                  
                  {activeTab === 'reports' && (
                    <ReportsSection
                      reportData={{}}
                      onGenerateReport={handleGenerateReport}
                      onDownloadReport={handleDownloadReport}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <ActivityPanel
                messages={messagesData}
                notifications={notificationsData}
                inquiries={inquiriesData}
                onMarkAsRead={handleMarkAsRead}
                onReply={handleReply}
              />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    iconName="Plus"
                    fullWidth
                    onClick={handleAddNewNeed}
                  >
                    Post New Need
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Upload"
                    fullWidth
                  >
                    Upload Usage Proof
                  </Button>
                  <Button
                    variant="outline"
                    iconName="FileText"
                    fullWidth
                    onClick={() => handleGenerateReport('monthly', 'donations')}
                  >
                    Generate Report
                  </Button>
                  <Button
                    variant="outline"
                    iconName="Users"
                    fullWidth
                  >
                    View Donors
                  </Button>
                </div>
              </div>

              {/* Compliance Status */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
                  Compliance Status
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Usage Proofs</span>
                    <StatusIndicator status="verified" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Documentation</span>
                    <StatusIndicator status="verified" size="sm" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Financial Reports</span>
                    <StatusIndicator status="pending" size="sm" />
                  </div>
                  <div className="pt-3 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">Overall Score</span>
                      <span className="text-lg font-heading font-bold text-success">98%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default NGODashboard;