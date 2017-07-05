import React,{ Component } from 'react'

import {
    View,
    Navigator,
    BackAndroid,
    ToastAndroid,
} from 'react-native';

import LoginView from './Page/Login/index'

export default class App extends Component {
    constructor(props) {
        super(props);
        this.onBackAndroid = this.onBackAndroid.bind(this);
        this.lastBackPressed = 0;
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
        this.state = {
        }
    }

    onBackAndroid = () => {
        const nav = this.refs.navigator;
        const routers = nav.getCurrentRoutes();
        console.log("routers==="+routers.length);
        if (routers.length > 1) {
            nav.pop();
            return true;
        }
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            //最近2秒内按过back键，可以退出应用。
            return false;
        }
        this.lastBackPressed = Date.now();
        ToastAndroid.show('再按一次退出应用',ToastAndroid.SHORT);
        return true;
    };

    componentDidMount() {
        //SplashScreen.hide();//关闭启动屏幕
    }

    renderScene(route, navigator) {
        let Component = route.component
        return (
            <Component navigator={navigator} route={route} {...route.params} />
        )
    }

    configureScene(route) {
        if (route.name && route.name === 'Main') {
            return Navigator.SceneConfigs.FadeAndroid
        } else {
            // return Navigator.SceneConfigs.PushFromRight
            return Navigator.SceneConfigs.FadeAndroid
        }
    }

    render() {
        return (
            <View style={{flex: 1}}>
            <Navigator
                ref='navigator'
                configureScene={this.configureScene.bind(this)}
                renderScene={this.renderScene.bind(this)}
                initialRoute={{
          component: LoginView,
          name: 'Login',
        }}
            />
            </View>
        )
    }
}
