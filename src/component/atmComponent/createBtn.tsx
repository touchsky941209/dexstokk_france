import React, { forwardRef } from 'react';

interface CreateBtnProps {
  onClick?: () => void;
  btnName: string;
}

const CreateBtn = forwardRef<HTMLButtonElement, CreateBtnProps>(function CreateBtn(props, ref) {
  return (
    <button
      ref={ref}
      className="w-[100%] lg:w-36 h-20 lg:h-24 mr-1 ml-1 mt-1 mb-1 text-[25px] text-[#00b3ba] hover:text-[white] bg-[#173039] hover:bg-[#00b3ba] flex flex-col items-center justify-center rounded focus:outline-none duration-200"
      onClick={props.onClick}
    >
      <img src="./img/alert.svg" className="w-7 ml-[70%] lg:mt-[-5%]" alt="Alert icon" />
      <p>{props.btnName}</p>
    </button>
  );
});

export default CreateBtn;
