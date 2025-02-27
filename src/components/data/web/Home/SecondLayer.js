import { howItWorks } from '../../../common/constants';

const SecondLayer = () => {
  return (
    <section className="align-element md:mb-[120px]">
      <h2 className="font-sub-heading text-center  mt-14 md:mt-[100px] ">
        How It Works
      </h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2  mx-auto">
        {howItWorks.map((item) => (
          <li
            key={item.id}
            className={`relative flex items-center w-full   py-6 h-full bg-white rounded-lg ${
              item.id === 2 || item.id === 4 || item.id === 6
                ? 'flex-row md:flex-row-reverse'
                : ' flex-row'
            }`}
          >
            <span className="text-4xl font-medium text-gray-300 ">
              {item.id.toString().padStart(2, '0')}
            </span>
            <div
              className={`flex flex-col md:flex-row gap-3 border w-full h-full ${
                item.id === 2 || item.id === 4 || item.id === 6
                  ? 'ml-4 md:mr-4'
                  : 'ml-4'
              } mr-4 border-[#EDEEF0] rounded-[18px] shadow-[9.91px_24px_99.11px_rgba(0,43,107,0.06)] pl-4 md:pl-6 py-4 md:py-6 pr-4`}
            >
              <img
                src={
                  item.id === 1
                    ? '/assets/1.svg'
                    : item.id === 2
                    ? '/assets/2.svg'
                    : item.id === 3
                    ? '/assets/3.svg'
                    : item.id === 4
                    ? '/assets/4.svg'
                    : item.id === 5
                    ? '/assets/5.svg'
                    : '/assets/6.svg'
                }
                alt={item.title}
                className="w-10 h-10"
              />
              <div className="w-full h-full">
                <h3 className="font-medium text-[#1E242C] md:text-lg">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#414D60] pt-[6px]">
                  {item.text}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};
export default SecondLayer;
