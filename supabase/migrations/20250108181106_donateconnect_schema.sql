-- Location: supabase/migrations/20250108181106_donateconnect_schema.sql
-- Schema Analysis: No existing schema found
-- Integration Type: Complete new schema creation
-- Dependencies: None - creating from scratch

-- 1. Create custom types
CREATE TYPE public.user_role AS ENUM ('donor', 'ngo', 'funding_organization', 'admin');
CREATE TYPE public.verification_status AS ENUM ('pending', 'verified', 'rejected', 'suspended');
CREATE TYPE public.donation_status AS ENUM ('pending', 'approved', 'rejected', 'delivered', 'completed');
CREATE TYPE public.item_condition AS ENUM ('new', 'like_new', 'good', 'fair', 'needs_repair');
CREATE TYPE public.donation_category AS ENUM ('food', 'clothing', 'education', 'medical', 'electronics', 'furniture', 'toys', 'books', 'other');
CREATE TYPE public.urgency_level AS ENUM ('low', 'medium', 'high', 'critical');
CREATE TYPE public.need_status AS ENUM ('active', 'fulfilled', 'expired', 'cancelled');
CREATE TYPE public.proof_type AS ENUM ('delivery', 'distribution', 'usage', 'impact');
CREATE TYPE public.proof_status AS ENUM ('pending', 'approved', 'rejected', 'requested');

-- 2. Core user table (intermediary between auth.users and app data)
CREATE TABLE public.user_profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    email TEXT NOT NULL UNIQUE,
    full_name TEXT NOT NULL,
    phone_number TEXT,
    role public.user_role DEFAULT 'donor'::public.user_role,
    verification_status public.verification_status DEFAULT 'pending'::public.verification_status,
    address TEXT,
    city TEXT,
    state TEXT,
    pincode TEXT,
    profile_image_url TEXT,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 3. NGO profiles with additional verification details
CREATE TABLE public.ngo_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    organization_name TEXT NOT NULL,
    registration_number TEXT UNIQUE NOT NULL,
    organization_type TEXT,
    established_year INTEGER,
    description TEXT,
    website TEXT,
    logo_url TEXT,
    certificate_url TEXT,
    focus_areas TEXT[],
    target_beneficiaries TEXT,
    geographical_reach TEXT,
    compliance_score INTEGER DEFAULT 0,
    verification_documents JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 4. Funding organization profiles
CREATE TABLE public.funding_organization_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    organization_name TEXT NOT NULL,
    organization_type TEXT,
    csr_registration TEXT,
    annual_budget DECIMAL(15,2),
    focus_sectors TEXT[],
    funding_criteria JSONB,
    contact_person TEXT,
    website TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 5. NGO needs/requirements
CREATE TABLE public.ngo_needs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    ngo_id UUID REFERENCES public.ngo_profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category public.donation_category NOT NULL,
    target_quantity INTEGER,
    received_quantity INTEGER DEFAULT 0,
    unit TEXT,
    urgency public.urgency_level DEFAULT 'medium'::public.urgency_level,
    status public.need_status DEFAULT 'active'::public.need_status,
    expiry_date DATE,
    location_preference TEXT,
    specific_requirements JSONB,
    images TEXT[],
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 6. Donation items
CREATE TABLE public.donations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donor_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    ngo_id UUID REFERENCES public.ngo_profiles(id) ON DELETE SET NULL,
    need_id UUID REFERENCES public.ngo_needs(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT,
    category public.donation_category NOT NULL,
    condition public.item_condition DEFAULT 'good'::public.item_condition,
    quantity INTEGER DEFAULT 1,
    unit TEXT,
    estimated_value DECIMAL(10,2),
    pickup_address TEXT,
    pickup_city TEXT,
    pickup_state TEXT,
    pickup_pincode TEXT,
    availability_start DATE,
    availability_end DATE,
    special_instructions TEXT,
    images TEXT[],
    status public.donation_status DEFAULT 'pending'::public.donation_status,
    matched_at TIMESTAMPTZ,
    delivered_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 7. Impact tracking and proof verification
CREATE TABLE public.impact_proofs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID REFERENCES public.donations(id) ON DELETE CASCADE,
    ngo_id UUID REFERENCES public.ngo_profiles(id) ON DELETE CASCADE,
    proof_type public.proof_type NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    proof_documents TEXT[],
    proof_images TEXT[],
    video_url TEXT,
    beneficiary_count INTEGER,
    impact_metrics JSONB,
    location TEXT,
    date_of_proof DATE,
    status public.proof_status DEFAULT 'pending'::public.proof_status,
    reviewer_notes TEXT,
    verified_at TIMESTAMPTZ,
    verified_by UUID REFERENCES public.user_profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 8. Donation matching and recommendations
CREATE TABLE public.donation_matches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID REFERENCES public.donations(id) ON DELETE CASCADE,
    ngo_id UUID REFERENCES public.ngo_profiles(id) ON DELETE CASCADE,
    need_id UUID REFERENCES public.ngo_needs(id) ON DELETE CASCADE,
    match_score INTEGER DEFAULT 0,
    distance_km DECIMAL(8,2),
    is_auto_matched BOOLEAN DEFAULT false,
    donor_approved BOOLEAN DEFAULT false,
    ngo_approved BOOLEAN DEFAULT false,
    matched_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
    approved_at TIMESTAMPTZ
);

-- 9. Communication messages
CREATE TABLE public.messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sender_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    recipient_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    donation_id UUID REFERENCES public.donations(id) ON DELETE CASCADE,
    subject TEXT,
    content TEXT NOT NULL,
    attachments TEXT[],
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 10. System notifications
CREATE TABLE public.notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    type TEXT NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    data JSONB,
    is_read BOOLEAN DEFAULT false,
    read_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 11. User activity feed
CREATE TABLE public.user_activities (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    activity_type TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    metadata JSONB,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 12. Donation reviews and feedback
CREATE TABLE public.donation_reviews (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    donation_id UUID REFERENCES public.donations(id) ON DELETE CASCADE,
    reviewer_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    reviewee_id UUID REFERENCES public.user_profiles(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    review_text TEXT,
    created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- 13. Essential indexes for performance
CREATE INDEX idx_user_profiles_role ON public.user_profiles(role);
CREATE INDEX idx_user_profiles_verification_status ON public.user_profiles(verification_status);
CREATE INDEX idx_ngo_profiles_user_id ON public.ngo_profiles(user_id);
CREATE INDEX idx_funding_organization_profiles_user_id ON public.funding_organization_profiles(user_id);
CREATE INDEX idx_ngo_needs_ngo_id ON public.ngo_needs(ngo_id);
CREATE INDEX idx_ngo_needs_category ON public.ngo_needs(category);
CREATE INDEX idx_ngo_needs_status ON public.ngo_needs(status);
CREATE INDEX idx_donations_donor_id ON public.donations(donor_id);
CREATE INDEX idx_donations_ngo_id ON public.donations(ngo_id);
CREATE INDEX idx_donations_category ON public.donations(category);
CREATE INDEX idx_donations_status ON public.donations(status);
CREATE INDEX idx_impact_proofs_donation_id ON public.impact_proofs(donation_id);
CREATE INDEX idx_impact_proofs_ngo_id ON public.impact_proofs(ngo_id);
CREATE INDEX idx_donation_matches_donation_id ON public.donation_matches(donation_id);
CREATE INDEX idx_donation_matches_ngo_id ON public.donation_matches(ngo_id);
CREATE INDEX idx_messages_sender_id ON public.messages(sender_id);
CREATE INDEX idx_messages_recipient_id ON public.messages(recipient_id);
CREATE INDEX idx_notifications_user_id ON public.notifications(user_id);
CREATE INDEX idx_user_activities_user_id ON public.user_activities(user_id);

-- 14. Create storage buckets for file uploads
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
    ('donation-images', 'donation-images', true, 10485760, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
    ('proof-documents', 'proof-documents', false, 52428800, ARRAY['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']),
    ('user-profiles', 'user-profiles', false, 5242880, ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/jpg']),
    ('ngo-documents', 'ngo-documents', false, 52428800, ARRAY['application/pdf', 'image/jpeg', 'image/png']);

-- 15. Enable RLS on all tables
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngo_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.funding_organization_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ngo_needs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.impact_proofs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.donation_reviews ENABLE ROW LEVEL SECURITY;

-- 16. Helper functions for RLS policies
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid UUID)
RETURNS TEXT
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT role::TEXT FROM public.user_profiles up WHERE up.id = user_uuid;
$$;

CREATE OR REPLACE FUNCTION public.is_admin_user()
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT EXISTS (
    SELECT 1 FROM auth.users au
    WHERE au.id = auth.uid() 
    AND (au.raw_user_meta_data->>'role' = 'admin')
);
$$;

CREATE OR REPLACE FUNCTION public.get_ngo_for_user(user_uuid UUID)
RETURNS UUID
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
SELECT np.id FROM public.ngo_profiles np WHERE np.user_id = user_uuid;
$$;

-- 17. Create RLS policies using Pattern 1 and Pattern 2

-- Pattern 1: Core user table - user_profiles
CREATE POLICY "users_manage_own_profile"
ON public.user_profiles
FOR ALL
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- Pattern 2: Simple user ownership for other tables
CREATE POLICY "users_manage_own_ngo_profile"
ON public.ngo_profiles
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_funding_profile"
ON public.funding_organization_profiles
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_donations"
ON public.donations
FOR ALL
TO authenticated
USING (donor_id = auth.uid())
WITH CHECK (donor_id = auth.uid());

-- NGO needs policies - NGOs manage their own needs, others can view active needs
CREATE POLICY "ngos_manage_own_needs"
ON public.ngo_needs
FOR ALL
TO authenticated
USING (ngo_id = public.get_ngo_for_user(auth.uid()))
WITH CHECK (ngo_id = public.get_ngo_for_user(auth.uid()));

CREATE POLICY "users_view_active_needs"
ON public.ngo_needs
FOR SELECT
TO authenticated
USING (status = 'active'::public.need_status);

-- Donation visibility - donors see their donations, NGOs see donations to them
CREATE POLICY "ngos_view_donations_to_them"
ON public.donations
FOR SELECT
TO authenticated
USING (ngo_id = public.get_ngo_for_user(auth.uid()));

CREATE POLICY "all_users_view_pending_donations"
ON public.donations
FOR SELECT
TO authenticated
USING (status = 'pending'::public.donation_status);

-- Impact proofs - NGOs manage their proofs, donors can view proofs of their donations
CREATE POLICY "ngos_manage_own_proofs"
ON public.impact_proofs
FOR ALL
TO authenticated
USING (ngo_id = public.get_ngo_for_user(auth.uid()))
WITH CHECK (ngo_id = public.get_ngo_for_user(auth.uid()));

CREATE POLICY "donors_view_proofs_of_their_donations"
ON public.impact_proofs
FOR SELECT
TO authenticated
USING (
    donation_id IN (
        SELECT d.id FROM public.donations d WHERE d.donor_id = auth.uid()
    )
);

-- Messages - users can see messages they sent or received
CREATE POLICY "users_manage_own_messages"
ON public.messages
FOR ALL
TO authenticated
USING (sender_id = auth.uid() OR recipient_id = auth.uid())
WITH CHECK (sender_id = auth.uid());

-- Notifications and activities - users manage their own
CREATE POLICY "users_manage_own_notifications"
ON public.notifications
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

CREATE POLICY "users_manage_own_activities"
ON public.user_activities
FOR ALL
TO authenticated
USING (user_id = auth.uid())
WITH CHECK (user_id = auth.uid());

-- Reviews - users can create reviews and view reviews about them
CREATE POLICY "users_manage_own_reviews"
ON public.donation_reviews
FOR ALL
TO authenticated
USING (reviewer_id = auth.uid() OR reviewee_id = auth.uid())
WITH CHECK (reviewer_id = auth.uid());

-- Donation matches - visible to involved parties
CREATE POLICY "users_view_relevant_matches"
ON public.donation_matches
FOR SELECT
TO authenticated
USING (
    donation_id IN (
        SELECT d.id FROM public.donations d WHERE d.donor_id = auth.uid()
    )
    OR ngo_id = public.get_ngo_for_user(auth.uid())
);

CREATE POLICY "system_create_matches"
ON public.donation_matches
FOR INSERT
TO authenticated
WITH CHECK (true);

-- 18. Storage RLS policies
CREATE POLICY "users_upload_own_profile_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'user-profiles'
    AND owner = auth.uid()
    AND (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "users_view_own_profile_images"
ON storage.objects
FOR SELECT
TO authenticated
USING (
    bucket_id = 'user-profiles'
    AND owner = auth.uid()
);

CREATE POLICY "users_upload_donation_images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'donation-images'
    AND owner = auth.uid()
);

CREATE POLICY "public_view_donation_images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'donation-images');

CREATE POLICY "ngos_manage_proof_documents"
ON storage.objects
FOR ALL
TO authenticated
USING (
    bucket_id = 'proof-documents'
    AND owner = auth.uid()
)
WITH CHECK (
    bucket_id = 'proof-documents'
    AND owner = auth.uid()
);

CREATE POLICY "ngos_manage_ngo_documents"
ON storage.objects
FOR ALL
TO authenticated
USING (
    bucket_id = 'ngo-documents'
    AND owner = auth.uid()
)
WITH CHECK (
    bucket_id = 'ngo-documents'
    AND owner = auth.uid()
);

-- 19. Functions for automatic profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SECURITY DEFINER
LANGUAGE plpgsql
AS $$
BEGIN
    INSERT INTO public.user_profiles (id, email, full_name, role)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
        COALESCE(NEW.raw_user_meta_data->>'role', 'donor')::public.user_role
    );
    RETURN NEW;
END;
$$;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 20. Functions for activity logging
CREATE OR REPLACE FUNCTION public.log_user_activity(
    activity_user_id UUID,
    activity_type_param TEXT,
    activity_title TEXT,
    activity_description TEXT DEFAULT NULL,
    activity_metadata JSONB DEFAULT NULL
)
RETURNS VOID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
    INSERT INTO public.user_activities (user_id, activity_type, title, description, metadata)
    VALUES (activity_user_id, activity_type_param, activity_title, activity_description, activity_metadata);
END;
$$;

-- 21. Mock data for development and testing
DO $$
DECLARE
    donor_auth_id UUID := gen_random_uuid();
    ngo_auth_id UUID := gen_random_uuid();
    funding_auth_id UUID := gen_random_uuid();
    ngo_profile_id UUID := gen_random_uuid();
    need_id UUID := gen_random_uuid();
    donation_id UUID := gen_random_uuid();
BEGIN
    -- Create auth users with required fields for different roles
    INSERT INTO auth.users (
        id, instance_id, aud, role, email, encrypted_password, email_confirmed_at,
        created_at, updated_at, raw_user_meta_data, raw_app_meta_data,
        is_sso_user, is_anonymous, confirmation_token, confirmation_sent_at,
        recovery_token, recovery_sent_at, email_change_token_new, email_change,
        email_change_sent_at, email_change_token_current, email_change_confirm_status,
        reauthentication_token, reauthentication_sent_at, phone, phone_change,
        phone_change_token, phone_change_sent_at
    ) VALUES
        (donor_auth_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'donor@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "John Donor", "role": "donor"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (ngo_auth_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'ngo@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "Green Earth Foundation", "role": "ngo"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null),
        (funding_auth_id, '00000000-0000-0000-0000-000000000000', 'authenticated', 'authenticated',
         'funding@example.com', crypt('password123', gen_salt('bf', 10)), now(), now(), now(),
         '{"full_name": "TechCorp Foundation", "role": "funding_organization"}'::jsonb, '{"provider": "email", "providers": ["email"]}'::jsonb,
         false, false, '', null, '', null, '', '', null, '', 0, '', null, null, '', '', null);

    -- Update user profiles with verification status
    UPDATE public.user_profiles 
    SET 
        verification_status = 'verified'::public.verification_status,
        phone_number = '+91-9876543210',
        address = 'Andheri West, Mumbai',
        city = 'Mumbai',
        state = 'Maharashtra',
        pincode = '400058'
    WHERE id = donor_auth_id;

    UPDATE public.user_profiles 
    SET 
        verification_status = 'verified'::public.verification_status,
        phone_number = '+91-9876543211',
        address = 'Bandra East, Mumbai',
        city = 'Mumbai',
        state = 'Maharashtra',
        pincode = '400051'
    WHERE id = ngo_auth_id;

    -- Create NGO profile
    INSERT INTO public.ngo_profiles (id, user_id, organization_name, registration_number, organization_type, established_year, description, focus_areas, target_beneficiaries, geographical_reach, compliance_score)
    VALUES (
        ngo_profile_id,
        ngo_auth_id,
        'Green Earth Foundation',
        'NGO/2019/0012345',
        'Environmental Conservation',
        2019,
        'Working towards environmental conservation and sustainable development for communities across Mumbai',
        ARRAY['Environment', 'Education', 'Community Development'],
        'Urban poor, School children, Local communities',
        'Mumbai Metropolitan Region',
        98
    );

    -- Create funding organization profile
    INSERT INTO public.funding_organization_profiles (user_id, organization_name, organization_type, csr_registration, annual_budget, focus_sectors)
    VALUES (
        funding_auth_id,
        'TechCorp Foundation',
        'Corporate Foundation',
        'CSR00001234',
        5000000.00,
        ARRAY['Education', 'Healthcare', 'Environment']
    );

    -- Create NGO needs
    INSERT INTO public.ngo_needs (id, ngo_id, title, description, category, target_quantity, unit, urgency, expiry_date, location_preference)
    VALUES
        (need_id, ngo_profile_id, 'Emergency Food Supplies', 'Urgent need for rice, dal, and cooking oil for flood-affected families. We are currently supporting 150 families.', 'food'::public.donation_category, 500, 'kg', 'high'::public.urgency_level, '2025-02-15', 'Mumbai'),
        (gen_random_uuid(), ngo_profile_id, 'School Books & Stationery', 'Required for our education program serving 200 underprivileged children.', 'education'::public.donation_category, 200, 'sets', 'medium'::public.urgency_level, '2025-03-01', 'Mumbai Suburbs');

    -- Create sample donations
    INSERT INTO public.donations (id, donor_id, title, description, category, condition, quantity, unit, estimated_value, pickup_address, pickup_city, pickup_state, pickup_pincode, availability_start, availability_end)
    VALUES
        (donation_id, donor_auth_id, 'Rice Bags', 'Good quality basmati rice bags, 50kg total', 'food'::public.donation_category, 'new'::public.item_condition, 50, 'kg', 2500.00, 'Andheri West, Mumbai', 'Mumbai', 'Maharashtra', '400058', CURRENT_DATE, CURRENT_DATE + INTERVAL '30 days'),
        (gen_random_uuid(), donor_auth_id, 'Winter Clothes', 'Warm clothes for winter season including blankets and jackets', 'clothing'::public.donation_category, 'good'::public.item_condition, 25, 'pieces', 5000.00, 'Andheri West, Mumbai', 'Mumbai', 'Maharashtra', '400058', CURRENT_DATE, CURRENT_DATE + INTERVAL '15 days');

    -- Create donation match
    INSERT INTO public.donation_matches (donation_id, ngo_id, need_id, match_score, distance_km, is_auto_matched)
    VALUES (donation_id, ngo_profile_id, need_id, 95, 12.5, true);

    -- Create sample activities
    INSERT INTO public.user_activities (user_id, activity_type, title, description)
    VALUES
        (donor_auth_id, 'donation_created', 'New Donation Posted', 'Posted rice bags donation for food relief'),
        (ngo_auth_id, 'need_posted', 'Emergency Need Posted', 'Posted urgent need for food supplies'),
        (donor_auth_id, 'profile_updated', 'Profile Updated', 'Updated contact information and address');

    -- Create sample notifications
    INSERT INTO public.notifications (user_id, type, title, message)
    VALUES
        (donor_auth_id, 'match_found', 'Donation Matched!', 'Your rice bags donation has been matched with Green Earth Foundation'),
        (ngo_auth_id, 'new_donation', 'New Donation Available', 'A donor has posted rice bags that match your emergency food need'),
        (donor_auth_id, 'verification_complete', 'Profile Verified', 'Your profile has been successfully verified');

EXCEPTION
    WHEN OTHERS THEN
        RAISE NOTICE 'Mock data creation error: %', SQLERRM;
END $$;