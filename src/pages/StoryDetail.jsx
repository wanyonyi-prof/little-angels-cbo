import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendar, FaUser, FaShareAlt, FaHeart } from 'react-icons/fa';

const StoryDetail = () => {
  const { slug } = useParams();

  // In a real app, this would come from an API or database
  const story = {
    title: 'Bringing Hope to Vulnerable Children in Our Community',
    date: 'August 15, 2026',
    author: 'Amal Said Ndoro',
    category: 'Outreach',
    image: '/images/news/outreach-1.jpg',
    content: `
      <p>Our latest outreach programme reached over 100 vulnerable children with food, clothing, and educational supplies. This is the story of how your support is making a difference.</p>
      
      <h2>The Need</h2>
      <p>In our community, many children face daily challenges including lack of food, proper clothing, and access to education. These children often come from disadvantaged families who struggle to meet basic needs.</p>
      
      <h2>The Response</h2>
      <p>Little Angels CBO organized a comprehensive outreach programme to address these needs. Our team of volunteers and staff worked tirelessly to identify the most vulnerable children and families in the community.</p>
      
      <p>We provided:</p>
      <ul>
        <li>Nutritious food packages for 100 families</li>
        <li>School supplies and uniforms for 80 children</li>
        <li>Clothing and shoes for 100 children</li>
        <li>Health screening and medical referrals</li>
      </ul>
      
      <h2>The Impact</h2>
      <p>The outreach programme has already made a significant impact. Children are now attending school with proper uniforms and supplies. Families have access to food security. Most importantly, there is hope in the community.</p>
      
      <p>One mother shared, "I didn't know how I would feed my children this week. Your visit has given us hope."</p>
      
      <h2>How You Can Help</h2>
      <p>This is just the beginning. We need your continued support to reach more children and families. Your donation can make a real difference in someone's life.</p>
    `
  };

  return (
    <div className="py-20">
      <div className="container-custom max-w-4xl">
        {/* Back Button */}
        <Link to="/stories-news" className="inline-flex items-center gap-2 text-teal hover:text-orange transition-colors mb-8">
          <FaArrowLeft /> Back to Stories
        </Link>

        {/* Story Header */}
        <div className="mb-8">
          <span className="inline-block bg-orange/20 text-orange px-3 py-1 rounded-full text-xs font-semibold mb-3">
            {story.category}
          </span>
          <h1 className="text-3xl md:text-4xl font-heading font-bold text-navy mb-4">
            {story.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <FaCalendar /> {story.date}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <FaUser /> {story.author}
            </span>
          </div>
        </div>

        {/* Featured Image */}
        <div className="rounded-2xl overflow-hidden shadow-xl mb-8">
          <img 
            src={story.image} 
            alt={story.title}
            className="w-full h-auto object-cover"
            onError={(e) => {
              e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="800" height="400" viewBox="0 0 800 400"%3E%3Crect width="800" height="400" fill="%23148A86" opacity="0.2"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="24" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3EStory Image%3C/text%3E%3C/svg%3E';
            }}
          />
        </div>

        {/* Story Content */}
        <div 
          className="prose prose-lg max-w-none prose-headings:text-navy prose-headings:font-heading prose-a:text-teal prose-a:no-underline hover:prose-a:text-orange"
          dangerouslySetInnerHTML={{ __html: story.content }}
        />

        {/* Share and Actions */}
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">Share this story:</span>
            <button className="text-gray-400 hover:text-orange transition-colors">
              <FaShareAlt size={20} />
            </button>
            <button className="text-gray-400 hover:text-red-500 transition-colors">
              <FaHeart size={20} />
            </button>
          </div>
          <Link to="/donate">
            <button className="btn-primary text-sm">
              Support Our Work
            </button>
          </Link>
        </div>

        {/* Related Stories */}
        <div className="mt-16">
          <h2 className="text-2xl font-heading font-bold text-navy mb-6">Related Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="card group">
              <div className="relative overflow-hidden h-48">
                <img 
                  src="/images/news/success-1.jpg" 
                  alt="Related Story"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23148A86" opacity="0.1"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3ERelated Story%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-heading font-bold text-navy mb-2">
                  Sarah's Journey: From Struggle to Success
                </h3>
                <Link to="/stories/sarahs-journey-from-struggle-to-success">
                  <button className="text-teal font-semibold text-sm hover:text-orange transition-colors">
                    Read More →
                  </button>
                </Link>
              </div>
            </div>
            <div className="card group">
              <div className="relative overflow-hidden h-48">
                <img 
                  src="/images/news/campaign-1.jpg" 
                  alt="Related Story"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23148A86" opacity="0.1"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3ERelated Story%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-heading font-bold text-navy mb-2">
                  Annual Fundraising Campaign Launched
                </h3>
                <Link to="/stories/annual-fundraising-campaign-launched">
                  <button className="text-teal font-semibold text-sm hover:text-orange transition-colors">
                    Read More →
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StoryDetail;