import React from 'react';
import { motion } from 'framer-motion';
import { FaHandsHelping, FaHeart, FaStar, FaUsers, FaShieldAlt, FaGlobeAfrica, FaCalendar, FaCertificate, FaAward } from 'react-icons/fa';

const About = () => {
  const values = [
    { icon: FaHeart, title: 'Compassion', description: 'We approach every person with empathy and understanding.' },
    { icon: FaShieldAlt, title: 'Dignity', description: 'We respect the inherent worth and dignity of every individual.' },
    { icon: FaStar, title: 'Hope', description: 'We bring hope to those who need it most.' },
    { icon: FaHandsHelping, title: 'Integrity', description: 'We operate with transparency and honesty.' },
    { icon: FaUsers, title: 'Community', description: 'We work together to build stronger communities.' },
    { icon: FaGlobeAfrica, title: 'Inclusion', description: 'We welcome and serve everyone without discrimination.' },
  ];

  return (
    <div className="py-20">
      <div className="container-custom">
        {/* Hero Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title">About Little Angels CBO</h1>
          <p className="section-subtitle mx-auto">
            Touching Lives. Restoring Hope. Building Futures.
          </p>
        </motion.div>

        {/* Our Story with Founding Date */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div>
            <h2 className="text-3xl font-heading font-bold text-navy mb-4">Our Story</h2>
            <div className="flex items-center gap-2 mb-4 text-teal">
              <FaCalendar className="text-orange" />
              <span className="font-semibold">Founded: 25th October 2019</span>
            </div>
            <p className="text-gray-600 leading-relaxed mb-4">
              Little Angels CBO was founded by <strong>Amal Said Ndoro</strong> on <strong>25th October 2019</strong> with a vision to touch lives, restore hope, and build futures for vulnerable children, families, and communities across Kenya.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              What began as a small initiative to help children in need has grown into a comprehensive community-based organization that serves hundreds of vulnerable people through various programmes.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Today, Little Angels CBO continues to make a meaningful difference in the lives of those who need it most, providing food, clothing, education support, and hope to communities facing hardship.
            </p>
          </div>
          <div className="relative">
            <img 
              src="/images/about-story.jpg" 
              alt="Our Story" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect width="600" height="400" fill="%23148A86" opacity="0.2"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="18" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3EAbout Story%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="absolute -bottom-4 -right-4 bg-orange text-white px-6 py-4 rounded-xl shadow-lg">
              <p className="font-bold">Founded 2019</p>
            </div>
          </div>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          <motion.div 
            className="bg-teal/10 rounded-2xl p-8 border border-teal/20"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-heading font-bold text-teal mb-4">Our Mission</h3>
            <p className="text-gray-700 leading-relaxed">
              To touch lives, restore hope, and build futures for vulnerable children, families, and communities through compassionate support, essential services, and sustainable programmes.
            </p>
          </motion.div>
          <motion.div 
            className="bg-navy/10 rounded-2xl p-8 border border-navy/20"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-heading font-bold text-navy mb-4">Our Vision</h3>
            <p className="text-gray-700 leading-relaxed">
              A world where every vulnerable child, family, and community has access to the support, resources, and opportunities they need to thrive with dignity and hope.
            </p>
          </motion.div>
        </div>

        {/* Certificates Section - NEW */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-4 flex items-center justify-center gap-2">
            <FaCertificate className="text-orange" />
            Our Certifications
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            We are proud to be a registered and certified Community-Based Organization committed to transparency and accountability.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="card p-6 text-center group">
              <div className="relative overflow-hidden rounded-xl bg-gray-100">
                <img 
                  src="/images/certificates/certificate-1.jpg" 
                  alt="Certificate 1"
                  className="w-full h-80 object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="400" viewBox="0 0 500 400"%3E%3Crect width="500" height="400" fill="%23F97316" opacity="0.1"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3ECertificate 1%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-heading font-bold text-navy">CBO Registration Certificate</h3>
                <p className="text-sm text-gray-500">Official registration document</p>
              </div>
            </div>
            <div className="card p-6 text-center group">
              <div className="relative overflow-hidden rounded-xl bg-gray-100">
                <img 
                  src="/images/certificates/certificate-2.jpg" 
                  alt="Certificate 2"
                  className="w-full h-80 object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="500" height="400" viewBox="0 0 500 400"%3E%3Crect width="500" height="400" fill="%23148A86" opacity="0.1"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="20" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3ECertificate 2%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="mt-4">
                <h3 className="text-lg font-heading font-bold text-navy">Operational License</h3>
                <p className="text-sm text-gray-500">Approved by relevant authorities</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Our Values */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-4">Our Values</h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            These core values guide everything we do and every decision we make.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={index}
                  className="card p-6"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="text-3xl text-teal mb-4">
                    <Icon />
                  </div>
                  <h3 className="text-xl font-heading font-bold text-navy mb-2">{value.title}</h3>
                  <p className="text-gray-600 text-sm">{value.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Founder Section */}
        <motion.div 
          className="mt-20 bg-gradient-to-r from-navy to-teal rounded-3xl p-8 md:p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <img 
                src="/images/founder.jpg" 
                alt="Amal Said Ndoro - Founder" 
                className="rounded-2xl w-full h-auto max-w-xs mx-auto shadow-2xl"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300" viewBox="0 0 300 300"%3E%3Crect width="300" height="300" fill="%23F97316" opacity="0.2"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%23ffffff" text-anchor="middle" dy=".3em"%3EFounder%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            <div className="md:col-span-2">
              <h3 className="text-2xl font-heading font-bold mb-2">Meet Our Founder</h3>
              <h4 className="text-3xl font-heading font-bold text-orange mb-4">Amal Said Ndoro</h4>
              <p className="text-gray-200 leading-relaxed mb-4">
                Amal Said Ndoro is the visionary founder of Little Angels CBO. With a deep passion for serving vulnerable children and communities, Amal established the organization in October 2019 to provide hope, support, and opportunities to those who need it most.
              </p>
              <p className="text-gray-200 leading-relaxed">
                Through dedication, compassion, and unwavering commitment, Amal has led Little Angels CBO to become a beacon of hope for vulnerable children, families, and communities across Kenya.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;