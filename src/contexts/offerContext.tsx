import {
    createContext,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import useWeb3 from '../hooks/useWeb3';
import { OfferContextType } from "../types"
declare let window: any;
const OfferContext = createContext<OfferContextType | null>(null);

export const OfferContextProvide = ({ children }: { children: React.ReactNode }) => {
    const { estokkYamContract, chainId } = useWeb3()
    const [offerContents, setOfferContents] = useState<any>([])

    const ShowTotalOffer = useCallback(async () => {
        try {
            let arrayOffer: any = []
            const totalOfferCount = await estokkYamContract.methods.getOfferCount().call()
            for (let i = 0; i < totalOfferCount; i++) {
                try {
                    const eachOfferContent: any = await estokkYamContract.methods.showOffer(i).call()
                    const offerToken: any = await estokkYamContract.methods.tokenInfo(eachOfferContent[0]).call()
                    const buyerToken: any = await estokkYamContract.methods.tokenInfo(eachOfferContent[1]).call()
                    arrayOffer.push({
                        offerId: i,
                        offerToken: offerToken[1],
                        offerTokenAddress: eachOfferContent[0],
                        buyerToken: buyerToken[1],
                        buyerTokenAddress: eachOfferContent[1],
                        seller: eachOfferContent[2],
                        buyer: eachOfferContent[3],
                        price: eachOfferContent[4],
                        amount: eachOfferContent[5],

                    })
                } catch (err) {
                }
            }
            setOfferContents(arrayOffer)
        } catch (err) {
        }
    }, [chainId, estokkYamContract])

    useEffect(() => {
        ShowTotalOffer()
    }, [estokkYamContract, chainId])

    useEffect(() => {
        ShowTotalOffer()
    }, [])

    const value = useMemo(() => ({
        offerContents: offerContents
    }), [offerContents])


    return <OfferContext.Provider value={value}>{children}</OfferContext.Provider>;
};

export default OfferContext;
