import React from 'react';
import { useDataSync } from '../contexts/DataSyncContext';

const SyncStatusIndicator = () => {
  const { isOnline, syncStatus, pendingChanges } = useDataSync();

  if (!isOnline && pendingChanges.length === 0) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-yellow-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2">
        <div className="w-2 h-2 bg-white rounded-full"></div>
        <span className="text-sm font-medium">Offline</span>
      </div>
    );
  }

  if (pendingChanges.length > 0) {
    return (
      <div className="fixed top-4 right-4 z-50 bg-orange-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        <span className="text-sm font-medium">
          {pendingChanges.length} change{pendingChanges.length > 1 ? 's' : ''} pending
        </span>
      </div>
    );
  }

  if (syncStatus === 'syncing') {
    return (
      <div className="fixed top-4 right-4 z-50 bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2">
        <div className="w-2 h-2 bg-white rounded-full animate-ping"></div>
        <span className="text-sm font-medium">Syncing...</span>
      </div>
    );
  }

  if (syncStatus === 'success') {
    return (
      <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2 transition-opacity duration-2000 opacity-100">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium">Saved</span>
      </div>
    );
  }

  if (syncStatus === 'error') {
    return (
      <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-3 py-2 rounded-lg shadow-lg flex items-center space-x-2">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium">Sync Error</span>
      </div>
    );
  }

  return null;
};

export default SyncStatusIndicator;