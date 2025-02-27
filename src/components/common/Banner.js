import Logo from './Logo';

const Banner = () => {
  return (
    <div className="w-full px-5 py-2 border-b-2 border-[#EEF0F3] bg-white">
      <div className="flex items-center justify-between mx-auto max-w-7xl">
        <Logo />
      </div>
    </div>
  );
};
export default Banner;
