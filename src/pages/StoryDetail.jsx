import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaArrowLeft, FaCalendar, FaUser, FaShareAlt, FaHeart } from 'react-icons/fa';
import { getStoryBySlug, getRelatedStories } from '../data/storiesData';

const StoryDetail = () => {
  const { slug } = useParams();
  const [story, setStory] = useState(null);
  const [relatedStories, setRelatedStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    const foundStory = getStoryBySlug(slug);
    
    if (foundStory) {
      setStory(foundStory);
      setRelatedStories(getRelatedStories(slug, 2));
    } else {
      setNotFound(true);
    }
    
    setLoading(false);
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="container-custom">
          <p className="text-gray-500">Loading story...</p>
        </div>
      </div>
    );
  }

  // Story not found
  if (notFound || !story) {
    return (
      <div className="py-20 text-center">
        <div className="container-custom max-w-2xl">
          <h1 className="text-3xl font-heading font-bold text-navy mb-4">
            Story Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The story you're looking for doesn't exist or may have been moved.
          </p>
          <Link to="/stories-news">
            <button className="btn-primary">
              View All Stories
            </button>
          </Link>
        </div>
      </div>
    );
  }

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
        {relatedStories.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-heading font-bold text-navy mb-6">Related Stories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedStories.map((relatedStory) => (
                <div key={relatedStory.id} className="card group">
                  <div className="relative overflow-hidden h-48">
                    <img 
                      src={relatedStory.image} 
                      alt={relatedStory.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300"%3E%3Crect width="400" height="300" fill="%23148A86" opacity="0.1"/%3E%3Ctext x="50%25" y="50%25" font-family="Arial" font-size="14" fill="%230F3D5E" text-anchor="middle" dy=".3em"%3ERelated Story%3C/text%3E%3C/svg%3E';
                      }}
                    />
                  </div>
                  <div className="p-5">
                    <span className="text-xs text-gray-500">{relatedStory.date}</span>
                    <h3 className="text-lg font-heading font-bold text-navy mb-2 mt-1">
                      {relatedStory.title}
                    </h3>
                    <Link to={`/stories/${relatedStory.slug}`}>
                      <button className="text-teal font-semibold text-sm hover:text-orange transition-colors">
                        Read More →
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryDetail;