/**
 * Created by caoLiXin on 2017/9/26.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  BackHandler,
  Platform
} from 'react-native';

import { Navigator } from 'react-native-deprecated-custom-components';

import Qzone from '../page/qZone'
import QzoneIndex from '../containers/Third'

class QZoneNavigator extends Component {
  componentDidMount() {
    //如果当前是Android系统，则添加back键按下事件监听
    if (Platform.OS === 'android') {
      BackHandler.addEventListener('hardwareBackPress', () => {
        return this.handleBackHandler(this.navigator)
      })
    }
  }

  componentWillUnmount() {
    //如果当前是Android系统，则移除back键按下事件监听
    if (Platform.OS === 'android') {
      BackHandler.removeEventListener('hardwareBackPress', () => {})
    }
  }

  //back键按下事件响应函数
  handleBackHandler(navigator) {
    //如果存在上一页则后退
    if (navigator.getCurrentRoutes().length > 1) {
      navigator.pop();
      return true; //接管默认行为
    }
    return false;  //使用默认行为（直接退出应用）
  }

  render() {
    return (
      <Navigator
        style = {{flex:1}}
        initialRoute={{name: 'qZoneIndex'}}
        configureScene={this.configureScene.bind(this)}
        renderScene={this.renderScene.bind(this)}
      />
    );
  }

  //返回视图转换时使用的效果
  configureScene(route) {
    return Navigator.SceneConfigs.FadeAndroid;
  }

  //该函数用来告知Navigator模块我们希望如何挂接当前的视图
  renderScene(route, navigator) {
    this.navigator = navigator; //qZoneNavigator组件的navigator变量赋值
    switch(route.name) {
      /** Third **/
      case "qZoneIndex":
        return <QzoneIndex navigator={navigator}/>;
      case "qZone":
        return <Qzone navigator={navigator}/>;
    }
  }
}

export default QZoneNavigator

const styles = StyleSheet.create({});