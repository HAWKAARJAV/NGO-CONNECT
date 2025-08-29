import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import StatusIndicator from '../../../components/ui/StatusIndicator';
import { Badge } from '../../../components/ui/StatusIndicator';

const ComplianceTracker = ({ ngos, onSendReminder, onFlagNgo }) => {
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const getComplianceStatus = (ngo) => {
    const overdueDonations = ngo?.donations?.filter(d => d?.isOverdue)?.length;
    const pendingDonations = ngo?.donations?.filter(d => d?.status === 'pending-proof')?.length;
    
    if (overdueDonations > 0) return 'critical';
    if (pendingDonations > 2) return 'warning';
    return 'good';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'critical': return 'text-destructive';
      case 'warning': return 'text-warning';
      case 'good': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'critical': return 'AlertTriangle';
      case 'warning': return 'Clock';
      case 'good': return 'CheckCircle';
      default: return 'Minus';
    }
  };

  const filteredNgos = ngos?.filter(ngo => {
    if (filterStatus === 'all') return true;
    return getComplianceStatus(ngo) === filterStatus;
  });

  const handleSendReminder = (ngoId, donationId) => {
    onSendReminder(ngoId, donationId);
  };

  const handleFlagNgo = (ngoId) => {
    onFlagNgo(ngoId);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-subtle">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-heading font-semibold text-foreground">
              NGO Compliance Tracker
            </h3>
            <p className="text-sm text-muted-foreground font-caption">
              Monitor proof submission compliance
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e?.target?.value)}
              className="px-3 py-1.5 text-sm border border-border rounded-lg bg-background text-foreground"
            >
              <option value="all">All NGOs</option>
              <option value="critical">Critical</option>
              <option value="warning">Warning</option>
              <option value="good">Compliant</option>
            </select>
          </div>
        </div>
      </div>
      <div className="divide-y divide-border max-h-96 overflow-y-auto">
        {filteredNgos?.map((ngo) => {
          const complianceStatus = getComplianceStatus(ngo);
          const overdueDonations = ngo?.donations?.filter(d => d?.isOverdue);
          const pendingDonations = ngo?.donations?.filter(d => d?.status === 'pending-proof');
          
          return (
            <div key={ngo?.id} className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start space-x-3">
                  <div className={`w-10 h-10 rounded-full bg-muted flex items-center justify-center ${getStatusColor(complianceStatus)}`}>
                    <Icon name={getStatusIcon(complianceStatus)} size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{ngo?.name}</h4>
                    <p className="text-sm text-muted-foreground font-caption">
                      {ngo?.location} • Verified {ngo?.verificationDate}
                    </p>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className="text-xs text-muted-foreground font-caption">
                        Total Donations: {ngo?.donations?.length}
                      </span>
                      {overdueDonations?.length > 0 && (
                        <Badge count={overdueDonations?.length} variant="error" size="sm" />
                      )}
                      {pendingDonations?.length > 0 && (
                        <Badge count={pendingDonations?.length} variant="warning" size="sm" />
                      )}
                    </div>
                  </div>
                </div>
                
                <StatusIndicator 
                  status={complianceStatus === 'good' ? 'verified' : complianceStatus === 'warning' ? 'pending' : 'rejected'} 
                  size="sm" 
                />
              </div>
              {/* Overdue Donations */}
              {overdueDonations?.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-destructive mb-2">
                    Overdue Proof Submissions ({overdueDonations?.length})
                  </h5>
                  <div className="space-y-2">
                    {overdueDonations?.slice(0, 3)?.map((donation) => (
                      <div key={donation?.id} className="flex items-center justify-between p-2 bg-destructive/5 rounded-lg">
                        <div>
                          <span className="text-sm font-medium text-foreground">
                            {donation?.itemName}
                          </span>
                          <span className="text-xs text-destructive ml-2 font-caption">
                            {donation?.daysOverdue} days overdue
                          </span>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleSendReminder(ngo?.id, donation?.id)}
                          iconName="Bell"
                          iconPosition="left"
                        >
                          Remind
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Pending Donations */}
              {pendingDonations?.length > 0 && (
                <div className="mb-3">
                  <h5 className="text-sm font-medium text-warning mb-2">
                    Pending Submissions ({pendingDonations?.length})
                  </h5>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pendingDonations?.slice(0, 4)?.map((donation) => (
                      <div key={donation?.id} className="p-2 bg-warning/5 rounded-lg">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-foreground">
                            {donation?.itemName}
                          </span>
                          <span className="text-xs text-warning font-caption">
                            {donation?.daysRemaining} days left
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Actions */}
              <div className="flex items-center justify-between pt-3 border-t border-border">
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-muted-foreground font-caption">
                    Compliance Rate: {ngo?.complianceRate}%
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  {complianceStatus === 'critical' && (
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleFlagNgo(ngo?.id)}
                      iconName="Flag"
                      iconPosition="left"
                    >
                      Flag NGO
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedNgo(selectedNgo === ngo?.id ? null : ngo?.id)}
                    iconName={selectedNgo === ngo?.id ? "ChevronUp" : "ChevronDown"}
                    iconPosition="right"
                  >
                    {selectedNgo === ngo?.id ? 'Less' : 'Details'}
                  </Button>
                </div>
              </div>
              {/* Expanded Details */}
              {selectedNgo === ngo?.id && (
                <div className="mt-4 p-3 bg-muted rounded-lg">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-lg font-bold text-success">
                        {ngo?.donations?.filter(d => d?.status === 'completed')?.length}
                      </div>
                      <div className="text-xs text-muted-foreground font-caption">
                        Completed
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-warning">
                        {pendingDonations?.length}
                      </div>
                      <div className="text-xs text-muted-foreground font-caption">
                        Pending
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-destructive">
                        {overdueDonations?.length}
                      </div>
                      <div className="text-xs text-muted-foreground font-caption">
                        Overdue
                      </div>
                    </div>
                    <div>
                      <div className="text-lg font-bold text-primary">
                        {ngo?.averageResponseTime}
                      </div>
                      <div className="text-xs text-muted-foreground font-caption">
                        Avg Response
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      {filteredNgos?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
            No NGOs Found
          </h4>
          <p className="text-muted-foreground font-caption">
            No NGOs match the selected compliance filter
          </p>
        </div>
      )}
    </div>
  );
};

export default ComplianceTracker;