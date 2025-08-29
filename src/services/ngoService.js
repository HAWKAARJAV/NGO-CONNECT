import { supabase } from '../lib/supabase';

export const ngoService = {
  // Get NGO profile for user
  async getNGOProfile(userId) {
    try {
      const { data, error } = await supabase?.from('ngo_profiles')?.select(`
          *,
          user_profiles!ngo_profiles_user_id_fkey (
            full_name,
            email,
            phone_number,
            address,
            city,
            state,
            verification_status
          )
        `)?.eq('user_id', userId)?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching NGO profile:', error)
      return { data: null, error }
    }
  },

  // Create or update NGO profile
  async upsertNGOProfile(userId, profileData) {
    try {
      const { data, error } = await supabase?.from('ngo_profiles')?.upsert([{
          user_id: userId,
          ...profileData
        }])?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error upserting NGO profile:', error)
      return { data: null, error }
    }
  },

  // Get NGO needs
  async getNGONeeds(ngoId) {
    try {
      const { data, error } = await supabase?.from('ngo_needs')?.select('*')?.eq('ngo_id', ngoId)?.order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching NGO needs:', error)
      return { data: null, error }
    }
  },

  // Create NGO need
  async createNeed(needData) {
    try {
      const { data, error } = await supabase?.from('ngo_needs')?.insert([needData])?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error creating NGO need:', error)
      return { data: null, error }
    }
  },

  // Update NGO need
  async updateNeed(needId, updates) {
    try {
      const { data, error } = await supabase?.from('ngo_needs')?.update(updates)?.eq('id', needId)?.select()?.single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error updating NGO need:', error)
      return { data: null, error }
    }
  },

  // Get all verified NGOs for discovery
  async getVerifiedNGOs(filters = {}) {
    try {
      let query = supabase?.from('ngo_profiles')?.select(`
          *,
          user_profiles!ngo_profiles_user_id_fkey (
            full_name,
            email,
            city,
            state,
            verification_status,
            profile_image_url
          ),
          ngo_needs!ngo_needs_ngo_id_fkey (
            id,
            title,
            category,
            urgency,
            status
          )
        `)?.eq('user_profiles.verification_status', 'verified')

      // Apply filters
      if (filters?.city) {
        query = query?.eq('user_profiles.city', filters?.city)
      }
      if (filters?.focusAreas) {
        query = query?.contains('focus_areas', filters?.focusAreas)
      }

      const { data, error } = await query?.order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching verified NGOs:', error)
      return { data: null, error }
    }
  },

  // Get nearby NGOs based on location
  async getNearbyNGOs(userCity, limit = 10) {
    try {
      const { data, error } = await supabase?.from('ngo_profiles')?.select(`
          *,
          user_profiles!ngo_profiles_user_id_fkey (
            full_name,
            city,
            state,
            verification_status,
            profile_image_url
          ),
          ngo_needs!ngo_needs_ngo_id_fkey (
            id,
            title,
            category,
            urgency,
            status
          )
        `)?.eq('user_profiles.verification_status', 'verified')?.eq('user_profiles.city', userCity)?.limit(limit)?.order('compliance_score', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching nearby NGOs:', error)
      return { data: null, error }
    }
  },

  // Get NGO statistics
  async getNGOStats(ngoId) {
    try {
      // Get donations received
      const { data: donations, error: donationError } = await supabase?.from('donations')?.select('status, estimated_value, created_at')?.eq('ngo_id', ngoId)

      if (donationError) throw donationError

      // Get active needs
      const { data: needs, error: needsError } = await supabase?.from('ngo_needs')?.select('status')?.eq('ngo_id', ngoId)

      if (needsError) throw needsError

      // Get impact proofs
      const { data: proofs, error: proofsError } = await supabase?.from('impact_proofs')?.select('status')?.eq('ngo_id', ngoId)

      if (proofsError) throw proofsError

      const stats = {
        totalDonationsReceived: donations?.length || 0,
        pendingDonations: donations?.filter(d => d?.status === 'pending')?.length || 0,
        approvedDonations: donations?.filter(d => d?.status === 'approved')?.length || 0,
        totalValue: donations?.reduce((sum, d) => sum + (parseFloat(d?.estimated_value) || 0), 0) || 0,
        activeNeeds: needs?.filter(n => n?.status === 'active')?.length || 0,
        pendingProofs: proofs?.filter(p => p?.status === 'pending')?.length || 0
      }

      return { data: stats, error: null }
    } catch (error) {
      console.error('Error fetching NGO stats:', error)
      return { data: null, error }
    }
  }
}