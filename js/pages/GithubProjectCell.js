import React, { Component } from "react";
import { View, StyleSheet, Text, Button, TextInput, FlatList, Image, TouchableOpacity } from "react-native";
import actions from "../action";
import { connect } from "react-redux";
import AntDesign from "react-native-vector-icons/AntDesign";
import Icon from "react-native-vector-icons/AntDesign";


export default class GithubProjectCell extends React.Component {

  constructor(props) {
    super(props);
    const { item } = this.props.item;
    this.dataItem = item;
  }


  render() {
    if (!this.dataItem) {
      return null;
    }
    const { owner, full_name, description, forks_count, fork, name } = this.dataItem;
    const { avatar_url } = owner;
    let favoriteButton = <TouchableOpacity
      onPress={() => {
        console.log("点击收藏" + name);
      }}
      underlayColor={"transparent"}
    >
      <AntDesign
        name={fork ? "star" : "staro"}
        size={24}
      />
    </TouchableOpacity>;


    return (
      <TouchableOpacity onPress={this.props.onSelect}>
        <View style={{
          marginBottom: 20,
          marginRight: 10,
          marginLeft: 10,
          backgroundColor: "white",
          justifyContent: "flex-start",
        }}>
          <Text style={{ marginTop: 10, marginLeft: 10, fontSize: 20, fontWeight: "bold" }}>{full_name}</Text>
          <Text style={{ marginTop: 5, marginLeft: 10, marginRight: 10, fontSize: 15 }} ellipsizeMode={"tail"}
                numberOfLines={3}>{description}</Text>
          <View style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems:'center',
            marginTop: 5,
            marginBottom: 10,
            marginLeft: 10,
            marginRight: 10,
          }}>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ fontSize: 15 }}>Author:</Text>
              <Image style={{ width: 20, height: 20 }} source={{ url: avatar_url }} />
            </View>
            <View>
              <Text style={{ fontSize: 15 }}>Star:{forks_count}</Text>
            </View>
            <View>
              {favoriteButton}
            </View>
          </View>
        </View>
      </TouchableOpacity>

    );
  }
};
