import React from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
  Dimensions, Keyboard, Alert, KeyboardAvoidingView,
} from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const { width, height } = Dimensions.get("window");

export default class RemoteDescryptModalView extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectIndex: -1,
      text: "",
    };
  }

  selectAction(index, text) {
    console.log(`index:${index},text:${text}`);
    this.setState({
      selectIndex: index,
      text: text,
    });
  }

  render() {
    const { clickConfirm, visiable, clickCancel } = this.props;
    return <Modal
      animationType={"fade"}
      onRequestClose={() => {
        console.log("关闭弹框");
      }}
      visible={visiable}
      transparent={true}
      style={styles.modalStyle}
    >
      <View style={styles.contentStyle}>
        {/*<KeyboardAvoidingView behavior={"padding"} enabled={true}>*/}

          <TouchableWithoutFeedback onPress={() => {
            clickCancel();
          }}>
            <View style={{ position: "absolute", width, height, top: 0, left: 0, backgroundColor: "rgba(0,0,0,.5)" }} />
          </TouchableWithoutFeedback>
          <View style={styles.hitViewStyle}>
            <View style={{ alignItems: "center" }}>
              <Text style={styles.headerTextStyle}>微信</Text>
            </View>
            <View style={{ padding: 10 }}>
              <Text>临时解密时间设置</Text>
              <Text style={{ marginTop: 10 }}>从现在起xx分钟之内可以自由使用该应用，最多120分钟</Text>
            </View>
            <View style={{
              flexWrap: "wrap",
              marginLeft: 10,
              marginRight: 10,
              flexDirection: "row",
              justifyContent: "space-between",
            }}>
              <MinutesCell index={0} textLabel={"30"} selectIndex={this.state.selectIndex}
                           selectAction={this.selectAction.bind(this)} />
              <MinutesCell index={1} textLabel={"60"} selectIndex={this.state.selectIndex}
                           selectAction={this.selectAction.bind(this)} />
              <MinutesCell index={2} textLabel={"90"} selectIndex={this.state.selectIndex}
                           selectAction={this.selectAction.bind(this)} />
              <MinutesCell index={3} textLabel={"120"} selectIndex={this.state.selectIndex}
                           selectAction={this.selectAction.bind(this)} />
              <MinutesInputCell index={4} textLabel={"120"} selectIndex={this.state.selectIndex}
                                selectAction={this.selectAction.bind(this)} />

            </View>
            <View style={{ flexDirection: "row", justifyContent: "space-around", marginBottom: 20, marginTop: 20 }}>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 30,
                  borderWidth: 1,
                  borderColor: "#333333",
                  borderRadius: 4,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {
                  clickCancel();
                }}>
                <Text>取消</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  width: 100,
                  height: 30,
                  borderWidth: 1,
                  borderColor: "#333333",
                  borderRadius: 4,
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onPress={() => {

                  if (parseInt(this.state.text, 10) > 120) {
                    Alert.alert("提示", "数值必须小于等于120");
                  } else {
                    clickConfirm(this.state.text);
                  }
                }}>
                <Text>确定</Text>
              </TouchableOpacity>
            </View>
          </View>
        {/*</KeyboardAvoidingView>*/}
      </View>
    </Modal>;
  }

}

const styles = StyleSheet.create({
  modalStyle: {
    flex: 1,
    alignItems: "center",
  },
  contentStyle: {
    borderRadius: 10,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: width,
    height: height,
    position: "absolute",
  },
  hitViewStyle: {
    backgroundColor: "white",
    marginLeft: 30,
    marginRight: 30,
    borderRadius: 5,
  },
  headerTextStyle: {
    fontSize: 26,
    paddingTop: 15,
    paddingBottom: 15,
  },


});


class MinutesCell extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { index, selectIndex, textLabel, selectAction } = this.props;
    return <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, marginRight: 10 }}>
      <TouchableOpacity
        onPress={() => {
          selectAction(index, textLabel);
        }}
      >
        <MaterialCommunityIcons
          name={index === selectIndex ? "check-circle-outline" : "checkbox-blank-circle-outline"}
          size={24}
        />
      </TouchableOpacity>
      <Text>{textLabel}分钟</Text>
    </View>;
  }

}

class MinutesInputCell extends React.Component {

  constructor(props) {
    super(props);
    this.text = null;
  }

  componentDidUpdate(prevProps: Readonly<P>, prevState: Readonly<S>, snapshot: SS) {
    const { index, selectIndex, selectAction } = this.props;
    if (index === selectIndex) {
    } else {
      Keyboard.dismiss();
    }
  }

  render() {

    const { index, selectIndex, selectAction } = this.props;
    return <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 10, marginRight: 10 }}>
      <TextInput
        onChangeText={(text) => {
          this.text = text;
          selectAction(selectIndex, text);
        }}
        onFocus={() => {
          selectAction(index, this.text);
        }}
        onEndEditing={() => {
        }}
        style={{
          borderWidth: 1,
          borderColor: "#333333",
          borderRadius: 4,
          width: 50,
          height: 30,
          paddingLeft: 5,
        }}
        keyboardType={"numeric"}
      />
      <Text style={{ marginLeft: 5 }}>分钟</Text>
    </View>;
  }

}
