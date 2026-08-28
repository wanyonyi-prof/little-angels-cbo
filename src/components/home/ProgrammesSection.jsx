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
    },
    {
      id: 'food',
      icon: FaUtensils,
      title: 'Food and Meal Support',
      description: 'Helping individuals, families, and children access food and meals.',
      color: 'text-orange',
    },
    {
      id: 'clothing',
      icon: FaTshirt,
      title: 'Clothing Support',
      description: 'Providing clothing and essential items to those in need.',
      color: 'text-navy',
    },
    {
      id: 'homes',
      icon: FaHome,
      title: "Children's Homes Outreach",
      description: 'Supporting children living in children\'s homes through visits, meals, and care.',
      color: 'text-teal',
    },
    {
      id: 'sick',
      icon: FaHeartbeat,
      title: 'Supporting the Sick',
      description: 'Providing assistance and care to sick and vulnerable individuals.',
      color: 'text-orange',
    },
    {
      id: 'community',
      icon: FaHandsHelping,
      title: 'Community Outreach',
      description: 'Reaching communities and responding to different humanitarian needs.',
      color: 'text-navy',
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
                className="card p-4 sm:p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`text-2xl sm:text-3xl ${programme.color} mb-3 sm:mb-4`}>
                  <Icon />
                </div>
                <h3 className="text-base sm:text-lg md:text-xl font-heading font-bold text-navy mb-2">
                  {programme.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-3 sm:mb-4">{programme.description}</p>
                <Link 
                  to={`/programmes/${programme.id}`}
                  className="text-teal font-semibold hover:text-orange transition-colors inline-flex items-center gap-1 text-sm"
                >
                  Learn More
                  <span className="text-lg">→</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ProgrammesSection;