import { whyChooseTreg } from '../../../common/constants';
import bgImg from '../../../../assets/hero-gradient.png';

const ThirdLayer = () => {
  return (
    <section className="relative mt-6 pb-[100px] choose-bg">
      <div className="align-element pt-7">
        <div className="grid md:grid-cols-2">
          <div>
            <h4 className="font-sub-heading !font-semibold">
              Why Choose TREG?
            </h4>
          </div>
          <div>
            <p>
              At TREG, we’re redefining real estate for the modern world—one
              property at a time.
            </p>{' '}
          </div>
        </div>
        <ul className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 pt-8 md:pt-[80px] ">
          {whyChooseTreg.map((item, index) => (
            <li
              key={index}
              className="rounded-3xl shadow-2xl p-5 md:p-9
          "
            >
              <div className="grid place-items-center w-[50px] md:w-[94px] aspect-square rounded-full border-2 border-[#D4D0D0] shadow-xl ">
                <img src={item.img} alt={item.title} />
              </div>
              <h3 className="pt-8 text-[#424242]  text-lg md:text-2xl">
                {item.title}
              </h3>
              <p className="pt-4 md:text-lg">{item.text}</p>
            </li>
          ))}
        </ul>{' '}
      </div>
    </section>
  );
};
export default ThirdLayer;
