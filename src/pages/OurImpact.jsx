import React from 'react';
import { Link } from 'react-router-dom';
import { FaChild, FaUsers, FaHandsHelping, FaUtensils } from 'react-icons/fa';

const OurImpact = () => {
  const stats = [
    { number: '500+', label: 'Children Supported', icon: FaChild, color: 'text-teal' },
    { number: '200+', label: 'Families Reached', icon: FaUsers, color: 'text-orange' },
    { number: '10,000+', label: 'Meals Provided', icon: FaUtensils, color: 'text-navy' },
    { number: '15+', label: 'Communities Reached', icon: FaHandsHelping, color: 'text-teal' },
  ];

  const achievements = [
    {
      title: 'School Support Programme',
      description: 'Provided school supplies and support to 300+ children in 10 schools.',
      icon: ''
    },
    {
      title: 'Medical Assistance',
      description: 'Supported 200+ patients with medical care, medication, and hospital visits.',
      icon: ''
    },
    {
      title: 'Food Distribution',
      description: 'Distributed over 10,000 meals to vulnerable families and children.',
      icon: ''
    },
    {
      title: "Children's Home Support",
      description: 'Supported 15+ children\'s homes with food, clothing, and essential supplies.',
      icon: ''
    },
  ];

  return (
    <div className="py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="section-title">Our Impact</h1>
          <p className="section-subtitle mx-auto">
            Every number represents a life touched, a hope restored, and a future built.
          </p>
        </div>

        {/* Impact Statistics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                className="text-center p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`text-3xl ${stat.color} mb-2 flex justify-center`}>
                  <Icon />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-navy mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>

        {/* Achievements */}
        <div className="mb-16">
          <h2 className="text-3xl font-heading font-bold text-navy text-center mb-12">
            Key Achievements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {achievements.map((achievement, index) => (
              <div
                key={index}
                className="card p-6 flex items-start space-x-4 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl flex-shrink-0">{achievement.icon}</div>
                <div>
                  <h3 className="text-lg font-heading font-bold text-navy mb-1">
                    {achievement.title}
                  </h3>
                  <p className="text-gray-600 text-sm">{achievement.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact Story */}
        <div className="bg-gradient-to-r from-navy to-teal rounded-3xl p-8 md:p-12 text-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="inline-block bg-orange/20 text-orange px-4 py-2 rounded-full text-sm font-semibold mb-4">
                Success Story
              </span>
              <h3 className="text-2xl font-heading font-bold mb-4">
                A Life Transformed Through Education
              </h3>
              <p className="text-gray-200 leading-relaxed mb-4">
                Meet Sarah, a young girl from a disadvantaged family who was struggling to continue her education. Through our Vulnerable Children Support programme, Sarah received school supplies, uniforms, and mentorship support.
              </p>
              <p className="text-gray-200 leading-relaxed">
                Today, Sarah is excelling in school and dreams of becoming a teacher. Her story is just one example of how your support transforms lives.
              </p>
            </div>
            <div className="relative">
              <img 
                src="/images/impact-story.jpg" 
                alt="Impact Story" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
                onError={(e) => {
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23148A86" opacity="0.3"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="18" fill="%23ffffff" text-anchor="middle" dy=".3em"%3EImpact Story Image%3C/text%3E%3C/svg%3E';
                }}
              />
              <div className="absolute -bottom-4 -left-4 bg-orange text-white px-4 py-2 rounded-xl shadow-lg">
                <p className="font-bold text-sm">Sarah's Story</p>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action - FIXED */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-navy mb-4">
            Help Us Create More Impact
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6">
            Your donation helps us reach more children, families, and communities in need.
          </p>
          <Link to="/donate">
            <button className="btn-primary">
              Donate Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OurImpact;