import React from 'react';
import Modal from 'react-modal';
import CreateBtn from '../atmComponent/createBtn';

interface AddOfferModalProps {
  isAddOfferModalOpen: boolean;
  setIsAddOfferModalOpen: (isOpen: boolean) => void;
  setCreateOffer: (offerType: string) => void;
}

const AddOfferModal: React.FC<AddOfferModalProps> = (props) => {
  return (
    <Modal
      ariaHideApp={false}
      isOpen={props.isAddOfferModalOpen}
      onRequestClose={() => {
        props.setCreateOffer('none');
        props.setIsAddOfferModalOpen(false);
      }}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <div className="w-[300px] lg:w-[500px] lg:h-[250px] flex flex-col">
        <p className="text-[20px] text-[#00b3ba]">Which type of offer do you want to create?</p>
        <div className="flex flex-col lg:h-[90%] lg:flex-row w-[100%] items-center justify-between">
          <CreateBtn
            btnName="Sell"
            onClick={() => {
              props.setIsAddOfferModalOpen(false);
              props.setCreateOffer('sell');
            }}
          />
          <CreateBtn
            btnName="Buy"
            onClick={() => {
              props.setIsAddOfferModalOpen(false);
              props.setCreateOffer('buy');
            }}
          />
          <CreateBtn
            btnName="Exchange"
            onClick={() => {
              props.setIsAddOfferModalOpen(false);
              props.setCreateOffer('exchange');
            }}
          />
        </div>
      </div>
    </Modal>
  );
};

export default AddOfferModal;
