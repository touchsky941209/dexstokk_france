import React, { useEffect, useState, useRef } from 'react';
import MarketBtn from '../atmComponent/marketbtn';
import { useNavigate } from 'react-router-dom';
import useWeb3 from '../../hooks/useWeb3';
import MyOffer from './alloffer';
import { useFeeData } from 'wagmi';
interface OfferDashboardProps {
    offerType: number;
    searchKeyWord: string;
}

const OfferDashboard: React.FC<OfferDashboardProps> = (props) => {

    const { estokkYamContract, chainId } = useWeb3()

    const [isBtnPush1, setIsBtnPush1] = useState(false);
    const [isBtnPush2, setIsBtnPush2] = useState(false);
    const [isBtnPush3, setIsBtnPush3] = useState(false);
    const currentRef = useRef<HTMLButtonElement | null>(null);

    const btnRefresh = useRef<HTMLButtonElement | null>(null)
    const [offerIDContent, setOfferIDContent] = useState<any>([])
    const [searchOfferIdContent, setSearchOfferIdContent] = useState<any>([])
    let arrayOffer: any = []

    useEffect(() => {
        const result = offerIDContent.filter((item: any) => item.buyerToken.toLowerCase().includes(props.searchKeyWord) || item.offerToken.toLowerCase().includes(props.searchKeyWord))
        setSearchOfferIdContent(result)
    }, [props.searchKeyWord])



    useEffect(() => {
        const timer = setTimeout(() => {
            if (btnRefresh.current) {
                btnRefresh.current.click();
            }
        }, 1000);
        return () => clearTimeout(timer);
    }, [chainId])

    const navigate = useNavigate();

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
                    }}
                />
                <MarketBtn
                    btnName="Buy"
                    isBtnPush={isBtnPush2}
                    onClick={() => {
                        setIsBtnPush1(false);
                        setIsBtnPush2(true);
                        setIsBtnPush3(false);
                    }}
                />
                <MarketBtn
                    btnName="Exchange"
                    isBtnPush={isBtnPush3}
                    onClick={() => {
                        setIsBtnPush1(false);
                        setIsBtnPush2(false);
                        setIsBtnPush3(true);
                    }}
                />
            </div>

            <div className="mt-4 mb-4 rounded-md bg-white">
                <p className="text-center text-xl text-[#00b3ba]"></p>
                <MyOffer content={searchOfferIdContent} />

            </div>
            <button
                ref={btnRefresh}
                onClick={() => {
                }}>
            </button>
        </div >
    );
};

export default OfferDashboard;
