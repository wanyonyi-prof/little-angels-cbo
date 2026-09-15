import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaChild, 
  FaUtensils, 
  FaTshirt, 
  FaHome, 
  FaHeartbeat, 
  FaHandsHelping 
} from 'react-icons/fa';

const ProgrammesSection = () => {
  const programmes = [
    {
      id: 'children',
      icon: FaChild,
      title: 'Vulnerable Children Support',
      description: 'Providing care and support to vulnerable children in need.',
      color: 'text-teal',
      image: '/images/programmes/children.jpg',
    },
    {
      id: 'food',
      icon: FaUtensils,
      title: 'Food and Meal Support',
      description: 'Helping individuals, families, and children access food and meals.',
      color: 'text-orange',
      image: '/images/programmes/food.jpg',
    },
    {
      id: 'clothing',
      icon: FaTshirt,
      title: 'Clothing Support',
      description: 'Providing clothing and essential items to those in need.',
      color: 'text-navy',
      image: '/images/programmes/clothing.jpg',
    },
    {
      id: 'homes',
      icon: FaHome,
      title: "Children's Homes Outreach",
      description: 'Supporting children living in children\'s homes through visits, meals, and care.',
      color: 'text-teal',
      image: '/images/programmes/homes.jpg',
    },
    {
      id: 'sick',
      icon: FaHeartbeat,
      title: 'Supporting the Sick',
      description: 'Providing assistance and care to sick and vulnerable individuals.',
      color: 'text-orange',
      image: '/images/programmes/sick.jpg',
    },
    {
      id: 'community',
      icon: FaHandsHelping,
      title: 'Community Outreach',
      description: 'Reaching communities and responding to different humanitarian needs.',
      color: 'text-navy',
      image: '/images/programmes/community.jpg',
    },
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-3 md:mb-4">
            What We Do
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Through our comprehensive programmes, we address the diverse needs of vulnerable communities.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {programmes.map((programme, index) => {
            const Icon = programme.icon;
            return (
              <motion.div
                key={programme.id}
                className="card group overflow-hidden"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img 
                    src={programme.image} 
                    alt={programme.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23148A86" opacity="0.2"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="18" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3E%3C/text%3E%3C/svg%3E';
                    }}
                  />
                  {/* Overlay Icon */}
                  <div className={`absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm p-2 rounded-full shadow-lg ${programme.color}`}>
                    <Icon className="text-xl" />
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-4 sm:p-6">
                  <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold text-navy mb-2">
                    {programme.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">
                    {programme.description}
                  </p>
                  <Link 
                    to={`/programmes/${programme.id}`}
                    className="text-teal font-semibold hover:text-orange transition-colors inline-flex items-center gap-1 text-sm"
                  >
                    Learn More
                    <span className="text-lg">→</span>
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgrammesSection;