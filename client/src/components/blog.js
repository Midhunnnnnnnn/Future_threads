import React from 'react';
import { Link } from 'react-router-dom';

const Blog = () => {
  const blogPosts = [
    { 
      id: 1, 
      title: 'Latest Fashion Trends', 
      excerpt: 'Discover the hottest fashion trends for this season...', 
      date: '2024-07-15', 
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      link: '/latest-trends' 
    },
    { 
      id: 2, 
      title: 'Sustainable Fashion', 
      excerpt: 'Learn about eco-friendly fashion choices and their impact...', 
      date: '2024-07-10', 
      image: 'https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      link: '/sustainable-fashion' 
    },
    { 
      id: 3, 
      title: 'Fashion Week Highlights', 
      excerpt: 'Recap of the most stunning moments from Fashion Week...', 
      date: '2024-07-05', 
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
      link: '/fashion-week-highlights' 
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto py-12 px-4">
      <h1 className="text-4xl font-bold mb-12 text-center">OUR Blog</h1>
      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {blogPosts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white shadow-lg rounded-lg overflow-hidden transform hover:scale-105 transition-all duration-300"
          >
            <div className="relative">
              <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
              <div className="absolute top-4 left-4 bg-white px-4 py-2 rounded-full text-sm font-semibold">
                {post.date}
              </div>
            </div>
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <Link 
                to={post.link} 
                className="inline-block bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-300"
              >
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
