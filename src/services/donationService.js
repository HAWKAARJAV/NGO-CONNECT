import { supabase } from '../lib/supabase';

export const donationService = {
  // Get user's donations
  async getUserDonations(userId) {
    try {
      const { data, error } = await supabase?.from('donations')?.select(`
          *,
          ngo_profiles!donations_ngo_id_fkey (
            organization_name,
            user_profiles!ngo_profiles_user_id_fkey (
              full_name,
              city,
              state
            )
          ),
          ngo_needs (
            title,
            description,
            category
          )
        `)?.eq('donor_id', userId)?.order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching user donations:', error)
      return { data: null, error }
    }
  },

  // Create new donation
  async createDonation(donationData) {
    try {
      const { data, error } = await supabase?.from('donations')?.insert([donationData])?.select()?.single()

      if (error) throw error

      // Log activity
      await supabase?.rpc('log_user_activity', {
        activity_user_id: donationData?.donor_id,
        activity_type_param: 'donation_created',
        activity_title: 'New Donation Posted',
        activity_description: `Posted ${donationData?.title} for donation`
      })

      return { data, error: null }
    } catch (error) {
      console.error('Error creating donation:', error)
      return { data: null, error }
    }
  },

  // Update donation
  async updateDonation(donationId, updates) {
    try {
      const { data, error } = await supabase?.from('donations')?.update(updates)?.eq('id', donationId)?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating donation:', error)
      return { data: null, error }
    }
  },

  // Get available donations for NGOs
  async getAvailableDonations(filters = {}) {
    try {
      let query = supabase?.from('donations')?.select(`
          *,
          user_profiles!donations_donor_id_fkey (
            full_name,
            city,
            state,
            phone_number
          )
        `)?.eq('status', 'pending')

      // Apply filters
      if (filters?.category) {
        query = query?.eq('category', filters?.category)
      }
      if (filters?.city) {
        query = query?.eq('pickup_city', filters?.city)
      }
      if (filters?.condition) {
        query = query?.eq('condition', filters?.condition)
      }

      const { data, error } = await query?.order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching available donations:', error)
      return { data: null, error }
    }
  },

  // Get donations for specific NGO
  async getNGODonations(ngoId) {
    try {
      const { data, error } = await supabase?.from('donations')?.select(`
          *,
          user_profiles!donations_donor_id_fkey (
            full_name,
            city,
            state,
            phone_number,
            profile_image_url
          ),
          ngo_needs (
            title,
            description
          )
        `)?.eq('ngo_id', ngoId)?.order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching NGO donations:', error)
      return { data: null, error }
    }
  },

  // Approve donation (NGO action)
  async approveDonation(donationId, ngoId) {
    try {
      const { data, error } = await supabase?.from('donations')?.update({ 
          status: 'approved',
          ngo_id: ngoId,
          matched_at: new Date()?.toISOString()
        })?.eq('id', donationId)?.select()?.single()

      if (error) throw error

      // Create notification for donor
      const { error: notifError } = await supabase?.from('notifications')?.insert([{
          user_id: data?.donor_id,
          type: 'donation_approved',
          title: 'Donation Approved!',
          message: `Your donation "${data?.title}" has been approved by an NGO`
        }])

      if (notifError) console.error('Error creating notification:', notifError)

      return { data, error: null }
    } catch (error) {
      console.error('Error approving donation:', error)
      return { data: null, error }
    }
  },

  // Get donation statistics for user
  async getUserDonationStats(userId) {
    try {
      const { data, error } = await supabase?.from('donations')?.select('status, estimated_value, created_at')?.eq('donor_id', userId)

      if (error) throw error

      const stats = {
        totalDonations: data?.length || 0,
        totalValue: data?.reduce((sum, d) => sum + (parseFloat(d?.estimated_value) || 0), 0) || 0,
        pendingDonations: data?.filter(d => d?.status === 'pending')?.length || 0,
        completedDonations: data?.filter(d => d?.status === 'completed')?.length || 0,
        currentMonthDonations: data?.filter(d => {
          const donationDate = new Date(d?.created_at)
          const now = new Date()
          return donationDate?.getMonth() === now?.getMonth() && 
                 donationDate?.getFullYear() === now?.getFullYear()
        })?.length || 0
      }

      return { data: stats, error: null }
    } catch (error) {
      console.error('Error fetching donation stats:', error)
      return { data: null, error }
    }
  },

  // Upload donation images
  async uploadDonationImages(files, donationId) {
    try {
      const uploadPromises = files?.map(async (file, index) => {
        const fileExt = file?.name?.split('.')?.pop()
        const fileName = `${donationId}/${Date.now()}_${index}.${fileExt}`
        
        const { data, error } = await supabase?.storage?.from('donation-images')?.upload(fileName, file)

        if (error) throw error
        
        const { data: { publicUrl } } = supabase?.storage?.from('donation-images')?.getPublicUrl(fileName)

        return publicUrl
      })

      const imageUrls = await Promise.all(uploadPromises)
      return { data: imageUrls, error: null }
    } catch (error) {
      console.error('Error uploading donation images:', error)
      return { data: null, error }
    }
  }
}