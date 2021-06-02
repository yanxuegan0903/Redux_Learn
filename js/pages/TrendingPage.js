import React  from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { connect } from "react-redux";

class TrendingPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render(){
    const{navigation} = this.props
    return (
      <View style={styles.containar}>
        <Text style={styles.text}>Page2</Text>
        <Text style={styles.text}>{this.props.text || 'ddd'}</Text>
        <Button title={'go RemoteDecryptPage'} onPress={()=>{
          navigation.navigate('RemoteDecryptPage')
        }}/>
        <Button title={'go NotiMessageCenterPage'} onPress={()=>{
          navigation.navigate('NotiMessageCenterPage')
        }}/>
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

export default connect(mapStateToProps)(TrendingPage)
