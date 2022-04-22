import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES, } from '../constants/Theme'
import { allIcon } from "../constants"
// this component is used to create BalanceInfo and protfolio section Denamically
const BalanceInfo = ({ tittle, displayAmount, changePct, containerStyle }) => {
  return (
    <View style={{ ...containerStyle }}>
      {/* title */}
      <Text style={{ ...FONTS.h3, color: COLORS.lightGray3 }}>{tittle}</Text>
      {/* Figures */}
      <View style={{ flexDirection: "row", alignItems: 'flex-end' }}>
        <Text style={{ ...FONTS.h3, color: COLORS.lightGray3 }}>$</Text>
        <Text style={{ ...FONTS.h2, marginLeft: SIZES.base, color: COLORS.white }}>{displayAmount.toLocaleString()}</Text>
        <Text style={{ color: COLORS.lightGray3, ...FONTS.h3 }}>USD</Text>
      </View>
      {/* Change Percentage */}
      <View style={{ flexDirection: "row", alignItems: 'flex-end' }}>
        {
          changePct != 0 &&
          <Image
            source={allIcon.upArrow}
            style={{
              width: 10,
              height: 10,
              alignSelf: "center",
              tintColor: changePct > 0 ? COLORS.lightGreen : COLORS.red,
              transform: changePct > 0 ? [{ rotate: '45deg' }] : [{ rotate: '125deg' }]
            }}
          />
        }
        <Text style={{
          marginLeft: SIZES.base,
          alignSelf: "flex-end",
          color: changePct == 0 ? COLORS.lightGray3
            : changePct > 0 ? COLORS.lightGreen : COLORS.red,
          ...FONTS.h4
        }}>
          {changePct.toFixed(2)}%
        </Text>
        <Text style={{ marginLeft: SIZES.radius, alignSelf: "flex-end", color: COLORS.lightGray3, ...FONTS.h5 }}>
          7d change
        </Text>
      </View>
    </View>
  )
}
export default BalanceInfo
const styles = StyleSheet.create({})