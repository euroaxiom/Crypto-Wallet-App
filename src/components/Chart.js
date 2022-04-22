import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartXLabel,
  ChartYLabel,
  monotoneCubicInterpolation
} from '@rainbow-me/animated-charts'
import { LineChart } from 'react-native-wagmi-charts';
import { COLORS, SIZES, FONTS } from '../constants/Theme'
import moment from 'moment'
// this component is used to show Chart according to Prices of Coins
const Chart = ({ containerStyle, chartPrices }) => {
  let startUnixTimestamp = moment().subtract(7, 'day').unix()
  let data2 = chartPrices ? chartPrices?.map((item, index) => {
    return {
      timestamp: startUnixTimestamp + (index + 1) * 3600,
      value: item
      // y: item
      // const data = [
      //   {
      //     timestamp: 1625945400000,
      //     value: 33575.25,
      //   },
      // ];
    }
  }) : []
  console.log("akram", data2)
  let points = monotoneCubicInterpolation({ data2, range: 40 })
  // this fucntion is used to rounding the point 
  const formatNumber = (value,roundingPoint) =>{
    if(value > 1e9){
      return `${(value / 1e9).toFixed(roundingPoint)}B`
    }
    else if(value > 1e6){
      return `${(value / 1e6).toFixed(roundingPoint)}M`
    }
    else if(value > 1e3){
    return `${(value / 1e3).toFixed(roundingPoint)}K`
    }
    else{
      return value.toFixed(roundingPoint)
    }
  }
  // this function is used to get maximum,minimum,midvalue,higher and lower prices 
  const getYAxisLabelValue = () => {
    if (chartPrices != undefined){
      let minValue =Math.min(...chartPrices)
      let maxValue =Math.max(...chartPrices)
      let midvalue = (minValue + maxValue) / 2
      let higherMidValue= (maxValue + midvalue) / 2
      let lowerMidValue=(minValue + midvalue) / 2
      let roundingPoint = 2
      return [
        formatNumber(maxValue,roundingPoint),
        formatNumber(higherMidValue,roundingPoint),
        formatNumber(lowerMidValue,roundingPoint),
        formatNumber(minValue,roundingPoint)
      ]
    }
    else{
      return []
    }
  }
  return (
    <View style={{ ...containerStyle }}>
      {/* Y axis label */}
      <View style={{position:"absolute",left:SIZES.padding,top:0,bottom:0,justifyContent:'space-between'}}>
        {/* getYAxisLabelValue */}
        {
          getYAxisLabelValue().map((item,index)=>{
            return (
              <Text key={index}
              style={{color:COLORS.lightGray3,...FONTS.body4}}>
                {item}
              </Text>
            )

          })
        }
      </View>
      {/* Charts */}
      {
        data2.length > 0 &&
        <LineChart.Provider data={data2}>
          <LineChart width={SIZES.width} height={150}>
            <LineChart.Path color={COLORS.lightGreen} />
            <LineChart.CursorCrosshair color={COLORS.lightGreen} >
              <LineChart.Tooltip style={{
                backgroundColor: COLORS.lightGreen,
                borderRadius: 4,
                color:"#FFFFFF",
                fontSize: 12,   
              }} 
              />
              <LineChart.Tooltip position="bottom" >
                <LineChart.DatetimeText  style={{
                borderRadius: 4,
                color: 'white',
                fontSize: 12,
                
              }}  />
              </LineChart.Tooltip>
            </LineChart.CursorCrosshair>
          </LineChart>
        </LineChart.Provider>
      }
    </View>
  )
}
export default Chart
const styles = StyleSheet.create({})