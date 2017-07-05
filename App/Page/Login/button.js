'use strict';
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';
import {observer} from 'mobx-react/native'

@observer
export default class LoginButton extends Component {
  render(){
    return(
        <View style={styles.buttonForm}>
            <TouchableHighlight
                onPress={()=>this.props.onLogin()}
                style={styles.loginButton}
                underlayColor="#00A1DB"
            >
                <Text style={{ color: '#fff',fontSize:18 }}>
                    登 录
                </Text>
            </TouchableHighlight>
        </View>
    );
  }
}
const styles = StyleSheet.create({
    buttonForm: {
        height:80,
    },
    loginButton:{
        marginTop: 30,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: 'deepskyblue',
        height: 48,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
});