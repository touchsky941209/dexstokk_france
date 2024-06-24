import React, { useEffect, useState, useRef } from 'react';
import OfferBtn from '../atmComponent/offerbtn';
import useWeb3 from '../../hooks/useWeb3';
interface OfferButtonGroupProps {
  setOfferType: (offerType: number) => void;
}

const OfferButtonGroup: React.FC<OfferButtonGroupProps> = (props) => {

  const [isBtnPush1, setIsBtnPush1] = useState(false);
  const [isBtnPush2, setIsBtnPush2] = useState(false);
  const [isBtnPush3, setIsBtnPush3] = useState(false);

  const currentRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (currentRef.current) {
      currentRef.current.click();
    }
  }, []);

  return (
      <div className="flex w-[100%] flex-col sm:flex-row mt-4">
        <OfferBtn
          btnName="My Offers"
          ref={currentRef}
          onClick={() => {
            props.setOfferType(1);
            setIsBtnPush1(true);
            setIsBtnPush2(false);
            setIsBtnPush3(false);
          }}
          isBtnPush={isBtnPush1}
        />
        <OfferBtn
          btnName="Private Offers"
          onClick={() => {
            props.setOfferType(2);
            setIsBtnPush2(true);
            setIsBtnPush1(false);
            setIsBtnPush3(false);
          }}
          isBtnPush={isBtnPush2}
        />
        <OfferBtn
          btnName="Add Offers"
          onClick={() => {
            props.setOfferType(3);
            setIsBtnPush3(true);
            setIsBtnPush1(false);
            setIsBtnPush2(false);
          }}
          isBtnPush={isBtnPush3}
        />

    </div>
  );
};

export default OfferButtonGroup;
