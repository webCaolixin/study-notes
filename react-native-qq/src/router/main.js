/**
 * Created by caoLiXin on 2017/9/25.
 */
import React, {Component} from 'react';
import {Dimensions, Platform} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';
import Icon from 'react-native-vector-icons/FontAwesome';

// 引入页面容器
import {Home, Second, Third} from '../containers';

// 设置常量
const {height, width} = Dimensions.get('window');

const tabBar = TabNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      tabBarLabel: '消息',
      tabBarIcon: ({tintColor}) => (<Icon name="commenting-o" size={20} color={tintColor}/>)
    }
  },
  Second: {
    screen: Second,
    navigationOptions: {
      tabBarLabel: '联系人',
      tabBarIcon: ({tintColor}) => (<Icon name="user-o" size={20} color={tintColor}/>)
    }
  },
  Third: {
    screen: Third,
    navigationOptions: {
      tabBarLabel: '动态',
      tabBarIcon: ({tintColor}) => (<Icon name="star-o" size={20} color={tintColor}/>)
    }
  }
}, {
  tabBarPosition: 'bottom',
  swipeEnabled: false,
  animationEnabled: false,
  lazy: true,
  backBehavior: 'initialRoute',
  tabBarOptions: {
    style: {
      height: (Platform.OS === 'ios')
        ? width / 8
        : width / 7 - 5,
      backgroundColor: '#fff',
      borderTopWidth: 0.5,
      borderColor: '#e4e4e4'
    },
    labelStyle: {
      fontSize: width / 35
    },
    iconStyle: {
      height: width / 20
    },
    indicatorStyle: {
      height: 0
    },
    scrollEnabled: false,
    activeBackgroundColor: '#fff',
    activeTintColor: '#4F8EF7',
    inactiveBackgroundColor: '#fff',
    inactiveTintColor: '#444444',
    showLabel: true,
    showIcon: true
  }
});
const AppNavigator = StackNavigator({
  Main: {
    screen: tabBar,
    navigationOptions: {
      header: null
    }
  }
});

console.log(this)

export default AppNavigator;