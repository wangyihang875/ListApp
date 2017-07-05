import React,{Component} from 'react';
import {
    StyleSheet,
    ActivityIndicator,
    Text,
    View,
} from 'react-native';

export default class Loading extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          loadingTitle: this.props.loadingTitle === undefined ? '加载中...' :this.props.loadingTitle,
        };
    }

    render(){
        if(!this.props.isShow) return null;
        return(
            <View style={styles.container}>
                <View style={styles.loading}>
                    <ActivityIndicator color="white"/>
                    <Text style={styles.loadingTitle}>{this.state.loadingTitle}</Text>
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    },
    loading: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        height: 80,
        width: 100,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingTitle: {
        marginTop: 10,
        fontSize: 14,
        color: 'white'
    }
});
