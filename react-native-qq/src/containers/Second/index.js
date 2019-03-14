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
import Icon from 'react-native-vector-icons/FontAwesome'
import connectList from '../../data/connectGroupList'

export default class Second extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefresh: false
    }
  }
  _onPressList = (item) => {
    // alert(item)
  };
  _keyExtractor = (item, index) => index;
  _renderItem = (item) => {
    return (
      <TouchableNativeFeedback
        onPress={this._onPressList(item.item)}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.connectList}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon name="angle-right" style={{fontSize: 20}}/>
            <Text style={{color: '#000', marginLeft: 15}}>{item.item.name}</Text>
          </View>
          <View style={{alignItems: 'center'}}>
            <Text style={{fontSize: 12}}>{`${item.item.onLine}/${item.item.total}`}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  };
  render() {
    return (
      <View>
        <View>
          <Header title="联 系 人" targetCallOpenDrawer/>
        </View>
        <View>
          <FlatList
            data={connectList}
            keyExtractor={this._keyExtractor}
            renderItem={this._renderItem}
            refreshing={this.state.isRefresh}
            onRefresh={this._onRefresh}/>
        </View>
      </View>
    )
  }
  _onRefresh = () => {
    this.setState({
      isRefresh: true
    });
    setTimeout(() => {
      this.setState({
        isRefresh: false
      })
    }, 5000)
  }
}


const styles = StyleSheet.create({
  connectList: {
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