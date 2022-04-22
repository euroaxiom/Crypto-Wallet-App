import React,{useEffect,useRef} from 'react'
import { Animated, StyleSheet, Text, View } from 'react-native'
import {COLORS,SIZES} from '../constants/Theme'
import {connect} from 'react-redux'
import { allIcon } from '../constants'
import { IconTextButton } from '../components'
// this screen is used to show this view in every screen 
const MainLayout = ({children,isTradeModalVisible}) => {
    // this is used to some animation when open or close is view
    const modalAnimatedValue =useRef(new Animated.Value(0)).
    current;
    useEffect(()=>{
        if(isTradeModalVisible){
           Animated.timing(modalAnimatedValue,{
               toValue:1,
               duration:500,
               useNativeDriver:false
           }).start();
        }
        else{
            Animated.timing(modalAnimatedValue,{
                toValue:0,
                duration:700,
                useNativeDriver:false
            }).start();
        }
    },[isTradeModalVisible])
    const modalY= modalAnimatedValue.interpolate({
        inputRange:[0,1],
        outputRange:[SIZES.height,SIZES.height - 255]
    })
    return (
    <View style={{flex:1}}>
      {children}
       {/* Modal */}
       {
           isTradeModalVisible && 
           <Animated.View
            style={{
                position:"absolute",
                top:0,
                bottom:0,
                left:0,
                right:0,
                backgroundColor:COLORS.transparentBlack
            }}
            opacity={modalAnimatedValue}
            />
       }
       <Animated.View style={{position:"absolute",left:0,top:modalY,
       width:"100%",padding:SIZES.padding,backgroundColor:COLORS.primary}}>
       <IconTextButton
         label={"Transfer"}
         icon={allIcon.send}
         onPress={()=> console.log("Transfer")}
       />      
       <IconTextButton
         label={"Withdraw"}
         icon={allIcon.Withdraw}
         containerStyle={{
             marginTop:SIZES.base
         }}
         onPress={()=> console.log("Withdraw")}
       />         
     </Animated.View>
    </View>
  )
}
// this function is used to get state in redux Store
function mapStateToProps(state){
    return{
        isTradeModalVisible:state.tabReducer.isTradeModalVisible
    }
}
// this fucntion is used to dispatch the state in redux Store 
function mapDispatchToProps(dispatch){
    return{
        // setTradeModalVisibility:(isVisible) => {return dispatch(setTradeModalVisibility(isVisible))}
    }
}
export default connect(mapStateToProps)(MainLayout);