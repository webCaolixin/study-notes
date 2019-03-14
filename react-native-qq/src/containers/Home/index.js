/**
 * Created by caoLiXin on 2017/9/25.
 */
import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Modal,
  TouchableNativeFeedback
} from 'react-native';

import userData from '../../data/userData'
import Header from '../../components/header'

class ChatList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isRefresh: false,
      modalVisible: false
    }
  }
  _onPressList = (param) => {
    // alert(`In to ${param.name}'s chat detail` )
  };
  _keyExtractor = (item, index) => index;
  _renderItem = (item) => {
    return (
      <TouchableNativeFeedback
        onPress={this._onPressList(item.item)}
        background={TouchableNativeFeedback.SelectableBackground()}>
        <View style={styles.listCtn}>
          <Image style={styles.headLogo} source={require('../../assets/QQLogo.png')}/>
          <View style={{flex: 1}}>
            <Text style={{color: '#000'}}>{item.item.name}</Text>
            <Text style={{fontSize: 12}}>{item.item.chatContent}</Text>
          </View>
          <View style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}>
            <Text style={{fontSize: 12}}>{item.item.time}</Text>
          </View>
        </View>
      </TouchableNativeFeedback>
    )
  };
  render() {
    return (
      <View>
        <FlatList
          data={userData.chatList}
          ListEmptyComponent={<Text>暂无数据</Text>}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          refreshing={this.state.isRefresh}
          onRefresh={this._onRefresh}/>
        <Modal
          animationType={'fade'}
          transparent={true}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
          onShow={this._closeModal}>
          <View style={{justifyContent: 'center', alignItems: 'center', flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}}>
            <View style={{backgroundColor: '#fff', borderRadius: 5}}>
              <Text style={{textAlign: 'center', padding: 20, fontSize: 12}}>列表数据已刷新！</Text>
            </View>
          </View>
        </Modal>
      </View>
    )
  }
  _onRefresh = () => {
    this.setState({
      isRefresh: true
    });
    setTimeout(() => {
      this.setState({
        isRefresh: false,
        modalVisible: true
      })
    },1000)
  };
  _closeModal = () =>  {
    setTimeout(() => {
      this.setState({
        modalVisible: false
      })
    }, 1000)
  }
}

export default class Home extends Component {
  render() {
    return (
      <View>
        <Header title="消 息" targetCallOpenDrawer={this.props.middleCallOpenDrawer}/>
        <ChatList/>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  listCtn: {
    display: 'flex',
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee'
  },
  headLogo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  }
});