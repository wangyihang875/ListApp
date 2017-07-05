/**
 * Created by chujian on 2017/3/19.
 */
/**
 * Created by chujian on 2017/3/19.
 */

// 'use strict'

import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    InteractionManager,
    Text,
    Platform,
    StatusBar,
} from 'react-native'
import {observer} from 'mobx-react/native'

import ScrollableTabView, {DefaultTabBar, } from 'react-native-scrollable-tab-view';
import NavigationBar from 'react-native-navbar';
import TaskStore from '../../Stores/TaskStore'
import UserStore from '../../Stores/userStore'
import TaskList from './TaskList'

@observer
export default class Task extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {taskCount} = TaskStore;
        const tCount = [];
        tCount[1] = taskCount.get(1) === undefined ? '' : taskCount.get(1);
        tCount[2] = taskCount.get(2) === undefined ? '' : taskCount.get(2);
        tCount[3] = taskCount.get(3) === undefined ? '' : taskCount.get(3);

        return (
            <View style={{flex:1}}>
                <StatusBar
                    backgroundColor="#2992D4"
                    barStyle="light-content"
                    translucent={true}
                />
                <NavigationBar
                    style={{marginTop: Platform.OS === 'android' ? 25 : 0,}}
                    tintColor={'#2992D4'}
                    statusBar={{style:'light-content',showAnimation:'slide'}}
                    title={{title: '我的任务',tintColor:'#FFF'}}
                />
                <ScrollableTabView
                    style={{marginTop: 0,}}
                    tabBarActiveTextColor={'#2992D4'}
                    tabBarUnderlineStyle={{backgroundColor:'#2992D4'}}
                >
                    <TaskList tabLabel={'未处理'+tCount[1] } TaskStatus='1' taskStore={TaskStore} userStore={UserStore} {...this.props}/>
                    <TaskList tabLabel={'处理中'+tCount[2] } TaskStatus='2' taskStore={TaskStore} userStore={UserStore} {...this.props}/>
                    <TaskList tabLabel={'已完成'+tCount[3] } TaskStatus='3' taskStore={TaskStore} userStore={UserStore} {...this.props}/>
                </ScrollableTabView>
            </View>
        );

    }
}
// const styles = StyleSheet.create({});
