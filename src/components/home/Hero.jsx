import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('/images/hero-bg.jpg')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/80 to-navy/60"></div>
      </div>

      {/* Content */}
      <div className="container-custom relative z-10">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block bg-orange/20 text-orange px-4 py-2 rounded-full text-sm font-semibold mb-6 backdrop-blur-sm">
              Touching Lives. Restoring Hope. Building Futures.
            </span>
          </motion.div>

          <motion.h1
            className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Every Act of Kindness
            <span className="text-orange block">Can Change a Life.</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-gray-200 leading-relaxed mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Little Angels CBO is committed to touching lives, restoring hope, and building better futures for vulnerable children, families, and communities.
          </motion.p>

          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <Link to="/donate">
              <button className="btn-primary text-base md:text-lg px-8 md:px-10 py-3 md:py-4">
                Donate Now
              </button>
            </Link>
            <Link to="/our-work">
              <button className="btn-outline text-base md:text-lg px-8 md:px-10 py-3 md:py-4 border-white text-white hover:bg-white hover:text-navy">
                Discover Our Work
                <FaArrowRight className="inline ml-2" />
              </button>
            </Link>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
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
              <div key={index} className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange">{stat.number}</div>
                <div className="text-sm text-gray-300">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
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