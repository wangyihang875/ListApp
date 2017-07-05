/**
 * Created by chujian on 2017/3/15.
 */

import { observable,action, runInAction } from 'mobx';
import {APPSERVER,APPKEY} from '../Config/Config';

class UserStore {
    @observable userCode = 'YG1375';
    @observable passwd = '12345678';
    @observable errorMsg = '';
    @observable isLogin = false;
    @observable token = null;
    @observable isLoading = false;
    @observable isRemember = false;
    @observable userInfo = {};

    /**
     * 根据用户名密码获取登录信息
     * @returns {Promise}
     * @private
     */
    _fetchLogin(){
        return new Promise((resolve,reject) => {
            fetch(`${APPSERVER}/LoginCheck`,{
                method: "POST",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'AccessKEY' : `${APPKEY}`,
                },
                body: JSON.stringify({
                    userCode: this.userCode,
                    passWd: this.passwd
                })
            }).then(response => {
                if (response.status == 200) return response.json()
                return null
            }).then(responseData => {
                if (responseData) {
                    resolve(responseData)
                } else {
                    reject('请求出错！')
                }
            }).catch(error => {
                reject('网络出错！'+`${error}`)
            })
        })
    }

    @action
    setSwitch(){
        this.isRemember = !this.isRemember;
    }

    @action
    userLogin = async () => {
        try {
            const userInfoData = await this._fetchLogin();
            runInAction("update state after fetching data",()=>{
                this.isLoading = false;
                if(userInfoData.status != '00') {
                    this.errorMsg = userInfoData.message;
                }else{
                    this.token = userInfoData.token;
                    this.userInfo = userInfoData.data;
                    this.isLogin = true;
                    this.errorMsg = '';
                }
            });
        } catch(error) {
            this.isLoading = false;
            this.errorMsg = error;
        }
    }

}
export default userStore = new UserStore();
