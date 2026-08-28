import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Gallery = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = ['All', 'Community Outreach', "Children's Support", 'Food Programmes', "Children's Homes", 'Volunteers', 'Events'];

  const images = [
    { id: 1, src: '/images/gallery/outreach-1.jpg', title: 'Community Outreach', category: 'Community Outreach' },
    { id: 2, src: '/images/gallery/children-1.jpg', title: 'Children\'s Support Programme', category: 'Children\'s Support' },
    { id: 3, src: '/images/gallery/food-1.jpg', title: 'Food Distribution', category: 'Food Programmes' },
    { id: 4, src: '/images/gallery/homes-1.jpg', title: 'Children\'s Home Visit', category: 'Children\'s Homes' },
    { id: 5, src: '/images/gallery/volunteer-1.jpg', title: 'Volunteers in Action', category: 'Volunteers' },
    { id: 6, src: '/images/gallery/event-1.jpg', title: 'Community Event', category: 'Events' },
    { id: 7, src: '/images/gallery/outreach-2.jpg', title: 'Community Outreach Programme', category: 'Community Outreach' },
    { id: 8, src: '/images/gallery/children-2.jpg', title: 'Supporting Children\'s Education', category: 'Children\'s Support' },
    { id: 9, src: '/images/gallery/food-2.jpg', title: 'Meal Distribution', category: 'Food Programmes' },
    { id: 10, src: '/images/gallery/homes-2.jpg', title: 'Children\'s Home Support', category: 'Children\'s Homes' },
    { id: 11, src: '/images/gallery/volunteer-2.jpg', title: 'Volunteer Training', category: 'Volunteers' },
    { id: 12, src: '/images/gallery/event-2.jpg', title: 'Fundraising Event', category: 'Events' },
  ];

  const filteredImages = selectedCategory === 'All' 
    ? images 
    : images.filter(img => img.category === selectedCategory);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const navigateImage = (direction) => {
    const newIndex = (currentIndex + direction + filteredImages.length) % filteredImages.length;
    setCurrentIndex(newIndex);
    setSelectedImage(newIndex);
  };

  return (
    <div className="py-20">
      <div className="container-custom">
        {/* Header */}
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="section-title">Gallery</h1>
          <p className="section-subtitle mx-auto">
            A visual journey through our work, impact, and the lives we've touched.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div 
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-teal text-white shadow-lg shadow-teal/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredImages.map((image, index) => (
            <motion.div
              key={image.id}
              className="relative group cursor-pointer overflow-hidden rounded-2xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.src} 
                alt={image.title}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div>
                  <p className="text-white text-sm font-medium">{image.title}</p>
                  <p className="text-gray-300 text-xs">{image.category}</p>
                </div>
              </div>
              <div className="absolute top-3 right-3 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaSearch className="text-navy text-sm" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Lightbox */}
        <AnimatePresence>
          {selectedImage !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
              onClick={closeLightbox}
            >
              <button
                className="absolute top-4 right-4 text-white text-3xl hover:text-orange transition-colors"
                onClick={closeLightbox}
              >
                <FaTimes />
              </button>
              
              <button
                className="absolute left-4 text-white text-3xl hover:text-orange transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(-1);
                }}
              >
                <FaChevronLeft />
              </button>
              
              <button
                className="absolute right-4 text-white text-3xl hover:text-orange transition-colors"
                onClick={(e) => {
                  e.stopPropagation();
                  navigateImage(1);
                }}
              >
                <FaChevronRight />
              </button>

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="max-w-5xl max-h-[90vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <img 
                  src={filteredImages[currentIndex].src} 
                  alt={filteredImages[currentIndex].title}
                  className="w-full h-auto max-h-[80vh] object-contain rounded-2xl"
                />
                <div className="text-center text-white mt-4">
                  <p className="text-lg font-medium">{filteredImages[currentIndex].title}</p>
                  <p className="text-gray-400 text-sm">{filteredImages[currentIndex].category}</p>
                  <p className="text-gray-500 text-xs mt-2">
                    {currentIndex + 1} of {filteredImages.length}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Gallery;