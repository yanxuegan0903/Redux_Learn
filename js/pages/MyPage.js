import React  from "react";
import { View, StyleSheet, Text } from "react-native";
import { connect } from "react-redux";

class MyPage extends React.Component {

  render(){
    return (
      <View style={styles.containar}>
        <Text style={styles.text}>MyPage</Text>
        <Text style={styles.text}>{this.props.text || 'ddd'}</Text>
      </View>
    )
  }

}
const styles = StyleSheet.create({
  containar:{
    flex:1,
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    fontSize:30
  }

})


const mapStateToProps = state=>({
  text:state.changeText.text
})

export default connect(mapStateToProps)(MyPage)
