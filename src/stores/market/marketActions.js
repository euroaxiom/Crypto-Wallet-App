import axios from "axios";
export const GET_HOLDINGS_BEGIN = "GET_HOLDINGS_BEGIN"
export const GET_HOLDINGS_SUCCESS = "GET_HOLDINGS_SUCCESS"
export const GET_HOLDINGS_FAILURE = "GET_HOLDINGS_FAILURE"
export const GET_COIN_MARKET_BEGIN = "GET_COIN_MARKET_BEGIN"
export const GET_COIN_MARKET_SUCCESS = "GET_COIN_MARKET_SUCCESS"
export const GET_COIN_MARKET_FAILURE = "GET_COIN_MARKET_FAILURE"
// Holding / My Holding
export const getHoldingsBegin = () => ({
    type: GET_HOLDINGS_BEGIN
})
export const getHoldingsSuccess = (myHoldings) => ({
    type: GET_HOLDINGS_SUCCESS,
    payload: { myHoldings }
})
export const getHoldingsFailure = (error) => ({
    type: GET_HOLDINGS_FAILURE,
    payload: { error }
})
// this function is used to get date through API
export function getHoldings(holdings = [], currency = "usd", orderBy = "market_cap_desc",
    sparkline = true, priceChangePerc = "7d", perPage = 10, page = 1) {
    return dispatch => {
        dispatch(getHoldingsBegin())
        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`
        return axios({
            url: apiUrl,
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then(async (response) => {
            if (response.status == 200) {
                // Message data
                let myHoldings = []
                // console.log(response.data)
                    dispatch(getHoldingsSuccess(response.data))
                // await response.data.map((item) => {
                //     //   Retrieve our cuurent holdings -> current quantity
                //     let coin = holdings.find(a => a.id == item.id)
                //     console.log("coins", coin)
                //     // price from 7 days ago
                //     let price7d = item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01)
                //     console.log("status1000", response.status)
                //     myHoldings.push({
                //         id: item.id,
                //         symbol: item.symbol,
                //         name: item.name,
                //         image: item.image,
                //         current_price: item.current_price,
                //         qty: coin.qty,
                //         total: coin.qty * item.current_price,
                //         price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
                //         holding_value_change_7d: (item.current_price - price7d),
                //         // sparkline_in_7d: {
                //         //     value: item.sparkline_in_7d.price.map(
                //         //         (price) => {
                //         //             return price * coin.qty
                //         //         }
                //         //     )
                //         // }
                //     })

                // })
                // setTimeout(() => {
                //     console.log("status12", response.status)
                //     console.log("asdlkfjaskl;djfkl;asdjfklasdklfjas", myHoldings)
                //     dispatch(getHoldingsSuccess(myHoldings))
                // }, 2000);
            }
            else {
                // console.log("asdf;jal;sdkjf;lk", response.data)
                dispatch(get0HoldingsFailure(response.data))
            }
        }).catch((err) => {
            dispatch(getHoldingsFailure(err))
        })
    }
}
// Coin Market
export const getCoinMarketBegin = () => ({
    type: GET_COIN_MARKET_BEGIN
})
export const getCoinMarketSuccess = (coins) => ({
    type: GET_COIN_MARKET_SUCCESS,
    payload: { coins }
})
export const getCoinMarketFailure = (error) => ({
    type: GET_COIN_MARKET_FAILURE,
    payload: { error }
})
// this function is used to get market coins through API
export function getCoinMarket(currency = "usd", orderBy = "market_cap_desc",
    sparkline = true, priceChangePerc = "7d", perPage = 10, page = 1) {
    return dispatch => {
        dispatch(getCoinMarketBegin())
        let apiUrl = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${orderBy}&per_page=${perPage}&page=${page}&sparkline=${sparkline}&price_change_percentage=${priceChangePerc}`
        return axios({
            url: apiUrl,
            method: "GET",
            headers: {
                Accept: "application/json"
            }
        }).then((response) => {
            // console.log("getCoinsMarket")
            // console.log(response)
            if (response.status == 200) {
                // // Message data
                // let myHoldings =response.data.map((item) =>{
                // //   Retrieve our cuurent holdings -> current quantity
                // let coin =holdings.find(a => a.id == item.id)
                // // price from 7 days ago
                // let price7d =item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01)
                // return{
                //     id:item.id,
                //     symbol: item.symbol,
                //     name:item.name,
                //     image:item.image,
                //     current_price:item.current_price,
                //     qty:coin.qty,
                //     total:coin.qty * item.current_price,
                //     price_change_percentage_7d_in_currency:item.price_change_percentage_7d_in_currency,
                //     holding_value_change_7d:(item.current_price - price7d),
                //     sparkline_in_7d:{
                //        value:item.sparkline_in_7d.price.map(
                //            (price)=>{
                //                return price * coin.qty
                //            }
                //        )
                //     }
                // }
                // })
                dispatch(getCoinMarketSuccess(response.data))
            }
            else {
                dispatch(getCoinMarketFailure(response.data))
            }
        }).catch((err) => {
            dispatch(getCoinMarketFailure(err))
        })
    }
}