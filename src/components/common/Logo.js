// import logo from '../../../public/assets/tregLogo.svg';
// import treg from '../../../public/assets/treg.svg';

import { useNavigate } from 'react-router-dom';

const Logo = () => {
  const navigate = useNavigate();
  return (
    <div className="flex gap-2 pointer" onClick={() => navigate('/')}>
      <img className="w-8 md:w-10" src="/assets/tregLogo.svg" alt="Treg logo" />
      <img className="w-16 md:w-18" src="/assets/treg.svg" alt="Treg" />
    </div>
  );
};
export default Logo;
