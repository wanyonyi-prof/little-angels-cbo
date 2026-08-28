import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const CampaignSection = () => {
  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-navy to-teal">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block bg-orange/20 text-orange px-3 sm:px-4 py-1 sm:py-2 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
              Featured Campaign
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3 sm:mb-4">
              Together, We Can Make a Difference
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-200 mb-4 sm:mb-6">
              Help us provide food, shelter, education, and hope to vulnerable children and families in our community.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
              <div className="flex justify-between text-white mb-2 text-sm sm:text-base">
                <span>Goal: KES 500,000</span>
                <span>Raised: KES 312,500</span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2 sm:h-3 mb-2">
                <div className="bg-orange h-2 sm:h-3 rounded-full" style={{ width: '62.5%' }}></div>
              </div>
              <p className="text-white/80 text-xs sm:text-sm">62.5% of goal reached</p>
            </div>

            <Link to="/donate">
              <button className="btn-primary w-full sm:w-auto text-sm sm:text-base">
                Donate to This Campaign
              </button>
            </Link>
          </motion.div>

          <motion.div
            className="relative mt-6 lg:mt-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img 
              src="/images/campaign.jpg" 
              alt="Campaign" 
              className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              onError={(e) => {
                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect width="600" height="400" fill="%23F97316" opacity="0.2"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="18" fill="%23ffffff" text-anchor="middle" dy=".3em"%3ECampaign Image%3C/text%3E%3C/svg%3E';
              }}
            />
            <div className="absolute -bottom-3 sm:-bottom-6 -right-2 sm:-right-6 bg-orange text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg">
              <p className="font-bold text-sm sm:text-lg">Urgent</p>
              <p className="text-xs sm:text-sm">Help Now</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CampaignSection;