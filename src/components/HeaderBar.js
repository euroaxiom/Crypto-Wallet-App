import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS,SIZES,FONTS } from '../constants/Theme'
// this component is used to create Header Bar dynamically
const HeaderBar = ({title}) => {
  return (
    <View style={{height:100,paddingHorizontal:SIZES.radius,justifyContent:"flex-end"}}>
      <Text style={{color:COLORS.white,...FONTS.largeTitle}}>{title}</Text>
    </View>
  )
}
export default HeaderBar

