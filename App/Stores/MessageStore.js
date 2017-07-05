/**
 * Created by chujian on 2017/3/19.
 */
import { observable,action,runInAction,autorun,computed} from 'mobx';
import { ListView } from 'react-native'
import {APPSERVER,APPKEY} from '../Config/Config';

class MessageStore {
    @observable isFetching = false;
    @observable isLoading = false;
    @observable errorMsg = '';
    @observable messageList = [];
    @observable ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    constructor(){
        autorun(()=>{
            console.log(this.messageList);
        });
    }

    @computed get dataSource() {
        return this.ds.cloneWithRows(this.messageList.slice());
    }

    @computed
    get messageCount(){

        console.log("更新数据"+this.messageList.length);
        return this.messageList.length;
    }

    @action
    getMessageList = async (userCode,token) => {
        try {
            const result = await this._fetchMessage(userCode,token);
            runInAction("update state after fetching data",()=>{
                this.isFetching = false;
                this.isLoading = false;
                if(result.status === '00') {
                    this.messageList.replace(result.data);
                }else{
                    this.errorMsg = '令牌错误,请重新登录'
                }
            });
        } catch(error) {
            console.log("error="+`${error}`);
            this.errorMsg = error;
        }
    }

    _fetchMessage(userCode,token){
        return new Promise((resolve,reject) => {
            fetch(`${APPSERVER}/getMessage?userCode=${userCode}&token=${token}`)
                .then(response => {
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
}

export default messageStore = new MessageStore();