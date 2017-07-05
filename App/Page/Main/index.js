import React, {Component} from 'react';
import TabNavigator from 'react-native-tab-navigator';
import Icon from 'react-native-vector-icons/Ionicons'

import messageStore from '../../Stores/MessageStore'
import userStore from '../../Stores/userStore'

import Message from '../Message/'
import Task from '../Task/'
import Work from '../Work'
import Setting from '../Setting/'
import TodoList from '../TodoList/'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'message',
        }
    }

    render() {
        return (
            <TabNavigator>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'message'}
                    title="消息"
                    renderIcon={() => <Icon name="ios-mail-open-outline" size={25} color="#2992D4" />}
                    renderSelectedIcon={() => <Icon name="ios-mail-open" size={25} color="#2992D4" />}
                    //badgeText="0"
                    onPress={() => this.setState({ selectedTab: 'message' })}>
                    <Message messageStore={messageStore} userStore={userStore}/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'todoList'}
                    title="清单"
                    renderIcon={() => <Icon name="ios-list-box-outline" size={25} color="#2992D4" />}
                    renderSelectedIcon={() => <Icon name="ios-list-box" size={25} color="#2992D4" />}
                    onPress={() => this.setState({ selectedTab: 'todoList' })}>
                    <TodoList/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'task'}
                    title="任务"
                    renderIcon={() => <Icon name="ios-create-outline" size={25} color="#2992D4" />}
                    renderSelectedIcon={() => <Icon name="ios-create" size={25} color="#2992D4" />}
                    onPress={() => this.setState({ selectedTab: 'task' })}>
                    <Task/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'work'}
                    title="工作"
                    renderIcon={() => <Icon name="ios-folder-open-outline" size={25} color="#2992D4" />}
                    renderSelectedIcon={() => <Icon name="ios-folder-open" size={25} color="#2992D4" />}
                    onPress={() => this.setState({ selectedTab: 'work' })}>
                    <Work/>
                </TabNavigator.Item>
                <TabNavigator.Item
                    selected={this.state.selectedTab === 'setting'}
                    title="我的"
                    renderIcon={() => <Icon name="ios-contact-outline" size={25} color="#2992D4" />}
                    renderSelectedIcon={() => <Icon name="ios-contact" size={25} color="#2992D4" />}
                    onPress={() => this.setState({ selectedTab: 'setting' })}>
                    <Setting user={userStore}/>
                </TabNavigator.Item>
            </TabNavigator>
        );
    }
}
