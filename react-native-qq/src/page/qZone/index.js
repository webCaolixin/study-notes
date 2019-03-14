/**
 * Created by caoLiXin on 2017/9/26.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button
} from 'react-native';

export default class QZone extends Component {
  render() {
    return (
      <View>
        <Text>这里是QQ空间</Text>
        <Button title="返回" onPress={this.goBack.bind(this)}/>
      </View>
    )
  }
  goBack() {
    console.log(this.props)
    this.props.navigator.pop();
  }

}

const styles = StyleSheet.create({
  back_text:{
    width: 80,
    backgroundColor: 'gray',
    color: 'white',
    textAlign: 'center',
    fontSize: 18,
    alignSelf: 'center',
    marginTop: 20
  }
});