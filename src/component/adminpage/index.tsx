import { useEffect, useState } from "react"
import useWeb3 from "../../hooks/useWeb3"
import api from "../../service/axios"
function Admin() {
    const { estokkYamContract, account, chainId } = useWeb3()
    // const real_token: any = "0x0170A96Cac4dd1D3dE9FB7fB19A6C10D43e663D3"
    // const TK_token: any = "0x4069F86aDd448c60546A5363Da9215690086F8c3"
    // const usdc_token: any = "0x25F460F2E84608EE83E93b7E36985a37D241fD1F"
    // const wdai_token: any = "0x0f6b3cAfD5ab9bE37f8299284D7A30B93F3B76b7"

    const [properties, setProperties] = useState<any>([])
    const real_token: any = "0x25F460F2E84608EE83E93b7E36985a37D241fD1F"
    const TK_token: any = "0xe3Bff3b3c46D1866E584F84e4eD17eE0CDef172C"
    const usdc_token: any = "0x0170A96Cac4dd1D3dE9FB7fB19A6C10D43e663D3"
    const wdai_token: any = "0x4069F86aDd448c60546A5363Da9215690086F8c3"



    const setAdmin = async () => {
        try {
            const resultofSetAdmin: any = await estokkYamContract.methods.initialize(account, "0x20B3414EccA6e848F5a4da6c5657100974b2040C").send({ from: account })
            console.log("Result of SetAmdin => ", resultofSetAdmin)
        } catch (err) {
        }
    }

    const setToggleWhiteListToken = async () => {
        const token_address: any = []
        const token_type: any = []

        api.get("/getData",)
            .then((res) => {
                const array = res.data.tokens

                array.map((item: any, index: any) => {
                    token_address.push(item.tokenAddress)
                    token_type.push(1)
                })
                console.log(token_address)
                console.log(token_type)
            })


        const result: any = await estokkYamContract.methods.toggleWhitelistWithType(token_address, token_type).send({ from: account })
        console.log("Result Toggle ===>", result)


        console.log("Token Type =>", await estokkYamContract.methods.getTokenType(real_token).call())
    }

    const getAdmin = async () => {
        console.log("admin", await estokkYamContract.methods.DEFAULT_ADMIN_ROLE().call());

        const result: any = await estokkYamContract.methods.hasRole(await estokkYamContract.methods.DEFAULT_ADMIN_ROLE().call(), account).call()
        console.log("result: ", result)
    }

    const createOffer = async () => {
        const offer_token: any = real_token
        const buyer_token: any = usdc_token
        const buyer: string = "0x0000000000000000000000000000000000000000"
        const price: Number = 5
        const amount: Number = 100
        const result: any = await estokkYamContract.methods.createOffer(offer_token, buyer_token, buyer, price, amount).send({ from: account });
        console.log("result => ", result)
    }

    const showOffer = async () => {
        console.log("ShowOffer => ", await estokkYamContract.methods.showOffer(9).call())
        console.log("Get OfferCount => ", await estokkYamContract.methods.getOfferCount().call())
        // console.log("GetTokenType => ", await estokkYamContract.methods.getTokenType(real_token).call())
    }

    const OfferDelete = async () => {
        const result: any = await estokkYamContract.methods.deleteOffer(8).send({ from: account })
        console.log("Result => ", result)
    }
    const Buy = async () => {
        const offer_token: any = real_token
        const buyer_token: any = usdc_token
        const buyer: string = "0x0000000000000000000000000000000000000000"
        const price: any = 5
        let decimal: any = 18
        let amount: any = 100
        await estokkYamContract.methods.buy(0, price, amount * Math.pow(10, decimal)).send({ from: account })
    }

    useEffect(() => {
        console.log("My Accout =>", account)
        console.log("My ChainID =>", chainId)
        console.log("conract => > > > ", estokkYamContract);
    }, [account, chainId, estokkYamContract])

    return (
        <div className="w-[80%] h-[700px] flex justify-between mt-5">

            <button
                className="w-[200px] h-[50px] mr-1 ml-1 rounded text-[#00b3ba] border-[1px] border-[#00b3ba] focus:outline-none"
                onClick={setAdmin}>
                set Admin
            </button>
            <button
                className="w-[200px] h-[50px] mr-1 ml-1 rounded text-[#00b3ba] border-[1px] border-[#00b3ba] focus:outline-none"
                onClick={getAdmin}>
                get Admin
            </button>

            <button
                className="w-[200px] h-[50px] mr-1 ml-1 rounded text-[#00b3ba] border-[1px] border-[#00b3ba] focus:outline-none"
                onClick={setToggleWhiteListToken}>
                toggle WhiteList Token
            </button>

            <button
                className="w-[200px] h-[50px] mr-1 ml-1 rounded text-[#00b3ba] border-[1px] border-[#00b3ba] focus:outline-none"
                onClick={createOffer}
            >
                Create Offer
            </button>

            <button
                className="w-[200px] h-[50px] mr-1 ml-1 rounded text-[#00b3ba] border-[1px] border-[#00b3ba] focus:outline-none"
                onClick={showOffer}
            >
                Show Offer
            </button>

            <button
                className="w-[200px] h-[50px] mr-1 ml-1 rounded text-[#00b3ba] border-[1px] border-[#00b3ba] focus:outline-none"
                onClick={Buy}
            >
                Buy
            </button>
            <button
                className="w-[200px] h-[50px] mr-1 ml-1 rounded text-[#00b3ba] border-[1px] border-[#00b3ba] focus:outline-none"
                onClick={async () => {
                    const result: any = await estokkYamContract.methods.getTokenType("0x0f6b3cAfD5ab9bE37f8299284D7A30B93F3B76b7").call()
                    console.log("Result => ", result)

                }}
            >
                GetTokenType
            </button>

            <button
                className="w-[200px] h-[50px] mr-1 ml-1 rounded text-[#00b3ba] border-[1px] border-[#00b3ba] focus:outline-none"
                onClick={OfferDelete}
            >
                Delete Offer
            </button>





        </div>
    )
}


export default Admin