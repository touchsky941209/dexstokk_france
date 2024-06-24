import React from 'react';
import Logo from '../navbar/logo';

const Footer: React.FC = () => {
  return (
    <div
      className="w-[100%] flex justify-center items-center  sm:justify-between object-cover sm:flex-row flex-col"
      style={{
        background: "url('./img/footer.png')",
      }}
    >
      <div className="pl-[9%]">
        <Logo />
      </div>

      <div className="mt-8 pr-[9%]" id="ConnectWallet">
        <button className="w-[200px] h-[50px] rounded bg-[#ffffff] text-[30px] text-[#00f6ff]">
          HELP
        </button>
      </div>
    </div>
  );
};

export default Footer;
