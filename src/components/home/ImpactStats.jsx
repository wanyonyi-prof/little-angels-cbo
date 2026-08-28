import React from 'react';

const ImpactStats = () => {
  const stats = [
    { number: '500+', label: 'Children Supported', icon: '' },
    { number: '200+', label: 'Families Reached', icon: '' },
    { number: '10K+', label: 'Meals Provided', icon: '' },
    { number: '15+', label: 'Communities Reached', icon: '' },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-softWhite to-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="section-title">Our Impact in Numbers</h2>
          <p className="section-subtitle mx-auto">
            Every number represents a life touched and a hope restored.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-4xl mb-3">{stat.icon}</div>
              <div className="text-3xl md:text-4xl font-bold text-teal mb-2">
                {stat.number}
              </div>
              <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStats;