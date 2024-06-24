import { useContext } from 'react';

import OfferContext from '../contexts/offerContext';

const useOffers = () => {
  const context = useContext(OfferContext);

  if (!context) throw new Error('context must be use inside provider');

  return context;
};

export default useOffers;
