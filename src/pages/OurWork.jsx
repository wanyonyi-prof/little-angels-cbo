import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaChild, 
  FaUtensils, 
  FaTshirt, 
  FaHome, 
  FaHeartbeat, 
  FaHandsHelping,
  FaArrowRight 
} from 'react-icons/fa';

const OurWork = () => {
  const programmes = [
    {
      id: 'children',
      icon: FaChild,
      title: 'Vulnerable Children Support',
      description: 'Providing comprehensive care and support to vulnerable children in need of protection, education, and basic necessities.',
      impact: '500+ children supported',
      color: 'text-teal',
      bg: 'bg-teal/10',
      image: '/images/programmes/children.jpg'
    },
    {
      id: 'food',
      icon: FaUtensils,
      title: 'Food and Meal Support',
      description: 'Helping individuals, families, and children access nutritious food and meals through food distribution and feeding programmes.',
      impact: '10,000+ meals provided',
      color: 'text-orange',
      bg: 'bg-orange/10',
      image: '/images/programmes/food.jpg'
    },
    {
      id: 'clothing',
      icon: FaTshirt,
      title: 'Clothing Support',
      description: 'Providing clothing, shoes, and essential items to those in need, ensuring dignity and protection from the elements.',
      impact: '1,000+ people clothed',
      color: 'text-navy',
      bg: 'bg-navy/10',
      image: '/images/programmes/clothing.jpg'
    },
    {
      id: 'homes',
      icon: FaHome,
      title: "Children's Homes Outreach",
      description: 'Supporting children living in children\'s homes through regular visits, meals, clothing, educational materials, and emotional support.',
      impact: '15+ homes supported',
      color: 'text-teal',
      bg: 'bg-teal/10',
      image: '/images/programmes/homes.jpg'
    },
    {
      id: 'sick',
      icon: FaHeartbeat,
      title: 'Supporting the Sick',
      description: 'Providing assistance, care, and support to sick and vulnerable individuals, including hospital visits and medical support.',
      impact: '200+ patients assisted',
      color: 'text-orange',
      bg: 'bg-orange/10',
      image: '/images/programmes/sick.jpg'
    },
    {
      id: 'community',
      icon: FaHandsHelping,
      title: 'Community Outreach',
      description: 'Reaching communities and responding to different humanitarian needs through outreach programmes and community engagement.',
      impact: '15+ communities reached',
      color: 'text-navy',
      bg: 'bg-navy/10',
      image: '/images/programmes/community.jpg'
    },
  ];

  return (
    <div className="py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title">Our Work</h1>
          <p className="section-subtitle mx-auto">
            Through our comprehensive programmes, we address the diverse needs of vulnerable children, families, and communities across Kenya.
          </p>
        </motion.div>

        {/* Programmes Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {programmes.map((programme, index) => {
            const Icon = programme.icon;
            return (
              <motion.div
                key={programme.id}
                className="card overflow-hidden group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3">
                  <div className="md:col-span-1 relative overflow-hidden h-48 md:h-auto">
                    <img 
                      src={programme.image} 
                      alt={programme.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className={`absolute inset-0 ${programme.bg} opacity-20`}></div>
                  </div>
                  <div className="md:col-span-2 p-6 flex flex-col">
                    <div className={`text-3xl ${programme.color} mb-3`}>
                      <Icon />
                    </div>
                    <h3 className="text-xl font-heading font-bold text-navy mb-2">
                      {programme.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3 flex-grow">
                      {programme.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs font-semibold text-teal bg-teal/10 px-3 py-1 rounded-full">
                        {programme.impact}
                      </span>
                      <Link 
                        to={`/programmes/${programme.id}`}
                        className="text-teal font-semibold hover:text-orange transition-colors inline-flex items-center gap-1 text-sm"
                      >
                        Learn More
                        <FaArrowRight className="text-xs" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div 
          className="mt-16 text-center bg-gradient-to-r from-navy to-teal rounded-3xl p-12 text-white"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-heading font-bold mb-4">Want to Make a Difference?</h2>
          <p className="text-gray-200 max-w-2xl mx-auto mb-6">
            Your support helps us continue our work and reach more vulnerable children, families, and communities.
          </p>
          <Link to="/donate">
            <button className="btn-primary">
              Support Our Work
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default OurWork;