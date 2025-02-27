import Form from '../../components/data/web/ContactUs/Form';
import NewsletterSection from '../../components/data/web/Home/NewsletterSection';

const ContactUs = () => {
  return (
    <div>
      <div className="align-element mt-14  mb-20 md:mb-[100px]  flex flex-col gap-6 md:flex-row ">
        <div className="relative w-full md:w-[40%] h-[600px]">
          <img
            src="/assets/contactis.jpeg"
            alt="Customer Support"
            className="w-full h-full object-top object-cover rounded-xl"
          />
          <div className="absolute bottom-[-50px]   left-[50%] translate-x-[-50%] bg-[#1140E7] text-white p-6 rounded-xl shadow-lg w-4/5">
            <h2 className="text-xl md:text-2xl font-semibold">
              We would love to hear from you
            </h2>
            <p className="text-sm md:text-base mt-2">
              Need support? Have a question? Running into a problem? We’re here
              to help you.
            </p>
          </div>
        </div>

        <div className="border-2 mt-12 md:mt-0 border-[#A2A1A1] rounded-[20px]  md:w-[60%]  px-8 py-10  ">
          <Form />
        </div>
      </div>
      <NewsletterSection />
    </div>
  );
};
export default ContactUs;
