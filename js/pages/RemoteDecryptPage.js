import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  SectionList,
  TouchableOpacity,
  Modal,
  TextInput,
  Keyboard, ScrollView,
} from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import RemoteDescryptModalView from "./RemoteDescryptModalView";

const DataSource = [
  {
    title: "今天",
    data: [
      { time: "18:20", desc: "申请使用【微信】应用", id: 0 },
      { time: "18:20", desc: "申请使用【安卓平台】", id: 1 },
      { time: "18:20", desc: "申请查看作业答案", id: 2 },
      { time: "18:20", desc: "申请使用【微信】应用", id: 0 },
      { time: "18:20", desc: "申请使用【安卓平台】", id: 1 },
      { time: "18:20", desc: "申请查看作业答案", id: 2 },
      { time: "18:20", desc: "申请使用【微信】应用", id: 0 },
      { time: "18:20", desc: "申请使用【安卓平台】", id: 1 },
      { time: "18:20", desc: "申请查看作业答案", id: 2 },
    ],
  },
  {
    title: "昨天",
    data: [
      { time: "18:20", desc: "申请使用【QQ】应用", id: 3 },
      { time: "18:20", desc: "申请使用【钉钉】应用", id: 4 },
      { time: "18:20", desc: "申请使用【和平精英】应用", id: 5 },
      { time: "18:20", desc: "申请使用【微信】应用", id: 0 },
      { time: "18:20", desc: "申请使用【安卓平台】", id: 1 },
      { time: "18:20", desc: "申请查看作业答案", id: 2 },
      { time: "18:20", desc: "申请使用【微信】应用", id: 0 },
      { time: "18:20", desc: "申请使用【安卓平台】", id: 1 },
      { time: "18:20", desc: "申请查看作业答案", id: 2 },
      { time: "18:20", desc: "申请使用【微信】应用", id: 0 },
      { time: "18:20", desc: "申请使用【安卓平台】", id: 1 },
      { time: "18:20", desc: "申请查看作业答案", id: 2 },
    ],
  },
];


export default class RemoteDecryptPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visiable: false,
    };
  }

  renderSectionHeaderItem(data) {
    return <View>
      <Text style={styles.sectionHeader}>{data.section.title}</Text>
    </View>;
  }

  renderListItem(data) {
    return <TouchableOpacity onPress={() => {
      this.setState(
        {
          visiable: true,
        },
      );
    }}>
      <View style={styles.itemStyle}>
        <Text style={styles.timeStyle}>{data.item.time}</Text>
        <View style={styles.descViewStyle}>
          <Text style={styles.descStyle}>{data.item.desc}</Text>
          <SimpleLineIcons
            name={"arrow-right"}
            size={22}
            color={"#333333"}
          />
        </View>
      </View>
    </TouchableOpacity>;
  }

  componentDidMount() {
    const _this = this
  }

  clickConfirm(timeStr){
    console.log(`timeStr:${timeStr}`)
    this.setState({
      visiable:false
    })
  }

  clickCancle(){
    this.setState({
      visiable:false
    })
  }
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <RemoteDescryptModalView visiable={this.state.visiable} clickConfirm = {this.clickConfirm.bind(this)} clickCancel = {this.clickCancle.bind(this)}/>
        <View style={styles.containar}>
          <Text style={styles.header}>解密申请</Text>
          <SectionList
            sections={DataSource}
            renderSectionHeader={(data) => this.renderSectionHeaderItem(data)}
            renderItem={(data) => this.renderListItem(data)}
            // ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </SafeAreaView>
    );
  }
}


const styles = StyleSheet.create({
  containar: {
    flex: 1,
  },
  header: {
    fontSize: 26,
    color: "#333",
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 10,
  },
  sectionHeader: {
    fontSize: 22,
    color: "#333",
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 25,
    backgroundColor: "#f5f5f5",
  },
  itemStyle: {
    marginLeft: 10,
    marginBottom: 10,
    marginRight: 10,
    flexDirection: "row",
  },
  timeStyle: {
    fontSize: 18,
    alignSelf: "center",
  },
  descViewStyle: {
    fontSize: 18,
    alignSelf: "center",
    marginLeft: 10,
    paddingLeft: 10,
    paddingTop: 15,
    paddingBottom: 15,
    paddingRight: 10,
    backgroundColor: "#cccccc",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    borderRadius: 5,
  },
  descStyle: {
    fontSize: 18,
    alignSelf: "center",
  },
  separator: {
    height: 1,
    backgroundColor: "grey",
    flex: 1,
  },


});
