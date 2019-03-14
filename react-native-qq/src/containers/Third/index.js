/**
 * Created by caoLiXin on 2017/9/25.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableNativeFeedback
} from 'react-native';

import Header from '../../components/header'
import Icon from 'react-native-vector-icons/FontAwesome';
import MenuList from '../../data/dynamicsIndexList';

class DynamicsIndex extends Component {
  _onPressList() {
    // alert('Press')
  }
  _renderItem = (item) => {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.menuList}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon name={item.item.icon} style={{fontSize: 20, color: item.item.color}}/>
            <Text style={{color: '#000', marginLeft: 15}}>{item.item.name}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Icon name="angle-right" style={{flex: 1, fontSize: 20}}/>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  };
  _keyExtractor = (item, index) => index;

  render() {
    return (
      <View style={styles.dynamicsIndexCtn}>
        <View style={styles.dynamicsIndexBar}>
          <TouchableNativeFeedback
            onPress={this.goTo.bind(this)}
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.dynamicsIndexBarList}>
              <Icon name="star" style={[styles.icon, {color: '#ffd051'}]}/>
              <Text style={styles.blackFont}>好友动态</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.dynamicsIndexBarList}>
              <Icon name="map-marker" style={[styles.icon, {color: '#f25d5d'}]}/>
              <Text style={styles.blackFont}>附近</Text>
            </View>
          </TouchableNativeFeedback>
          <TouchableNativeFeedback
            background={TouchableNativeFeedback.SelectableBackground()}>
            <View style={styles.dynamicsIndexBarList}>
              <Icon name="connectdevelop" style={[styles.icon, {color: '#ffd053'}]}/>
              <Text style={styles.blackFont}>兴趣部落</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
        <View>
          <FlatList
          data={MenuList}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={{marginTop: 15}}/>
        </View>
      </View>
    )
  }

  goTo = () => {
    console.log(this.props)
    //push函数调用后，Navigator组件的renderScene函数将被调用，
    //并且push函数传入的变量成为renderScene函数的第一个参数。
    this.props.navigator.push({name: 'qZone'});
  }
}

export default class QzoneIndex extends Component {
  render() {
    return (
      <View>
        <Header title="动 态" targetCallOpenDrawer/>
        <DynamicsIndex navigator={this.props.navigator}/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dynamicsIndexCtn: {
    display: 'flex',
  },
  dynamicsIndexBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
    backgroundColor: '#fff',
  },
  dynamicsIndexBarList: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 5
  },
  blackFont: {
    color: '#000'
  },
  icon: {
    fontSize: 26,
    marginBottom: 5
  },
  menuList: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  }
});