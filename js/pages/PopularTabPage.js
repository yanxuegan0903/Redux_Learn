import React, { Component } from "react";
import { View, StyleSheet, Text, Button, TextInput, FlatList } from "react-native";
import actions from "../action";
import { connect } from "react-redux";
import GithubProjectCell from "./GithubProjectCell";

const QUER_KEY = '&sort=stars'

class PopularTabPage extends React.Component {

  constructor(props) {
    super(props);
    const { tabLabel } = this.props;
    this.tabLabelName = tabLabel;
    this.loadData();
  }

  loadData() {
    let url = "https://api.github.com/search/repositories?q=" + this.tabLabelName + QUER_KEY;
    this.props.onPopularPageRefresh(this.tabLabelName, url);
  }

  renderListItem(item) { //  其实在这里的时候  系统就自动的把FlatList 的数组data 的单个项给取出来了，在这里了也可以根据 item 的类型 来返回不通的cell
    console.log(item)
    return <GithubProjectCell item = {item} onSelect={()=>{
      console.log(`点击 ${item.item.full_name}`)
    }
    }/>;
  }


  render() {
    let datas = this.props.popular[this.tabLabelName];
    //  一定要判断没有值得情况 不然会报错  找不到 items 或者 isLoading
    if (!datas){
      datas = {
        items:[],
        isLoading:false
      }
    }
    const items = datas['items']

    return (
      <View style={styles.containar}>
        <FlatList
          data={items}
          renderItem={(items) => this.renderListItem(items)}
          refreshing={datas.isLoading}
          onRefresh={() => this.loadData()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containar: {
    flex: 1,
    backgroundColor:'#f5f5f5'
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


const mapStateToProps = state => ({
  popular: state.onPopularRefreshStateChange,
});

const mapDispatchToProps = dispatch => ({
  onPopularPageRefresh: (tabLabelName, url) => dispatch(actions.onPopularPageRefresh(tabLabelName, url)),
});

const PopularTabPageConnect = connect(mapStateToProps, mapDispatchToProps)(PopularTabPage);

export default PopularTabPageConnect;
