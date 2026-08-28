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
    <section className="py-20 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            What We Do
          </motion.h2>
          <motion.p 
            className="section-subtitle mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Through our comprehensive programmes, we address the diverse needs of vulnerable communities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programmes.map((programme, index) => {
            const Icon = programme.icon;
            return (
              <motion.div
                key={programme.id}
                className="card p-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`text-3xl ${programme.color} mb-4`}>
                  <Icon />
                </div>
                <h3 className="text-xl font-heading font-bold text-navy mb-2">
                  {programme.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">{programme.description}</p>
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