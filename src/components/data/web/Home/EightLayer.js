import React from 'react';

import heroBg from '../../../../assets/hero-gradient.png';
import heroBg2 from '../../../../assets/CTA.png';

const testimonials = [
  {
    name: 'Sola Ajayi',
    role: 'Tenant',
    text: 'The virtual tour feature on TREG is incredible! I could view multiple properties from home, saving me time and making the process of choosing my dream rental so much easier.',
  },
  {
    name: 'Sola Ajayi',
    role: 'Tenant',
    text: "The rating system on TREG was a game-changer. I could easily find trustworthy landlords and check tenant reviews before making any commitments. It's helped me make informed choices every step of the way.",
  },
  {
    name: 'Sola Ajayi',
    role: 'Tenant',
    text: 'TREG made the rental process effortless! From searching for properties to securing a deposit in escrow, everything was transparent and secure. I felt like I had full control over the entire process.',
  },
  {
    name: 'Sola Ajayi',
    role: 'New Tenant',
    text: 'TREG’s escrow service gave me peace of mind with my rental deposit. I knew my money was safe and only released after moving in. This should be the standard for renting.',
  },
  {
    name: 'Sola Ajayi',
    role: 'New Tenant',
    text: 'The agent I connected with on TREG was fantastic! The contact form made reaching out simple, and within hours, I had options that met my needs. This platform is a must for anyone looking to rent a property.',
  },
  {
    name: 'Sola Ajayi',
    role: 'Landlord',
    text: 'As a landlord, TREG has transformed how I manage my properties. The tenant screening tools, secure payments, and automatic reminders make everything run smoothly and stress-free.',
  },
];

const EightLayer = () => {
  return (
    <section
      style={{
        backgroundImage: `url(${heroBg}), url(${heroBg2})`,
        backgroundPosition: 'top center, bottom center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover, cover',
      }}
      className="py-16 px-8 bg-gray-100"
    >
      <div className="text-center mb-12">
        <h2 className="text-2xl font-semibold text-[#18181B] pb-2">
          What They Say About Us
        </h2>
        <p className="text-gray-600 text-lg md:text-xl ">
          Find out how our users are spreading the word
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={`bg-white  p-6 border-2 border-[#DADADA] rounded-xl ${
              index % 3 === 1
                ? 'h-[321px]'
                : index % 3 === 2
                ? 'h-[294px]'
                : 'h-[266px]'
            }`}
          >
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
              <div>
                <h4 className="font-semibold text-[#313131]">
                  {testimonial.name}
                </h4>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-700">{testimonial.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EightLayer;
