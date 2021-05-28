import React, { Component } from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
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


// class PopularPage extends React.Component {
//
//
//   render(){
//     return (
//       <View style={styles.containar}>
//         <Text style={styles.text}>Page1</Text>
//         <TextInput style={styles.TextInput} placeholder={'请输入'} onChangeText={(text)=>{
//           console.log(this.props.text)
//           console.log(this.props.text)
//           this.props.change_page2_text(text);
//         }}/>
//         <Text style={styles.text}>{this.props.text || 'dddd'}</Text>
//       </View>
//     )
//   }
// }

const styles = StyleSheet.create({
  containar: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 30,
  },
  TextInput: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    height: 50,
    width: "80%",
    paddingLeft: 5,
  },

});


// const mapDispatchToProps = dispatch => ({
//   change_page2_text:text => dispatch(actions.change_page2_text(text))
// });
//
// const mapStateToProps = state =>({
//   text:state.changeText.text,
// })
//
// export default connect(mapStateToProps,mapDispatchToProps)(PopularPage)