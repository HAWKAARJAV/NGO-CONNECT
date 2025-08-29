import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchAndFilters from './components/SearchAndFilters';
import NGOCard from './components/NGOCard';
import NGOMap from './components/NGOMap';
import NGOProfileModal from './components/NGOProfileModal';
import { NGOGridSkeleton, MapSkeleton } from './components/LoadingSkeletons';

const NGODiscoveryAndMatching = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedNGO, setSelectedNGO] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [profileModalNGO, setProfileModalNGO] = useState(null);

  // Search and Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRadius, setSelectedRadius] = useState('25');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVerificationStatus, setSelectedVerificationStatus] = useState('all');
  const [selectedUrgency, setSelectedUrgency] = useState('all');

  // Mock NGO Data
  const [allNGOs] = useState([
    {
      id: 1,
      name: "Green Earth Foundation",
      category: "Environment",
      description: "Dedicated to environmental conservation and sustainable development through community-driven initiatives.",
      fullDescription: `Green Earth Foundation has been working tirelessly for over 8 years to protect our environment and promote sustainable living practices. Our mission is to create awareness about climate change, organize tree plantation drives, and implement waste management solutions in urban and rural communities.\n\nWe believe that small actions can lead to significant environmental impact. Through our various programs, we have successfully planted over 50,000 trees, cleaned 200+ water bodies, and educated more than 10,000 people about environmental conservation.\n\nOur team consists of dedicated environmentalists, volunteers, and community leaders who work together to create a greener and more sustainable future for generations to come.`,
      profileImage: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=400&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=400&fit=crop",
      verificationStatus: "verified",
      verificationDate: "15/03/2024",
      distance: 2.3,
      rating: 4.8,
      totalDonations: 1247,
      peopleHelped: 5680,
      yearsActive: 8,
      email: "contact@greenearthfoundation.org",
      phone: "+91 98765 43210",
      address: "123 Green Street, Eco Park, New Delhi - 110001",
      website: "www.greenearthfoundation.org",
      urgentNeeds: [
        { item: "Tree Saplings", quantity: "500 units", urgency: "high", description: "Native tree saplings for monsoon plantation drive", quantityNeeded: 500, quantityReceived: 120 },
        { item: "Gardening Tools", quantity: "50 sets", urgency: "medium", description: "Basic gardening tools for community volunteers", quantityNeeded: 50, quantityReceived: 15 }
      ],
      allNeeds: [
        { item: "Tree Saplings", quantity: "500 units", urgency: "high", description: "Native tree saplings for monsoon plantation drive", quantityNeeded: 500, quantityReceived: 120 },
        { item: "Gardening Tools", quantity: "50 sets", urgency: "medium", description: "Basic gardening tools for community volunteers", quantityNeeded: 50, quantityReceived: 15 },
        { item: "Organic Fertilizer", quantity: "200 kg", urgency: "low", description: "Organic fertilizer for tree maintenance", quantityNeeded: 200, quantityReceived: 0 },
        { item: "Water Containers", quantity: "100 units", urgency: "medium", description: "Water containers for sapling irrigation", quantityNeeded: 100, quantityReceived: 30 }
      ],
      isFavorited: false,
      impactStories: [
        {
          title: "Community Forest Initiative",
          description: "Successfully created a 5-acre community forest with local residents, providing green space and improving air quality for over 2000 families.",
          image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&h=300&fit=crop",
          date: "March 2024",
          beneficiaries: 2000
        },
        {
          title: "River Cleanup Drive",
          description: "Organized a massive cleanup drive that removed 2 tons of waste from the Yamuna river, involving 500+ volunteers.",
          image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=300&fit=crop",
          date: "January 2024",
          beneficiaries: 500
        }
      ],
      verificationDocuments: [
        { name: "NGO Registration Certificate", type: "Government Document" },
        { name: "12A Tax Exemption Certificate", type: "Tax Document" },
        { name: "80G Certificate", type: "Donation Receipt Authorization" },
        { name: "FCRA Registration", type: "Foreign Contribution Regulation" }
      ],
      certifications: [
        { name: "ISO 14001:2015", issuer: "Environmental Management", validUntil: "March 2026" },
        { name: "GuideStar India Seal", issuer: "Transparency Certification", validUntil: "December 2024" }
      ]
    },
    {
      id: 2,
      name: "Hope Children's Trust",
      category: "Child Welfare",
      description: "Providing education, healthcare, and shelter to underprivileged children across urban slums.",
      fullDescription: `Hope Children's Trust was established in 2015 with a vision to ensure every child has access to quality education, healthcare, and a safe environment to grow. We work primarily in urban slums where children face multiple challenges including poverty, lack of educational opportunities, and health issues.\n\nOur comprehensive programs include running learning centers, providing nutritional support, healthcare services, and skill development training for older children. We have successfully supported over 3,000 children in their educational journey and provided healthcare services to more than 5,000 children.\n\nWe believe that investing in children today creates a better tomorrow for our society. Our dedicated team of educators, healthcare professionals, and social workers work round the clock to ensure children receive the support they need to break the cycle of poverty.`,
      profileImage: "https://images.unsplash.com/photo-1544717297-fa95b6ee9643?w=400&h=400&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=400&fit=crop",
      verificationStatus: "verified",
      verificationDate: "22/02/2024",
      distance: 4.7,
      rating: 4.9,
      totalDonations: 892,
      peopleHelped: 3240,
      yearsActive: 9,
      email: "info@hopechildrenstrust.org",
      phone: "+91 98765 43211",
      address: "456 Hope Lane, Children's Colony, Mumbai - 400001",
      website: "www.hopechildrenstrust.org",
      urgentNeeds: [
        { item: "School Supplies", quantity: "200 sets", urgency: "critical", description: "Notebooks, pencils, and basic stationery for new academic year", quantityNeeded: 200, quantityReceived: 45 },
        { item: "Nutritional Supplements", quantity: "100 bottles", urgency: "high", description: "Vitamin and mineral supplements for malnourished children", quantityNeeded: 100, quantityReceived: 20 }
      ],
      allNeeds: [
        { item: "School Supplies", quantity: "200 sets", urgency: "critical", description: "Notebooks, pencils, and basic stationery for new academic year", quantityNeeded: 200, quantityReceived: 45 },
        { item: "Nutritional Supplements", quantity: "100 bottles", urgency: "high", description: "Vitamin and mineral supplements for malnourished children", quantityNeeded: 100, quantityReceived: 20 },
        { item: "Educational Books", quantity: "500 books", urgency: "medium", description: "Age-appropriate books for library and reading programs", quantityNeeded: 500, quantityReceived: 150 },
        { item: "Sports Equipment", quantity: "50 sets", urgency: "low", description: "Basic sports equipment for physical activities", quantityNeeded: 50, quantityReceived: 10 }
      ],
      isFavorited: true,
      impactStories: [
        {
          title: "Education Success Stories",
          description: "15 children from our program successfully completed their 12th grade and secured admission in prestigious colleges with scholarship support.",
          image: "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=600&h=300&fit=crop",
          date: "April 2024",
          beneficiaries: 15
        },
        {
          title: "Health Camp Initiative",
          description: "Conducted free health checkups for 800 children, identifying and treating various health issues early.",
          image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=300&fit=crop",
          date: "February 2024",
          beneficiaries: 800
        }
      ],
      verificationDocuments: [
        { name: "NGO Registration Certificate", type: "Government Document" },
        { name: "12A Tax Exemption Certificate", type: "Tax Document" },
        { name: "80G Certificate", type: "Donation Receipt Authorization" },
        { name: "Child Welfare Committee Approval", type: "Specialized License" }
      ],
      certifications: [
        { name: "Child Protection Policy Certified", issuer: "UNICEF India", validUntil: "June 2025" },
        { name: "Education Quality Assurance", issuer: "Ministry of Education", validUntil: "September 2024" }
      ]
    },
    {
      id: 3,
      name: "Healing Hands Medical Mission",
      category: "Healthcare",
      description: "Free medical services and health awareness programs for rural and underserved communities.",
      fullDescription: `Healing Hands Medical Mission has been serving rural and underserved communities for over 12 years, providing free medical services, health education, and preventive care. Our mission is to ensure that quality healthcare is accessible to everyone, regardless of their economic status.\n\nWe operate mobile medical units that reach remote villages, conduct regular health camps, and maintain a network of community health workers. Our services include general medicine, maternal and child health, vaccination programs, and health awareness campaigns.\n\nOver the years, we have treated more than 50,000 patients, conducted 1,200+ health camps, and trained 500+ community health volunteers. Our team includes qualified doctors, nurses, and healthcare professionals who are committed to serving humanity.`,
      profileImage: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop",
      verificationStatus: "verified",
      verificationDate: "10/01/2024",
      distance: 8.2,
      rating: 4.7,
      totalDonations: 1456,
      peopleHelped: 12500,
      yearsActive: 12,
      email: "contact@healinghandsmission.org",
      phone: "+91 98765 43212",
      address: "789 Medical Street, Health Colony, Chennai - 600001",
      website: "www.healinghandsmission.org",
      urgentNeeds: [
        { item: "Medical Supplies", quantity: "Emergency Kit", urgency: "critical", description: "Basic medical supplies for emergency response", quantityNeeded: 50, quantityReceived: 12 },
        { item: "Medicines", quantity: "Monthly Stock", urgency: "high", description: "Essential medicines for chronic disease management", quantityNeeded: 1000, quantityReceived: 300 }
      ],
      allNeeds: [
        { item: "Medical Supplies", quantity: "Emergency Kit", urgency: "critical", description: "Basic medical supplies for emergency response", quantityNeeded: 50, quantityReceived: 12 },
        { item: "Medicines", quantity: "Monthly Stock", urgency: "high", description: "Essential medicines for chronic disease management", quantityNeeded: 1000, quantityReceived: 300 },
        { item: "Medical Equipment", quantity: "5 units", urgency: "medium", description: "Blood pressure monitors and glucometers", quantityNeeded: 5, quantityReceived: 2 },
        { item: "Ambulance Fuel", quantity: "Monthly", urgency: "high", description: "Fuel support for mobile medical units", quantityNeeded: 100, quantityReceived: 25 }
      ],
      isFavorited: false,
      impactStories: [
        {
          title: "Rural Health Transformation",
          description: "Established permanent health centers in 5 remote villages, providing regular medical services to 3,000+ residents.",
          image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=300&fit=crop",
          date: "March 2024",
          beneficiaries: 3000
        },
        {
          title: "Maternal Health Program",
          description: "Successfully conducted safe deliveries for 200+ mothers and reduced infant mortality rate by 40% in target areas.",
          image: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=300&fit=crop",
          date: "January 2024",
          beneficiaries: 200
        }
      ],
      verificationDocuments: [
        { name: "NGO Registration Certificate", type: "Government Document" },
        { name: "Medical License", type: "Professional License" },
        { name: "Drug License", type: "Pharmaceutical Authorization" },
        { name: "80G Certificate", type: "Donation Receipt Authorization" }
      ],
      certifications: [
        { name: "Healthcare Quality Certification", issuer: "National Health Mission", validUntil: "August 2025" },
        { name: "WHO Health Standards Compliance", issuer: "World Health Organization", validUntil: "December 2024" }
      ]
    },
    {
      id: 4,
      name: "Skill Development Society",
      category: "Education",
      description: "Vocational training and skill development programs for unemployed youth and women.",
      fullDescription: `Skill Development Society was founded in 2018 with the objective of empowering unemployed youth and women through comprehensive vocational training and skill development programs. We believe that skills are the key to economic independence and social empowerment.\n\nOur programs cover various sectors including IT, healthcare, hospitality, manufacturing, and entrepreneurship. We provide both technical and soft skills training, along with placement assistance and entrepreneurship support. Our training centers are equipped with modern facilities and experienced trainers.\n\nSince inception, we have trained over 2,500 individuals, with an 85% placement rate. We have also supported 150+ entrepreneurs in starting their own businesses, creating additional employment opportunities in the community.`,
      profileImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop",
      verificationStatus: "pending",
      verificationDate: "Pending Review",
      distance: 6.1,
      rating: 4.5,
      totalDonations: 634,
      peopleHelped: 2150,
      yearsActive: 6,
      email: "info@skilldevsociety.org",
      phone: "+91 98765 43213",
      address: "321 Skill Street, Training Hub, Bangalore - 560001",
      website: "www.skilldevsociety.org",
      urgentNeeds: [
        { item: "Computer Equipment", quantity: "20 units", urgency: "high", description: "Laptops and desktops for IT training programs", quantityNeeded: 20, quantityReceived: 5 },
        { item: "Training Materials", quantity: "100 sets", urgency: "medium", description: "Books and materials for various skill courses", quantityNeeded: 100, quantityReceived: 30 }
      ],
      allNeeds: [
        { item: "Computer Equipment", quantity: "20 units", urgency: "high", description: "Laptops and desktops for IT training programs", quantityNeeded: 20, quantityReceived: 5 },
        { item: "Training Materials", quantity: "100 sets", urgency: "medium", description: "Books and materials for various skill courses", quantityNeeded: 100, quantityReceived: 30 },
        { item: "Sewing Machines", quantity: "15 units", urgency: "medium", description: "Industrial sewing machines for tailoring course", quantityNeeded: 15, quantityReceived: 8 },
        { item: "Workshop Tools", quantity: "50 sets", urgency: "low", description: "Basic tools for technical training workshops", quantityNeeded: 50, quantityReceived: 20 }
      ],
      isFavorited: false,
      impactStories: [
        {
          title: "Women Empowerment Success",
          description: "Trained 300 women in various skills, with 250 successfully finding employment or starting their own businesses.",
          image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=300&fit=crop",
          date: "February 2024",
          beneficiaries: 300
        },
        {
          title: "Youth Employment Drive",
          description: "Organized job fair connecting 500+ trained youth with potential employers, resulting in 400+ job placements.",
          image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=300&fit=crop",
          date: "December 2023",
          beneficiaries: 500
        }
      ],
      verificationDocuments: [
        { name: "Society Registration Certificate", type: "Government Document" },
        { name: "Skill Development License", type: "Training Authorization" },
        { name: "12A Application", type: "Tax Document - Pending" }
      ],
      certifications: [
        { name: "Skill India Certification", issuer: "Ministry of Skill Development", validUntil: "October 2025" }
      ]
    },
    {
      id: 5,
      name: "Food Security Network",
      category: "Food Security",
      description: "Fighting hunger through food distribution, community kitchens, and nutrition programs.",
      fullDescription: `Food Security Network is dedicated to eliminating hunger and malnutrition in our communities. Established in 2016, we work tirelessly to ensure that no one goes to bed hungry. Our comprehensive approach includes immediate food relief, sustainable nutrition programs, and community empowerment initiatives.\n\nWe operate community kitchens, distribute food packets to homeless individuals, run nutrition programs for children and pregnant women, and conduct awareness campaigns about food security and nutrition. Our network includes volunteers, partner organizations, and local communities working together.\n\nOver the years, we have served more than 2 million meals, supported 5,000+ families with regular food assistance, and educated 10,000+ people about nutrition and food security. We believe that access to nutritious food is a basic human right.`,
      profileImage: "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800&h=400&fit=crop",
      verificationStatus: "verified",
      verificationDate: "05/04/2024",
      distance: 3.8,
      rating: 4.6,
      totalDonations: 2134,
      peopleHelped: 8750,
      yearsActive: 8,
      email: "contact@foodsecuritynetwork.org",
      phone: "+91 98765 43214",
      address: "654 Nutrition Avenue, Food Hub, Kolkata - 700001",
      website: "www.foodsecuritynetwork.org",
      urgentNeeds: [
        { item: "Rice & Grains", quantity: "500 kg", urgency: "critical", description: "Basic food grains for community kitchen operations", quantityNeeded: 500, quantityReceived: 150 },
        { item: "Cooking Gas", quantity: "10 cylinders", urgency: "high", description: "LPG cylinders for community kitchen operations", quantityNeeded: 10, quantityReceived: 3 }
      ],
      allNeeds: [
        { item: "Rice & Grains", quantity: "500 kg", urgency: "critical", description: "Basic food grains for community kitchen operations", quantityNeeded: 500, quantityReceived: 150 },
        { item: "Cooking Gas", quantity: "10 cylinders", urgency: "high", description: "LPG cylinders for community kitchen operations", quantityNeeded: 10, quantityReceived: 3 },
        { item: "Vegetables", quantity: "200 kg", urgency: "high", description: "Fresh vegetables for nutritious meal preparation", quantityNeeded: 200, quantityReceived: 80 },
        { item: "Kitchen Utensils", quantity: "50 sets", urgency: "medium", description: "Large cooking utensils for community kitchens", quantityNeeded: 50, quantityReceived: 20 }
      ],
      isFavorited: true,
      impactStories: [
        {
          title: "Community Kitchen Expansion",
          description: "Opened 3 new community kitchens serving 1,500 meals daily to homeless and underprivileged individuals.",
          image: "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=600&h=300&fit=crop",
          date: "April 2024",
          beneficiaries: 1500
        },
        {
          title: "Child Nutrition Program",
          description: "Launched special nutrition program for 800 malnourished children, showing significant improvement in health indicators.",
          image: "https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=600&h=300&fit=crop",
          date: "March 2024",
          beneficiaries: 800
        }
      ],
      verificationDocuments: [
        { name: "NGO Registration Certificate", type: "Government Document" },
        { name: "Food Safety License", type: "Health Department Authorization" },
        { name: "80G Certificate", type: "Donation Receipt Authorization" },
        { name: "FSSAI License", type: "Food Standards Authority" }
      ],
      certifications: [
        { name: "Food Safety Management", issuer: "Food Safety Standards Authority", validUntil: "November 2025" },
        { name: "Nutrition Program Certification", issuer: "Ministry of Women and Child Development", validUntil: "January 2025" }
      ]
    },
    {
      id: 6,
      name: "Elder Care Foundation",
      category: "Elderly Care",
      description: "Comprehensive care services for elderly citizens including healthcare, companionship, and support.",
      fullDescription: `Elder Care Foundation is committed to ensuring dignity, respect, and quality care for our elderly citizens. Founded in 2017, we recognize that our elders deserve compassionate care and support in their golden years. Our comprehensive services address the physical, emotional, and social needs of elderly individuals.\n\nWe provide home care services, day care centers, medical support, recreational activities, and companionship programs. Our trained caregivers and volunteers work closely with families to ensure elderly individuals receive the care they need while maintaining their independence and dignity.\n\nWe have served over 1,500 elderly individuals, provided 50,000+ hours of care services, and trained 200+ family caregivers. Our programs have significantly improved the quality of life for elderly citizens and provided peace of mind to their families.`,
      profileImage: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=400&fit=crop",
      coverImage: "https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=800&h=400&fit=crop",
      verificationStatus: "verified",
      verificationDate: "18/03/2024",
      distance: 5.4,
      rating: 4.8,
      totalDonations: 876,
      peopleHelped: 1890,
      yearsActive: 7,
      email: "info@eldercarefoundation.org",
      phone: "+91 98765 43215",
      address: "987 Care Street, Senior Colony, Pune - 411001",
      website: "www.eldercarefoundation.org",
      urgentNeeds: [
        { item: "Medical Equipment", quantity: "15 units", urgency: "high", description: "Wheelchairs, walking aids, and mobility support equipment", quantityNeeded: 15, quantityReceived: 6 },
        { item: "Medicines", quantity: "Monthly Supply", urgency: "medium", description: "Common medications for elderly health conditions", quantityNeeded: 100, quantityReceived: 40 }
      ],
      allNeeds: [
        { item: "Medical Equipment", quantity: "15 units", urgency: "high", description: "Wheelchairs, walking aids, and mobility support equipment", quantityNeeded: 15, quantityReceived: 6 },
        { item: "Medicines", quantity: "Monthly Supply", urgency: "medium", description: "Common medications for elderly health conditions", quantityNeeded: 100, quantityReceived: 40 },
        { item: "Recreational Items", quantity: "50 sets", urgency: "low", description: "Books, games, and entertainment items for day care centers", quantityNeeded: 50, quantityReceived: 25 },
        { item: "Nutritional Supplements", quantity: "200 bottles", urgency: "medium", description: "Health supplements for elderly nutrition support", quantityNeeded: 200, quantityReceived: 75 }
      ],
      isFavorited: false,
      impactStories: [
        {
          title: "Home Care Success",
          description: "Provided comprehensive home care services to 150 elderly individuals, enabling them to age gracefully in their own homes.",
          image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&h=300&fit=crop",
          date: "March 2024",
          beneficiaries: 150
        },
        {
          title: "Senior Citizen Day Care",
          description: "Established 2 day care centers providing social interaction, healthcare, and recreational activities for 100+ seniors daily.",
          image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=300&fit=crop",
          date: "February 2024",
          beneficiaries: 100
        }
      ],
      verificationDocuments: [
        { name: "NGO Registration Certificate", type: "Government Document" },
        { name: "Healthcare Service License", type: "Health Department Authorization" },
        { name: "80G Certificate", type: "Donation Receipt Authorization" },
        { name: "Senior Care Certification", type: "Specialized License" }
      ],
      certifications: [
        { name: "Geriatric Care Certification", issuer: "Indian Association of Geriatric Medicine", validUntil: "September 2025" },
        { name: "Home Care Standards", issuer: "Ministry of Social Justice", validUntil: "July 2024" }
      ]
    }
  ]);

  const [filteredNGOs, setFilteredNGOs] = useState([]);
  const [displayedNGOs, setDisplayedNGOs] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  // Filter and search logic
  const filterNGOs = useCallback(() => {
    let filtered = [...allNGOs];

    // Search filter
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(ngo =>
        ngo?.name?.toLowerCase()?.includes(query) ||
        ngo?.category?.toLowerCase()?.includes(query) ||
        ngo?.description?.toLowerCase()?.includes(query) ||
        ngo?.address?.toLowerCase()?.includes(query)
      );
    }

    // Radius filter
    if (selectedRadius !== 'all') {
      const radius = parseInt(selectedRadius);
      filtered = filtered?.filter(ngo => ngo?.distance <= radius);
    }

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered?.filter(ngo => 
        ngo?.category?.toLowerCase()?.replace(' ', '-') === selectedCategory
      );
    }

    // Verification status filter
    if (selectedVerificationStatus !== 'all') {
      filtered = filtered?.filter(ngo => ngo?.verificationStatus === selectedVerificationStatus);
    }

    // Urgency filter
    if (selectedUrgency !== 'all') {
      filtered = filtered?.filter(ngo =>
        ngo?.urgentNeeds?.some(need => need?.urgency === selectedUrgency)
      );
    }

    // Sort by distance (closest first)
    filtered?.sort((a, b) => a?.distance - b?.distance);

    setFilteredNGOs(filtered);
    setDisplayedNGOs(filtered?.slice(0, 6));
    setHasMore(filtered?.length > 6);
  }, [searchQuery, selectedRadius, selectedCategory, selectedVerificationStatus, selectedUrgency, allNGOs]);

  // Load more NGOs for infinite scroll
  const loadMoreNGOs = useCallback(() => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);
    setTimeout(() => {
      const currentLength = displayedNGOs?.length;
      const nextBatch = filteredNGOs?.slice(currentLength, currentLength + 6);
      setDisplayedNGOs(prev => [...prev, ...nextBatch]);
      setHasMore(currentLength + nextBatch?.length < filteredNGOs?.length);
      setLoadingMore(false);
    }, 1000);
  }, [displayedNGOs?.length, filteredNGOs, hasMore, loadingMore]);

  // Infinite scroll handler
  const handleScroll = useCallback(() => {
    if (showMap) return;
    
    const scrollTop = window.pageYOffset || document.documentElement?.scrollTop;
    const scrollHeight = document.documentElement?.scrollHeight;
    const clientHeight = document.documentElement?.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 1000) {
      loadMoreNGOs();
    }
  }, [loadMoreNGOs, showMap]);

  // Pull to refresh handler
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    setTimeout(() => {
      filterNGOs();
      setRefreshing(false);
    }, 1500);
  };

  // Calculate active filters count
  const getActiveFiltersCount = () => {
    let count = 0;
    if (selectedCategory !== 'all') count++;
    if (selectedVerificationStatus !== 'all') count++;
    if (selectedUrgency !== 'all') count++;
    return count;
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategory('all');
    setSelectedVerificationStatus('all');
    setSelectedUrgency('all');
    setSearchQuery('');
  };

  // NGO action handlers
  const handleViewProfile = (ngo) => {
    setProfileModalNGO(ngo);
    setShowProfileModal(true);
  };

  const handleDonateNow = (ngo, specificNeed = null) => {
    // Navigate to donation page with NGO and need details
    navigate('/item-donation-listing', { 
      state: { 
        selectedNGO: ngo, 
        specificNeed: specificNeed 
      } 
    });
  };

  const handleContact = (ngo) => {
    // Open contact modal or navigate to contact page
    window.open(`mailto:${ngo?.email}?subject=Inquiry about donation to ${ngo?.name}`);
  };

  const handleToggleFavorite = (ngoId, isFavorited) => {
    // Update favorite status in backend
    console.log(`NGO ${ngoId} ${isFavorited ? 'added to' : 'removed from'} favorites`);
  };

  // Initialize component
  useEffect(() => {
    const initializeComponent = async () => {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        filterNGOs();
        setLoading(false);
      }, 1500);
    };

    initializeComponent();
  }, [filterNGOs]);

  // Apply filters when they change
  useEffect(() => {
    if (!loading) {
      filterNGOs();
    }
  }, [filterNGOs, loading]);

  // Add scroll listener
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="mb-6">
            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
              Discover NGOs Near You
            </h1>
            <p className="text-muted-foreground font-caption">
              Find verified local NGOs and make a meaningful impact in your community
            </p>
          </div>

          {/* Search and Filters */}
          <SearchAndFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedRadius={selectedRadius}
            onRadiusChange={setSelectedRadius}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedVerificationStatus={selectedVerificationStatus}
            onVerificationStatusChange={setSelectedVerificationStatus}
            selectedUrgency={selectedUrgency}
            onUrgencyChange={setSelectedUrgency}
            activeFiltersCount={getActiveFiltersCount()}
            onClearFilters={handleClearFilters}
            showMap={showMap}
            onToggleMap={setShowMap}
          />

          {/* Results Summary */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <p className="text-sm text-muted-foreground font-caption">
                {loading ? 'Loading...' : `${filteredNGOs?.length} NGO${filteredNGOs?.length !== 1 ? 's' : ''} found`}
                {selectedRadius !== 'all' && ` within ${selectedRadius} km`}
              </p>
              {refreshing && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="RefreshCw" size={14} className="animate-spin" />
                  <span className="font-caption">Refreshing...</span>
                </div>
              )}
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleRefresh}
              disabled={refreshing}
              iconName="RefreshCw"
              iconPosition="left"
            >
              Refresh
            </Button>
          </div>

          {/* Content Area */}
          <div className="relative">
            {loading ? (
              showMap ? <MapSkeleton /> : <NGOGridSkeleton count={6} />
            ) : (
              <>
                {showMap ? (
                  <div className="h-96 lg:h-[600px] rounded-interactive overflow-hidden">
                    <NGOMap
                      ngos={filteredNGOs}
                      onNGOSelect={setSelectedNGO}
                      selectedNGO={selectedNGO}
                    />
                  </div>
                ) : (
                  <div className="space-y-6">
                    {displayedNGOs?.length > 0 ? (
                      <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {displayedNGOs?.map((ngo) => (
                            <NGOCard
                              key={ngo?.id}
                              ngo={ngo}
                              onViewProfile={handleViewProfile}
                              onDonateNow={handleDonateNow}
                              onContact={handleContact}
                              onToggleFavorite={handleToggleFavorite}
                            />
                          ))}
                        </div>

                        {/* Load More / Loading More */}
                        {hasMore && (
                          <div className="flex justify-center py-8">
                            {loadingMore ? (
                              <div className="flex items-center space-x-2 text-muted-foreground">
                                <Icon name="Loader" size={20} className="animate-spin" />
                                <span className="font-caption">Loading more NGOs...</span>
                              </div>
                            ) : (
                              <Button
                                variant="outline"
                                onClick={loadMoreNGOs}
                                iconName="ChevronDown"
                                iconPosition="left"
                              >
                                Load More NGOs
                              </Button>
                            )}
                          </div>
                        )}
                      </>
                    ) : (
                      <div className="text-center py-12">
                        <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                          No NGOs Found
                        </h3>
                        <p className="text-muted-foreground mb-4 font-caption">
                          Try adjusting your search criteria or expanding your search radius
                        </p>
                        <Button
                          variant="outline"
                          onClick={handleClearFilters}
                          iconName="RotateCcw"
                          iconPosition="left"
                        >
                          Clear Filters
                        </Button>
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </main>
      {/* NGO Profile Modal */}
      <NGOProfileModal
        ngo={profileModalNGO}
        isOpen={showProfileModal}
        onClose={() => {
          setShowProfileModal(false);
          setProfileModalNGO(null);
        }}
        onDonate={handleDonateNow}
        onContact={handleContact}
      />
    </div>
  );
};

export default NGODiscoveryAndMatching;