/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, {Component} from 'react';
import {
    AppRegistry,
    View,
    Text,
    Navigator,
    StyleSheet
} from 'react-native';
import Custom from './Custom';
import Default from './Default';
import AppMenu from './AppMenu'
import QDListStore from './mobx/QDListStore'
import DefaultRWListStore from './mobx/DefaultRWListStore'
import SideMenu from 'react-native-side-menu'
import Welcome from '../Welcome'

export default class MenuController extends Component {

    state = {
        selectedItem: 'Welcome',
    };

    onMenuItemSelected = (item) => {
        this.setState({
            selectedItem: item,
        });
    }

    selectComponent = ()=>{
        switch (this.state.selectedItem){
            case 'Custom' :
                return <Custom store={QDListStore} navigator={this.props.navigator}/>
                break;
            case 'Default' :
                return <Default store={DefaultRWListStore} navigator={this.props.navigator}/>
                break;
            case 'Welcome' :
                return <Welcome/>
                break;
            default :
                return <Welcome/>
        }

    }

    render() {
        const appMenu = <AppMenu onItemSelected={this.onMenuItemSelected}/>;
        return (
            <SideMenu
                menu={appMenu}
            >

                {this.selectComponent()}


            </SideMenu>
        );
    }
}