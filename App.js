import { AppNavi } from "./js/pages/AppNavigators";
import store from './js/store'
import { Provider } from "react-redux";
import React,{Component} from "react";

export default class APP extends React.Component{
  render() {
    return <Provider store={store}>
      <AppNavi/>
    </Provider>;
  }
}
