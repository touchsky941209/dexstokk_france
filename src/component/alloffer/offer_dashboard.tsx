import React, { useEffect, useState, useRef } from 'react';
import MarketBtn from '../atmComponent/marketbtn';
import { useNavigate } from 'react-router-dom';
import useWeb3 from '../../hooks/useWeb3';
import useOffers from '../../hooks/useOffer';
import GlobalOffer from './globaloffer';

interface OfferDashboardProps {
    offerType: number;
    searchKeyWord: string;
}

const OfferDashboard: React.FC<OfferDashboardProps> = (props) => {

    const { offerContents } = useOffers()
    const navigate = useNavigate();

    const [isBtnPush1, setIsBtnPush1] = useState(false);
    const [isBtnPush2, setIsBtnPush2] = useState(false);
    const [isBtnPush3, setIsBtnPush3] = useState(false);
    const currentRef = useRef<HTMLButtonElement | null>(null);

    const [offerIDContent, setOfferIDContent] = useState<any>([])
    const [searchOfferIdContent, setSearchOfferIdContent] = useState<any>([])
    const [searchType, setSearchType] = useState<any>()

    useEffect(() => {
        const result = offerIDContent.filter(
            (item: any) =>
                item.buyerToken.toLowerCase().includes(props.searchKeyWord) ||
                item.offerToken.toLowerCase().includes(props.searchKeyWord)
        )
        setSearchOfferIdContent(result)

    }, [props.searchKeyWord])

    useEffect(() => {
        setOfferIDContent(offerContents)
        setSearchOfferIdContent(offerContents)
    }, [offerContents])

    useEffect(() => {
        if (currentRef.current) {
            currentRef.current.click();
        }
    }, []);

    return (
        <div className="flex flex-col w-[100%] justify-between">
            <div className="flex">
                <MarketBtn
                    btnName="Sell"
                    ref={currentRef}
                    isBtnPush={isBtnPush1}
                    onClick={() => {
                        setIsBtnPush1(true);
                        setIsBtnPush2(false);
                        setIsBtnPush3(false);
                        setSearchType('sell')
                    }}
                />
                <MarketBtn
                    btnName="Buy"
                    isBtnPush={isBtnPush2}
                    onClick={() => {
                        setIsBtnPush1(false);
                        setIsBtnPush2(true);
                        setIsBtnPush3(false);
                        setSearchType('buy')
                    }}
                />
                <MarketBtn
                    btnName="Exchange"
                    isBtnPush={isBtnPush3}
                    onClick={() => {
                        setIsBtnPush1(false);
                        setIsBtnPush2(false);
                        setIsBtnPush3(true);
                        setSearchType('exchange')
                    }}
                />
            </div>

            <div className="mt-4 mb-4 rounded-md bg-white">
                <p className="text-center text-xl text-[#00b3ba]">Dex</p>
                <GlobalOffer content={searchOfferIdContent} searchType={searchType} />
            </div>
        </div >
    );
};

export default OfferDashboard;
