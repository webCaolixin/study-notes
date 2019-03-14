/**
 * Created by caoLiXin on 2017/9/27.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ImageBackground,
  TouchableNativeFeedback,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome'
import myCenterMenu from '../../data/myCenterMenu'

export default class MyCenter extends Component {
  _renderItem = (item) => {
    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.myCenterMenu}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <Icon name={item.item.icon} style={{fontSize: 20, width: 25}}/>
            <Text style={{color: '#000', marginLeft: 15}}>{item.item.name}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  };
  _keyExtractor = (item, index) => index;
  render() {
    return (
      <View style={{flex: 1}}>
        <ImageBackground style={{height:180}} source={require('../../assets/myCenterBg.png')} resizeMode='cover'>
          <View style={{marginLeft: 20}}>
            <Text style={{fontSize:26}}>ζ₯Magic㎕eyes</Text>
            <Text style={{}}>谜一样的浮世，每一步都未知。</Text>
          </View>
        </ImageBackground>
        <FlatList
          data={myCenterMenu}
          keyExtractor={this._keyExtractor}
          renderItem={this._renderItem}
          style={{marginTop: 20}}/>
        <View style={{justifyContent: 'flex-end'}}>
          <View style={{alignItems: 'flex-end', backgroundColor: '#fff'}}>
            <Text style={styles.temperatureFont}>17℃</Text>
          </View>
          <View style={{backgroundColor: '#fff'}}>
            <View style={{height: 50, flexDirection: 'row'}}>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.bottomBar}>
                  <Icon name="dot-circle-o" style={styles.bottomBarIcon}/>
                  <Text style={styles.bottomBarFont}>设置</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.bottomBar}>
                  <Icon name="moon-o" style={styles.bottomBarIcon}/>
                  <Text style={styles.bottomBarFont}>夜间</Text>
                </View>
              </TouchableNativeFeedback>
              <TouchableNativeFeedback
                background={TouchableNativeFeedback.SelectableBackground()}>
                <View style={styles.bottomBar}>
                  <Text style={styles.bottomBarFont}>雁塔</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  myCenterMenu: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  temperatureFont: {
    fontSize: 24,
    color: '#1cbdf7',
    marginRight: 40
  },
  bottomBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottomBarFont: {
    fontSize: 16,
    color: '#000'
  },
  bottomBarIcon: {
    fontSize: 18,
    marginRight: 8
  }
});