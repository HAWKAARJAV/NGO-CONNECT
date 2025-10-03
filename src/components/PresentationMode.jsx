import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaHeart, 
  FaUsers, 
  FaBuilding, 
  FaChartLine, 
  FaShieldAlt, 
  FaMobileAlt,
  FaRocket,
  FaAward,
  FaLightbulb,
  FaCode,
  FaDatabase,
  FaCloud,
  FaLock,
  FaGlobe,
  FaHandshake
} from 'react-icons/fa';

const PresentationMode = ({ isActive, onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const slides = [
    {
      id: 0,
      title: "NGO-CONNECT",
      subtitle: "Revolutionizing Philanthropy Through Technology",
      content: "Connecting generous donors with impactful NGOs nationwide",
      icon: FaHandshake,
      color: "from-purple-500 to-pink-500",
      stats: [
        { label: "Active Donors", value: "15,000+", icon: FaUsers },
        { label: "Verified NGOs", value: "750+", icon: FaBuilding },
        { label: "Total Raised", value: "₹75M+", icon: FaChartLine }
      ]
    },
    {
      id: 1,
      title: "Problem Statement",
      subtitle: "The Challenge We're Solving",
      content: "Traditional donation platforms lack transparency, efficiency, and impact tracking. Donors struggle to find trustworthy NGOs, while NGOs face difficulties in reaching potential donors.",
      icon: FaLightbulb,
      color: "from-yellow-500 to-orange-500",
      points: [
        "Lack of transparency in donation tracking",
        "Difficulty in finding trustworthy NGOs",
        "No real-time impact visualization",
        "Inefficient donor-NGO matching"
      ]
    },
    {
      id: 2,
      title: "Our Solution",
      subtitle: "AI-Powered Platform",
      content: "NGO-CONNECT leverages cutting-edge technology to create a seamless, transparent, and efficient donation ecosystem.",
      icon: FaRocket,
      color: "from-blue-500 to-cyan-500",
      features: [
        { icon: FaHeart, title: "Smart Matching", desc: "AI-powered donor-NGO matching" },
        { icon: FaShieldAlt, title: "Secure Platform", desc: "Bank-grade security" },
        { icon: FaChartLine, title: "Impact Tracking", desc: "Real-time analytics" },
        { icon: FaMobileAlt, title: "Mobile-First", desc: "Responsive design" }
      ]
    },
    {
      id: 3,
      title: "Technology Stack",
      subtitle: "Modern & Scalable",
      content: "Built with the latest technologies for performance, security, and scalability.",
      icon: FaCode,
      color: "from-green-500 to-emerald-500",
      tech: [
        { icon: FaCode, name: "React 18", desc: "Frontend Framework" },
        { icon: FaDatabase, name: "Supabase", desc: "Backend & Database" },
        { icon: FaCloud, name: "Vite", desc: "Build Tool" },
        { icon: FaLock, name: "Security", desc: "End-to-End Encryption" }
      ]
    },
    {
      id: 4,
      title: "Key Features",
      subtitle: "What Makes Us Different",
      content: "Comprehensive features designed to enhance the donation experience for both donors and NGOs.",
      icon: FaAward,
      color: "from-purple-500 to-indigo-500",
      features: [
        "AI-powered donor-NGO matching algorithm",
        "Real-time impact tracking and visualization",
        "Comprehensive NGO verification system",
        "Secure payment processing with multiple gateways",
        "Mobile-first responsive design",
        "Advanced analytics and reporting"
      ]
    },
    {
      id: 5,
      title: "Impact & Results",
      subtitle: "Making a Real Difference",
      content: "Our platform has already made significant impact in the philanthropic ecosystem.",
      icon: FaGlobe,
      color: "from-red-500 to-pink-500",
      impact: [
        { metric: "98.5%", label: "Success Rate" },
        { metric: "< 24h", label: "Response Time" },
        { metric: "₹75M+", label: "Total Raised" },
        { metric: "15K+", label: "Active Donors" }
      ]
    },
    {
      id: 6,
      title: "Future Roadmap",
      subtitle: "What's Next",
      content: "Continuous innovation to expand our impact and reach.",
      icon: FaRocket,
      color: "from-indigo-500 to-purple-500",
      roadmap: [
        { phase: "Phase 1", items: ["Core platform", "User authentication", "Basic donations"] },
        { phase: "Phase 2", items: ["AI matching", "Mobile app", "Advanced analytics"] },
        { phase: "Phase 3", items: ["Blockchain integration", "International support", "API platform"] },
        { phase: "Phase 4", items: ["ML optimization", "Multi-language", "Enterprise solutions"] }
      ]
    },
    {
      id: 7,
      title: "About the Creator",
      subtitle: "Meet the Developer",
      content: "Built with passion and dedication for social impact.",
      icon: FaHandshake,
      color: "from-blue-500 to-purple-500",
      creator: {
        name: "Aarjav Jain",
        role: "Full Stack Developer",
        education: "Second Year Student, Netaji Subhas University of Technology, Dwarka, Delhi",
        location: "Dwarka, Delhi, India",
        skills: ["React", "Node.js", "Supabase", "UI/UX Design"],
        linkedin: "https://www.linkedin.com/in/aarjav-jain-576946301"
      }
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  if (!isActive) return null;

  const currentSlideData = slides[currentSlide];

  return (
    <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm">
      {/* Navigation Controls */}
      <div className="absolute top-4 left-4 z-10 flex space-x-2">
        <button
          onClick={onClose}
          className="px-4 py-2 text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
        >
          Exit
        </button>
        <button
          onClick={() => setIsAutoPlaying(!isAutoPlaying)}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isAutoPlaying 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isAutoPlaying ? 'Pause' : 'Auto Play'}
        </button>
      </div>

      {/* Slide Navigation */}
      <div className="absolute top-4 right-4 z-10 flex space-x-1">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white/30'
            }`}
          />
        ))}
      </div>

      {/* Arrow Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 text-white bg-white/10 rounded-full hover:bg-white/20 transition-colors"
      >
        →
      </button>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-screen p-8">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl"
        >
          <div className="presentation-card rounded-3xl p-12 text-center">
            {/* Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <div className={`w-24 h-24 bg-gradient-to-r ${currentSlideData.color} rounded-full flex items-center justify-center mx-auto mb-6 hackathon-glow`}>
                <currentSlideData.icon className="w-12 h-12 text-white" />
              </div>
              <h1 className="text-5xl font-bold text-white mb-4 gradient-text-hero">
                {currentSlideData.title}
              </h1>
              <h2 className="text-2xl text-gray-300 mb-4">
                {currentSlideData.subtitle}
              </h2>
              <p className="text-xl text-gray-400 leading-relaxed">
                {currentSlideData.content}
              </p>
            </motion.div>

            {/* Content based on slide type */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {currentSlide === 0 && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {currentSlideData.stats.map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-6 border border-white/10 rounded-xl bg-white/5"
                    >
                      <stat.icon className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                      <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
                      <div className="text-gray-300">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {currentSlide === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {currentSlideData.points.map((point, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 border border-white/10 rounded-lg bg-white/5 text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                        <span className="text-gray-300">{point}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {currentSlide === 2 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentSlideData.features.map((feature, index) => (
                    <motion.div
                      key={feature.title}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-6 border border-white/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                    >
                      <feature.icon className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                      <h3 className="font-semibold text-white mb-2">{feature.title}</h3>
                      <p className="text-sm text-gray-300">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {currentSlide === 3 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentSlideData.tech.map((tech, index) => (
                    <motion.div
                      key={tech.name}
                      initial={{ rotateY: 90, opacity: 0 }}
                      animate={{ rotateY: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-6 border border-white/10 rounded-xl bg-white/5"
                    >
                      <tech.icon className="w-8 h-8 text-green-400 mx-auto mb-3" />
                      <h3 className="font-semibold text-white mb-2">{tech.name}</h3>
                      <p className="text-sm text-gray-300">{tech.desc}</p>
                    </motion.div>
                  ))}
                </div>
              )}

              {currentSlide === 4 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentSlideData.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 border border-white/10 rounded-lg bg-white/5 text-left"
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                        <span className="text-gray-300">{feature}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}

              {currentSlide === 5 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentSlideData.impact.map((item, index) => (
                    <motion.div
                      key={item.label}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-6 border border-white/10 rounded-xl bg-white/5"
                    >
                      <div className="text-4xl font-bold text-white mb-2">{item.metric}</div>
                      <div className="text-gray-300">{item.label}</div>
                    </motion.div>
                  ))}
                </div>
              )}

              {currentSlide === 6 && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {currentSlideData.roadmap.map((phase, index) => (
                    <motion.div
                      key={phase.phase}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-6 border border-white/10 rounded-xl bg-white/5"
                    >
                      <h3 className="font-semibold text-white mb-4">{phase.phase}</h3>
                      <ul className="space-y-2 text-left">
                        {phase.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-gray-300 flex items-center space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))}
                </div>
              )}

              {currentSlide === 7 && (
                <div className="max-w-2xl mx-auto">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.6 }}
                    className="p-8 border border-white/10 rounded-xl bg-white/5"
                  >
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white font-bold text-xl">AJ</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">{currentSlideData.creator.name}</h3>
                    <p className="text-purple-400 mb-2">{currentSlideData.creator.role}</p>
                    <p className="text-gray-300 mb-4">{currentSlideData.creator.education}</p>
                    <p className="text-gray-400 mb-6">{currentSlideData.creator.location}</p>
                    
                    <div className="flex flex-wrap justify-center gap-2 mb-6">
                      {currentSlideData.creator.skills.map((skill, index) => (
                        <span
                          key={skill}
                          className="px-3 py-1 bg-white/10 rounded-full text-sm text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                    
                    <a
                      href={currentSlideData.creator.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      <span>Connect on LinkedIn</span>
                    </a>
                  </motion.div>
                </div>
              )}
            </motion.div>

            {/* Slide Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-gray-400">
              {currentSlide + 1} / {slides.length}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PresentationMode;
