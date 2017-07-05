/**
 * Created by chujian on 2017/3/19.
 */

'use strict'

import React,{Component} from 'react'
import {
    StyleSheet,
    View,
    InteractionManager,
    Text,
    Image,
    ListView,
    RefreshControl,
    Platform,
    Dimensions,
    TouchableHighlight,
    StatusBar,
} from 'react-native'
import {observer} from 'mobx-react/native'
import Toast from 'react-native-root-toast';
import NavigationBar from 'react-native-navbar';

import TaskMsgItem from './TaskMsgItem'
import FollowMsgItem from './FollowMsgItem'
import ScheduleMsgItem from './ScheduleMsgItem'
import NoticeMsgItem from './NoticeMsgItem'
import Loading from '../../Component/Loading'


const {height, width} = Dimensions.get('window');

@observer
export default class Message extends Component {
    constructor(props){
        super(props);
        this.state = {
        }
    }

    componentDidMount(){
        const {messageStore,userStore} = this.props;
        messageStore.isLoading = true;
        messageStore.getMessageList(userStore.userCode,userStore.token);
    }

    componentWillReact() {
        const {errorMsg} = this.props.messageStore
        errorMsg && Toast.show(errorMsg,{duration:1500,shadow:false,position:-50});
    }

    /**
     * 刷新数据
     * @private
     */
    _onRefresh(){
        const {messageStore,userStore} = this.props;
        messageStore.isFetching = true;
        messageStore.getMessageList(userStore.userCode,userStore.token);
    }

    //渲染行
    _renderRow(message){
        switch (message.msgType) {
            case "task":
                return(<TaskMsgItem Message={message} onPress={()=>this._openTask()} />)
                break;
            case "notice":
                return(<NoticeMsgItem Message={message} onPress={()=>this._openNotices()}/>);
                break;
            case "schedule":
                return(<ScheduleMsgItem Message={message} />);
                break;
            case "follow":
                return(<FollowMsgItem Message={message} onPress={()=>this._openFocusTask()}/>);
                break;
            case "comment":
                return(<NoticeMsgItem Message={message} onPress={()=>this._openNotices()}/>);
            default:
                return null;
        }
    }


    render(){
        const {dataSource,messageCount,isFetching,isLoading} = this.props.messageStore;
        console.log(messageCount)
        return(
            <View style={{flex:1,backgroundColor:'#FFFFFF'}}>
                <StatusBar
                    backgroundColor="#2992D4"
                    barStyle="light-content"
                    translucent={true}
                />
                <NavigationBar
                    style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
                    tintColor={'#2992D4'}
                    statusBar={{style:'light-content',showAnimation:'slide'}}
                    title={{title: '我的消息'+`${messageCount}`,tintColor:'#FFF'}}
                />
                <ListView
                    automaticallyAdjustContentInsets={false}
                    enableEmptySections={true}
                    initialListSize={10}
                    dataSource={dataSource}
                    renderRow={(message)=>this._renderRow(message)}
                    refreshControl={<RefreshControl
                                    refreshing={isFetching}
                                    onRefresh={() => this._onRefresh()}
                                    tintColor="#ff0000"
                                    title="数据加载中..."
                                    colors={['#ff0000', '#00ff00', '#0000ff']}
                                    progressBackgroundColor="#ffff00"
                                />}
                />
                <Loading loadingTitle='消息加载中...' isShow={isLoading} />
            </View>

        );
    }
}
const styles = StyleSheet.create({
});
