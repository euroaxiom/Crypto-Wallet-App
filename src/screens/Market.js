import { StyleSheet, Text, View, TouchableOpacity, FlatList, Animated, Image } from 'react-native'
import React from 'react'
import { MainLayout } from './'
import { connect } from 'react-redux'
import { getHoldings, getCoinMarket } from '../stores/market/marketActions'
import { COLORS, SIZES, FONTS } from '../constants/Theme'
import { Constant, allIcon } from '../constants'
import { HeaderBar, TextButton } from '../components'
import { LineChart } from 'react-native-chart-kit'
// this function is used to add refrence inside marketTab values
const marketTabs = Constant.marketTabs.map((marketTab) => ({
  ...marketTab,
  ref: React.createRef
}))
// this function is used to show TabIndicator 
const TabIndicator = ({ measureLayout, scrollX }) => {
  const inputRange = marketTabs.map((_, i) => i * SIZES.width)
  // console.log("inputRange", inputRange)
  const translateX = scrollX.interpolate({
    inputRange,
    outputRange: [0, 205.42857142857144]
  })
  return (
    <Animated.View style={{
      position: "absolute", left: 0, height: "100%",
      width: (SIZES.width - (SIZES.radius * 2)) / 2,
      borderRadius: SIZES.radius,
      backgroundColor: COLORS.lightGray3,
      transform: [{
        translateX
      }]
    }}
    />
  )
}
const Tabs = ({ scrollX,onMarketTabPress }) => {
  const [measureLayout, setMeasureLayout] = React.useState([])
  // const containerRef = React.useRef()
  // React.useEffect(() => {
  //   console.log("akra,m")
  //   let ml = []
  //   console.log("marketTabs", marketTabs)
  //   marketTabs.map(marketTab => {
  //     marketTab?.ref?.current?.measureLayout(
  //       containerRef.current,
  //       (x, y, width, height) => {
  //         console.log("length", marketTab.length)
  //         ml.push({
  //           x, y, width, height
  //         })

  //         if (ml.length == marketTabs.length) {
  //           console.log("KEm")
  //           setMeasureLayout(ml)
  //         }
  //       }
  //     )
  //   })
  // }, [containerRef.current])
  return (
    <View style={{ flexDirection: "row" }}>
      {/* Tab indicator */}
      {<TabIndicator measureLayout={measureLayout} scrollX={scrollX} />}
      {/* Tabs */}
      {marketTabs.map((item, index) => {
        return (
          <TouchableOpacity key={`MarketTab-${index}`}
            style={{
              flex: 1
            }}
            onPress={()=>onMarketTabPress(index)}
          >
            <View
              ref={item.ref}
              style={{
                paddingHorizontal: 15,
                alignItems: "center",
                justifyContent: "center",
                height: 40
              }}
            >
              <Text style={{ color: COLORS.white, ...FONTS.h3 }}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )
      })}
    </View>
  )
}
const Market = ({ getCoinMarket, coins }) => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const marketTabScrollViewRef=React.useRef()
  const onMarketTabPress = React.useCallback(marketTabIndex => {
    marketTabScrollViewRef?.current?.scrollToOffset({
      offset:marketTabIndex * SIZES.width
    })
  })
  React.useEffect(() => {
    getCoinMarket()
  }, [])
  function renderTabBar() {
    return (
      <View
        style={{
          marginTop: SIZES.radius,
          marginHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.gray
        }}
      >
        {<Tabs
          scrollX={scrollX}
          onMarketTabPress={onMarketTabPress}
        />}
      </View>
    )
  }
  function renderButtons() {
    return (
      <View style={{ flexDirection: "row", marginTop: SIZES.radius, marginHorizontal: SIZES.radius }}>
        <TextButton
          label="USD"
        />
        <TextButton
          label="% (7d)"
          containerStyle={{
            marginLeft: SIZES.base
          }}
        />
        <TextButton
          label="Top"
          containerStyle={{
            marginLeft: SIZES.base
          }}
        />
      </View>
    )
  }
  function renderList() {
    return (
      <Animated.FlatList
        ref={marketTabScrollViewRef}
        data={marketTabs}
        contentContainerStyle={{
          marginTop: SIZES.padding
        }}
        horizontal
        pagingEnabled
        scrollEventThrottle={16}
        snapToAlignment="center"
        showsHorizontalScrollIndicator={false}
        keyExtractor={item => item.id}
        onScroll={
          Animated.event([
            { nativeEvent: { contentOffset: { x: scrollX } } }
          ], {
            useNativeDriver: false
          })
        }
        renderItem={({ item, index }) => {
          return (
            <View style={{ flex: 1, width: SIZES.width }}>
              {/* {console.log("index", index)} */}
              <FlatList
                data={coins}
                keyExtractor={item => item.id}
                renderItem={({ item, index }) => {
                  let priceColor = (item.price_change_percentage_7d_in_currency == 0 ? COLORS.lightGray3 : (item.price_change_percentage_7d_in_currency > 0 ? COLORS.lightGreen : COLORS.red))
                  return (
                    <View style={{
                      flexDirection: "row",
                      paddingHorizontal: SIZES.padding,
                      marginBottom: SIZES.radius
                    }}>
                      {/* Coins */}
                      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
                        <Image
                          source={{ uri: item.image }}
                          style={{
                            height: 20,
                            width: 20
                          }}
                        />
                        <Text style={{ marginLeft: SIZES.radius, color: COLORS.white, ...FONTS.h3 }}>{item.name}</Text>
                      </View>
                      {/* Line Chart */}
                      <View style={{ flex: 1, alignItems: "center" }}>
                        <LineChart
                          withVerticalLabels={false}
                          withHorizontalLabels={false}
                          withDots={false}
                          withInnerLines={false}
                          withVerticalLines={false}
                          withOuterLines={false}
                          data={{
                            datasets: [
                              {
                                data: item.sparkline_in_7d.price
                              }
                            ]
                          }}
                          width={100}
                          height={60}
                          chartConfig={{
                            color: () => priceColor
                          }}
                          bezier
                          style={{
                            paddingRight: 0
                          }}
                        />
                      </View>
                      {/* Figures */}
                      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
                        <Text style={{ color: COLORS.white, ...FONTS.h4 }}>
                          $ {item.current_price}
                        </Text>
                        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
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
                    </View>
                  )
                }}
              />
            </View>
          )
        }}
      />
    )
  }
  return (
    <MainLayout>
      <View style={{ flex: 1, backgroundColor: COLORS.black }}>
        {/* Header */}
        <HeaderBar title={"Market"}/>
        {/* Tab Bar */}
        {renderTabBar()}
        {/* Button */}
        {renderButtons()}
        {/* Market list */}
        {renderList()}
      </View>
    </MainLayout>
  )
}
// this function is used to get state in redux Store
function mapStateToProps(state) {
  return {
    coins: state.marketReducer.coins
  }
}
// this fucntion is used to dispatch the state in redux Store 
function mapDispatchToProps(dispatch) {
  return {
    getCoinMarket: (currency, coinList, orderBy, sparkline, priceChangePere, perPage, page) => {
      return dispatch(getCoinMarket(currency, coinList, orderBy, sparkline, priceChangePere, perPage, page))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Market);