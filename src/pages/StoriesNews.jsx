import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendar, FaUser, FaShareAlt, FaHeart } from 'react-icons/fa';

const StoriesNews = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleArticles, setVisibleArticles] = useState(6);
  
  const categories = ['All', 'News', 'Outreach', 'Success Stories', 'Events', 'Campaigns', 'Announcements'];
  
  const articles = [
    {
      id: 1,
      title: 'Bringing Hope to Vulnerable Children in Our Community',
      excerpt: 'Our latest outreach programme reached over 100 vulnerable children with food, clothing, and educational supplies.',
      date: 'August 15, 2026',
      author: 'Amal Said Ndoro',
      category: 'Outreach',
      image: '/images/news/outreach-1.jpg',
      slug: 'bringing-hope-to-vulnerable-children',
      featured: true,
    },
    {
      id: 2,
      title: "Sarah's Journey: From Struggle to Success",
      excerpt: 'Read the inspiring story of how education and support transformed Sarah\'s life and gave her hope for the future.',
      date: 'August 10, 2026',
      author: 'Amal Said Ndoro',
      category: 'Success Stories',
      image: '/images/news/success-1.jpg',
      slug: 'sarahs-journey-from-struggle-to-success',
      featured: false,
    },
    {
      id: 3,
      title: 'Annual Fundraising Campaign Launched',
      excerpt: 'We\'re excited to announce our annual fundraising campaign to support vulnerable children and families across Kenya.',
      date: 'August 5, 2026',
      author: 'Amal Said Ndoro',
      category: 'Campaigns',
      image: '/images/news/campaign-1.jpg',
      slug: 'annual-fundraising-campaign-launched',
      featured: false,
    },
    {
      id: 4,
      title: 'Volunteer Appreciation Day 2026',
      excerpt: 'We celebrated our amazing volunteers who dedicate their time and skills to making a difference in our community.',
      date: 'July 28, 2026',
      author: 'Amal Said Ndoro',
      category: 'Events',
      image: '/images/news/event-1.jpg',
      slug: 'volunteer-appreciation-day-2026',
      featured: false,
    },
    {
      id: 5,
      title: 'Food Distribution Programme Expands',
      excerpt: 'Thanks to your support, we\'ve expanded our food distribution programme to reach 5 more communities in need.',
      date: 'July 20, 2026',
      author: 'Amal Said Ndoro',
      category: 'News',
      image: '/images/news/food-1.jpg',
      slug: 'food-distribution-programme-expands',
      featured: false,
    },
    {
      id: 6,
      title: 'New Partnership to Support Children\'s Education',
      excerpt: 'We\'re proud to announce a new partnership that will provide educational support to 200 vulnerable children.',
      date: 'July 15, 2026',
      author: 'Amal Said Ndoro',
      category: 'Announcements',
      image: '/images/news/partnership-1.jpg',
      slug: 'new-partnership-to-support-education',
      featured: false,
    },
    {
      id: 7,
      title: 'Community Health Outreach Programme',
      excerpt: 'Our team visited five communities to provide health screenings and medical support to vulnerable families.',
      date: 'July 10, 2026',
      author: 'Amal Said Ndoro',
      category: 'Outreach',
      image: '/images/news/outreach-2.jpg',
      slug: 'community-health-outreach-programme',
      featured: false,
    },
    {
      id: 8,
      title: 'Back to School Campaign 2026',
      excerpt: 'We provided school supplies, uniforms, and books to 200 children to ensure they can continue their education.',
      date: 'July 5, 2026',
      author: 'Amal Said Ndoro',
      category: 'Campaigns',
      image: '/images/news/campaign-2.jpg',
      slug: 'back-to-school-campaign-2026',
      featured: false,
    },
  ];

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

  const displayedArticles = filteredArticles.slice(0, visibleArticles);
  const hasMore = visibleArticles < filteredArticles.length;

  const handleLoadMore = () => {
    setVisibleArticles(prev => prev + 3);
  };

  // Featured article (first one with featured: true)
  const featuredArticle = articles.find(a => a.featured) || articles[0];

  return (
    <div className="py-20">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">Stories & News</h1>
          <p className="section-subtitle mx-auto">
            Behind every number is a human story. Read about the lives we've touched and the impact we've made.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleArticles(6);
              }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category
                  ? 'bg-teal text-white shadow-lg shadow-teal/30'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Featured Story - FIXED */}
        <div className="mb-12">
          <div className="card overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img 
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="600" height="400" viewBox="0 0 600 400"%3E%3Crect width="600" height="400" fill="%23148A86" opacity="0.2"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3EFeatured Story%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute top-4 left-4 bg-orange text-white px-3 py-1 rounded-full text-xs font-semibold">
                  Featured Story
                </div>
              </div>
              <div className="p-6 lg:p-8 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                  <span className="flex items-center gap-1">
                    <FaCalendar /> {featuredArticle.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FaUser /> {featuredArticle.author}
                  </span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-heading font-bold text-navy mb-3">
                  {featuredArticle.title}
                </h2>
                <p className="text-gray-600 mb-4">
                  {featuredArticle.excerpt}
                </p>
                <div className="flex items-center gap-3">
                  <Link to={`/stories/${featuredArticle.slug}`}>
                    <button className="btn-secondary text-sm py-2 px-6">
                      Read Full Story
                    </button>
                  </Link>
                  <button className="text-gray-400 hover:text-orange transition-colors">
                    <FaShareAlt />
                  </button>
                  <button className="text-gray-400 hover:text-red-500 transition-colors">
                    <FaHeart />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Articles Grid - FIXED */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayedArticles.map((article) => (
            <div
              key={article.id}
              className="card group"
            >
              <div className="relative overflow-hidden h-48">
                <img 
                  src={article.image} 
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23F97316" opacity="0.1"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="16" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3ENo Image%3C/text%3E%3C/svg%3E';
                  }}
                />
                <div className="absolute top-3 left-3 bg-orange text-white px-2 py-1 rounded-full text-xs font-semibold">
                  {article.category}
                </div>
              </div>
              <div className="p-5">
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-2">
                  <span className="flex items-center gap-1">
                    <FaCalendar /> {article.date}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <FaUser /> {article.author}
                  </span>
                </div>
                <h3 className="text-lg font-heading font-bold text-navy mb-2 line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <Link to={`/stories/${article.slug}`}>
                    <button className="text-teal font-semibold text-sm hover:text-orange transition-colors">
                      Read More →
                    </button>
                  </Link>
                  <div className="flex gap-2">
                    <button className="text-gray-400 hover:text-orange transition-colors text-sm">
                      <FaShareAlt />
                    </button>
                    <button className="text-gray-400 hover:text-red-500 transition-colors text-sm">
                      <FaHeart />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button - FIXED */}
        {hasMore && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              className="btn-outline"
            >
              Load More Stories
            </button>
          </div>
        )}

        {filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No stories found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoriesNews;