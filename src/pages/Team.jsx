import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaUser, 
  FaEnvelope, 
  FaPhone, 
  FaLinkedin, 
  FaTwitter, 
  FaFacebook,
  FaUsers,
  FaCrown,
  FaUserTie,
  FaUserFriends,
  FaCheckCircle,
  FaChevronLeft,
  FaChevronRight
} from 'react-icons/fa';

const Team = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const carouselRef = useRef(null);

  const teamMembers = [
    {
      id: 1,
      name: 'Amal Said Ndoro',
      role: 'Founder & Executive Director',
      category: 'Leadership',
      bio: 'Amal Said Ndoro is the visionary founder of Little Angels CBO. With over 10 years of experience in community development and humanitarian work, Amal has dedicated their life to serving vulnerable children and families across Kenya. Their passion for social justice and community empowerment drives the organization\'s mission and vision.',
      image: '/images/team/founder.jpg',
      email: 'amal@littleangelscbo.org',
      phone: '0727 202197',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      },
      order: 1,
      icon: FaCrown,
      iconColor: 'text-orange'
    },
    {
      id: 2,
      name: 'Rama Sudi Kombo',
      role: 'Secretary',
      category: 'Leadership',
      bio: 'Rama Sudi Kombo serves as the Secretary of Little Angels CBO, bringing extensive experience in organizational management and community outreach. She ensures the smooth operation of all administrative functions and coordinates communication between the organization and its stakeholders.',
      image: '/images/team/secretary.jpg',
      email: 'jane@littleangelscbo.org',
      phone: '0712 345 678',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      },
      order: 2,
      icon: FaUserTie,
      iconColor: 'text-teal'
    },
    {
      id: 3,
      name: 'Tatu Said Omar',
      role: 'Treasurer',
      category: 'Leadership',
      bio: 'Tatu Said Omar manages the financial operations of Little Angels CBO with integrity and transparency. With a background in accounting and financial management, Tatu ensures that all donations and funds are properly accounted for and used effectively to support the organization\'s programmes.',
      image: '/images/team/treasurer.jpg',
      email: 'tatu@littleangelscbo.org',
      phone: '0711 234 567',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      },
      order: 3,
      icon: FaUsers,
      iconColor: 'text-navy'
    },
    {
      id: 4,
      name: 'NASSRA JOSEPH MCHARO',
      role: 'Programmes Coordinator',
      category: 'Programmes',
      bio: 'Nassra Joseph Mcharo coordinates all programme activities at Little Angels CBO. She works directly with communities, children\'s homes, and partner organizations to ensure that our programmes are delivered effectively and meet the needs of vulnerable children and families.',
      image: '/images/team/member-1.jpg',
      email: 'nassra@littleangelscbo.org',
      phone: '0722 334 455',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      },
      order: 4,
      icon: FaUserFriends,
      iconColor: 'text-teal'
    },
    {
      id: 5,
      name: 'AMINA MOHAMED KOLIN',
      role: 'Community Outreach Officer',
      category: 'Programmes',
      bio: 'Amina Mohamed Kolin leads the community outreach efforts of Little Angels CBO. She works tirelessly to reach the most vulnerable communities, assessing needs and coordinating relief efforts. Her deep understanding of community dynamics has been instrumental in expanding our reach.',
      image: '/images/team/member-2.jpg',
      email: 'amina@littleangelscbo.org',
      phone: '0723 445 566',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      },
      order: 5,
      icon: FaUserFriends,
      iconColor: 'text-navy'
    },
    {
      id: 6,
      name: 'AMINA MOHAMED KOLIN',
      role: 'Community outreach Officer',
      category: 'Programmes',
      bio: '',
      image: '/images/team/member-03.jpg',
      email: '',
      phone: '',
      social: {
        linkedin: '#',
        twitter: '#',
        facebook: '#'
      },
      order: 6,
      icon: FaUserFriends,
      iconColor: 'text-navy'
    }
  ];

  // Extra team members for carousel
  const extraTeamMembers = [
    {
      id: 6,
      name: 'TATU SAID OMAR',
      role: '',
      image: '/images/team/member-3.jpg',
    },
    {
      id: 7,
      name: 'RAMA SUDI KOMBO',
      role: '',
      image: '/images/team/member-4.jpg',
    },
    {
      id: 8,
      name: 'NASSRA JOSEPH MCHARO AND AMINA MOHAMED KOLIN',
      role: '',
      image: '/images/team/member-5.jpg',
    },
    {
      id: 9,
      name: 'NASSRA JOSEPH MCHARO',
      role: '',
      image: '/images/team/member-6.jpg',
    },
    {
      id: 9,
      name: 'AMINA MOHAMED KOLIN',
      role: '',
      image: '/images/team/member-7.jpg',
    }
  ];

  // Order team members properly and filter categories
  const sortedTeam = [...teamMembers].sort((a, b) => a.order - b.order);
  
  const categories = ['All', 'Leadership', 'Programmes'];
  const filteredTeam = activeFilter === 'All' 
    ? sortedTeam 
    : sortedTeam.filter(member => member.category === activeFilter);

  // Leadership members (first 3)
  const leadership = sortedTeam.filter(m => m.category === 'Leadership');

  // Carousel navigation
  const scrollCarousel = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title">Our Team</h1>
          <p className="section-subtitle mx-auto">
            Meet the dedicated individuals behind Little Angels CBO who work tirelessly to touch lives, restore hope, and build futures.
          </p>
        </motion.div>

        {/* Leadership Team - Highlighted */}
        <div className="mb-16">
          <h2 className="text-2xl font-heading font-bold text-navy text-center mb-8 flex items-center justify-center gap-2">
            <FaCrown className="text-orange" />
            Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadership.map((member, index) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={member.id}
                  className="relative group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-72 overflow-hidden bg-gray-100">
                      <img 
                        src={member.image} 
                        alt={member.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500 bg-gray-50"
                        onError={(e) => {
                          e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400"%3E%3Crect width="400" height="400" fill="%230F3D5E" opacity="0.1"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="18" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3ETeam Member%3C/text%3E%3C/svg%3E';
                        }}
                      />
                      <div className={`absolute top-4 right-4 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg`}>
                        <Icon className={`text-2xl ${member.iconColor}`} />
                      </div>
                      {member.order === 1 && (
                        <div className="absolute bottom-4 left-4 bg-orange text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                          Founder
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-heading font-bold text-navy mb-1">
                        {member.name}
                      </h3>
                      <p className="text-sm text-teal font-semibold mb-3">
                        {member.role}
                      </p>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {member.bio}
                      </p>

                      {/* Contact Info */}
                      <div className="space-y-1 text-sm text-gray-500 mb-4">
                        <p className="flex items-center gap-2">
                          <FaEnvelope className="text-teal" size={14} />
                          {member.email}
                        </p>
                        <p className="flex items-center gap-2">
                          <FaPhone className="text-teal" size={14} />
                          {member.phone}
                        </p>
                      </div>

                      {/* Social Links */}
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          <a href="#" className="text-gray-400 hover:text-teal transition-colors">
                            <FaFacebook size={18} />
                          </a>
                          <a href="#" className="text-gray-400 hover:text-teal transition-colors">
                            <FaTwitter size={18} />
                          </a>
                          <a href="#" className="text-gray-400 hover:text-teal transition-colors">
                            <FaLinkedin size={18} />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-teal text-white shadow-lg shadow-teal/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Team Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeam
            .filter(member => member.category !== 'Leadership')
            .map((member, index) => {
              const Icon = member.icon;
              return (
                <motion.div
                  key={member.id}
                  className="card group"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                >
                  <div className="flex items-start p-6">
                    {/* Image */}
                    <div className="flex-shrink-0 mr-4">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-teal/20 group-hover:border-teal transition-colors duration-300 bg-gray-100">
                        <img 
                          src={member.image} 
                          alt={member.name}
                          className="w-full h-full object-cover object-top group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"%3E%3Crect width="200" height="200" fill="%23148A86" opacity="0.1"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3EMember%3C/text%3E%3C/svg%3E';
                          }}
                        />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-heading font-bold text-navy truncate">
                            {member.name}
                          </h3>
                          <p className="text-sm text-teal font-medium">
                            {member.role}
                          </p>
                        </div>
                        <Icon className={`${member.iconColor} text-xl flex-shrink-0`} />
                      </div>
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {member.bio}
                      </p>
                      <div className="flex items-center gap-3 mt-3">
                        <a href={`mailto:${member.email}`} className="text-gray-400 hover:text-teal transition-colors text-sm">
                          <FaEnvelope />
                        </a>
                        <a href={`tel:${member.phone}`} className="text-gray-400 hover:text-teal transition-colors text-sm">
                          <FaPhone />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
        </div>

        {/* Carousel Section - Extra Team Members */}
        <div className="mt-20">
          <h2 className="text-2xl font-heading font-bold text-navy text-center mb-8">
            Meet More of Our Team
          </h2>
          <div className="relative">
            {/* Carousel Container */}
            <div 
              ref={carouselRef}
              className="flex overflow-x-auto gap-6 pb-4 scroll-smooth hide-scrollbar"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {extraTeamMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex-shrink-0 w-64 bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <img 
                      src={member.image} 
                      alt={member.name}
                      className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="%23148A86" opacity="0.1"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3ETeam Member%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-heading font-bold text-navy">{member.name}</h4>
                    <p className="text-sm text-gray-600">{member.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Carousel Navigation Buttons */}
            <button
              onClick={() => scrollCarousel('left')}
              className="absolute left-0 top-1/2 -translate-y-1/2 -ml-4 bg-white rounded-full p-2 shadow-lg hover:bg-teal hover:text-white transition-all duration-300 z-10"
            >
              <FaChevronLeft className="text-navy" />
            </button>
            <button
              onClick={() => scrollCarousel('right')}
              className="absolute right-0 top-1/2 -translate-y-1/2 -mr-4 bg-white rounded-full p-2 shadow-lg hover:bg-teal hover:text-white transition-all duration-300 z-10"
            >
              <FaChevronRight className="text-navy" />
            </button>
          </div>
        </div>

        {/* Join Team Section */}
        <motion.div 
          className="mt-16 bg-gradient-to-r from-navy to-teal rounded-3xl p-8 md:p-12 text-white text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold mb-4">
            Join Our Team
          </h2>
          <p className="text-gray-200 max-w-2xl mx-auto mb-6">
            Are you passionate about making a difference? We're always looking for dedicated individuals to join our team and help us touch more lives.
          </p>
          <Link to="/volunteer">
            <button className="btn-primary">
              Volunteer With Us
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Team;