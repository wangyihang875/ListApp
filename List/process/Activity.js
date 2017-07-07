import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    TextInput
} from 'react-native';


export default class Activity extends Component {


    render() {
        return (
            <View style={{flex:1,backgroundColor:'#ffffff'}}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>待处理活动列表</Text>
                </View>


            </View>
        );
    }
}

const styles = StyleSheet.create({
    heading: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#156e9a'
    },
    headingText: {
        color: '#156e9a',
        fontWeight: 'bold'
    },
});