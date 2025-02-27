const FirstLayer = () => {
  return (
    <section className=" min-h-[723px] ">
      <div className="grid md:grid-cols-2 ">
        <div className="h-[400px] md:h-[723px] overflow-hidden">
          <img
            src="/assets/aboutus.jpeg"
            className="h-full w-full object-cover"
            alt="why choose treg"
          />
        </div>
        <div className="bg-[#1140E7] grid place-items-center w-full px-4 py-12 ">
          <div className="max-w-xl mx-auto text-white">
            <h1 className="uppercase">about us</h1>
            <h3 className="font-heading !text-white">
              Quality and Reliable Property Experience
            </h3>
            <p className="pt-[20px] md:text-lg lg:text-xl text-[#FFFFFF]">
              With a focus on accuracy and honesty, we are here to assist you in
              every step of your property journey
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default FirstLayer;
