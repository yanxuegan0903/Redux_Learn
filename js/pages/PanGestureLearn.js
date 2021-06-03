import React from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import { PanResponder } from "react-native";

//
// render() {
//   return <SafeAreaView style={{flex:1}}>
//     <View
//       style={{flex:1,backgroundColor:'#f5f5f5'}}
//     >
//
//       <View style={{flexDirection:"row-reverse",justifyContent:'space-between'}}>
//         <AntDesign
//           name={'rightcircle'}
//           size={30}
//         />
//         <AntDesign
//           name={'minuscircle'}
//           size={30}
//         />
//         <AntDesign
//           name={'leftcircle'}
//           size={30}
//         />
//       </View>
//     </View>
//   </SafeAreaView>
// }

export default class PanGestureLearn extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      bg: 'blue',
      top: 0,
      left: 0
    }
  }

  componentWillMount(){

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: ()=> true,
      onPanResponderGrant: ()=>{
        this._top = this.state.top
        this._left = this.state.left
        this.setState({bg: 'red'})
      },
      onPanResponderMove: (evt,gs)=>{
        console.log(gs.dx+' <<<<<>>>>> '+gs.dy)
        this.setState({
          top: this._top+gs.dy,
          left: this._left+gs.dx
        })
      },
      onPanResponderRelease: (evt,gs)=>{
        this.setState({
          bg: 'blue',
          top: this._top+gs.dy,
          left: this._left+gs.dx
        })}
    })
  }

  render() {
    return <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: "white", justifyContent: "center", alignItems: "center" }}>

        <View
          {...this._panResponder.panHandlers}
          style={[styles.item,{
            "backgroundColor": this.state.bg,
            "top": this.state.top,
            "left": this.state.left
          }]}
        >

        </View>


      </View>
    </SafeAreaView>;


  }


}

const styles = StyleSheet.create({
  item: {
    position: "absolute",
    width: 100,
    height: 100,
    backgroundColor: "blue",
  },
});
