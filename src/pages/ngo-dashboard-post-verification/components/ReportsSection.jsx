import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

const ReportsSection = ({ reportData, onGenerateReport, onDownloadReport }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [selectedReport, setSelectedReport] = useState('donations');

  const periodOptions = [
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const reportOptions = [
    { value: 'donations', label: 'Donations Overview' },
    { value: 'impact', label: 'Impact Analysis' },
    { value: 'compliance', label: 'Compliance Report' },
    { value: 'financial', label: 'Financial Summary' }
  ];

  const donationData = [
    { month: 'Jan', received: 45, distributed: 42 },
    { month: 'Feb', received: 52, distributed: 48 },
    { month: 'Mar', received: 38, distributed: 35 },
    { month: 'Apr', received: 61, distributed: 58 },
    { month: 'May', received: 55, distributed: 52 },
    { month: 'Jun', received: 67, distributed: 63 }
  ];

  const categoryData = [
    { name: 'Food', value: 35, color: '#2D5A27' },
    { name: 'Clothes', value: 25, color: '#7B9A6B' },
    { name: 'Books', value: 20, color: '#E67E22' },
    { name: 'Medicine', value: 15, color: '#27AE60' },
    { name: 'Others', value: 5, color: '#F39C12' }
  ];

  const impactData = [
    { month: 'Jan', families: 120, individuals: 480 },
    { month: 'Feb', families: 135, individuals: 540 },
    { month: 'Mar', families: 98, individuals: 392 },
    { month: 'Apr', families: 156, individuals: 624 },
    { month: 'May', families: 142, individuals: 568 },
    { month: 'Jun', families: 178, individuals: 712 }
  ];

  const ReportCard = ({ title, value, subtitle, icon, trend, trendValue }) => (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <div className="p-2 bg-primary/10 rounded-lg">
          <Icon name={icon} size={20} className="text-primary" />
        </div>
        {trend && (
          <div className={`flex items-center space-x-1 ${trend === 'up' ? 'text-success' : 'text-error'}`}>
            <Icon name={trend === 'up' ? 'TrendingUp' : 'TrendingDown'} size={14} />
            <span className="text-xs font-mono">{trendValue}</span>
          </div>
        )}
      </div>
      <div>
        <p className="text-2xl font-heading font-bold text-foreground">{value}</p>
        <p className="text-sm text-muted-foreground font-caption">{title}</p>
        {subtitle && (
          <p className="text-xs text-muted-foreground font-caption mt-1">{subtitle}</p>
        )}
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-heading font-bold text-foreground">Reports & Analytics</h2>
          <p className="text-sm text-muted-foreground font-caption">
            Track your organization's performance and impact
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            className="w-32"
          />
          <Select
            options={reportOptions}
            value={selectedReport}
            onChange={setSelectedReport}
            className="w-48"
          />
          <Button
            variant="outline"
            iconName="Download"
            onClick={() => onDownloadReport(selectedReport, selectedPeriod)}
          >
            Download
          </Button>
        </div>
      </div>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ReportCard
          title="Total Donations"
          value="₹2,45,000"
          subtitle="This month"
          icon="Gift"
          trend="up"
          trendValue="+12%"
        />
        <ReportCard
          title="Items Distributed"
          value="318"
          subtitle="This month"
          icon="Package"
          trend="up"
          trendValue="+8%"
        />
        <ReportCard
          title="Families Helped"
          value="156"
          subtitle="This month"
          icon="Users"
          trend="up"
          trendValue="+15%"
        />
        <ReportCard
          title="Compliance Score"
          value="98%"
          subtitle="All time"
          icon="Shield"
          trend="up"
          trendValue="+2%"
        />
      </div>
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Donations Overview */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Donations Overview
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={donationData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="received" fill="var(--color-primary)" name="Received" />
                <Bar dataKey="distributed" fill="var(--color-secondary)" name="Distributed" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Distribution */}
        <div className="bg-card border border-border rounded-lg p-6">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Category Distribution
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
                >
                  {categoryData?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Impact Tracking */}
        <div className="bg-card border border-border rounded-lg p-6 lg:col-span-2">
          <h3 className="text-lg font-heading font-semibold text-foreground mb-4">
            Impact Tracking
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={impactData}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="month" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-card)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="families" 
                  stroke="var(--color-primary)" 
                  strokeWidth={2}
                  name="Families Helped"
                />
                <Line 
                  type="monotone" 
                  dataKey="individuals" 
                  stroke="var(--color-accent)" 
                  strokeWidth={2}
                  name="Individuals Helped"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      {/* Recent Reports */}
      <div className="bg-card border border-border rounded-lg">
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-heading font-semibold text-foreground">Recent Reports</h3>
        </div>
        <div className="divide-y divide-border">
          {[
            {
              id: 1,
              name: 'Monthly Impact Report - June 2024',
              type: 'Impact Analysis',
              date: '2024-06-30',
              size: '2.4 MB',
              status: 'completed'
            },
            {
              id: 2,
              name: 'Compliance Report - Q2 2024',
              type: 'Compliance',
              date: '2024-06-28',
              size: '1.8 MB',
              status: 'completed'
            },
            {
              id: 3,
              name: 'Financial Summary - May 2024',
              type: 'Financial',
              date: '2024-05-31',
              size: '3.1 MB',
              status: 'completed'
            }
          ]?.map((report) => (
            <div key={report?.id} className="p-4 flex items-center justify-between hover:bg-muted/20 transition-smooth">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon name="FileText" size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{report?.name}</p>
                  <p className="text-sm text-muted-foreground font-caption">
                    {report?.type} • {report?.date} • {report?.size}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Eye"
                >
                  View
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Download"
                >
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReportsSection;