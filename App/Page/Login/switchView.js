'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Switch,
} from 'react-native';
import {observer} from 'mobx-react/native'

@observer
export default class SwitchView extends Component {
    _switchChage(){
        this.props.store.setSwitch();
    }
  render(){
    return(
      <View style={styles.rememberForm}>
        <Text>
        记住我
        </Text>
        <Switch
            style={styles.switch}
            onTintColor="deepskyblue"
            thumbTintColor="white"
            value={this.props.store.isRemember}
            onValueChange={()=>this._switchChage()}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
    switch: {
        position: 'absolute',
        right: 15,
        top: 20,
    },
    rememberForm:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft:30,
        marginRight:20,
        height:80,
    },
});