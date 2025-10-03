import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CSRReportsSection = () => {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedQuarter, setSelectedQuarter] = useState('all');

  const years = ['2024', '2023', '2022', '2021'];
  const quarters = ['all', 'Q1', 'Q2', 'Q3', 'Q4'];

  const reports = [
    {
      id: 1,
      title: 'Q2 2024 CSR Report',
      period: 'April - June 2024',
      totalFunding: 2500000,
      ngosSupported: 8,
      projectsFunded: 12,
      impactMetrics: {
        beneficiaries: 2500,
        communities: 15,
        sustainabilityScore: 85
      },
      status: 'completed',
      downloadUrl: '#',
      generatedDate: '2024-07-15'
    },
    {
      id: 2,
      title: 'Q1 2024 CSR Report',
      period: 'January - March 2024',
      totalFunding: 1800000,
      ngosSupported: 6,
      projectsFunded: 9,
      impactMetrics: {
        beneficiaries: 1800,
        communities: 12,
        sustainabilityScore: 82
      },
      status: 'completed',
      downloadUrl: '#',
      generatedDate: '2024-04-15'
    },
    {
      id: 3,
      title: 'Q4 2023 CSR Report',
      period: 'October - December 2023',
      totalFunding: 3200000,
      ngosSupported: 10,
      projectsFunded: 15,
      impactMetrics: {
        beneficiaries: 3200,
        communities: 18,
        sustainabilityScore: 88
      },
      status: 'completed',
      downloadUrl: '#',
      generatedDate: '2024-01-15'
    }
  ];

  const summaryStats = {
    totalFunding: reports.reduce((sum, report) => sum + report.totalFunding, 0),
    totalNGOs: reports.reduce((sum, report) => sum + report.ngosSupported, 0),
    totalProjects: reports.reduce((sum, report) => sum + report.projectsFunded, 0),
    totalBeneficiaries: reports.reduce((sum, report) => sum + report.impactMetrics.beneficiaries, 0)
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row">
        <h3 className="text-lg font-semibold text-foreground">CSR Reports & Analytics</h3>
        <div className="flex space-x-3">
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            className="px-3 py-2 border rounded-lg border-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          <select
            value={selectedQuarter}
            onChange={(e) => setSelectedQuarter(e.target.value)}
            className="px-3 py-2 border rounded-lg border-border focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {quarters.map(quarter => (
              <option key={quarter} value={quarter}>{quarter === 'all' ? 'All Quarters' : quarter}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white border rounded-lg shadow-sm border-border">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-blue-50">
              <Icon name="IndianRupee" className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Total Funding</p>
              <p className="text-2xl font-bold text-foreground">₹{summaryStats.totalFunding.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow-sm border-border">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-green-50">
              <Icon name="Building" className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">NGOs Supported</p>
              <p className="text-2xl font-bold text-foreground">{summaryStats.totalNGOs}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow-sm border-border">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-purple-50">
              <Icon name="Folder" className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Projects Funded</p>
              <p className="text-2xl font-bold text-foreground">{summaryStats.totalProjects}</p>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white border rounded-lg shadow-sm border-border">
          <div className="flex items-center space-x-3">
            <div className="p-3 rounded-lg bg-orange-50">
              <Icon name="Users" className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Beneficiaries</p>
              <p className="text-2xl font-bold text-foreground">{summaryStats.totalBeneficiaries.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="bg-white border rounded-lg shadow-sm border-border">
        <div className="px-6 py-4 border-b border-border">
          <h4 className="font-semibold text-foreground">Generated Reports</h4>
        </div>
        
        <div className="divide-y divide-border">
          {reports.map(report => (
            <div key={report.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h5 className="mb-1 text-lg font-semibold text-foreground">{report.title}</h5>
                  <p className="text-muted-foreground">{report.period}</p>
                </div>
                <span className="px-3 py-1 text-xs font-medium text-green-700 rounded-full bg-green-50">
                  {report.status}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-4 mb-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-muted-foreground">Total Funding</p>
                  <p className="text-lg font-semibold text-foreground">₹{report.totalFunding.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">NGOs Supported</p>
                  <p className="text-lg font-semibold text-foreground">{report.ngosSupported}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Projects Funded</p>
                  <p className="text-lg font-semibold text-foreground">{report.projectsFunded}</p>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="mb-2 font-medium text-foreground">Impact Metrics</h6>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <div className="p-3 text-center rounded-lg bg-gray-50">
                    <p className="text-2xl font-bold text-primary">{report.impactMetrics.beneficiaries.toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">Beneficiaries</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-gray-50">
                    <p className="text-2xl font-bold text-primary">{report.impactMetrics.communities}</p>
                    <p className="text-sm text-muted-foreground">Communities</p>
                  </div>
                  <div className="p-3 text-center rounded-lg bg-gray-50">
                    <p className="text-2xl font-bold text-primary">{report.impactMetrics.sustainabilityScore}%</p>
                    <p className="text-sm text-muted-foreground">Sustainability Score</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Generated: {new Date(report.generatedDate).toLocaleDateString()}
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                  <Button size="sm">
                    <Icon name="Download" className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CSRReportsSection;
