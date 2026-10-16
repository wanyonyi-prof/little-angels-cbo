import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaHandsHelping,
  FaDonate,
  FaUsers,
  FaHeart,
  FaShareAlt,
  FaHandshake,
  FaComments,
} from 'react-icons/fa';

const GetInvolved = () => {
  const ways = [
    {
      id: 'donate',
      icon: FaDonate,
      title: 'Donate',
      description:
        'Support our work financially. Every contribution, no matter the size, makes a difference in the lives of vulnerable children and families.',
      cta: 'Donate Now',
      link: '/donate',
      color: 'bg-orange',
      textColor: 'text-orange',
    },
    {
      id: 'volunteer',
      icon: FaHandsHelping,
      title: 'Volunteer',
      description:
        'Offer your time, skills, and expertise to support our programmes and make a direct impact in the community.',
      cta: 'Volunteer Now',
      link: '/volunteer',
      color: 'bg-teal',
      textColor: 'text-teal',
    },
    {
      id: 'partner',
      icon: FaHandshake,
      title: 'Partner With Us',
      description:
        'Build meaningful partnerships with our organization to create lasting change in communities across Kenya.',
      cta: 'Partner Now',
      link: '/partner',
      color: 'bg-navy',
      textColor: 'text-navy',
    },
    {
      id: 'consultation',
      icon: FaComments,
      title: 'Request a Consultation',
      description:
        'Book a free consultation with our team to discuss partnerships, programmes, or how we can support your community initiative.',
      cta: 'Book Consultation',
      link: '/consultation',
      color: 'bg-teal',
      textColor: 'text-teal',
    },
    {
      id: 'sponsor',
      icon: FaHeart,
      title: 'Sponsor',
      description:
        'Support a specific programme or initiative and make a direct impact on the lives of vulnerable children and families.',
      cta: 'Sponsor Now',
      link: '/donate',
      color: 'bg-orange',
      textColor: 'text-orange',
    },
    {
      id: 'spread',
      icon: FaShareAlt,
      title: 'Spread the Word',
      description:
        'Help raise awareness about our work by sharing our mission with your network and community.',
      cta: 'Share Now',
      link: '#',
      color: 'bg-teal',
      textColor: 'text-teal',
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
          <h1 className="section-title">Get Involved</h1>
          <p className="section-subtitle mx-auto">
            There are many ways you can make a difference. Choose the one that resonates with you.
          </p>
        </motion.div>

        {/* Ways to Get Involved */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ways.map((way, index) => {
            const Icon = way.icon;
            return (
              <motion.div
                key={way.id}
                className="card p-6 flex flex-col"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className={`${way.textColor} text-4xl mb-4`}>
                  <Icon />
                </div>
                <h3 className="text-xl font-heading font-bold text-navy mb-2">
                  {way.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 flex-grow">
                  {way.description}
                </p>
                <Link to={way.link}>
                  <button
                    className={`${
                      way.color === 'bg-orange'
                        ? 'btn-primary'
                        : way.color === 'bg-teal'
                        ? 'btn-secondary'
                        : 'btn-secondary'
                    } w-full text-center`}
                  >
                    {way.cta}
                  </button>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Additional Info */}
        <motion.div
          className="mt-16 bg-softWhite rounded-3xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-heading font-bold text-navy mb-4">
                Why Get Involved?
              </h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <FaHeart className="text-orange mt-1 flex-shrink-0" />
                  <span>Make a meaningful difference in someone's life</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FaUsers className="text-teal mt-1 flex-shrink-0" />
                  <span>Join a community of compassionate individuals</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FaHandsHelping className="text-navy mt-1 flex-shrink-0" />
                  <span>Use your skills and talents for good</span>
                </li>
                <li className="flex items-start space-x-3">
                  <FaDonate className="text-orange mt-1 flex-shrink-0" />
                  <span>Support sustainable community development</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-2xl font-heading font-bold text-navy mb-4">
                Ready to Make a Difference?
              </h3>
              <p className="text-gray-600 mb-4">
                Contact us today to learn more about how you can get involved and make a lasting impact.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/contact">
                  <button className="btn-secondary">Contact Us</button>
                </Link>
                <Link to="/consultation">
                  <button className="btn-outline">Book Consultation</button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default GetInvolved;