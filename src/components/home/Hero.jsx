import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 sm:pt-20 w-full overflow-x-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-bg.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-navy/90 via-navy/80 to-navy/70"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 py-8 sm:py-12 w-full max-w-full overflow-hidden">
        <div className="max-w-3xl mx-auto sm:mx-0 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-orange/20 text-orange px-3 py-1 md:px-4 md:py-2 rounded-full text-xs sm:text-sm font-semibold mb-4 md:mb-6 backdrop-blur-sm break-words">
              Touching Lives. Restoring Hope. Building Futures.
            </span>
          </motion.div>

          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-tight mb-4 md:mb-6 break-words"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every Act of Kindness
            <span className="text-orange block mt-1">Can Change a Life.</span>
          </motion.h1>

          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-200 leading-relaxed mb-6 md:mb-8 max-w-2xl break-words"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Little Angels CBO is committed to touching lives, restoring hope, and building better futures for vulnerable children, families, and communities.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-3 md:gap-4 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/donate" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto btn-primary text-sm md:text-base px-6 md:px-8 lg:px-10 py-3 md:py-4 whitespace-nowrap">
                Donate Now
              </button>
            </Link>
            <Link to="/our-work" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto btn-outline text-sm md:text-base px-6 md:px-8 lg:px-10 py-3 md:py-4 border-2 border-white text-white hover:bg-white hover:text-navy transition-all duration-300 rounded-lg font-semibold whitespace-nowrap">
                Discover Our Work
                <FaArrowRight className="inline ml-2" />
              </button>
            </Link>
          </motion.div>

          {/* Stats - Responsive Grid */}
          <motion.div
            className="mt-8 md:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-3 md:gap-6 w-full"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            {[
              { number: '500+', label: 'Children Supported' },
              { number: '200+', label: 'Families Reached' },
              { number: '10K+', label: 'Meals Provided' },
              { number: '15+', label: 'Communities Reached' },
            ].map((stat, index) => (
              <div key={index} className="text-center bg-black/20 backdrop-blur-sm rounded-xl p-3 md:p-4">
                <div className="text-xl sm:text-2xl md:text-3xl font-bold text-orange">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-300 break-words">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator - Hide on mobile */}
      <motion.div
        className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 text-white hidden sm:block"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/60 rounded-full mt-2"></div>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;