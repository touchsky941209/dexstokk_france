import React, { useEffect, useState, useRef } from 'react';
import MarketBtn from '../atmComponent/marketbtn';
import AddOfferModal from './addoffermodal';
import { useNavigate } from 'react-router-dom';
import useWeb3 from '../../hooks/useWeb3';
import MyOffer from './MyOffer';
import PrivateOffer from "./PrivateOffer"
import CreateSellOfferModal from './createOfferModal';
import useOffers from '../../hooks/useOffer';

interface OfferDashboardProps {
    offerType: number;
    searchKeyWord: string;
}

const OfferDashboard: React.FC<OfferDashboardProps> = (props) => {

    const { estokkYamContract, chainId } = useWeb3()
    const { offerContents } = useOffers()

    const [isHover, setIsHover] = useState(false);
    const buttonClass = 'w-[100%] h-10 flex items-center border-[1px] border-[#00b3ba] text-[#00b3ba] hover:text-[white] hover:bg-[#00b3ba] rounded focus:outline-none duration-150';

    const [isAddOfferModalOpen, setIsAddOfferModalOpen] = useState(false);
    const [isCreateOfferModalOpen, setIsCreateOfferModalOpen] = useState(false);
    const [createoffer, setCreateOffer] = useState<string | undefined>();
    const [createOfferTitle, setCreateOfferTitle] = useState<string | undefined>();

    const [isBtnPush1, setIsBtnPush1] = useState(false);
    const [isBtnPush2, setIsBtnPush2] = useState(false);
    const [isBtnPush3, setIsBtnPush3] = useState(false);
    const currentRef = useRef<HTMLButtonElement | null>(null);

    const btnRefresh = useRef<HTMLButtonElement | null>(null)
    const [offerIDContent, setOfferIDContent] = useState<any>([])
    const [searchOfferIdContent, setSearchOfferIdContent] = useState<any>([])
    const [searchType, setSearchType] = useState<any>()

    let arrayOffer: any = []

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
        if (createoffer === 'sell' || createoffer === 'buy' || createoffer === 'exchange') {
            setCreateOfferTitle(createoffer);
            setIsCreateOfferModalOpen(true);
        } else {
            setCreateOffer('none');
        }
    }, [createoffer]);

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
                        setSearchType("sell")
                    }}
                />
                <MarketBtn
                    btnName="Buy"
                    isBtnPush={isBtnPush2}
                    onClick={() => {
                        setIsBtnPush1(false);
                        setIsBtnPush2(true);
                        setIsBtnPush3(false);
                        setSearchType("buy")
                    }}
                />
                <MarketBtn
                    btnName="Exchange"
                    isBtnPush={isBtnPush3}
                    onClick={() => {
                        setIsBtnPush1(false);
                        setIsBtnPush2(false);
                        setIsBtnPush3(true);
                        setSearchType("exchange")
                    }}
                />
            </div>

            <div className="mt-4 mb-4 rounded-md bg-white">
                {
                    props.offerType === 1 && (
                        <>
                            <p className="text-center text-xl text-[#00b3ba]">Dex</p>
                            <MyOffer content={searchOfferIdContent} searchType={searchType} />
                        </>
                    )
                }

                {
                    props.offerType === 2 && (
                        <>
                            <p className="text-center text-xl text-[#00b3ba]">Dex</p>
                            <PrivateOffer content={searchOfferIdContent} searchType={searchType} />
                        </>
                    )
                }

                {props.offerType === 3 && (
                    <div className='h-[300px] mb-5'>
                        <p className="text-center text-xl text-[#00b3ba] font-bold pt-2">Create Offer</p>
                        <div className='w-[100%] mt-5 pr-2 pl-2'>
                            <button
                                className={buttonClass}
                                onMouseOver={() => setIsHover(true)}
                                onMouseOut={() => setIsHover(false)}
                                onClick={() => {
                                    setIsAddOfferModalOpen(true);
                                }}
                            >
                                <img
                                    src={isHover ? `./img/addoffers_hover.svg` : `./img/addoffers.svg`}
                                    className="w-5 ml-2 mr-2"
                                    alt="Add Offer"
                                />
                                Add Offer
                            </button>
                        </div>
                    </div>

                )}

                <AddOfferModal
                    isAddOfferModalOpen={isAddOfferModalOpen}
                    setIsAddOfferModalOpen={setIsAddOfferModalOpen}
                    setCreateOffer={setCreateOffer}
                />

                <CreateSellOfferModal
                    isCreateOfferModalOpen={isCreateOfferModalOpen}
                    setIsCreateOfferModalOpen={setIsCreateOfferModalOpen}
                    createOfferTitle={createOfferTitle}
                    setCreateOffer={setCreateOffer}
                />
            </div>
        </div >
    );
};

export default OfferDashboard;
