import React from "react";
import { View, Text, SafeAreaView, FlatList, TouchableOpacity, ActivityIndicator } from "react-native";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { connect } from "react-redux";
import actions from '../action/index'

const PageSize = 10

class NotiMessageCenterPage extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadData(true)
  }

  loadData(isRefreshing){
    let store = this.store()
    const {onLoadData} = this.props
    if (isRefreshing){
      this.currentPage = 1
      //  是在下拉刷新
      onLoadData(1,PageSize,store.items)
    }else {
      //  是在加载更多
      onLoadData(++store.currentIndex,PageSize,store.items)
    }
  }

  store(){
    const {notiMessage} = this.props
    let store = notiMessage['response']
    if (!store){
      store = {
        items:[],
        isLoading:false,
        hideLoadingMore:true,

      }
    }
    return store
  }

  render() {
    let store = this.store()
    console.log(`length:${store.items.length}`)
    return <SafeAreaView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "#f5f5f5", flex: 1 }}>
        <FlatList
          style={{ marginTop: 10 }}
          data={store.items}
          renderItem={(data) => <NotiMessageCell {...data.item}/>}
          keyExtractor={item => {
            return ' '+item.id
          }}
          refreshing={store.isLoading}
          onRefresh={()=>{
            console.log('onRefresh---loadMore refreshing')

            this.loadData(true)
          }}
          ListFooterComponent={()=>{
            return store.hideLoadingMore ? null :
            <View style={{alignItems: "center"}}>
              <ActivityIndicator
                style={{color: 'red', margin: 10}}
              />
              <Text>正在加载更多</Text>
            </View>
          }}
          onEndReached={()=>{
            setTimeout(()=>{
              if (this.canLoadMore){
            console.log('onEndReached---loadMore refreshing')
                this.loadData(false)
                this.canLoadMore = false;
              }
            },200)

          }}
          onEndReachedThreshold={0.2}
          onMomentumScrollBegin={()=>{
            this.canLoadMore = true
          }}
        />
      </View>
    </SafeAreaView>;
  }


}


const mapStateToProps = state =>({
  notiMessage:state.onNotiMessageLoad
})

const mapDispatchToProps = dispatch =>({
  onLoadData:(page,pageSize,dataArray)=>dispatch(actions.onNotiMessageLoad(page,pageSize,dataArray))
})

const NotiMessagePage = connect(mapStateToProps,mapDispatchToProps)(NotiMessageCenterPage)

export default NotiMessagePage



class NotiMessageCell extends React.Component{

  constructor(props) {
    super(props);
  }

  render() {

    const { id, type, name, desc } = this.props;
    const textStr = type === 0 ? "远程解密" : type === 1 ? "系统通知" : type === 2 ? "安全通知" : "管理功能";

    return <TouchableOpacity
      onPress={() => {
        console.log(`click ${id}`);
      }}>
      <View style={{ marginLeft: 10, marginBottom: 10, marginRight: 10, backgroundColor: "white", borderRadius: 8 }}>
        <View style={{ margin: 10 }}>
          <Text style={{ fontWeight: "bold", fontSize: 22 }}>{textStr}：{name}</Text>
          <Text style={{ marginTop: 10, marginBottom: 10, fontSize: 18 }}>{desc}</Text>
          <View style={{ justifyContent: "flex-end", alignItems: "center", flexDirection: "row" }}>
            <Text style={{ marginRight: 2 }}>查看更多</Text>
            <SimpleLineIcons
              name={"arrow-right"}
              size={10}
              color={"#333333"}
            />
          </View>
        </View>
      </View>
    </TouchableOpacity>;
  }
}
