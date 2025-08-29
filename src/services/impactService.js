import { supabase } from '../lib/supabase';

export const impactService = {
  // Get impact proofs for donations
  async getImpactProofs(donationId) {
    try {
      const { data, error } = await supabase?.from('impact_proofs')?.select(`
          *,
          ngo_profiles!impact_proofs_ngo_id_fkey (
            organization_name,
            user_profiles!ngo_profiles_user_id_fkey (
              full_name,
              city
            )
          )
        `)?.eq('donation_id', donationId)?.order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching impact proofs:', error)
      return { data: null, error }
    }
  },

  // Create impact proof
  async createImpactProof(proofData) {
    try {
      const { data, error } = await supabase?.from('impact_proofs')?.insert([proofData])?.select()?.single()

      if (error) throw error

      // Create notification for donor
      const donation = await supabase?.from('donations')?.select('donor_id, title')?.eq('id', proofData?.donation_id)?.single()

      if (donation?.data) {
        await supabase?.from('notifications')?.insert([{
            user_id: donation?.data?.donor_id,
            type: 'impact_proof_uploaded',
            title: 'Impact Proof Uploaded',
            message: `NGO has uploaded proof of impact for your donation: ${donation?.data?.title}`
          }])
      }

      return { data, error: null }
    } catch (error) {
      console.error('Error creating impact proof:', error)
      return { data: null, error }
    }
  },

  // Upload proof documents
  async uploadProofDocuments(files, proofId, ngoId) {
    try {
      const uploadPromises = files?.map(async (file, index) => {
        const fileExt = file?.name?.split('.')?.pop()
        const fileName = `${ngoId}/${proofId}/${Date.now()}_${index}.${fileExt}`
        
        const { data, error } = await supabase?.storage?.from('proof-documents')?.upload(fileName, file)

        if (error) throw error
        
        const { data: { publicUrl } } = supabase?.storage?.from('proof-documents')?.getPublicUrl(fileName)

        return publicUrl
      })

      const documentUrls = await Promise.all(uploadPromises)
      return { data: documentUrls, error: null }
    } catch (error) {
      console.error('Error uploading proof documents:', error)
      return { data: null, error }
    }
  },

  // Get user's donation impact timeline
  async getUserImpactTimeline(userId) {
    try {
      const { data, error } = await supabase?.from('donations')?.select(`
          id,
          title,
          category,
          status,
          created_at,
          delivered_at,
          completed_at,
          impact_proofs (
            id,
            proof_type,
            title,
            beneficiary_count,
            date_of_proof,
            status
          ),
          ngo_profiles!donations_ngo_id_fkey (
            organization_name
          )
        `)?.eq('donor_id', userId)?.neq('status', 'pending')?.order('created_at', { ascending: false })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Error fetching impact timeline:', error)
      return { data: null, error }
    }
  },

  // Get aggregated impact metrics for user
  async getUserImpactMetrics(userId) {
    try {
      const { data, error } = await supabase?.from('impact_proofs')?.select(`
          beneficiary_count,
          impact_metrics,
          donations!impact_proofs_donation_id_fkey (
            donor_id
          )
        `)?.eq('donations.donor_id', userId)?.eq('status', 'approved')

      if (error) throw error

      const metrics = {
        totalBeneficiaries: data?.reduce((sum, proof) => sum + (proof?.beneficiary_count || 0), 0) || 0,
        totalProofs: data?.length || 0,
        impactScore: Math.min(data?.length * 50 + (data?.reduce((sum, proof) => sum + (proof?.beneficiary_count || 0), 0) || 0), 1000),
        categories: {}
      }

      // Calculate category-wise impact
      data?.forEach(proof => {
        if (proof?.impact_metrics?.category) {
          if (!metrics?.categories?.[proof?.impact_metrics?.category]) {
            metrics.categories[proof.impact_metrics.category] = 0
          }
          metrics.categories[proof.impact_metrics.category] += proof?.beneficiary_count || 0
        }
      })

      return { data: metrics, error: null }
    } catch (error) {
      console.error('Error fetching impact metrics:', error)
      return { data: null, error }
    }
  },

  // Get compliance tracking items for NGO
  async getComplianceTrackingItems(ngoId) {
    try {
      const { data, error } = await supabase?.from('donations')?.select(`
          id,
          title,
          category,
          delivered_at,
          status,
          user_profiles!donations_donor_id_fkey (
            full_name
          ),
          impact_proofs (
            id,
            status,
            created_at
          )
        `)?.eq('ngo_id', ngoId)?.eq('status', 'delivered')?.order('delivered_at', { ascending: true })

      if (error) throw error

      // Filter items that need proof upload
      const itemsNeedingProof = data?.filter(donation => {
        const hasApprovedProof = donation?.impact_proofs?.some(proof => proof?.status === 'approved')
        const deliveredDate = new Date(donation?.delivered_at)
        const daysSinceDelivery = Math.floor((new Date() - deliveredDate) / (1000 * 60 * 60 * 24))
        
        return !hasApprovedProof && daysSinceDelivery <= 30 // 30-day compliance window
      })

      return { data: itemsNeedingProof, error: null }
    } catch (error) {
      console.error('Error fetching compliance tracking items:', error)
      return { data: null, error }
    }
  }
}