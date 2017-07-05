/**
 * Created by chujian on 2017/3/24.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Image,
    Switch,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Alert,
    InteractionManager,
    NativeAppEventEmitter,
    Platform,
    StatusBar,
} from 'react-native';

import NavigationBar from 'react-native-navbar';
import Icon from 'react-native-vector-icons/Ionicons'

const {height, width} = Dimensions.get('window');

export default class TodoList extends Component {
    componentWillMount() {

    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#2992D4"
                    barStyle="light-content"
                    translucent={true}
                />
                <NavigationBar
                    style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
                    tintColor={'#2992D4'}
                    statusBar={{style:'light-content',showAnimation:'slide'}}
                    title={{title: '我的清单',tintColor:'#FFF'}}
                />

            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

})
