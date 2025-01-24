import React from 'react';

const FashionWeekHighlights = () => {
  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4">
      <div className="header">
        <h1 className="text-4xl font-bold text-center mb-6">Fashion Week Highlights</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Relive the most stunning moments from Fashion Week. Explore the top collections, groundbreaking designs, and iconic runway looks.
        </p>
        <img 
          src="https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Fashion Week"
          className="rounded-lg shadow-lg w-full mb-8 transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="content">
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          Fashion Week 2024 was nothing short of spectacular, with designers showcasing their creativity like never before. From vibrant color palettes to intricate embellishments, every collection told a unique story.
        </p>
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          Iconic moments included collaborations between top brands and emerging talents, pushing boundaries in design. This season also saw a focus on inclusivity, with diverse models gracing the runway.
        </p>
      </div>
    </div>
  );
};

export default FashionWeekHighlights;
