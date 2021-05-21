import React ,{Component} from "react";
import { View, StyleSheet, Text, Button, TextInput } from "react-native";
import actions from '../action'
import { connect } from "react-redux";


class Page1 extends React.Component {


  render(){
    return (
      <View style={styles.containar}>
        <Text style={styles.text}>Page1</Text>
        <TextInput style={styles.TextInput} placeholder={'请输入'} onChangeText={(text)=>{
          console.log(this.props.text)
          console.log(this.props.text)
          this.props.change_page2_text(text);
        }}/>
        <Text style={styles.text}>{this.props.text || 'dddd'}</Text>
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
  },
  TextInput:{
    borderWidth:1,
    borderColor:'black',
    borderRadius:5,
    height:50,
    width:'80%',
    paddingLeft:5,
  }

})


const mapDispatchToProps = dispatch => ({
  change_page2_text:text => dispatch(actions.change_page2_text(text))
});

const mapStateToProps = state =>({
  text:state.changeText.text,
})

export default connect(mapStateToProps,mapDispatchToProps)(Page1)
