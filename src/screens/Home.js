
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React,{useState} from 'react'
import { MainLayout } from './'
import { connect } from 'react-redux'
import { getHoldings, getCoinMarket } from '../stores/market/marketActions'
import { useFocusEffect } from '@react-navigation/native'
import { allIcon, DummyData } from '../constants'
import { COLORS, FONTS, SIZES } from '../constants/Theme'
import { BalanceInfo, IconTextButton, Chart } from '../components'
const Home = ({ getHoldings, getCoinMarket, myHoldings, coins }) => {
  const [selectedCoin,setSelectedCoin]=useState(null)
  // this function is used to callback for every time when focused on Home Screen
  useFocusEffect(
    React.useCallback(() => {
      getHoldings(holdings = DummyData.holdings)
      getCoinMarket()
    }, [])
  )
  // this function is used to get all records set in myrequiredData variable after calling the API
  let myrequiredData = myHoldings.map((item) => {
    let coin = ""
    let coinvalue = holdings.find(a => a.id == item.id)
    if (coinvalue != undefined) {
      coin = coinvalue
    }
    // console.log("salman", coin)
    let price7d = item.current_price / (1 + item.price_change_percentage_7d_in_currency * 0.01)
    return {
      id: item.id,
      symbol: item.symbol,
      name: item.name,
      image: item.image,
      current_price: item.current_price,
      qty: coin.qty,
      total: coin.qty * item.current_price,
      price_change_percentage_7d_in_currency: item.price_change_percentage_7d_in_currency,
      holding_value_change_7d: (item.current_price - price7d),
      sparkline_in_7d: {
        value: item.sparkline_in_7d.price.map(
          (price) => {
            return price * coin.qty
          }
        )
      }
    }
  })
  // this varible is used to get total wallet values
  let totalWallet = myrequiredData.reduce((a, b) => a + (b.total || 0), 0)
  // console.log("total wallet", totalWallet)
  let valueChange = myrequiredData.reduce((a, b) => a + (b.holding_value_change_7d || 0), 0)
  let perChange = valueChange / (totalWallet - valueChange) * 100
  // this function is used to  show Balance Info section in Home Screen
  function renderWalletInfoSection() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          borderBottomLeftRadius: 25,
          borderBottomRightRadius: 25,
          backgroundColor: COLORS.gray
        }}>
        {/* Balance Info */}
        <BalanceInfo
          tittle="Your Wallet"
          displayAmount={totalWallet}
          changePct={perChange}
          containerStyle={{
            marginTop: 50
          }}
        />
        {/* Button */}
        <View style={{ flexDirection: "row", marginTop: 30, marginBottom: -15, marginHorizontal: SIZES.radius }}>
          <IconTextButton
            label="Transfer"
            icon={allIcon.send}
            containerStyle={{
              flex: 1,
              height: 40,
              marginRight: SIZES.radius
            }}
            onPress={() => console.log("Transfser")}
          />
          <IconTextButton
            label="Withdraw"
            icon={allIcon.Withdraw}
            containerStyle={{
              flex: 1,
              height: 40,
            }}
            onPress={() => console.log("Withdraw")}
          />
        </View>
      </View>
    )
  }
  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header - Wallet Info  */}
        {renderWalletInfoSection()}
        {/* Chart  */}
        <Chart
          containerStyle={{
            marginTop: SIZES.padding * 2
          }}
          chartPrices={selectedCoin ? selectedCoin?.sparkline_in_7d?.price : coins[0]?.sparkline_in_7d?.price}
        />
        {/* Top Cryptocurrency */}
        <FlatList
          data={coins}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: 30,
            paddingHorizontal: SIZES.padding
          }}
          ListHeaderComponent={
            <View style={{ marginBottom: SIZES.radius }}>
              <Text style={{ color: COLORS.white, ...FONTS.h3, fontSize: 18 }}>
                Top Cryptocurrency
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor = (item.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray3 : (
              item.price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red
            return (
              <TouchableOpacity style={{ height: 55, flexDirection: 'row', alignItems: "center", justifyContent: "center", }}
                onPress={()=> setSelectedCoin(item)}
              >
                {/* Logo */}
                <View style={{ width: 35 }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      height: 20,
                      width: 20
                    }}
                  />
                </View>
                {/* Name */}
                <View style={{ flex: 1, }}>
                  <Text style={{ color: COLORS.white, ...FONTS.h3 }}>
                    {item.name}
                  </Text>
                </View>
                {/* Figures */}
                <View>
                  <Text style={{ textAlign: "right", color: COLORS.white, ...FONTS.h4 }}>$ {item.current_price}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "flex-end" }}>
                    {
                      item.price_change_percentage_7d_in_currency != 0 &&
                      <Image
                        source={allIcon.upArrow}
                        style={{
                          height: 10,
                          width: 10,
                          tintColor: priceColor,
                          transform: item.price_change_percentage_7d_in_currency > 0 ? [{ rotate: "45deg" }] : [{ rotate: "125deg" }]
                        }}
                      />
                    }
                    <Text style={{ marginLeft: 5, color: priceColor, ...FONTS.body5, lineHeight: 15 }}>{item.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                  </View>
                </View>
              </TouchableOpacity>
            )
          }}
          ListFooterComponent={
            <View
              style={{ marginBottom: 40 }}
            />
          }
        />
      </View>
    </MainLayout>
  )
}
// this function is used to get state in redux Store
function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
    coins: state.marketReducer.coins
  }
}
// this fucntion is used to dispatch the state in redux Store 
function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (holdins, currency, coinList, orderBy, sparkline, priceChangePere, perPage, page) => {
      return dispatch(getHoldings(holdins, currency, coinList, orderBy, sparkline, priceChangePere, perPage, page))
    },
    getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePere, perPage, page) => {
      return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePere, perPage, page))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);