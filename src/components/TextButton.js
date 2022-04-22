import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS,FONTS,SIZES } from '../constants/Theme'
// this component is used to design Market Button dynamically
const TextButton = ({label,containerStyle,onPress}) => {
  return (
   <TouchableOpacity style={{alignItems:"center",justifyContent:"center",
   paddingVertical:3,paddingHorizontal:15,backgroundColor:COLORS.gray1,...containerStyle}}
   onPress={onPress}
   >
     <Text style={{color:COLORS.white,...FONTS.h3}}>
         {label}
     </Text>
   </TouchableOpacity>
  )
}
export default TextButton
const styles = StyleSheet.create({})