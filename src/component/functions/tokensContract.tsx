import Web3, { Contract } from 'web3'
import TokenContractAbi from '../../contract/Token.json'
import { convertToObject } from 'typescript';

export const defaultContractAddress = "0x0000000000000000000000000000000000000000"

export const getTokenBalance = async (tokenAddress: any, account: any) => {
    const web3 = new Web3(window.ethereum);
    const tokenContract = new web3.eth.Contract(TokenContractAbi, tokenAddress);
    const balance = await tokenContract.methods.balanceOf(account).call();
    return Number(balance) / Math.pow(10, 18);
}

export const getTokenAddress = (_tokenId: any, tokens: any) => {
    let _tokenAddress: string | undefined;

    tokens.map((item: any, index: any) => {
        if (item.id === _tokenId) {
            _tokenAddress = String(item.tokenAddress)
        }
    })

    return _tokenAddress
}

export const getTokenSymbol = (_tokenId: any, tokens: any) => {
    if (!_tokenId) return
    if (!tokens) return
    let _tokenSymbol: any
    tokens.map((item: any, index: any) => {
        if (item.id === _tokenId) {
            _tokenSymbol = item.tokenSymbol
        }
    })
    return _tokenSymbol
}

export const getTokenSalePrice = (_tokenId: any, tokens: any) => {
    let _tokenSalePrice: any
    tokens.map((item: any, index: any) => {
        if (item.id === _tokenId) {
            _tokenSalePrice = item.salePrice
        }
    })
    console.log("Token Sale Price =>>>", _tokenSalePrice)
    return _tokenSalePrice
}


export const getCurrencyTokenAddress = (tokenName: any) => {
    const real_token: any = "0x0170A96Cac4dd1D3dE9FB7fB19A6C10D43e663D3"
    const TK_token: any = "0x4069F86aDd448c60546A5363Da9215690086F8c3"
    const usdc_token: any = "0x25F460F2E84608EE83E93b7E36985a37D241fD1F"
    const wdai_token: any = "0x0f6b3cAfD5ab9bE37f8299284D7A30B93F3B76b7"

    if (tokenName === "usdc") return usdc_token
    if (tokenName === "wdai") return wdai_token
}

export const isAvailable = (_offerTokenAddress: any, _buyerTokenAddress: any, tokens: any, properties: any) => {
    if (!_offerTokenAddress) return false
    if (!_buyerTokenAddress) return false
    if (!tokens.length) return false
    if (!properties.length) return false

    return true
}

export const getPropertyId = (_offerTokenAddress: any, _buyerTokenAddress: any, tokens: any, properties: any) => {

    if (!isAvailable(_offerTokenAddress, _buyerTokenAddress, tokens, properties)) return
    const _offerToken = tokens.filter((item: any) => item.tokenAddress === _offerTokenAddress)[0]
    const _buyerToken = tokens.filter((item: any) => item.tokenAddress === _buyerTokenAddress)[0]
    let realEstateToken: any
    let currentToken: any
    if (_offerToken.tokenSymbol === "usdc_token" || _offerToken.tokenSymbol === "wdai_token") {
        realEstateToken = _buyerToken
        currentToken = _offerToken
    }
    else if (_buyerToken.tokenSymbol === "usdc_token" || _buyerToken.tokenSymbol === "wdai_token") {
        realEstateToken = _offerToken
        currentToken = _buyerToken
    }
    else {
        realEstateToken = _offerToken
    }
    const propertyId = realEstateToken.propertyId

    return propertyId
}

export const getOfficialPrice = (_offerTokenAddress: any, _buyerTokenAddress: any, tokens: any, properties: any) => {

    if (!isAvailable(_offerTokenAddress, _buyerTokenAddress, tokens, properties)) return

    const _offerToken = tokens.filter((item: any) => item.tokenAddress === _offerTokenAddress)[0]
    const _buyerToken = tokens.filter((item: any) => item.tokenAddress === _buyerTokenAddress)[0]
    let realEstateToken: any
    let currentToken: any
    if (_offerToken.tokenSymbol === "usdc_token" || _offerToken.tokenSymbol === "wdai_token") {
        realEstateToken = _buyerToken
        currentToken = _offerToken
    }

    else if (_buyerToken.tokenSymbol === "usdc_token" || _buyerToken.tokenSymbol === "wdai_token") {
        realEstateToken = _offerToken
        currentToken = _buyerToken
    }
    else {
        realEstateToken = _offerToken
    }

    return realEstateToken.purchasePrice
}

export const getOfficialYield = (_offerTokenAddress: any, _buyerTokenAddress: any, tokens: any, properties: any) => {

    if (!isAvailable(_offerTokenAddress, _buyerTokenAddress, tokens, properties)) return
    const propertyId: any = getPropertyId(_offerTokenAddress, _buyerTokenAddress, tokens, properties)
    const property: any = properties.filter((item: any) => item.id === propertyId)[0]

    const {
        assetPrice,
        renovationUpgrade,
        operatingExpenseReimbursement,
        initMaintainanceReserve,
        vacancyReserve,
        initialRenovationReserve,
        administrativeFee
    } = property

    const totalInvestmentValue: number = assetPrice + renovationUpgrade + operatingExpenseReimbursement
        + initMaintainanceReserve + vacancyReserve + initialRenovationReserve + administrativeFee

    const {
        monthlyGrossRent,
        monthlyCosts
    } = property

    const annualGrossRent = (monthlyGrossRent - monthlyCosts) * 12

    return annualGrossRent * 100 / totalInvestmentValue
}

export const getRealEstakeTokens = (tokens: any) => {

    if (!tokens) return
    const realEstakeTokens = tokens.filter((item: any) => !(item.tokenSymbol.toLowerCase().includes("usdc") ||
        item.tokenSymbol.toLowerCase().includes("wdai"))
    )
    return realEstakeTokens
}

export const getCurrencyTokens = (tokens: any) => {

    if (!tokens) return
    const currencyTokens = tokens.filter((item: any) => item.tokenSymbol.toLowerCase().includes("usdc") ||
        item.tokenSymbol.toLowerCase().includes("wdai")
    )
    return currencyTokens
}

export const getTokenRealEstakeInfoFromMarketPlace = (_offerTokenAddress: any, _buyerTokenAddress: any, tokens: any, properties: any) => {
    if (!isAvailable(_offerTokenAddress, _buyerTokenAddress, tokens, properties)) return
    const propertyId = getPropertyId(_offerTokenAddress, _buyerTokenAddress, tokens, properties)

    const RealEsakeToken = properties.filter((item: any) => item.id === propertyId)[0]
    return RealEsakeToken
}

export const isSearchFilter = (_offerTokenAddress: any, _buyerTokenAddress: any, searchType: any, tokens: any) => {

    const _offerToken = tokens.filter((item: any) => item.tokenAddress === _offerTokenAddress)[0]
    const _buyerToken = tokens.filter((item: any) => item.tokenAddress === _buyerTokenAddress)[0]

    let realEstateToken: any
    let currentToken: any
    if (searchType === "sell") {
        if (_offerToken.tokenSymbol === "usdc_token" || _offerToken.tokenSymbol === "wdai_token")
            return false
        if (_buyerToken.tokenSymbol !== "usdc_token" && _buyerToken.tokenSymbol !== "wdai_token")
            return false

        return true
    }

    if (searchType === "buy")
        if (_offerToken.tokenSymbol === "usdc_token" || _offerToken.tokenSymbol === "wdai_token")
            return true
        else return false

    if (searchType === "exchange") {
        if (_offerToken.tokenSymbol === "usdc_token" || _offerToken.tokenSymbol === "wdai_token") return false
        if (_buyerToken.tokenSymbol === "usdc_token" || _buyerToken.tokenSymbol === "wdai_token") return false

        return true
    }
}