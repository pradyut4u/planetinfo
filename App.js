import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Home from './screen/home'
import Detail from './screen/detail'
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';

export default function App() {
  return (
   <Contain/>
  );
}

const navigator = createStackNavigator({
  Home:{
    screen:Home,
    navigationOptions:{headerShown:false}
  },
  Detail:{
    screen:Detail
  }
},
{initialRouteName:"Home"})

const Contain = createAppContainer(navigator)