import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from "@react-navigation/stack"
import BottomTab from './src/navigation/BottomTab'

import { createStore,applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import rootReducer from './src/stores/rootReducer';



const Stack =createStackNavigator()

const store =createStore(
  rootReducer,
  applyMiddleware(thunk)
)
  
const App = () => {

  return (
    <Provider store={store}>

   
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown :false
        }}

        initialRouteName ={"MainLayout"}
      
      >
        <Stack.Screen
             name='MainLayout'
             component={BottomTab}        
        />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  )
}

export default App

