import React from 'react';

const ImpactStats = () => {
  const stats = [
    { number: '500+', label: 'Children Supported'},
    { number: '200+', label: 'Families Reached'},
    { number: '10K+', label: 'Meals Provided'},
    { number: '15+', label: 'Communities Reached'},
  ];

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-softWhite to-white">
      <div className="container-custom">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-3 md:mb-4">
            Our Impact in Numbers
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto px-4">
            Every number represents a life touched and a hope restored.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-4 sm:p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">{stat.icon}</div>
              <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-teal mb-1">
                {stat.number}
              </div>
              <div className="text-xs sm:text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;