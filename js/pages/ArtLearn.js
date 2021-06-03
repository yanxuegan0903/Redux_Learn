import React from "react";
import {
  Dimensions, FlatList,
  Modal,
  PanResponder,
  SafeAreaView, Slider, Text,
  TouchableOpacity, TouchableWithoutFeedback,
  View,
} from "react-native";
import { Group, Path, Shape, Surface } from "@react-native-community/art";
import Feather from "react-native-vector-icons/Feather";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Ionicons from "react-native-vector-icons/Ionicons";
import Colors from "./Colors";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const { width, height } = Dimensions.get("window");

export default class ArtLearn extends React.Component {


  constructor(props) {
    super(props);

    this.state = {
      strokeColorsVisiable: false,
      strokeColor: "#000000",
      strokeWidthVisiable: false,
      strokeWidth: 3,
      surfaceColorsVisiable:false,
      surfaceColor:'white',
    };


    this.mousePosition = [];
    this.cancelPositions = [];


    this.panGesture = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onStartShouldSetPanResponderCapture: () => true,
      onMoveShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponderCapture: () => true,
      onPanResponderGrant: (event, gestureState) => {
        this.tempStartX = gestureState.x0;
        this.tempStartY = gestureState.y0;
      },
      onPanResponderMove: (event, gestureState) => {
        this.mousePosition = {
          tempStartX: this.tempStartX,
          tempStartY: this.tempStartY,
          x: this.tempStartX + gestureState.dx,
          y: this.tempStartY + gestureState.dy,
        };

        this.mousePositions.push(this.mousePosition);
        this.setState({ ...this.state });
      },
    });

  }

  clickBackStep() {

    if (this.mousePositions.length) {
      let tempStartX = this.mousePositions[this.mousePositions.length - 1].tempStartX;
      let tempStartY = this.mousePositions[this.mousePositions.length - 1].tempStartY;

      let tempDeleteArray = [];
      //  找出最后一个笔画 放到tempDeleteArray
      for (let i = this.mousePositions.length - 1; i >= 0; i--) {
        if (tempStartX === this.mousePositions[i].tempStartX && tempStartY === this.mousePositions[i].tempStartY) {
          tempDeleteArray.push(this.mousePositions[i]);
        } else {
          break;
        }
      }
      //  将撤销的最后一笔放到已撤销数组中
      this.cancelPositions = this.cancelPositions.concat(tempDeleteArray);
      //  现有笔画 删掉最后一笔
      for (let i = tempDeleteArray.length - 1; i >= 0; i--) {
        this.mousePositions.pop();
      }
      this.setState({ ...this.state });
    }

  }

  clickForwardStep() {
    if (this.cancelPositions.length) {
      let tempStartX = this.cancelPositions[this.cancelPositions.length - 1].tempStartX;
      let tempStartY = this.cancelPositions[this.cancelPositions.length - 1].tempStartY;

      let tempDeleteArray = [];
      //  找出最后一个笔画 放到tempDeleteArray
      for (let i = this.cancelPositions.length - 1; i >= 0; i--) {
        if (tempStartX === this.cancelPositions[i].tempStartX && tempStartY === this.cancelPositions[i].tempStartY) {
          tempDeleteArray.push(this.cancelPositions[i]);
        } else {
          break;
        }
      }
      //  拼接
      this.mousePositions = this.mousePositions.concat(tempDeleteArray);

      //  现有笔画 删掉最后一笔
      for (let i = tempDeleteArray.length - 1; i >= 0; i--) {
        this.cancelPositions.pop();
      }

      this.setState({ ...this.state });
    }
  }


  clickClear() {
    this.mousePositions = [];
    this.cancelPositions = [];
    this.setState({ ...this.state });

  }

  clickStrokeColors() {
    this.setState({
      ...this.state,
      strokeColorsVisiable: !this.state.strokeColorsVisiable,
    });
  }

  clickSurfaceColors() {
    this.setState({
      ...this.state,
      surfaceColorsVisiable: !this.state.surfaceColorsVisiable,
    });
  }

  clickStrokeWidth(){
    this.setState({
      ...this.state,
      strokeWidthVisiable: !this.state.strokeWidthVisiable,
    });
  }

  onSelectStrokeColor(color) {
    this.setState({
      ...this.state,
      strokeColorsVisiable: !this.state.strokeColorsVisiable,
      strokeColor: color,
    });
  }


  onSelectSurfaceColor(color) {
    this.setState({
      ...this.state,
      surfaceColorsVisiable: !this.state.surfaceColorsVisiable,
      surfaceColor: color,
    });
  }

  onSelectStrokeWidth(width) {
    this.setState({
      ...this.state,
      strokeWidth: width,
    });
  }

  onDismissStrokeWidth(){
    this.setState({
      ...this.state,
      strokeWidthVisiable: !this.state.strokeWidthVisiable,
    });
  }

  render() {

    const btncount = 5
    let path = Path();
    if (!this.mousePositions) this.mousePositions = [];

    this.mousePositions.forEach((item, index) => {
      if (index === 0) {
        path.moveTo(item.tempStartX, item.tempStartY);
        path.lineTo(item.x, item.y);
        path.close();
      } else {
        if (this.mousePositions[index - 1].tempStartX === item.tempStartX && this.mousePositions[index - 1].tempStartY === item.tempStartY) {
          path.moveTo(this.mousePositions[index - 1].x, this.mousePositions[index - 1].y);
        } else {
          path.moveTo(item.tempStartX, item.tempStartY);
        }
        path.lineTo(item.x, item.y);
        path.close();

      }
    });

    return <View style={{ flex: 1 }}>
      <View style={{
        flex: 1,
        backgroundColor: "grey",
        alignItems: "center",
        justifyContent: "center",
      }} {...this.panGesture.panHandlers}>
        <Surface style={{ backgroundColor: this.state.surfaceColor }} width={width} height={height}>
          <Group>
            <Shape d={path} stroke={this.state.strokeColor} strokeWidth={this.state.strokeWidth} />
          </Group>
        </Surface>
      </View>
      <View
        style={{ position: "absolute", bottom: 50, left: 20, flex: 1 }}>
        <TouchableOpacity onPress={() => {
          this.clickBackStep();
        }
        }>
          <Feather
            name={"corner-up-left"}
            size={30}
          />
        </TouchableOpacity>

      </View>
      <View
        style={{ position: "absolute", bottom: 50, right: 20, flex: 1 }}>
        <TouchableOpacity onPress={() => {
          this.clickForwardStep();
        }
        }>
          <Feather
            name={"corner-up-right"}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{ position: "absolute", top: 50, right: 20, flex: 1 }}>
        <TouchableOpacity onPress={() => {
          this.clickClear();
        }
        }>
          <MaterialIcons
            name={"cancel"}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{ position: "absolute", bottom: 50, left: (width - 40) / (btncount-1), flex: 1 }}>
        <TouchableOpacity onPress={() => {
          this.clickStrokeColors();
        }
        }>
          <Ionicons
            name={"color-palette-outline"}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{ position: "absolute", bottom: 50, left: (width - 40) / (btncount-1)*2, flex: 1 }}>
        <TouchableOpacity onPress={() => {
          this.clickSurfaceColors();
        }
        }>
          <Ionicons
            name={"color-palette-sharp"}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{ position: "absolute", bottom: 50, left: (width - 40) / (btncount-1)*3, flex: 1 }}>
        <TouchableOpacity onPress={() => {
          this.clickStrokeWidth()
        }
        }>
          <FontAwesome
            name={"paint-brush"}
            size={30}
          />
        </TouchableOpacity>
      </View>
      <ColorsView visiable={this.state.strokeColorsVisiable} onSelectColor={this.onSelectStrokeColor.bind(this)} />
      <ColorsView visiable={this.state.surfaceColorsVisiable} onSelectColor={this.onSelectSurfaceColor.bind(this)} />
      <WidthView visiable={this.state.strokeWidthVisiable} onSelectColor={this.onSelectStrokeWidth.bind(this)} currentWidth={this.state.strokeWidth} onDismissStrokeWidth={this.onDismissStrokeWidth.bind(this)}/>
    </View>;

  }


}


class ColorsView extends React.Component {

  constructor(props) {
    super(props);
    this.colors = Colors();
  }


  render() {
    const { visiable, onSelectColor } = this.props;
    const margin = 5
    const row = 3
    const cellWidth = Math.floor((width-(row+1)*margin) / row)
    return <Modal style={{ flex: 1 }}
                  transparent={true}
                  visible={visiable}
                  animated={true}
                  animationType={"fade"}
                  onRequestClose={() => {
                    console.log("关闭弹框");
                  }}
    >
      <SafeAreaView style={{ flex: 1 }}>
        <FlatList
          data={this.colors}
          renderItem={(data) => {
            return <View
              style={{ alignItems: "center", justifyContent: "center" }}>
              <Text style={{ width:cellWidth , height:cellWidth, backgroundColor: data.item ,marginRight:margin/2.0,marginLeft:margin/2.0}} onPress={() => {
                onSelectColor(data.item);
              }}> </Text>
            </View>;
          }}
          style={{ flexWrap: "wrap", backgroundColor: "#eeeeee" }}
          keyExtractor={(item,index) => {
            return "" + index;
          }}
          ItemSeparatorComponent={() => <View style={{ backgroundColor: "transparent", height: margin }}/>}
          contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center",justifyContent:"flex-start" }}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </SafeAreaView>
    </Modal>;
  }


}



class WidthView extends React.Component {

  constructor(props) {
    super(props);
    this.minWidth = 1
    this.maxWidth = 50

  }


  render() {
    const { visiable, onSelectColor ,currentWidth,onDismissStrokeWidth} = this.props;

    return <Modal style={{ flex: 1 }}
                  transparent={true}
                  visible={visiable}
                  animated={true}
                  animationType={"fade"}
                  onRequestClose={() => {
                    console.log("关闭弹框");
                  }}
    >
      <SafeAreaView style={{ flex: 1 ,flexDirection:"column-reverse",alignItems:"center"}}>
        <TouchableWithoutFeedback onPress={() => {
          onDismissStrokeWidth()
        }}>
          <View style={{ position: "absolute", width, height, top: 0, left: 0, backgroundColor: "transparent" }} />
        </TouchableWithoutFeedback>
        <Slider
          style={{width:width-50,marginBottom:100}}
          minimumValue={this.minWidth}
          maximumValue={this.maxWidth}
          step={1}
          value={currentWidth}
          onValueChange={(value)=>{
            console.log(value)
            onSelectColor(value)
          }}
        />
      </SafeAreaView>
    </Modal>;
  }


}
