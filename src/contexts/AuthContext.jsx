import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [userProfile, setUserProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // ⚠️ PROTECTED FUNCTION - DO NOT MODIFY OR ADD ASYNC OPERATIONS
  // This is a Supabase auth state change listener that must remain synchronous
  const handleAuthStateChange = (event, session) => {
    // SYNC OPERATIONS ONLY - NO ASYNC/AWAIT ALLOWED
    if (session?.user) {
      setUser(session?.user)
      // Fetch user profile when user is authenticated
      fetchUserProfile(session?.user?.id)
    } else {
      setUser(null)
      setUserProfile(null)
    }
    setLoading(false)
  }

  // Fetch user profile data
  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.select(`
          *,
          ngo_profiles (*),
          funding_organization_profiles (*)
        `)?.eq('id', userId)?.single()

      if (error) {
        console.error('Error fetching user profile:', error)
        return
      }

      setUserProfile(data)
      
      // Update localStorage for compatibility with existing code
      localStorage.setItem('isAuthenticated', 'true')
      localStorage.setItem('userRole', data?.role || 'donor')
    } catch (error) {
      console.error('Error in fetchUserProfile:', error)
    }
  }

  useEffect(() => {
    // Get initial session - Use Promise chain
    supabase?.auth?.getSession()?.then(({ data: { session } }) => {
        if (session?.user) {
          setUser(session?.user)
          fetchUserProfile(session?.user?.id)
        }
        setLoading(false)
      })

    const { data: { subscription } } = supabase?.auth?.onAuthStateChange(handleAuthStateChange)

    return () => subscription?.unsubscribe()
  }, [])

  // Sign up function
  const signUp = async (email, password, userData = {}) => {
    try {
      const { data, error } = await supabase?.auth?.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData?.full_name,
            role: userData?.role || 'donor'
          }
        }
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Sign up error:', error)
      return { data: null, error }
    }
  }

  // Sign in function
  const signIn = async (email, password) => {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      })

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error('Sign in error:', error)
      return { data: null, error }
    }
  }

  // Sign out function
  const signOut = async () => {
    try {
      const { error } = await supabase?.auth?.signOut()
      
      // Clear localStorage for compatibility
      localStorage.removeItem('isAuthenticated')
      localStorage.removeItem('userRole')
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Sign out error:', error)
      return { error }
    }
  }

  // Update user profile
  const updateProfile = async (profileData) => {
    try {
      const { data, error } = await supabase?.from('user_profiles')?.update(profileData)?.eq('id', user?.id)?.select()?.single()

      if (error) throw error
      
      setUserProfile(data)
      return { data, error: null }
    } catch (error) {
      console.error('Update profile error:', error)
      return { data: null, error }
    }
  }

  // Reset password
  const resetPassword = async (email) => {
    try {
      const { error } = await supabase?.auth?.resetPasswordForEmail(email)
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Reset password error:', error)
      return { error }
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
    fetchUserProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}