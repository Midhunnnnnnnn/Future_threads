import React from 'react';

const SustainableFashion = () => {
  return (
    <div className="max-w-screen-lg mx-auto py-12 px-4">
      <div className="header">
        <h1 className="text-4xl font-bold text-center mb-6">Sustainable Fashion</h1>
        <p className="text-lg text-gray-700 text-center mb-8">
          Learn how sustainable fashion choices can make a positive impact on the environment and society. Let's embrace a greener future together.
        </p>
        <img 
          src="https://images.pexels.com/photos/1082529/pexels-photo-1082529.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          alt="Sustainable Fashion"
          className="rounded-lg shadow-lg w-full mb-8 transform hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="content">
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          Sustainable fashion is not just a trend; it's a movement toward eco-conscious living. By choosing clothing made from organic or recycled materials, you help reduce waste and pollution.
        </p>
        <p className="text-gray-700 text-lg mb-4 leading-relaxed">
          Support brands that prioritize ethical practices, fair wages, and cruelty-free production. Together, we can revolutionize the fashion industry for a cleaner and more equitable world.
        </p>
      </div>
    </div>
  );
};

export default SustainableFashion;
