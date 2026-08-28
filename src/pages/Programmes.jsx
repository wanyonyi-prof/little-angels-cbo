import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FaChild, FaUtensils, FaTshirt, FaHome, FaHeartbeat, FaHandsHelping,
  FaArrowLeft, FaDonate, FaUsers, FaCalendar, FaMapMarkerAlt
} from 'react-icons/fa';

const Programmes = () => {
  const { id } = useParams();
  const [programme, setProgramme] = useState(null);
  const [loading, setLoading] = useState(true);

  const programmesData = {
    children: {
      id: 'children',
      icon: FaChild,
      title: 'Vulnerable Children Support',
      description: 'Providing comprehensive care and support to vulnerable children in need of protection, education, and basic necessities.',
      longDescription: 'Our Vulnerable Children Support programme is dedicated to ensuring that every child has access to the care, protection, and opportunities they deserve. We work with children from disadvantaged backgrounds, providing them with essential support to help them thrive.',
      objectives: [
        'Provide basic necessities including food, clothing, and shelter',
        'Support access to quality education and school supplies',
        'Offer emotional and psychological support',
        'Protect children from harm and exploitation',
        'Create safe spaces for children to learn and grow'
      ],
      communities: 'We serve vulnerable children in Nairobi and surrounding areas across Kenya.',
      impact: '500+ children supported annually',
      image: '/images/programmes/children-detail.jpg',
      color: 'teal'
    },
    food: {
      id: 'food',
      icon: FaUtensils,
      title: 'Food and Meal Support',
      description: 'Helping individuals, families, and children access nutritious food and meals through food distribution and feeding programmes.',
      longDescription: 'Our Food and Meal Support programme addresses food insecurity by providing nutritious meals to vulnerable children, families, and communities. We believe that no child should go to bed hungry.',
      objectives: [
        'Provide regular nutritious meals to vulnerable children',
        'Distribute food packages to families in need',
        'Support community feeding programmes',
        'Promote nutritional education and awareness',
        'Ensure food security for vulnerable households'
      ],
      communities: 'We serve communities across Kenya facing food insecurity and hunger.',
      impact: '10,000+ meals provided',
      image: '/images/programmes/food-detail.jpg',
      color: 'orange'
    },
    clothing: {
      id: 'clothing',
      icon: FaTshirt,
      title: 'Clothing Support',
      description: 'Providing clothing, shoes, and essential items to those in need, ensuring dignity and protection from the elements.',
      longDescription: 'Our Clothing Support programme ensures that vulnerable children and families have access to proper clothing and essential items. We believe that clothing is not just a necessity but a matter of dignity.',
      objectives: [
        'Provide new and gently used clothing to those in need',
        'Supply school uniforms to vulnerable children',
        'Distribute shoes and essential items',
        'Ensure dignity and protection for vulnerable individuals',
        'Support families with clothing during emergencies'
      ],
      communities: 'We serve vulnerable individuals and families across Kenya.',
      impact: '1,000+ people clothed',
      image: '/images/programmes/clothing-detail.jpg',
      color: 'navy'
    },
    homes: {
      id: 'homes',
      icon: FaHome,
      title: "Children's Homes Outreach",
      description: 'Supporting children living in children\'s homes through regular visits, meals, clothing, educational materials, and emotional support.',
      longDescription: 'Our Children\'s Homes Outreach programme brings hope and support to children living in children\'s homes. We believe that every child deserves love, care, and a sense of belonging.',
      objectives: [
        'Visit children\'s homes regularly to provide support',
        'Provide meals and food supplies to children\'s homes',
        'Supply clothing and essential items',
        'Offer educational support and materials',
        'Create meaningful connections and emotional support'
      ],
      communities: 'We support children\'s homes across Kenya.',
      impact: '15+ homes supported',
      image: '/images/programmes/homes-detail.jpg',
      color: 'teal'
    },
    sick: {
      id: 'sick',
      icon: FaHeartbeat,
      title: 'Supporting the Sick',
      description: 'Providing assistance, care, and support to sick and vulnerable individuals, including hospital visits and medical support.',
      longDescription: 'Our Supporting the Sick programme provides care and assistance to individuals facing health challenges. We believe that no one should face illness alone and without support.',
      objectives: [
        'Provide medical support and assistance',
        'Visit patients in hospitals and homes',
        'Supply essential medication and supplies',
        'Offer emotional and spiritual support',
        'Connect individuals with healthcare resources'
      ],
      communities: 'We serve sick and vulnerable individuals across Kenya.',
      impact: '200+ patients assisted',
      image: '/images/programmes/sick-detail.jpg',
      color: 'orange'
    },
    community: {
      id: 'community',
      icon: FaHandsHelping,
      title: 'Community Outreach',
      description: 'Reaching communities and responding to different humanitarian needs through outreach programmes and community engagement.',
      longDescription: 'Our Community Outreach programme responds to the diverse needs of communities, providing support, resources, and hope to those facing hardship.',
      objectives: [
        'Identify and respond to community needs',
        'Provide emergency relief and support',
        'Engage community members in development initiatives',
        'Build community resilience and capacity',
        'Promote community-led solutions'
      ],
      communities: 'We serve communities across Kenya.',
      impact: '15+ communities reached',
      image: '/images/programmes/community-detail.jpg',
      color: 'navy'
    }
  };

  useEffect(() => {
    setLoading(true);
    const foundProgramme = programmesData[id];
    setProgramme(foundProgramme);
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (!programme) {
    return (
      <div className="py-20 text-center">
        <h1 className="text-2xl font-heading font-bold text-navy mb-4">Programme Not Found</h1>
        <p className="text-gray-600 mb-6">The programme you're looking for doesn't exist.</p>
        <Link to="/our-work">
          <button className="btn-secondary">View All Programmes</button>
        </Link>
      </div>
    );
  }

  const Icon = programme.icon;

  return (
    <div className="py-20">
      <div className="container-custom">
        {/* Back Button */}
        <Link to="/our-work" className="inline-flex items-center gap-2 text-teal hover:text-orange transition-colors mb-8">
          <FaArrowLeft /> Back to Programmes
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-2xl overflow-hidden shadow-xl mb-8"
            >
              <img 
                src={programme.image} 
                alt={programme.title}
                className="w-full h-auto object-cover"
              />
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className={`text-4xl text-${programme.color} mb-4`}>
                <Icon />
              </div>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
                {programme.title}
              </h1>
              <p className="text-gray-600 text-lg mb-6">
                {programme.longDescription}
              </p>

              <h2 className="text-2xl font-heading font-bold text-navy mb-4">
                Programme Objectives
              </h2>
              <ul className="space-y-2 mb-8">
                {programme.objectives.map((objective, index) => (
                  <li key={index} className="flex items-start space-x-3 text-gray-600">
                    <span className="text-teal mt-1">✓</span>
                    <span>{objective}</span>
                  </li>
                ))}
              </ul>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Communities Served</p>
                  <p className="font-medium text-navy">{programme.communities}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-sm text-gray-500">Impact</p>
                  <p className="font-medium text-navy">{programme.impact}</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-gradient-to-br from-navy to-teal rounded-2xl p-6 text-white">
              <h3 className="text-xl font-heading font-bold mb-4">Support This Programme</h3>
              <p className="text-gray-200 text-sm mb-6">
                Your donation to this programme directly supports vulnerable children and families in need.
              </p>
              <Link to="/donate">
                <button className="btn-primary w-full">
                  <FaDonate className="inline mr-2" />
                  Donate Now
                </button>
              </Link>
            </div>

            <div className="mt-6 bg-white rounded-2xl shadow-lg p-6">
              <h4 className="font-heading font-bold text-navy mb-4">Quick Facts</h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <FaUsers className="text-teal mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Beneficiaries</p>
                    <p className="text-sm font-medium text-navy">Vulnerable children & families</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaMapMarkerAlt className="text-orange mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="text-sm font-medium text-navy">Kenya</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <FaCalendar className="text-teal mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Programme Status</p>
                    <p className="text-sm font-medium text-green-600">Active</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-orange/10 rounded-2xl p-6 border border-orange/20">
              <h4 className="font-heading font-bold text-orange mb-2">Get Involved</h4>
              <p className="text-sm text-gray-600 mb-4">
                Want to make a difference? There are many ways to support this programme.
              </p>
              <Link to="/get-involved">
                <button className="btn-outline w-full text-center text-sm">
                  Learn How to Help
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Programmes;