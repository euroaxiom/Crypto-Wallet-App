import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useState } from 'react'
import { MainLayout } from './'
import { connect } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'
import { getHoldings } from '../stores/market/marketActions'
import { BalanceInfo, Chart } from '../components'
import { COLORS, SIZES, FONTS } from '../constants/Theme'
import { DummyData, allIcon } from '../constants'
const Portfolio = ({ getHoldings, myHoldings }) => {
  const [selectedCoin, setSelectedCoin] = useState(null)
  let myRecordLength = 0
  // this function is used to callback for every time when focused on Portfolio screen
  useFocusEffect(
    React.useCallback(() => {
      getHoldings(holdings = DummyData.holdings)
    }, [])
  )
  // this function is used to get all records set in myrequiredData variable after calling the API
  let myrequiredData = myHoldings.map((item) => {
    let coin = ""
    let coinvalue = holdings.find(a => a.id == item.id)
    if (coinvalue != undefined) {
      coin = coinvalue
      myRecordLength = myRecordLength + 1
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
  // this function is used to  show Portfolio Balance section in Portfolio Screen
  function renderCurrentBalanceSection() {
    return (
      <View style={{
        paddingHorizontal: SIZES.padding,
        borderBottomLeftRadius: 25,
        borderBottomRightRadius: 25,
        backgroundColor: COLORS.gray
      }}>
        <Text style={{ marginTop: 30, color: COLORS.white, ...FONTS.largeTitle }}>Portfolio</Text>
        <BalanceInfo
          tittle="Current Balance"
          displayAmount={totalWallet}
          changePct={perChange}
          containerStyle={{
            marginTop: SIZES.radius,
            marginBottom: SIZES.padding
          }}
        />
      </View>
    )
  }
  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header - Current balance*/}
        {renderCurrentBalanceSection()}
        {/* Chart */}
        <Chart
          containerStyle={{
            marginTop: SIZES.radius
          }}
          chartPrices={selectedCoin ? selectedCoin?.sparkline_in_7d?.value : myrequiredData[0]?.sparkline_in_7d?.value}
        />
        {/* your Assest */}
        <FlatList
          data={myrequiredData.slice(0, myRecordLength)}
          keyExtractor={item => item.id}
          contentContainerStyle={{
            marginTop: SIZES.padding,
            paddingHorizontal: SIZES.padding
          }}
          ListHeaderComponent={
            <View>
              {/* Section Title */}
              <Text style={{ ...FONTS.h2, color: COLORS.white }}>
                Your Assest
              </Text>
              {/* Header Label */}
              <View style={{ flexDirection: "row", marginTop: SIZES.radius }}>
                <Text style={{ flex: 1, color: COLORS.lightGray3 }}>Asset</Text>
                <Text style={{ flex: 1, color: COLORS.lightGray3, textAlign: "right" }}>Price</Text>
                <Text style={{ flex: 1, color: COLORS.lightGray3, textAlign: "right" }}>holdings</Text>
              </View>
            </View>
          }
          renderItem={({ item }) => {
            let priceColor = (item.price_change_percentage_7d_in_currency == 0) ? COLORS.lightGray3 : (
              item.price_change_percentage_7d_in_currency > 0) ? COLORS.lightGreen : COLORS.red
            return (
              <TouchableOpacity
                style={{ flexDirection: "row", height: 55 }}
                onPress={() => setSelectedCoin(item)}
              >
                {/* Asset */}
                <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                  <Image
                    source={{ uri: item.image }}
                    style={{
                      width: 20,
                      height: 20
                    }}
                  />
                  <Text style={{ marginLeft: SIZES.radius, color: COLORS.white, ...FONTS.h4 }}>{item.name}</Text>
                </View>
                {/* Price */}
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ textAlign: "right", color: COLORS.white, ...FONTS.h4, }}>${item.current_price.toLocaleString()}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center" }}>
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
                    <Text style={{ marginLeft: 5, color: priceColor, ...FONTS.body5, lineHeight: 15, }}>{item.price_change_percentage_7d_in_currency.toFixed(2)}%</Text>
                  </View>
                </View>
                {/* Holdings */}
                <View style={{ flex: 1, justifyContent: "center" }}>
                  <Text style={{ textAlign: "right", color: COLORS.white, ...FONTS.h4, lineHeight: 15 }}>${item.total.toLocaleString()}</Text>
                  <Text style={{ textAlign: "right", color: COLORS.lightGray3, ...FONTS.body5, lineHeight: 15 }}>
                    {item.qty}{item.symbol.toUpperCase()}
                  </Text>
                </View>
              </TouchableOpacity>
            )
          }}
        />
      </View>
    </MainLayout>
  )
}
// this function is used to get state in redux Store
function mapStateToProps(state) {
  return {
    myHoldings: state.marketReducer.myHoldings,
  }
}
// this fucntion is used to dispatch the state in redux Store 
function mapDispatchToProps(dispatch) {
  return {
    getHoldings: (holdings, currency, coinList, orderBy, sparkline, priceChangePere, perPage, page) => {
      return dispatch(getHoldings(holdings, currency, coinList, orderBy, sparkline, priceChangePere, perPage, page))
    },
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Portfolio);