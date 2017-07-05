/**
 * Created by chujian on 2017/3/20.
 */
import mobx,{ observable,action,runInAction,autorun,extendObservable,computed} from 'mobx';

import {APPSERVER,APPKEY} from '../Config/Config';

/**
 * 任务store
 */
class TaskStore {
    @observable isLoading = false;
    @observable isLoadMore = false;
    @observable isFetching = false;
    @observable isNoMore = false;
    @observable errorMsg = '';
    @observable page = 1;
    @observable taskStatus = 1;
    @observable taskList = {};
    @observable taskCount = observable.map({});

    @action
     getTaskList = async (userCode,token,taskStatus) => {
        try {
            this.page = this.isFetching ? 1 : this.page;
            const result = await this._fetchTask(userCode,token,taskStatus);
            runInAction("update state after fetching data",()=>{
                this.isFetching = false;
                this.isLoading = false;
                if(result.status === '00') {
                    this.taskList = extendObservable(this.taskList,{[taskStatus] : result.data});
                    this.taskCount.set(taskStatus,result.count)
                }else{
                    this.errorMsg = '令牌错误,请重新登录'
                }
            });
        } catch(error) {
            console.log("error"+`${error}`)
            this.errorMsg = error;
        }
    }

    _fetchTask(userCode,token,taskStatus){
        return new Promise((resolve,reject) => {
            fetch(`${APPSERVER}/getTask?userCode=${userCode}&task_status=${taskStatus}&token=${token}&page=${this.page}`, {
                method: "GET",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'AccessKEY' : `${APPKEY}`,
                },
            })
                .then(response => {
                    if (response.status == 200) return response.json()
                    return null
                })
                .then((responseData) => {
                console.log(responseData)
                    if (responseData) {
                        resolve(responseData)
                    } else {
                        reject('请求出错！')
                    }
                })
                .catch((error) => {
                    reject('网络出错！'+`${error}`)
                });
        });
    }

}

const taskStore = new TaskStore();
export default taskStore;