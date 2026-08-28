import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CampaignSection = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-navy to-teal">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-orange/20 text-orange px-4 py-2 rounded-full text-sm font-semibold mb-4">
              Featured Campaign
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-white mb-4">
              Together, We Can Make a Difference
            </h2>
            <p className="text-gray-200 text-lg mb-6">
              Help us provide food, shelter, education, and hope to vulnerable children and families in our community.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-6">
              <div className="flex justify-between text-white mb-2">
                <span className="text-sm">Goal: KES 3 Million</span>
                <span className="text-sm">Raised: KES 1.2 Million</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-3 mb-2">
                <div className="bg-orange h-3 rounded-full" style={{ width: '45.5%' }}></div>
              </div>
              <p className="text-white/80 text-sm">45.5% of goal reached</p>
            </div>

            <Link to="/donate">
              <button className="btn-primary">
                Donate to This Campaign
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src="/images/campaign.jpg" 
              alt="Campaign" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
            />
            <div className="absolute -bottom-6 -right-6 bg-orange text-white px-6 py-3 rounded-xl shadow-lg">
              <p className="font-bold text-lg">Urgent</p>
              <p className="text-sm">Help Now</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;