import React from 'react';

const LatestTrends = () => {
  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4">
      <div className="header">
        <h1 className="text-4xl font-bold text-center mb-6">Latest Fashion Trends</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Discover the hottest fashion trends for this season and stay ahead of the style curve. From bold colors to timeless classics, find inspiration for your wardrobe here.
        </p>
        <img 
          src="https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Fashion Trends"
          className="rounded-lg shadow-lg w-full mb-8 transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="content">
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          Fashion is ever-evolving, and this season is no different. Embrace the vibrancy of bold patterns and neon colors that dominate runways, or stick to the elegance of monochrome shades. Don't forget to layer with statement pieces that add flair to your outfit.
        </p>
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          Accessories are making a huge comeback, with chunky jewelry and oversized sunglasses becoming wardrobe staples. Experiment with mixing vintage and modern to create your unique style statement.
        </p>
      </div>
    </div>
  );
};

export default LatestTrends;
