import React, { useEffect, useRef, useState, ForwardedRef } from 'react';
import { forwardRef } from 'react';

function imgSrc(imgName: string): string {
  return imgName.toLowerCase().replace(/ /g, '');
}

interface OfferBtnProps {
  btnName: string;
  onClick?: () => void;
  isBtnPush: boolean;
}

const OfferBtn = forwardRef<HTMLButtonElement, OfferBtnProps>(function OfferBtn({ btnName, onClick, isBtnPush }, ref: ForwardedRef<HTMLButtonElement>) {
  const currentRef = useRef<HTMLButtonElement | null>(null);
  const [isHover, setIsHover] = useState(false);
  // const buttonClass = "w-[100%] md:w-48 h-10 flex items-center justify-center border-[1px] border-[#00b3ba] text-[#00b3ba] hover:text-[white] hover:bg-[#00b3ba] rounded mt-2 mb-2 lg:mr-1 lg:ml-1 focus:outline-none duration-150";
  // const pushClass = "w-[100%] md:w-48 h-10 flex items-center justify-center border-[1px] border-[#00b3ba] text-[white] bg-[#00b3ba] rounded mt-2 mb-2 lg:mr-1 lg:ml-1 focus:outline-none duration-150";
  const buttonClass = "w-[100%] sm:w-[200px] h-10 flex items-center justify-center border-[1px] border-[#00b3ba] text-[#00b3ba] hover:text-[white] hover:bg-[#00b3ba] rounded mt-2 mb-2 mr-1 ml-1 focus:outline-none duration-150";
  const pushClass = "w-[100%] sm:w-[200px] h-10 flex items-center justify-center border-[1px] border-[#00b3ba] text-[white] bg-[#00b3ba] rounded mt-2 mb-2 mr-1 ml-1 focus:outline-none duration-150";

  return (
    <button
      ref={ref}
      className={!isBtnPush ? buttonClass : pushClass}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={onClick}
    >
      {btnName}
      <img
        src={isHover || isBtnPush ? `./img/${imgSrc(btnName)}_hover.svg` : `./img/${imgSrc(btnName)}.svg`}
        className="w-8 ml-4"
        alt={`${btnName} icon`}
      />
    </button>
  );
});

export default OfferBtn;
