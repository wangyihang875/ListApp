/**
 * Created by chujian on 2017/3/23.
 */
'use strict'

import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Platform,
    PixelRatio,
    Image,
    ScrollView,
} from 'react-native'

import NavigationBar from 'react-native-navbar'
import Icon from 'react-native-vector-icons/Ionicons'

class MyWork extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    render(){
        return(
            <View style = {{flex: 1}}>
                <NavigationBar
                    style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
                    tintColor={'#2992D4'}
                    statusBar={{style:'light-content',showAnimation:'slide'}}
                    title={{title: '我的工作',tintColor:'#FFF'}}
                />
                <ScrollView contentContainerStyle={{padding:0}} automaticallyAdjustContentInsets={false}>
                    <View style={[styles.workMain,styles.ItemBottomRightLine,styles.ItemTopLine]}>
                        <TouchableHighlight
                            style={{flex:1}}
                            underlayColor='#A8CEBF'
                            onPress={() => this._QuadrTask()}>
                            <View style={[styles.workItem,styles.ItemCellRightLine]}>
                                <Image
                                    style={styles.ItemImage}
                                    source={require('../../Images/xcpph.png')}/>
                                <Text style={styles.ItemText}>四象限任务</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{flex:1}}
                            underlayColor='#A8CEBF'
                            onPress={() => this._selectMyActivity()}>
                            <View style={[styles.workItem,styles.ItemCellRightLine]}>
                                <View style={[styles.ItemCell,{backgroundColor:'#f8a97f'}]}><Icon name="ios-list-box-outline" size={32} color='#FFF' /></View>
                                <Text style={styles.ItemText}>义诊活动</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{flex:1}}
                            underlayColor='#A8CEBF'
                            onPress={() => this._ForumView()}>
                            <View style={styles.workItem}>
                                <View style={[styles.ItemCell,{backgroundColor:'#4394d1'}]}><Icon name="ios-tennisball-outline" size={32} color='#FFF' /></View>
                                <Text style={styles.ItemText}>常笑论坛</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={[styles.workMain,styles.ItemBottomRightLine]}>
                        <TouchableHighlight
                            style={{flex:1}}
                            underlayColor='#A8CEBF'
                            onPress={() => alert('尽请期待')}>
                            <View style={[styles.workItem,styles.ItemCellRightLine]}>
                                <View style={[styles.ItemCell,{backgroundColor:'#4394d1'}]}><Icon name="ios-pie-outline" size={32} color='#FFF' /></View>
                                <Text style={styles.ItemText}>新品铺货</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{flex:1}}
                            underlayColor='#A8CEBF'
                            onPress={() => alert('尽请期待')}>
                            <View style={[styles.workItem,styles.ItemCellRightLine]}>
                                <Image
                                    style={styles.ItemImage}
                                    source={require('../../Images/sjxl.png')}/>
                                <Text style={styles.ItemText}>历史纪录</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{flex:1}}
                            underlayColor='#A8CEBF'
                            onPress={() => alert('尽请期待')}>
                            <View style={styles.workItem}>
                                <Image
                                    style={styles.ItemImage}
                                    source={require('../../Images/sjxl.png')}/>
                                <Text style={styles.ItemText}>实销上报</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                    <View style={[styles.workMain,styles.ItemBottomRightLine]}>
                        <TouchableHighlight
                            style={{flex:1}}
                            underlayColor='#A8CEBF'
                            onPress={() => alert('尽请期待')}>
                            <View style={[styles.workItem,styles.ItemCellRightLine]}>
                                <Image
                                    style={styles.ItemImage}
                                    source={require('../../Images/sjxl.png')}/>
                                <Text style={styles.ItemText}>实销上报</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{flex:1}}
                            underlayColor='#A8CEBF'
                            onPress={() => this._ExamView()}>
                            <View style={[styles.workItem,styles.ItemCellRightLine]}>
                                <Image
                                    style={styles.ItemImage}
                                    source={require('../../Images/xcpph.png')}/>
                                <Text style={styles.ItemText}>常笑自测</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight
                            style={{flex:1}}
                            underlayColor='#A8CEBF'
                            onPress={() => this._MyCalendar()}>
                            <View style={styles.workItem}>
                                <Image
                                    style={styles.ItemImage}
                                    source={require('../../Images/sjxl.png')}/>
                                <Text style={styles.ItemText}>我的日程</Text>
                            </View>
                        </TouchableHighlight>
                    </View>

                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    workMain: {
        backgroundColor: '#dcdcdc',
        flexDirection:'row',
    },
    workItem: {
        //flex:1,
        alignItems:'center',
        justifyContent:'center',
        height: 100,
        backgroundColor:'#FFF',
    },
    ItemImage: {
        width: 20*PixelRatio.get(),
        height:20*PixelRatio.get(),
    },
    ItemText: {
        marginTop:10,
        color:'#434343',
    },
    ItemCell: {
        height: 44,
        width: 44,
        alignItems:'center',
        justifyContent:'center',
        borderRadius:22,
    },
    ItemBottomRightLine: {
        borderBottomColor:'#ccc',
        borderBottomWidth:1/PixelRatio.get(),
    },
    ItemTopLine: {
        borderTopColor:'#ccc',
        borderTopWidth:1/PixelRatio.get(),
    },
    ItemCellRightLine: {
        borderRightColor:'#ccc',
        borderRightWidth:1/PixelRatio.get(),
    }
});
export default MyWork;
