/**
 * Created by chujian on 2017/3/21.
 */
import React,{Component} from 'react'
import {
    View,
    InteractionManager,
    ListView,
    RefreshControl,
} from 'react-native'
import Toast from 'react-native-root-toast';
import {observer} from 'mobx-react/native'
import {autorun} from 'mobx';
import Loading from '../../Component/Loading'
import TaskItem from './TaskItem'

@observer
export default class TaskList extends Component {
    constructor(props){
        super(props);
        this.state = {
            dataSource: new ListView.DataSource({
                rowHasChanged: (row1, row2) => row1 !== row2,
            }),
        }
    }

    componentDidMount(){
        const {taskStore,userStore,TaskStatus} = this.props;
        taskStore.isLoading = true;
        taskStore.getTaskList(userStore.userCode,userStore.token,TaskStatus);
    }

    componentWillReact() {
        const {errorMsg} = this.props.taskStore
        errorMsg && Toast.show(errorMsg,{duration:1500,shadow:false,position:-50});
    }

    /**
     * 刷新数据
     * @private
     */
    _onRefresh(){
        const {taskStore,userStore,TaskStatus} = this.props;
        taskStore.isFetching = true;
        taskStore.getTaskList(userStore.userCode,userStore.token,TaskStatus);
    }

    render(){
        const {taskList,isFetching,isLoading} = this.props.taskStore;
        const TaskList = taskList[this.props.TaskStatus] === undefined ? [] : taskList[this.props.TaskStatus];
        return(
            <View style={{flex:1}}>
                <ListView
                    automaticallyAdjustContentInsets={false}
                    enableEmptySections={true}
                    initialListSize={10}
                    dataSource={this.state.dataSource.cloneWithRows(TaskList.slice())}
                    renderRow={(taskInfo)=>{
                        return(
                            <TaskItem taskInfo={taskInfo}/>
                        )
                    }}
                    refreshControl={<RefreshControl
                        refreshing={isFetching}
                        onRefresh={() => this._onRefresh()}
                        tintColor="#ff0000"
                        title="加载中..."
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        progressBackgroundColor="#ffff00"
                    />}
                />
                <Loading loadingTitle='加载中...' isShow={isLoading} />
            </View>
        )
    }

}