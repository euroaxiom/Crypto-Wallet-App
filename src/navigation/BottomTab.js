import React, { Children } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Icon } from 'react-native-elements'
import Home from '../screens/Home'
import Portfolio from '../screens/Portfolio'
import Market from '../screens/Market'
import Profile from '../screens/Profile'
import {connect} from 'react-redux'
import { setTradeModalVisibility } from '../stores/tab/tabActions'
import { TabIcon } from '../components'
const Tabs = createBottomTabNavigator()
import { COLORS } from '../constants/Theme'
import icons from '../constants/icons'
const TabBarCustomButton = ({ children, onPress }) => {
    return (
        <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={onPress}>
            {children}
        </TouchableOpacity>
    )
}
// this function is used to show all custome Bottom Tabs 
function BottomTab({setTradeModalVisibility,isTradeModalVisible}) {
  function tradeTabButtonOnClickHandler(){
      setTradeModalVisibility(!isTradeModalVisible)
  }
    return (
        <Tabs.Navigator
            screenOptions={{
                tabBarActiveTintColor: "red",
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: 100,
                    backgroundColor: COLORS.primary,
                    borderTopColor: "transparent"
                },
            }}
        >
            <Tabs.Screen name="Home" component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        if(!isTradeModalVisible){
                            return (
                                <TabIcon
                                    focused={focused}
                                    icon={icons.home}
                                    label="Home"
                                />
                            )
                        }  
                    }
                }}
                listeners ={{
                    tabPress: e =>{
                        if(isTradeModalVisible){
                            e.preventDefault()
                        }
                    }   
                }}
            />
            <Tabs.Screen name="Portfolio" component={Portfolio} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    if(!isTradeModalVisible){
                    return (
                        <TabIcon
                            focused={focused}
                            icon={icons.briefcase}
                            label="Portfolio"
                        />
                    )
                    }
                }
            }} 
            listeners ={{
                tabPress: e =>{
                    if(isTradeModalVisible){
                        e.preventDefault()
                    }
                }  
            }}
            />
            <Tabs.Screen name="Trade" component={Home}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused }) => {
                        return (
                            <TabIcon
                                focused={focused}
                                icon={isTradeModalVisible ? icons.close:icons.trade}
                                iconStyle={isTradeModalVisible ? {
                                    width:15,
                                    height:15,
                                }:null}
                                label="Trade"
                                isTrade={true}
                            />
                        )
                    },
                    tabBarButton: (props) => (
                        <TabBarCustomButton
                         {...props}
                         onPress={()=> tradeTabButtonOnClickHandler()}
                        />
                    )
                }}
            />
            <Tabs.Screen name="Market" component={Market} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    if(!isTradeModalVisible){
                    return (
                        <TabIcon
                            focused={focused}
                            icon={icons.market}
                            label="Market"
                        />
                    )
                    }
                }
            }} 
            listeners ={{
                tabPress: e =>{
                    if(isTradeModalVisible){
                        e.preventDefault()
                    }
                }  
            }}
            />
            <Tabs.Screen name="Profile" component={Profile} options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => {
                    if(!isTradeModalVisible){
                    return (
                        <TabIcon
                            focused={focused}
                            icon={icons.profile}
                            label="Profile"
                        />
                    )
                }
                }
            }} 
            listeners ={{
                tabPress: e =>{
                    if(isTradeModalVisible){
                        e.preventDefault()
                    }
                }  
            }}
            />
        </Tabs.Navigator>
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
        setTradeModalVisibility:(isVisible) => {return dispatch(setTradeModalVisibility(isVisible))}
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(BottomTab);



