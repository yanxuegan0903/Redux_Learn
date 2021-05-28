import React,{Component} from "react";
import {createStackNavigator} from 'react-navigation-stack'
import {createAppContainer} from "react-navigation";
import { BottomTabBar, createBottomTabNavigator } from "react-navigation-tabs";
import PopularPage from "./PopularPage";
import TrendingPage from "./TrendingPage";
import MyPage from "./MyPage";
import FavoritePage from "./FavoritePage";


const BottomNavi = createAppContainer(createBottomTabNavigator({
  PopularPage:{
    screen:PopularPage,
    navigationOptions:{
      title:'最热'
    }
  },
  TrendingPage:{
    screen:TrendingPage,
    navigationOptions:{
      title:'趋势'
    }
  },
  FavoritePage:{
    screen:FavoritePage,
    navigationOptions:{
      title:'收藏'
    }
  },
  MyPage:{
    screen:MyPage,
    navigationOptions:{
      title:'我的'
    }
  }
},{
  tabBarOptions:{
    activeTintColor:'red'
  }
}))





export const AppNavi = createAppContainer(createStackNavigator({
  BottomNavi:{
    screen:BottomNavi,
    navigationOptions:{
      header:null
    }
  },
}))
