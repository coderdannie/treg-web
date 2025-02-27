import { accTypeOptions } from '../../components/common/constants';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { MdOutlinePersonSearch } from 'react-icons/md';
import { PiUserListDuotone } from 'react-icons/pi';
import vectorBg from '../../assets/vectorBg.png';
import { FaRegCircle } from 'react-icons/fa';
import Banner from '../../components/common/Banner';
import { PiUsersThree } from 'react-icons/pi';
import { Link, useNavigate } from 'react-router-dom';
import { CgRadioChecked } from 'react-icons/cg';

const CreateAccount = () => {
  const navigate = useNavigate();
  const [accType, setAccType] = useState('Tenant');
  sessionStorage.setItem('accType', accType);

  return (
    <div
      style={{
        backgroundImage: `url(${vectorBg})`,
        backgroundPosition: 'center center',
      }}
    >
      <Banner />

      <div className="align-element h-[80vh] pt-6 md:pt-28">
        <div className="w-full">
          <h2 className="text-center text-xl md:text-3xl text-[#333333] font-medium pb-7">
            Join as a user, landlord or agent
          </h2>
          <div className="px-5 w-full  grid gap-4 md:gap-6 md:grid-cols-3 place-items-center  text-[#333333]">
            {accTypeOptions.map((item, i) => {
              return (
                <div
                  key={i}
                  className={` p-6 md:p-8 rounded-3xl   h-[200px] md:h-[300px] w-full cursor-pointer hover:border-primary duration-300 ease-in-out hover:shadow-xl ${
                    item.label === accType
                      ? 'border-primary bg-[#E7F2FF] text-primary border-2 shadow-xl'
                      : 'border-2 border-[#D4D0D0] bg-white '
                  }`}
                  onClick={() => {
                    setAccType(item.label);
                  }}
                >
                  <div className="flex justify-end">
                    {item.label === accType ? (
                      <CgRadioChecked
                        className={`cursor-pointer text-2xl ${
                          item.label === accType
                            ? 'text-primary'
                            : ' text-[#D4D0D0]'
                        }`}
                      />
                    ) : (
                      <FaRegCircle
                        className={`cursor-pointer text-2xl ${
                          item.label === accType
                            ? 'text-primary'
                            : ' text-[#D4D0D0]'
                        }`}
                      />
                    )}
                  </div>

                  {i === 0 ? (
                    <div className="text-[#616161] text-3xl">
                      <MdOutlinePersonSearch />
                    </div>
                  ) : i === 1 ? (
                    <div className="text-[#616161] text-3xl">
                      <PiUserListDuotone />
                    </div>
                  ) : i === 2 ? (
                    <div className="text-[#616161] text-3xl">
                      <PiUsersThree />
                    </div>
                  ) : (
                    ''
                  )}

                  <div className="grid mt-5 gap-2 md:text-xl text-[#616161] max-w-48">
                    {item.title} <br />
                    {item.text}
                  </div>
                </div>
              );
            })}
          </div>

          <button
            type="submit"
            className={`mx-auto flex justify-center text-center py-3 mt-16 rounded-xl text-white w-full max-w-[400px] px-4 ${
              accType ? 'bg-primary' : 'bg-gray-300'
            }`}
            disabled={!accType}
            onClick={() => navigate('/register')}
          >
            {accType
              ? `Sign up as ${
                  accType === 'AGENT' ? 'an ' : 'a'
                }  ${accType.toLowerCase()}`
              : 'Create an account'}
          </button>
          <div>
            <div
              className="flex justify-center text-sm gap-2 mb-2 p-3 font-light text-[#666666] pb-14"
              style={{
                fontFamily: 'Sansation',
              }}
            >
              Already have an account?
              <Link to="/login" className="hover:underline">
                <span className="text-primary font-bold">Log in</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CreateAccount;
