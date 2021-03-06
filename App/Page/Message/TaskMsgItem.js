/**
 * Created by chujian on 2017/3/19.
 */
/**
 *公告通知item
 */
'use strict'

import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    Image,
    TouchableHighlight,
    PixelRatio,
} from 'react-native'
import {observer} from 'mobx-react/native'

import Icon from 'react-native-vector-icons/Ionicons'

@observer
export default class TaskMsgItem extends Component {
    render(){
        return(
            <TouchableHighlight onPress = {
              () => {this.props.Message.userCode === null ? null : this.props.onPress()}
          }
                                underlayColor = "#A8CEBF" >
                <View style = {styles.Item}>
                    {/**图标*/}
                    <View style={styles.itemImage}>
                        <Icon name="ios-copy-outline" size={25} color='#FFF' />
                        <View style={[styles.unRead]}><Text style={{fontSize:9,color:'#fff'}}></Text></View>
                    </View>
                    <View style={styles.ItemContent}>
                        {/*右边栏内容显示**/}
                        <View style={styles.ItemContentLeft}>
                            <View style={styles.ItemContentNameDate}>
                                <Text style={styles.messageTypeText}>{this.props.Message.msgTitle}</Text>
                                <Text style={styles.messageTimeText}>{this.props.Message.createTime ? this.props.Message.createTime : null}</Text>
                            </View>
                            <View style={styles.ItemContentTitle}>
                                <Text style={styles.messageTitleText}>{this.props.Message.msg_content}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }
}

const styles = StyleSheet.create({
    itemImage: {
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#00bfff',
        width: 44,
        height: 44,
        borderRadius: 22,
        marginLeft:10,
    },
    Item: {
        justifyContent: 'space-between',
        alignItems:'center',
        flexDirection:'row',
        backgroundColor: '#FFF',
    },
    ItemContent:{
        flex:1,
        justifyContent: 'space-between',
        flexDirection:'row',
        alignItems:'center',
        borderBottomColor: '#ccc',
        borderBottomWidth: 1/PixelRatio.get(),
        marginLeft:15,
        //marginRight:10,
        padding:0,
    },
    ItemContentLeft: {
        flexDirection:'column',
        flex:1,
        justifyContent: 'center',
        //backgroundColor:'#ccc',
        padding:5,
        paddingLeft:0,
    },
    ItemContentTitle: {
        height:35,
        justifyContent: 'center',
        //backgroundColor:'#c0c',
    },
    ItemContentNameDate: {
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'center',
        marginTop:15,
        //backgroundColor:'#ccc',
    },
    Issuer: {
        fontSize:17,
        color:'#000',
    },
    Title: {
        fontSize:14,
        color:'#9BA3A0',
    },
    unRead: {
        justifyContent: 'center',
        alignItems:'center',
        padding:2,
        width: 16,
        height: 16,
        right:0,
        top:0,
        borderRadius: 8,
        //backgroundColor:'red',
        position: 'absolute',
    },
    messageTypeText: {
        fontSize:17,
        color:'#434343',
    },
    messageTimeText:{
        fontSize:12,
        color:'#ccc'
    },
    messageTitleText: {
        fontSize: 14,
        color:'#787878',
    }
});
