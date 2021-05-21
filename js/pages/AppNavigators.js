import React,{Component} from "react";
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from "react-navigation";
import { BottomTabBar, createBottomTabNavigator } from "react-navigation-tabs";
import Page1 from "./Page1";
import Page2 from "./Page2";


const BottomNavi = createAppContainer(createBottomTabNavigator({
  page1:Page1,
  page2:Page2
},{
  tabBarOptions:{
    activeTintColor:'red'
  }
}))





export const AppNavi = createAppContainer(createStackNavigator({
  BottomNavi:BottomNavi
}))
