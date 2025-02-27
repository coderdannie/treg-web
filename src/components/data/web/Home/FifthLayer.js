import { GoArrowUpRight } from 'react-icons/go';
import { Link } from 'react-router-dom';

const FifthLayer = () => {
  return (
    <section className="  lg:pt-10 pb-20 align-element">
      <div className="grid md:grid-cols-2 gap-14 place-items-center">
        <div>
          <div>
            <h4
              className="font-sub-heading 
            !font-bold pb-5"
            >
              Looking for Your Ideal Property? Let TREG Help!
            </h4>
          </div>
          <p>
            Whether you're searching for a cozy apartment, a spacious family
            home, or a premium commercial space, TREG connects you with
            properties that match your unique needs.
          </p>
          <button className="flex-1 mt-9 primary-btn">
            <Link to="/login">
              <span className="flex items-center gap-2">
                Make Request <GoArrowUpRight />
              </span>
            </Link>
          </button>
        </div>
        <div className="grid place-items-center">
          <img src="/assets/started-steps.png" alt="treg properties" />
        </div>
      </div>
    </section>
  );
};
export default FifthLayer;
