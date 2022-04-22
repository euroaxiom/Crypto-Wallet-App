import { StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import {COLORS,SIZES,FONTS} from "../constants/Theme"
// this is used to create dynamically Icon Button 
const IconTextButton = ({label,icon,containerStyle,onPress}) => {
  return (
    <TouchableOpacity style={{
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",
        height:50,
        borderRadius:SIZES.radius,
        backgroundColor:COLORS.white,
        ...containerStyle
        }}
        onPress={onPress}
        >
       <Image
        source={icon}
        resizeMode="contain"
        style={{
            width:20,
            height:20
        }}
       />
       <Text style={{marginLeft:SIZES.base,...FONTS.h3}}> 
         {label}
       </Text>
    </TouchableOpacity>
  )
}
export default IconTextButton
const styles = StyleSheet.create({})