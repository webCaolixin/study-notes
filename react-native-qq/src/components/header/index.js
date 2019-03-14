/**
 * Created by caoLiXin on 2017/9/25.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableWithoutFeedback
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class Header extends Component {
  render() {
    return (
      <View>
        <View style={styles.header}>
          <TouchableWithoutFeedback onPress={this.goMyCenter.bind(this)}>
            <View style={styles.headerList}>
              <Image style={styles.headerImg} source={require('../../assets/userLogo.jpg')}/>
            </View>
          </TouchableWithoutFeedback>
          <View style={[styles.headerList, {justifyContent: 'center'}]}>
            <Text style={styles.headerFont}>{this.props.title}</Text>
          </View>
          <View style={[styles.headerList,{justifyContent: 'flex-end', marginRight: 20}]}>
            {
              this.props.title === '消 息' ?
                <Icon style={[styles.headerFont, {fontSize: 26}]} name="plus-square-o" size={10}/>
                :
                <Text style={styles.headerFont}>更多</Text>
            }
          </View>
        </View>
        <View>
          <TextInput
            style={styles.headerSearch}
            placeholder="搜索"/>
        </View>
      </View>
    )
  }

  goMyCenter() {
    this.props.targetCallOpenDrawer()
  }
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor:  '#2fbbfe',
  },
  headerList: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerImg: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: 15
  },
  headerFont: {
    color: '#fff',
    fontSize: 18,
    letterSpacing: 15
  },
  headerSearch:{
    height: 55,
    borderWidth: 0,
    borderColor: '#eee',
    backgroundColor: '#fff',
    padding: 10,
    fontSize: 14
  }
});