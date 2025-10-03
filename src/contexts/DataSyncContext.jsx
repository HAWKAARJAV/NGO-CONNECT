import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from './AuthContext';

const DataSyncContext = createContext({});

export const useDataSync = () => {
  const context = useContext(DataSyncContext);
  if (!context) {
    throw new Error('useDataSync must be used within DataSyncProvider');
  }
  return context;
};

export const DataSyncProvider = ({ children }) => {
  const { user, userProfile } = useAuth();
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingChanges, setPendingChanges] = useState([]);
  const [syncStatus, setSyncStatus] = useState('idle'); // idle, syncing, error, success

  // Monitor online/offline status
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && pendingChanges.length > 0) {
      syncPendingChanges();
    }
  }, [isOnline, pendingChanges]);

  // Generic function to save data with real-time sync
  const saveData = async (table, data, operation = 'upsert') => {
    if (!user) {
      throw new Error('User must be authenticated to save data');
    }

    setSyncStatus('syncing');

    try {
      let result;
      
      switch (operation) {
        case 'insert':
          result = await supabase.from(table).insert([data]).select().single();
          break;
        case 'update':
          if (!data.id) throw new Error('ID required for update operation');
          result = await supabase.from(table).update(data).eq('id', data.id).select().single();
          break;
        case 'upsert':
          result = await supabase.from(table).upsert([data]).select().single();
          break;
        case 'delete':
          if (!data.id) throw new Error('ID required for delete operation');
          result = await supabase.from(table).delete().eq('id', data.id).select().single();
          break;
        default:
          throw new Error(`Unsupported operation: ${operation}`);
      }

      if (result.error) {
        throw result.error;
      }

      // Log user activity for important changes
      if (['user_profiles', 'donations', 'ngo_needs'].includes(table)) {
        await logUserActivity(operation, table, data);
      }

      setSyncStatus('success');
      
      // Remove from pending changes if it was there
      setPendingChanges(prev => prev.filter(change => 
        !(change.table === table && change.data.id === data.id)
      ));

      return { data: result.data, error: null };

    } catch (error) {
      console.error('Save error:', error);
      
      // Add to pending changes if offline or network error
      if (!isOnline || error.message.includes('network') || error.message.includes('fetch')) {
        setPendingChanges(prev => [...prev, { table, data, operation, timestamp: Date.now() }]);
        setSyncStatus('error');
        return { data: null, error: { message: 'Saved locally, will sync when online' } };
      }

      setSyncStatus('error');
      return { data: null, error };
    }
  };

  // Sync pending changes when back online
  const syncPendingChanges = async () => {
    if (pendingChanges.length === 0) return;

    setSyncStatus('syncing');

    try {
      for (const change of pendingChanges) {
        await saveData(change.table, change.data, change.operation);
      }
      setPendingChanges([]);
      setSyncStatus('success');
    } catch (error) {
      console.error('Sync failed:', error);
      setSyncStatus('error');
    }
  };

  // Log user activity
  const logUserActivity = async (operation, table, data) => {
    try {
      const activityMap = {
        'user_profiles': {
          'update': 'Profile Updated',
          'upsert': 'Profile Updated'
        },
        'donations': {
          'insert': 'New Donation Created',
          'update': 'Donation Updated',
          'delete': 'Donation Removed'
        },
        'ngo_needs': {
          'insert': 'New Need Posted',
          'update': 'Need Updated',
          'delete': 'Need Removed'
        }
      };

      const activityTitle = activityMap[table]?.[operation] || `${operation} on ${table}`;
      
      await supabase.rpc('log_user_activity', {
        activity_user_id: user.id,
        activity_type_param: `${table}_${operation}`,
        activity_title: activityTitle,
        activity_description: `User performed ${operation} operation on ${table}`,
        activity_metadata: { table, operation, dataId: data.id }
      });
    } catch (error) {
      console.warn('Failed to log activity:', error);
    }
  };

  // Auto-save profile changes
  const saveUserProfile = async (profileData) => {
    const dataToSave = {
      id: user.id,
      ...profileData,
      updated_at: new Date().toISOString()
    };
    
    return await saveData('user_profiles', dataToSave, 'update');
  };

  // Auto-save NGO profile changes
  const saveNGOProfile = async (ngoData) => {
    const dataToSave = {
      user_id: user.id,
      ...ngoData,
      updated_at: new Date().toISOString()
    };
    
    return await saveData('ngo_profiles', dataToSave, 'upsert');
  };

  // Auto-save donation
  const saveDonation = async (donationData, operation = 'upsert') => {
    const dataToSave = {
      donor_id: user.id,
      ...donationData,
      updated_at: new Date().toISOString()
    };
    
    return await saveData('donations', dataToSave, operation);
  };

  // Auto-save NGO need
  const saveNGONeed = async (needData, operation = 'upsert') => {
    // Get NGO profile ID for current user
    if (userProfile?.role !== 'ngo') {
      throw new Error('Only NGOs can create needs');
    }

    const { data: ngoProfile } = await supabase
      .from('ngo_profiles')
      .select('id')
      .eq('user_id', user.id)
      .single();

    if (!ngoProfile) {
      throw new Error('NGO profile not found');
    }

    const dataToSave = {
      ngo_id: ngoProfile.id,
      ...needData,
      updated_at: new Date().toISOString()
    };
    
    return await saveData('ngo_needs', dataToSave, operation);
  };

  // Real-time subscriptions for live updates
  useEffect(() => {
    if (!user) return;

    const subscriptions = [];

    // Subscribe to user profile changes
    const profileSub = supabase
      .channel('user_profile_changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'user_profiles',
        filter: `id=eq.${user.id}`
      }, (payload) => {
        console.log('Profile updated:', payload);
        // Trigger re-fetch of user profile in AuthContext
        window.dispatchEvent(new CustomEvent('profileUpdated', { detail: payload }));
      })
      .subscribe();

    subscriptions.push(profileSub);

    // Subscribe to relevant table changes based on user role
    if (userProfile?.role === 'donor') {
      // Subscribe to donation updates
      const donationSub = supabase
        .channel('donation_changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'donations',
          filter: `donor_id=eq.${user.id}`
        }, (payload) => {
          console.log('Donation updated:', payload);
          window.dispatchEvent(new CustomEvent('donationUpdated', { detail: payload }));
        })
        .subscribe();

      subscriptions.push(donationSub);
    }

    if (userProfile?.role === 'ngo') {
      // Subscribe to NGO needs updates
      const needsSub = supabase
        .channel('ngo_needs_changes')
        .on('postgres_changes', {
          event: '*',
          schema: 'public',
          table: 'ngo_needs'
        }, (payload) => {
          console.log('NGO need updated:', payload);
          window.dispatchEvent(new CustomEvent('ngoNeedUpdated', { detail: payload }));
        })
        .subscribe();

      subscriptions.push(needsSub);
    }

    // Cleanup subscriptions
    return () => {
      subscriptions.forEach(sub => {
        supabase.removeChannel(sub);
      });
    };
  }, [user, userProfile]);

  const value = {
    isOnline,
    pendingChanges,
    syncStatus,
    saveData,
    saveUserProfile,
    saveNGOProfile,
    saveDonation,
    saveNGONeed,
    syncPendingChanges
  };

  return (
    <DataSyncContext.Provider value={value}>
      {children}
    </DataSyncContext.Provider>
  );
};