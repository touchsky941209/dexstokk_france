import React, { useState } from 'react';
interface FilterProps {
  setSearchKeyWord: (keyword: string) => void;
}
const Filter: React.FC<FilterProps> = (props) => {


  return (
    <div className="justify-begin w-[80vw] mt-2" id="Search">
      <p className="text-[50px] text-[white] font-bold">Filters</p>
      <input
        type="text"
        className="pl-5 rounded text-[white] w-[100%] h-[50px] mt-2 bg-[white] bg-opacity-40 placeholder:text-[white] focus:bg-[white] focus:bg-opacity-40 focus:border-none focus:outline-none text-[30px]"
        placeholder="Search for articles"
        style={{
          backgroundImage: 'url(./img/search.png)',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '30px',
          backgroundPositionY: '50%',
          backgroundPositionX: '10px',
        }}
        onChange={(e) => {
          props.setSearchKeyWord(e.target.value)
        }}
      />
      <div className="flex items-center mt-3">
        <input type="checkbox" className="mr-2 w-5 h-5" />
        <label className="text-[white] mt-2">
          Show only Whitelisted properties' offers
        </label>
      </div>



      <div>

      </div>
    </div>
  );
};

export default Filter;
