import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeart, 
  FaUsers, 
  FaBuilding, 
  FaHandshake, 
  FaArrowRight, 
  FaCheck,
  FaShieldAlt,
  FaChartLine,
  FaRocket,
  FaStar,
  FaGlobe,
  FaLightbulb,
  FaAward,
  FaCode,
  FaDatabase,
  FaCloud,
  FaLock,
  FaMobileAlt,
  FaBell,
  FaEye,
  FaCog,
  FaQuestionCircle
} from 'react-icons/fa';

const LearnMore = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const navigate = useNavigate();

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FaGlobe },
    { id: 'features', label: 'Features', icon: FaStar },
    { id: 'technology', label: 'Technology', icon: FaCode },
    { id: 'impact', label: 'Social Impact', icon: FaHeart },
    { id: 'faq', label: 'FAQ', icon: FaQuestionCircle }
  ];

  const features = [
    {
      category: 'AI & Matching',
      items: [
        {
          title: 'Smart Donor-NGO Matching',
          description: 'AI-powered algorithm matches donors with NGOs based on interests, location, and impact areas',
          icon: FaRocket,
          color: 'from-purple-500 to-pink-500'
        },
        {
          title: 'Real-time Impact Tracking',
          description: 'Live updates on donation status and beneficiary impact with visual analytics',
          icon: FaChartLine,
          color: 'from-blue-500 to-cyan-500'
        }
      ]
    },
    {
      category: 'Security & Verification',
      items: [
        {
          title: 'NGO Verification System',
          description: 'Multi-step verification process with government document validation',
          icon: FaShieldAlt,
          color: 'from-green-500 to-emerald-500'
        },
        {
          title: 'Secure Payment Processing',
          description: 'Bank-grade encryption with multiple payment gateway support',
          icon: FaLock,
          color: 'from-red-500 to-pink-500'
        }
      ]
    },
    {
      category: 'User Experience',
      items: [
        {
          title: 'Mobile-First Design',
          description: 'Responsive design optimized for all devices and screen sizes',
          icon: FaMobileAlt,
          color: 'from-yellow-500 to-orange-500'
        },
        {
          title: 'Real-time Notifications',
          description: 'Instant updates on donations, matches, and impact milestones',
          icon: FaBell,
          color: 'from-indigo-500 to-purple-500'
        }
      ]
    }
  ];

  const techStack = [
    {
      category: 'Frontend',
      technologies: [
        { name: 'React 18', description: 'Latest React with concurrent features', icon: FaCode },
        { name: 'Vite', description: 'Lightning-fast build tool', icon: FaRocket },
        { name: 'Tailwind CSS', description: 'Utility-first CSS framework', icon: FaCog },
        { name: 'Framer Motion', description: 'Smooth animations', icon: FaStar }
      ]
    },
    {
      category: 'Backend',
      technologies: [
        { name: 'Supabase', description: 'Open-source Firebase alternative', icon: FaDatabase },
        { name: 'PostgreSQL', description: 'Robust relational database', icon: FaCloud },
        { name: 'Real-time Subscriptions', description: 'Live data updates', icon: FaBell },
        { name: 'Row Level Security', description: 'Advanced security features', icon: FaShieldAlt }
      ]
    }
  ];

  const faqs = [
    {
      question: "How does NGO-CONNECT ensure NGO authenticity?",
      answer: "We implement a comprehensive verification system including government document validation, background checks, and regular compliance monitoring. All NGOs must provide official registration documents and undergo our verification process."
    },
    {
      question: "What makes NGO-CONNECT different from other platforms?",
      answer: "Our AI-powered matching algorithm, real-time impact tracking, and inter-NGO collaboration features set us apart. We focus on reducing waste through smart resource allocation and provide complete transparency in the donation process."
    },
    {
      question: "How secure are my donations?",
      answer: "We use bank-grade encryption and multiple secure payment gateways. All transactions are PCI DSS compliant, and we never store sensitive payment information on our servers."
    },
    {
      question: "Can I track the impact of my donations?",
      answer: "Yes! Our platform provides real-time impact tracking with photos, videos, and detailed reports from NGOs. You can see exactly how your donations are being used and the difference they're making."
    },
    {
      question: "What types of donations does the platform support?",
      answer: "We support monetary donations, in-kind donations (items, equipment), and volunteer time. Our platform can handle everything from small individual donations to large corporate CSR initiatives."
    },
    {
      question: "How do you measure social impact?",
      answer: "We use a combination of quantitative metrics (number of beneficiaries, funds raised) and qualitative data (stories, photos, testimonials). NGOs are required to provide regular impact reports with proof of utilization."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <div className="relative z-20 flex items-center justify-between p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <FaHandshake className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">NGO-CONNECT</span>
        </motion.div>
        
        <motion.button
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="px-4 py-2 text-white border border-white/20 rounded-lg hover:bg-white/10 transition-all duration-300"
        >
           Back
        </motion.button>
      </div>

      <div className="relative z-10 px-4 py-8">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold text-white mb-4">Learn More About NGO-CONNECT</h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Discover how our revolutionary platform is transforming philanthropy through technology, 
              connecting donors with impactful NGOs, and creating measurable social change.
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                    : 'text-white border border-white/20 hover:bg-white/10'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </motion.div>

          {/* Tab Content */}
          <AnimatePresence mode="wait">
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* Mission & Vision */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="presentation-card p-8 rounded-2xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mb-6">
                      <FaEye className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Our Mission</h3>
                    <p className="text-gray-300 leading-relaxed">
                      To revolutionize philanthropy by creating a transparent, efficient, and impactful 
                      platform that connects generous donors with verified NGOs, ensuring every donation 
                      makes a measurable difference in society.
                    </p>
                  </div>
                  
                  <div className="presentation-card p-8 rounded-2xl">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-6">
                      <FaRocket className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">Our Vision</h3>
                    <p className="text-gray-300 leading-relaxed">
                      To become the world's most trusted platform for social impact, where technology 
                      bridges the gap between generosity and need, creating a more equitable and 
                      compassionate world for all.
                    </p>
                  </div>
                </div>

                {/* Key Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  {[
                    { number: '15,000+', label: 'Active Donors', icon: FaUsers },
                    { number: '750+', label: 'Verified NGOs', icon: FaBuilding },
                    { number: '₹75M+', label: 'Total Raised', icon: FaChartLine },
                    { number: '98.5%', label: 'Success Rate', icon: FaAward }
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="presentation-card p-6 rounded-2xl text-center"
                    >
                      <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                      <div className="text-gray-300">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {features.map((category, categoryIndex) => (
                  <div key={category.category}>
                    <h3 className="text-2xl font-bold text-white mb-6">{category.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {category.items.map((feature, index) => (
                        <motion.div
                          key={feature.title}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: (categoryIndex * 0.2) + (index * 0.1) }}
                          className="presentation-card p-6 rounded-2xl"
                        >
                          <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                            <feature.icon className="w-6 h-6 text-white" />
                          </div>
                          <h4 className="text-xl font-bold text-white mb-3">{feature.title}</h4>
                          <p className="text-gray-300">{feature.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'technology' && (
              <motion.div
                key="technology"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {techStack.map((stack, stackIndex) => (
                  <div key={stack.category}>
                    <h3 className="text-2xl font-bold text-white mb-6">{stack.category}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                      {stack.technologies.map((tech, index) => (
                        <motion.div
                          key={tech.name}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: (stackIndex * 0.2) + (index * 0.1) }}
                          className="presentation-card p-6 rounded-2xl text-center"
                        >
                          <tech.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                          <h4 className="font-bold text-white mb-2">{tech.name}</h4>
                          <p className="text-sm text-gray-300">{tech.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'impact' && (
              <motion.div
                key="impact"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* SDG Goals */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    {
                      title: '🏚️ Poverty Alleviation (SDG 1)',
                      description: 'Connects surplus resources with scarcity, reducing donation wastage by 67%',
                      impact: ['Real-time emergency matching', '300% more families impacted', 'Resource optimization']
                    },
                    {
                      title: '🎓 Education Equity (SDG 4)',
                      description: 'Small NGOs gain access to books, computers, uniforms through inter-NGO sharing',
                      impact: ['250% increase in rural school resources', 'Inter-NGO sharing networks', 'Digital literacy access']
                    },
                    {
                      title: '🍽️ Hunger Elimination (SDG 2)',
                      description: 'Redirects food surplus worth ₹92,000 cr to nearby NGOs',
                      impact: ['40% hunger reduction in target areas', 'Coordinated distribution', 'Food security improvement']
                    }
                  ].map((goal, index) => (
                    <motion.div
                      key={goal.title}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="presentation-card p-6 rounded-2xl"
                    >
                      <h4 className="text-xl font-bold text-white mb-4">{goal.title}</h4>
                      <p className="text-gray-300 mb-4">{goal.description}</p>
                      <ul className="space-y-2">
                        {goal.impact.map((item, idx) => (
                          <li key={idx} className="flex items-center space-x-2">
                            <FaCheck className="w-3 h-3 text-green-400 flex-shrink-0" />
                            <span className="text-sm text-gray-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>

                {/* Impact Metrics */}
                <div className="presentation-card p-8 rounded-2xl">
                  <h3 className="text-2xl font-bold text-white mb-6 text-center">Measurable Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[
                      { metric: '₹500Cr', label: 'Annual Waste Reduction', color: 'from-green-500 to-emerald-500' },
                      { metric: '50,000+', label: 'Jobs Created', color: 'from-blue-500 to-cyan-500' },
                      { metric: '300%', label: 'CSR ROI', color: 'from-purple-500 to-pink-500' },
                      { metric: '5x', label: 'Volunteer Engagement', color: 'from-yellow-500 to-orange-500' }
                    ].map((item, index) => (
                      <motion.div
                        key={item.label}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="text-center"
                      >
                        <div className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
                          <span className="text-xl font-bold text-white">{item.metric}</span>
                        </div>
                        <h4 className="font-semibold text-white mb-1">{item.label}</h4>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'faq' && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="max-w-4xl mx-auto space-y-6"
              >
                {faqs.map((faq, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="presentation-card p-6 rounded-2xl"
                  >
                    <h4 className="text-lg font-bold text-white mb-3">{faq.question}</h4>
                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;
