'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    PixelRatio,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import {observer} from 'mobx-react/native'

@observer
export default class PasswdInputView extends Component {
    _onChangeText(text){
        //const {userCode} = this.props.store;
        this.props.store.passwd = text;
    }
  render(){
    return(
      <View style={styles.inputForm}>
        <View style={styles.inputFormIcon}>
          <Icon name="ios-lock-outline" size={32} color='#2992D4'/>
        </View>
        <View style={styles.inputFormInput}>
          <TextInput
            underlineColorAndroid='transparent'
            placeholder='密码'
            secureTextEntry={true}
            onChangeText={(text) => this._onChangeText(text)}
            value={this.props.store.passwd}
            style={{height: 50}}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    inputForm:{
        alignItems: 'center',
        flexDirection: 'row',
        borderBottomColor: '#FFFFE3',
        borderBottomWidth: 1/PixelRatio.get(),
        //paddingLeft:30,
        marginLeft:30,
        marginRight:30,
        height:50,
    },
    inputFormIcon:{
        marginRight:10,
        alignItems:'center',
    },
    inputFormInput:{
        flex:1,
    },
});