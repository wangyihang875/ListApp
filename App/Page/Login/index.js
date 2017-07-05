import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    StatusBar,
    Image,
    Alert,
    Dimensions
} from 'react-native';
import {observer} from 'mobx-react/native'
import NameInputView from './nameInputView'
import PasswdInputView from './passwdInputView'
import SwitchView from './switchView'
import LoginButton from './button'
import Loading from '../../Component/Loading'
import Main from '../Main/'
import userStore from '../../Stores/userStore'
import MenuController from '../../../List/MenuController';
const {height, width} = Dimensions.get('window');

@observer
export default class index extends Component {
  constructor(props) {
      super(props);
      this.state = {
        isLoading: false,
      };
  }
    /**
     * 登录
     * @private
     */
    _onLogin(){
        const {navigator} = this.props;
        if(userStore.userCode.length < 6) {
            Alert.alert('工号输入错误');
            return
        }
        if(userStore.passwd.length < 3) {
            Alert.alert('请输入密码');
            return
        }
        userStore.isLoading = true;
        userStore.userLogin()
          .then(()=>{
            if(userStore.errorMsg !== '') {
              Alert.alert(userStore.errorMsg);
              return
            }
            if(userStore.isLogin) {
              navigator.resetTo({
                  name:'MenuController',
                  component: MenuController
              })
            }
          }).catch(error => {
            console.log(error);
          });
    }

  render(){
    return(
        <View style={styles.container}>
            <StatusBar barStyle={'light-content'} translucent={true} backgroundColor={'#ADE5FF'} />
            <Image
                style={styles.loginbg}
                source={require('../../Images/login_bg.png') }>
                <View style={styles.logoView}>
                    <Image
                        style={styles.logoImage}
                        source={require('../../Images/logo.png') } />
                </View>
                <NameInputView store={userStore}/>
                <PasswdInputView store={userStore}/>
                <SwitchView store={userStore}/>
                <LoginButton onLogin={()=>this._onLogin()}/>
                <View style={styles.copyRight}>
                    <Text>@2016 上海常笑健康管理咨询有限公司 </Text>
                </View>
            </Image>
            <Loading loadingTitle='登录中...' isShow={userStore.isLoading} />
        </View>
    );
  }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loginbg:{
        justifyContent: 'flex-start',
        flex:1,
        height:height,
        width:width,
    },
    logoView :{
        //backgroundColor:'#eee',
        justifyContent: 'center',
        alignItems: 'center',
        height:200,
    },
    logoImage:{
        resizeMode: 'contain',
        width: 200,
    },
    copyRight:{
        //flex:1,
        padding:10,
        height:40,
        position: 'absolute',
        bottom: 20,
        left:0,
        right:0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
