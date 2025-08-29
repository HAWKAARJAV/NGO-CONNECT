import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/StatusIndicator';
import Image from '../../../components/AppImage';

const DonationTable = ({ donations, onApprove, onDeny, onBulkAction }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(donations?.map(d => d?.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id, checked) => {
    if (checked) {
      setSelectedItems([...selectedItems, id]);
    } else {
      setSelectedItems(selectedItems?.filter(item => item !== id));
    }
  };

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  const sortedDonations = [...donations]?.sort((a, b) => {
    let aValue = a?.[sortBy];
    let bValue = b?.[sortBy];
    
    if (sortBy === 'date') {
      aValue = new Date(aValue);
      bValue = new Date(bValue);
    }
    
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'denied': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      {/* Table Header with Bulk Actions */}
      {selectedItems?.length > 0 && (
        <div className="bg-muted/50 border-b border-border p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-foreground font-medium">
              {selectedItems?.length} items selected
            </span>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="Check"
                onClick={() => onBulkAction('approve', selectedItems)}
              >
                Approve All
              </Button>
              <Button
                variant="destructive"
                size="sm"
                iconName="X"
                onClick={() => onBulkAction('deny', selectedItems)}
              >
                Deny All
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/30 border-b border-border">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  checked={selectedItems?.length === donations?.length}
                  onChange={(e) => handleSelectAll(e?.target?.checked)}
                  className="rounded border-border"
                />
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Donor</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('item')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Item</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">
                <button
                  onClick={() => handleSort('date')}
                  className="flex items-center space-x-1 hover:text-foreground transition-smooth"
                >
                  <span>Date</span>
                  <Icon name="ArrowUpDown" size={12} />
                </button>
              </th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Status</th>
              <th className="p-4 text-left text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {sortedDonations?.map((donation) => (
              <tr key={donation?.id} className="border-b border-border hover:bg-muted/20 transition-smooth">
                <td className="p-4">
                  <input
                    type="checkbox"
                    checked={selectedItems?.includes(donation?.id)}
                    onChange={(e) => handleSelectItem(donation?.id, e?.target?.checked)}
                    className="rounded border-border"
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={donation?.donorAvatar}
                      alt={donation?.donorName}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{donation?.donorName}</p>
                      <p className="text-xs text-muted-foreground font-caption">{donation?.donorLocation}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={donation?.itemImage}
                      alt={donation?.itemName}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-sm font-medium text-foreground">{donation?.itemName}</p>
                      <p className="text-xs text-muted-foreground font-caption">{donation?.category}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <p className="text-sm text-foreground">{donation?.date}</p>
                  <p className="text-xs text-muted-foreground font-caption">{donation?.time}</p>
                </td>
                <td className="p-4">
                  <Badge count={1} variant={getStatusColor(donation?.status)} />
                  <span className="ml-2 text-sm text-foreground capitalize">{donation?.status}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    {donation?.status === 'pending' && (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          iconName="Check"
                          onClick={() => onApprove(donation?.id)}
                        >
                          Approve
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          iconName="X"
                          onClick={() => onDeny(donation?.id)}
                        >
                          Deny
                        </Button>
                      </>
                    )}
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                    >
                      View
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {donations?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Package" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No donations found</p>
        </div>
      )}
    </div>
  );
};

export default DonationTable;