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
        
        // If profile doesn't exist, try to create it from auth user data
        if (error.code === 'PGRST116') {
          console.log('Profile not found, creating from auth data...');
          const { data: authUser } = await supabase.auth.getUser();
          if (authUser?.user) {
            const { error: createError } = await supabase.from('user_profiles').insert({
              id: authUser.user.id,
              email: authUser.user.email,
              full_name: authUser.user.user_metadata?.full_name || authUser.user.email.split('@')[0],
              role: authUser.user.user_metadata?.role || 'donor'
            });
            
            if (!createError) {
              // Retry fetching the profile
              return await fetchUserProfile(userId);
            }
          }
        }
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

    // Listen for profile updates from DataSync
    const handleProfileUpdate = (event) => {
      console.log('Profile update received:', event.detail);
      if (event.detail?.new) {
        setUserProfile(event.detail.new);
      }
    };

    window.addEventListener('profileUpdated', handleProfileUpdate);

    return () => {
      subscription?.unsubscribe();
      window.removeEventListener('profileUpdated', handleProfileUpdate);
    };
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
      });

      if (error) {
        // Check if user already exists
        if (error.message === 'User already registered') {
          // Try to sign in with the existing credentials
          try {
            const { data: signInData, error: signInError } = await supabase?.auth?.signInWithPassword({
              email,
              password
            });

            if (signInError) {
              return { 
                data: null, 
                error: { 
                  message: 'User already exists. Please sign in instead, or use a different email address.' 
                } 
              };
            }

            // If sign-in succeeds, check if profile exists
            if (signInData?.user) {
              try {
                const { data: existingProfile } = await supabase?.from('user_profiles')?.select('*')?.eq('id', signInData.user.id)?.single();
                
                if (!existingProfile) {
                  // Create profile if it doesn't exist
                  await supabase?.from('user_profiles')?.insert({
                    id: signInData.user.id,
                    email: signInData.user.email,
                    full_name: userData?.full_name,
                    role: userData?.role || 'donor',
                    created_at: new Date().toISOString()
                  });
                }
              } catch (profileError) {
                console.error('Profile check/creation error:', profileError);
              }
            }

            return { data: signInData, error: null };
          } catch (signInError) {
            return { 
              data: null, 
              error: { 
                message: 'User already exists. Please sign in instead, or use a different email address.' 
              } 
            };
          }
        }
        
        throw error;
      }

      // If user is created successfully, create profile and return user data
      if (data?.user) {
        try {
          // Check if profile already exists
          const { data: existingProfile } = await supabase?.from('user_profiles')?.select('*')?.eq('id', data.user.id)?.single();
          
          if (!existingProfile) {
            // Create profile only if it doesn't exist
            const { error: profileError } = await supabase?.from('user_profiles')?.insert({
              id: data.user.id,
              email: data.user.email,
              full_name: userData?.full_name,
              role: userData?.role || 'donor',
              created_at: new Date().toISOString()
            });

            if (profileError) {
              console.error('Profile creation error:', profileError);
            }
          }
        } catch (profileError) {
          console.error('Profile check/creation error:', profileError);
        }

        // Return user data without trying to auto sign-in
        return { data: { user: data.user }, error: null };
      }

      return { data, error: null };
    } catch (error) {
      console.error('Sign up error:', error);
      return { data: null, error };
    }
  };

  // Add a function to check email verification status
  const checkEmailVerification = async (email) => {
    try {
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password: 'dummy-password-to-check-status'
      })
      
      if (error?.message?.includes('Invalid login credentials')) {
        // This means the email exists but password is wrong
        return { verified: true, error: null }
      }
      
      return { verified: false, error }
    } catch (error) {
      return { verified: false, error }
    }
  }

  // Add a function to resend confirmation email
  const resendConfirmationEmail = async (email) => {
    try {
      const { error } = await supabase?.auth?.resend({
        type: 'signup',
        email: email
      })
      
      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error('Resend confirmation error:', error)
      return { error }
    }
  }

  // Sign in function
  const signIn = async (email, password) => {
    try {
      console.log('Attempting sign in with:', { email, password: password ? '***' : 'undefined' });
      
      const { data, error } = await supabase?.auth?.signInWithPassword({
        email,
        password
      });

      console.log('Sign in response:', { data, error });

      if (error) {
        console.error('Sign in error details:', error);
        throw error;
      }
      
      // Wait for user profile to be fetched if user exists
      if (data?.user) {
        try {
          await fetchUserProfile(data.user.id);
          console.log('User profile loaded successfully');
        } catch (profileError) {
          console.warn('Profile fetch failed, but login succeeded:', profileError);
        }
      }
      
      console.log('Sign in successful:', data);
      return { data, error: null };
    } catch (error) {
      console.error('Sign in error:', error);
      return { data: null, error };
    }
  };

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

  // Helper function to ensure user is fully authenticated with profile
  const ensureUserReady = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (user && !userProfile) {
        await fetchUserProfile(user.id);
      }
      return user && userProfile;
    } catch (error) {
      console.error('Error ensuring user ready:', error);
      return false;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    updateProfile,
    resetPassword,
    fetchUserProfile,
    checkEmailVerification,
    resendConfirmationEmail,
    ensureUserReady
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}