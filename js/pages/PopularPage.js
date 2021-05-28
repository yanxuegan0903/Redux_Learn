import React from "react";
import { View } from "react-native";
import PopularTabPage from "./PopularTabPage";
import { createAppContainer } from "react-navigation";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

export default class PopularPage extends React.Component {

  constructor() {
    super();
    this.tabNames = ["java", "ios", "android", "php", "react-native", "flutter", "H5", "vue"];
  }

  createTabPage() {
    const tabPages = {};
    this.tabNames.forEach(
      (item, index) => {
        tabPages[`${item}+${index}`] = {
          screen: (props) => {
            return <PopularTabPage {...props} tabLabel={item} />;
          },
          navigationOptions: {
            title: item,
          },
        };
      });
    return tabPages;
  }

  createTopBarPages() {
    return createAppContainer(
      createMaterialTopTabNavigator(
        this.createTabPage(),
        {
          tabBarOptions: {
            scrollEnabled: true,
            upperCaseLabel: false,
          },
        },
      ),
    );
  }


  render() {
    const TopPages = this.createTopBarPages();
    return (
      <View style={{flex:1,marginTop:44}}>
        <TopPages />
      </View>
    );
  }
}



