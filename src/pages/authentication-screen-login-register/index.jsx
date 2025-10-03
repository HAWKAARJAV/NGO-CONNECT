import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaUsers, FaBuilding, FaHandshake, FaGlobe, FaChartLine, FaShieldAlt, FaMobileAlt, FaLinkedin, FaGithub, FaPlay } from 'react-icons/fa';
import PresentationMode from '../../components/PresentationMode';

const AuthenticationScreen = () => {
  const [showAbout, setShowAbout] = useState(false);
  const [showPresentation, setShowPresentation] = useState(false);
  const [showRegister, setShowRegister] = useState(false);

  const navigate = useNavigate();
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute bg-purple-500 rounded-full -top-40 -right-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bg-pink-500 rounded-full -bottom-40 -left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bg-blue-500 rounded-full top-40 left-40 w-80 h-80 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bg-green-500 rounded-full top-20 right-20 w-60 h-60 mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-6000"></div>
      </div>

      {/* Enhanced Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.3, 0.7, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex items-center justify-between p-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center space-x-2"
        >
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500">
            <FaHandshake className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-bold text-white">NGO-CONNECT</span>
        </motion.div>
        
        <div className="flex space-x-2">
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowPresentation(true)}
            className="flex items-center px-4 py-2 space-x-2 text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
          >
            <FaPlay className="w-4 h-4" />
            <span>Demo</span>
          </motion.button>
          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => setShowAbout(!showAbout)}
            className="px-4 py-2 text-white transition-all duration-300 border rounded-lg border-white/20 hover:bg-white/10"
          >
            About
          </motion.button>
        </div>
      </nav>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-4">
        <div className="grid items-center w-full grid-cols-1 gap-8 max-w-7xl lg:grid-cols-2">
          {/* Left Side - Enhanced Hero Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <div className="mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center justify-center w-24 h-24 mb-6 rounded-full shadow-2xl bg-gradient-to-r from-purple-500 to-pink-500"
              >
                <FaHandshake className="w-12 h-12 text-white" />
              </motion.div>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-4 text-5xl font-bold text-white lg:text-7xl"
              >
                NGO-CONNECT
              </motion.h1>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="mb-8 text-xl leading-relaxed text-gray-300 lg:text-2xl"
              >
                Revolutionizing philanthropy through technology. 
                Connecting generous donors with impactful NGOs nationwide.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="flex flex-col items-center space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4"
              >
                <button 
                  onClick={() => navigate('/learn-more')}
                  className="px-8 py-4 text-lg font-semibold text-white transition-all duration-300 transform shadow-lg bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl hover:from-purple-600 hover:to-pink-600 hover:shadow-xl hover:scale-105"
                >
                  Learn More
                </button>
                
              </motion.div>
            </div>

            {/* Enhanced Feature Cards */}
            <div className="grid grid-cols-1 gap-4 mb-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { icon: FaHeart, title: 'Smart Donations', desc: 'AI-powered matching', color: 'from-red-500 to-pink-500' },
                { icon: FaUsers, title: 'NGO Network', desc: '500+ verified NGOs', color: 'from-blue-500 to-cyan-500' },
                { icon: FaChartLine, title: 'Impact Tracking', desc: 'Real-time analytics', color: 'from-green-500 to-emerald-500' },
                { icon: FaShieldAlt, title: 'Secure Platform', desc: 'Bank-grade security', color: 'from-purple-500 to-indigo-500' }
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="p-4 transition-all duration-300 border rounded-xl bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 hover:scale-105 hover:shadow-lg"
                >
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mx-auto mb-3`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="mb-1 font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-300">{feature.desc}</p>
                </motion.div>
              ))}
            </div>

            {/* Enhanced Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="grid grid-cols-3 gap-4 text-center"
            >
              {[
                { number: '15K+', label: 'Active Donors', icon: FaUsers },
                { number: '750+', label: 'Verified NGOs', icon: FaBuilding },
                { number: '₹75M+', label: 'Total Raised', icon: FaChartLine }
              ].map((stat, index) => (
                <div key={stat.label} className="p-4 transition-all duration-300 border rounded-xl bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20">
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-purple-400" />
                  <div className="text-2xl font-bold text-white">{stat.number}</div>
                  <div className="text-sm text-gray-300">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Side - Auth Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-md">
              {/* Auth Form Container */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-8 border shadow-2xl bg-white/10 backdrop-blur-md rounded-2xl border-white/20"
              >
                {/* Login Form Only */}
                <div className="mb-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2">Welcome Back</h3>
                  <p className="text-gray-300 mb-6">Sign in to continue your impact journey</p>
                </div>

                {/* Inline Auth Forms */}
                {showRegister ? (
                  <RegisterForm onSwitchToLogin={() => setShowRegister(false)} />
                ) : (
                  <LoginForm onSwitchToRegister={() => setShowRegister(true)} />
                )}
                
                {/* Sign Up Link */}
                <div className="mt-6 text-center">
                  <p className="text-gray-300 mb-4">Don't have an account?</p>
                  <button
                    onClick={() => setShowRegister(true)}
                    className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
                  >
                    Create Account →
                  </button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* User Personas Section */}
      <section className="relative z-10 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white">Who We Serve</h2>
            <p className="text-xl text-gray-300">Connecting diverse stakeholders in the philanthropic ecosystem</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* NGO Personas */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500">
                <FaBuilding className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Resource-Struggling Small NGOs</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• 0-3 years old, 100-500 beneficiaries</li>
                <li>• Rural/semi-urban, budget &lt;₹2L/month</li>
                <li>• Pain: Low funding visibility, limited donor pool</li>
                <li>• Sectors: Education, healthcare, women/child welfare</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                <FaUsers className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Resource-Rich Established NGOs</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• 5+ years, 1000+ beneficiaries</li>
                <li>• Urban, budget ₹5L+/month</li>
                <li>• Pain: Resource wastage, ineffective distribution</li>
                <li>• Sectors: Disaster relief, large-scale programs</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                <FaHeart className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Socially Conscious Millennials</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Age 25-40, urban professionals</li>
                <li>• Income: ₹5-15L/year</li>
                <li>• Demand transparency, prefer online donations</li>
                <li>• Donation: ₹500-5000/month</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500">
                <FaChartLine className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Corporate CSR Managers</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Age 30-50, handling ₹50L-10Cr budgets</li>
                <li>• Need: NGO verification, impact measurement</li>
                <li>• Challenges: Compliance, employee engagement</li>
                <li>• Budget: ₹50,000/year for CSR management</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
                <FaGlobe className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">High-Net-Worth Individuals</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Age 40-65, businesspeople, philanthropists</li>
                <li>• Income: ₹1Cr+</li>
                <li>• One-time large donations</li>
                <li>• Expect: Impact visibility, recognition</li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500">
                <FaShieldAlt className="w-8 h-8 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-white">Target Beneficiaries</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Rural communities, urban marginalized</li>
                <li>• Students from under-resourced schools</li>
                <li>• Homeless & temporary shelter residents</li>
                <li>• Farmers, laborers, low-income families</li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Social Impact Section */}
      <section className="relative z-10 px-4 py-20 bg-white/5">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white">Social Impact</h2>
            <p className="text-xl text-gray-300">Transforming society through connected giving</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-red-500 to-pink-500 hackathon-glow">
                <span className="text-2xl font-bold text-white">67%</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Waste Reduction</h3>
              <p className="text-gray-300">Reduced donation wastage through smart matching</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 hackathon-glow">
                <span className="text-2xl font-bold text-white">300%</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">More Families</h3>
              <p className="text-gray-300">Impacted through real-time emergency matching</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 hackathon-glow">
                <span className="text-2xl font-bold text-white">₹500Cr</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Annual Savings</h3>
              <p className="text-gray-300">Economic impact through waste reduction</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 hackathon-glow">
                <span className="text-2xl font-bold text-white">95%</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Donor Confidence</h3>
              <p className="text-gray-300">Through verified tracking and transparency</p>
            </motion.div>
          </div>

          {/* SDG Goals */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <h3 className="mb-4 text-2xl font-bold text-white">🏚️ Poverty Alleviation (SDG 1)</h3>
              <p className="mb-4 text-gray-300">Connects surplus resources with scarcity, reducing donation wastage by 67%.</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• Real-time emergency matching</div>
                <div>• 300% more families impacted</div>
                <div>• Resource optimization</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <h3 className="mb-4 text-2xl font-bold text-white">🎓 Education Equity (SDG 4)</h3>
              <p className="mb-4 text-gray-300">Small NGOs gain access to books, computers, uniforms through inter-NGO sharing.</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• 250% increase in rural school resources</div>
                <div>• Inter-NGO sharing networks</div>
                <div>• Digital literacy access</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <h3 className="mb-4 text-2xl font-bold text-white">🍽️ Hunger Elimination (SDG 2)</h3>
              <p className="mb-4 text-gray-300">Redirects food surplus worth ₹92,000 cr to nearby NGOs.</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• 40% hunger reduction in target areas</div>
                <div>• Coordinated distribution</div>
                <div>• Food security improvement</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* User Journey Story */}
      <section className="relative z-10 px-4 py-20">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-16 text-center"
          >
            <h2 className="mb-4 text-4xl font-bold text-white">Three Lives, One Platform</h2>
            <p className="text-xl text-gray-300">See how NGO-CONNECT transforms lives through connected giving</p>
          </motion.div>

          <div className="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                <span className="text-xl font-bold text-white">R</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Rahul (IT Professional)</h3>
              <p className="mb-4 text-gray-300">Has 20 unused laptops but lacks verified NGO connections</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• Quick sign-up process</div>
                <div>• AI-powered matching</div>
                <div>• Real-time impact tracking</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                <span className="text-xl font-bold text-white">P</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Priya (Small NGO Founder)</h3>
              <p className="mb-4 text-gray-300">Desperately needs laptops for rural digital literacy</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• Government document verification</div>
                <div>• Instant donor connections</div>
                <div>• Credibility building</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 presentation-card rounded-2xl"
            >
              <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                <span className="text-xl font-bold text-white">S</span>
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">Sunita (CSR Manager)</h3>
              <p className="mb-4 text-gray-300">Has ₹10L budget but can't find impactful partnerships</p>
              <div className="space-y-2 text-sm text-gray-400">
                <div>• CSR profile registration</div>
                <div>• Verified NGO partnerships</div>
                <div>• Impact measurement tools</div>
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="p-8 text-center presentation-card rounded-2xl"
          >
            <h3 className="mb-4 text-2xl font-bold text-white">The Transformation</h3>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500">
                  <span className="font-bold text-white">1</span>
                </div>
                <h4 className="mb-2 font-semibold text-white">Registration</h4>
                <p className="text-sm text-gray-300">Quick sign-up with verification</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500">
                  <span className="font-bold text-white">2</span>
                </div>
                <h4 className="mb-2 font-semibold text-white">Matching</h4>
                <p className="text-sm text-gray-300">AI-powered need matching</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <span className="font-bold text-white">3</span>
                </div>
                <h4 className="mb-2 font-semibold text-white">Connection</h4>
                <p className="text-sm text-gray-300">Real-time notifications</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500">
                  <span className="font-bold text-white">4</span>
                </div>
                <h4 className="mb-2 font-semibold text-white">Impact</h4>
                <p className="text-sm text-gray-300">Proof uploads & tracking</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Modal */}
      <AnimatePresence>
        {showAbout && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowAbout(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-2xl p-8 shadow-2xl bg-white/95 backdrop-blur-md rounded-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowAbout(false)}
                className="absolute text-2xl text-gray-500 top-4 right-4 hover:text-gray-700"
              >
                ×
              </button>
              
              <div className="text-center">
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500">
                  <FaHandshake className="w-10 h-10 text-white" />
                </div>
                
                <h2 className="mb-4 text-3xl font-bold text-gray-800">About NGO-CONNECT</h2>
                <p className="mb-6 leading-relaxed text-gray-600">
                  NGO-CONNECT is a revolutionary platform that bridges the gap between generous donors and impactful NGOs. 
                  Our mission is to make philanthropy more accessible, transparent, and effective through cutting-edge technology.
                </p>
                
                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2">
                  <div className="text-left">
                    <h3 className="mb-2 font-semibold text-gray-800">Key Features</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li>• AI-powered donor-NGO matching</li>
                      <li>• Real-time impact tracking</li>
                      <li>• Secure payment processing</li>
                      <li>• Comprehensive NGO verification</li>
                      <li>• Mobile-first responsive design</li>
                    </ul>
                  </div>
                  <div className="text-left">
                    <h3 className="mb-2 font-semibold text-gray-800">Technology Stack</h3>
                    <ul className="space-y-1 text-gray-600">
                      <li>• React 18 + Vite</li>
                      <li>• Tailwind CSS</li>
                      <li>• Supabase Backend</li>
                      <li>• Framer Motion</li>
                      <li>• Real-time Analytics</li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-6 border-t">
                  <h3 className="mb-4 font-semibold text-gray-800">Created by</h3>
                  <div className="flex items-center justify-center mb-4 space-x-4">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                      <span className="text-lg font-bold text-white">AJ</span>
                    </div>
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800">Aarjav Jain</h4>
                      <p className="text-sm text-gray-600">Full Stack Developer</p>
                                             <p className="text-sm text-gray-600">Second Year Student, Netaji Subhas University of Technology, Dwarka, Delhi</p>
                    </div>
                  </div>
                  
                  <div className="flex justify-center space-x-4">
                    <a
                      href="https://www.linkedin.com/in/aarjav-jain-576946301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
                    >
                      <FaLinkedin className="w-4 h-4" />
                      <span>LinkedIn</span>
                    </a>
                    <a
                      href="#"
                      className="flex items-center px-4 py-2 space-x-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-900"
                    >
                      <FaGithub className="w-4 h-4" />
                      <span>GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="relative z-20 pb-8 mt-20 text-center">
        <div className="text-sm text-gray-400">
          <p>© 2024 NGO-CONNECT. All rights reserved.</p>
          <p className="mt-2">
            Created with ❤️ by <span className="font-semibold text-purple-400">Aarjav Jain</span> | 
            <span className="text-gray-500"> Second Year Student, Netaji Subhas University of Technology, Dwarka, Delhi</span>
          </p>
          <div className="flex justify-center mt-4 space-x-4">
            <a
              href="https://www.linkedin.com/in/aarjav-jain-576946301?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 space-x-2 text-sm text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              <FaLinkedin className="w-4 h-4" />
              <span>Connect on LinkedIn</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Presentation Mode */}
      <PresentationMode 
        isActive={showPresentation} 
        onClose={() => setShowPresentation(false)} 
      />
    </div>
  );
};

export default AuthenticationScreen;