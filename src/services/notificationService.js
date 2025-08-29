import { supabase } from '../lib/supabase';

export const notificationService = {
  // Get user notifications
  async getUserNotifications(userId, limit = 20) {
    try {
      const { data, error } = await supabase?.from('notifications')?.select('*')?.eq('user_id', userId)?.order('created_at', { ascending: false })?.limit(limit)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching notifications:', error)
      return { data: null, error }
    }
  },

  // Mark notification as read
  async markAsRead(notificationId) {
    try {
      const { data, error } = await supabase?.from('notifications')?.update({ 
          is_read: true,
          read_at: new Date()?.toISOString()
        })?.eq('id', notificationId)?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error marking notification as read:', error)
      return { data: null, error }
    }
  },

  // Mark all notifications as read
  async markAllAsRead(userId) {
    try {
      const { data, error } = await supabase?.from('notifications')?.update({ 
          is_read: true,
          read_at: new Date()?.toISOString()
        })?.eq('user_id', userId)?.eq('is_read', false)?.select()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error marking all notifications as read:', error)
      return { data: null, error }
    }
  },

  // Get unread count
  async getUnreadCount(userId) {
    try {
      const { count, error } = await supabase?.from('notifications')?.select('*', { count: 'exact', head: true })?.eq('user_id', userId)?.eq('is_read', false)

      if (error) throw error
      return { data: count, error: null }
    } catch (error) {
      console.error('Error fetching unread count:', error)
      return { data: 0, error }
    }
  },

  // Create notification
  async createNotification(notificationData) {
    try {
      const { data, error } = await supabase?.from('notifications')?.insert([notificationData])?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating notification:', error)
      return { data: null, error }
    }
  },

  // Get user activities for activity feed
  async getUserActivities(userId, limit = 10) {
    try {
      const { data, error } = await supabase?.from('user_activities')?.select('*')?.eq('user_id', userId)?.order('created_at', { ascending: false })?.limit(limit)

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching user activities:', error)
      return { data: null, error }
    }
  }
}