import React from 'react';

const NewsletterSection = () => {
  return (
    <div
      className="relative w-full h-[250px] md:h-[300px] flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/assets/house.jpeg')" }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-70"></div>

      <div className="relative z-10 w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Text Section */}
        <div className="text-white text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-medium">
            Join Our Newsletter Now
          </h2>
          <p className="text-sm md:text-base pt-2">
            Register now to get updates on promotions...
          </p>
        </div>

        {/* Input Section */}
        <div className="w-full md:w-auto flex items-center bg-white rounded-full p-1 shadow-md">
          <input
            type="email"
            placeholder="typeyouremail@gmail.com"
            className="w-full md:w-[300px] px-4 py-2 text-gray-700 outline-none bg-transparent"
          />
          <button className="bg-primary  hover:bg-blue-700 text-white text-sm md:text-base font-medium px-5 py-2 rounded-full">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterSection;
