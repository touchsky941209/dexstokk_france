import React, { useState, ForwardedRef } from 'react';
import { forwardRef } from 'react';

interface MarketBtnProps {
  onClick?: () => void;
  btnName: string;
  isBtnPush: boolean;
}

const MarketBtn = forwardRef<HTMLButtonElement, MarketBtnProps>(function MarketBtn(props, ref) {
  const [isHover, setIsHover] = useState(false);
  const buttonClass = "w-[100px] h-10 flex items-center justify-center border-[1px] border-[#00b3ba] text-[#00b3ba] hover:text-[white] hover:bg-[#00b3ba] rounded mt-2 mr-1 ml-1 focus:outline-none duration-150";
  const pushClass = "w-[100px]  h-10 flex items-center justify-center border-[1px] border-[#00b3ba] text-[white] bg-[#00b3ba] rounded mt-2 mb-2 mr-1 ml-1 focus:outline-none duration-150";
  // const pushClass = "h-10 flex items-center justify-center border-[1px] border-[#00b3ba] text-[white] bg-[#00b3ba] rounded mt-2 mb-2 lg:mr-1 lg:ml-1 focus:outline-none duration-150";
  // const buttonClass = "h-10 flex items-center justify-center border-[1px] border-[#00b3ba] text-[#00b3ba] hover:text-[white] hover:bg-[#00b3ba] rounded mt-2 lg:mr-1 lg:ml-1 focus:outline-none duration-150";

  return (
    <button
      ref={ref}
      className={props.isBtnPush ? pushClass : buttonClass}
      onMouseOver={() => setIsHover(true)}
      onMouseOut={() => setIsHover(false)}
      onClick={props.onClick}
    >
      <p>{props.btnName}</p>
    </button>
  );
});

export default MarketBtn;
