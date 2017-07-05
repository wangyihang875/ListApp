/**
 * Created by chujian on 2017/3/21.
 */
import React, {
    Component
} from 'react'
import {
    StyleSheet,
    Text,
    Image,
    View,
    TouchableHighlight,
    TouchableOpacity,
    PixelRatio,
    Dimensions,
} from 'react-native';

import moment from 'moment'
import 'moment/locale/zh-cn'
moment().locale('zh-cn');

import Icon from 'react-native-vector-icons/Ionicons'
import {observer} from 'mobx-react/native'

const {Wheight, Wwidth} = Dimensions.get('window');

@observer
export default class TaskItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    _picpath(){
        if(this.props.taskInfo.picpath.substr(0,4) == 'http') {
            return(<Image
                style={styles.face}
                source={{uri: this.props.taskInfo.picpath}}
            />);
        }else{
            return(<Image
                style={styles.face}
                source={this.props.taskInfo.picpath === "woman.jpg"?require('../../Images/woman.jpg'):require('../../Images/man.jpg')}
            />);
        }
    }

    render() {
        const Task = this.props.taskInfo;
        return (
            <View style = {styles.Item}>
                <View style = {styles.ItemHead}>
                    {this._picpath()}
                    <View style = {styles.TaskPublisher}><Text style={styles.creatorName}>{Task.t_creatorName}</Text><Text style={{fontSize:13,color:'#CCC',paddingTop:5}}>{moment(Task.t_createTime).format("MMMDo hh:mm:ss")} 来自iphone</Text></View>
                    <View style = {styles.ItemTaskStatus}>
                        <View style={{flexDirection:'row',alignItems:'center',justifyContent: 'center',}}>
                            <Text style={{fontSize:13,color:'#ccc'}}>任务 - </Text>
                            <Text style={{fontSize:13}}>xxxx</Text>
                        </View>
                        <View>
                            <Text style={{fontSize:12,color:'#ccc'}}>parterStatus</Text>
                        </View>
                    </View>
                </View>

                <TouchableHighlight
                    onPress = {() => this.props.onPress()}
                    underlayColor = "#F8F8F8">
                    <View>
                        <View style = {styles.TaskTitleView}><Text style={styles.TaskTitle}>{Task.t_levelid === '3' ? <Text style={{color:'red'}}>!!! </Text> : ''}{Task.t_title}</Text></View>
                        <View style = {styles.TaskContentView}><Text style={styles.TaskContent}>{Task.t_notes === '' ? '无任务内容' : Task.t_notes}</Text></View>
                        <View style = {styles.TaskParterView}><Text style={styles.TaskParterText}><Icon name="ios-people" size={12} color='#96c4ee'/> {Task.t_partername === '' ? '无' : Task.t_partername}</Text></View>
                        <View style = {[styles.TaskParterView,{borderBottomColor: '#F0F0F0',borderBottomWidth:1/PixelRatio.get(),paddingBottom:15,}]}><Text style={styles.TaskParterText}><Icon name="ios-time" size={12} color='#96c4ee'/> {moment(Task.t_endDate).format('dddd')},{moment(Task.t_endDate).format("MMMDo")}</Text></View>
                    </View>
                </TouchableHighlight>

                <View style={styles.ItemToolBarView}>

                    <View style={[styles.ItemToolBar,{borderRightWidth:1/PixelRatio.get(),borderColor:'#F0F0F0'}]}>
                        <TouchableOpacity style={styles.TouchStyle} onPress={()=>this.props.openComment()}>
                            <Icon name="ios-text-outline" size={20} color='#555555'/>
                            <Text style={{fontSize:12,paddingLeft:5,color:'#555555',alignItems:'center',}}>{Task.commentCount !== 0 ? Task.commentCount : '回复'}</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.ItemToolBar,{borderRightWidth:1/PixelRatio.get(),borderColor:'#F0F0F0'}]}>
                        <TouchableOpacity style={styles.TouchStyle} onPress={()=>{Task.isFavorite === 0 ? this.props.favoriteTask() : this.props.cancelfavoriteTask()}}>
                            <Icon name={Task.isFavorite === 0 ? "ios-star-outline" : "ios-star" } size={18} color={Task.isFavorite === 0 ? "#555555" : '#2992D4' }/>
                            <Text style={{fontSize:12,paddingLeft:5,color:'#555555',alignItems:'center',}}>收藏</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.ItemToolBar}>
                        <TouchableOpacity style={styles.TouchStyle} onPress={()=>this.props.onModalOpen()}>
                            <Icon name="ios-more" size={20} color='#555555'/>
                            <Text style={{fontSize:12,paddingLeft:5,margin:5,color:'#555555'}}>更多</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>);
    }

}

const styles = StyleSheet.create({
    TouchStyle: {
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        padding:5,
        //backgroundColor:'#0e0'
    },
    //单个ITEM的VIEW
    Item: {
        backgroundColor: '#FFFFFF',
        marginBottom:15,
    },
    face: {
        width: 38,
        height: 38,
        borderRadius: 2,
        marginRight:10,
    },
    //ITEM的最上部分,指定高度
    ItemHead: {
        flex: 1,
        //padding:10,
        paddingLeft:15,
        paddingRight:15,
        paddingTop:10,
        paddingBottom:10,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
    },
    //头部中间的view,使用flex，
    TaskPublisher: {
        flex:1,
        alignItems:'flex-start',
    },
    //任务发布人姓名
    creatorName: {
        fontSize: 16,
        color:'#434343',
    },
    //任务状态
    ItemTaskStatus: {
        width: 100,
        alignItems:'flex-end',
    },
    //任务标题View
    TaskTitleView: {
        padding:10,
        paddingLeft:15,
        paddingRight:15,
        justifyContent: 'center',
        alignItems:'flex-start',
        flexWrap: 'wrap',
    },
    //任务标题字体
    TaskTitle: {
        color:'#868686',
        fontSize:15,
        flex:1,
    },
    //任务的内容view
    TaskContentView: {
        flexDirection:'column',
        //borderBottomColor: '#F1F1F1',
        //borderBottomWidth: 0.5,
        padding:10,
        paddingLeft:15,
        paddingRight:15,
        marginBottom:15,
        //paddingTop:5,
        //marginRight:10,
        //marginLeft:10,
    },
    //任务内容
    TaskContent: {
        fontSize: 16,
        color:'#434343',
        lineHeight: 20,
        flex:1,
    },
    TaskParterView: {
        justifyContent: 'flex-start',
        alignItems:'center',
        flexDirection: 'row',
        paddingLeft:15,
        marginBottom:5,
        height:25,
    },
    TaskParterText: {
        fontSize:12,
        lineHeight:18,
        color:'#8b8b93',
    },
    ItemToolBarView: {
        flexDirection:'row',
        //alignItems:'center',
        justifyContent: 'space-between',
        height:38,
        //  backgroundColor:'#e0e',
        paddingBottom:5,
        paddingTop:0,
        //padding:15,
    },
    ItemToolBar: {
        flex:1,
        width: Wwidth/3,
        flexDirection:'row',
        alignItems:'center',
        justifyContent: 'center',
        //backgroundColor:'#ccc'
    }
});
