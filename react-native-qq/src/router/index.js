/**
 * Created by caoLiXin on 2017/9/29.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  DrawerLayoutAndroid
} from 'react-native';

import AppNavigator from './main'
import MyCenter  from '../page/my'

export default class MyCenterDrawer extends Component {
  _topCallbackOpenDrawer() {
    this.refs.myCenterDrawer.openDrawer()
  }
  render() {
    return (
      <DrawerLayoutAndroid
        ref={'myCenterDrawer'}
        drawerWidth={350}
        drawerPosition={DrawerLayoutAndroid.positions.Left}
        renderNavigationView={() => <MyCenter/>}
        keyboardDismissMode="on-drag">
        <AppNavigator topCallbackOpenDrawer={this._topCallbackOpenDrawer.bind(this)}/>
      </DrawerLayoutAndroid>
    )
  }
}

const styles = StyleSheet.create({});