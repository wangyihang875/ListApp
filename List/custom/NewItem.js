import React, {PropTypes, Component} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableHighlight,
    TouchableOpacity,
    ScrollView,
    Alert,
    Image
} from 'react-native'
import {observer} from 'mobx-react/native';
import ItemDetail from './ItemDetail';
import Todo from '../mobx/TodoStore'
import Icon from 'react-native-vector-icons/Ionicons'
import DatePicker from 'react-native-datepicker'

@observer
class TodoItem extends Component {
    static propTypes = {
        todo: PropTypes.instanceOf(Todo),
    };

    constructor(props) {
        super(props);
    }

    changeStatus = () => {
        const {todo, RWListStore} = this.props;
        todo.done = !todo.done;
        RWListStore.itemSort();
    };

    forDetail = () => {
        const {todo, RWListStore, listName} = this.props;
        this.props.navigator.push({
            component: ItemDetail,
            type: 'Modal',
            params: {
                todo,
                listName,
                RWListStore: RWListStore
            }
        })
    }

    remove = () => {
        const {todo, RWListStore} = this.props;
        Alert.alert(
            '提示',
            '确定要删除吗？',
            [
                {
                    text: '取消', onPress: () => {
                    return false
                }
                },
                {text: '删除', onPress: () => RWListStore.removeItem(todo.id)},
            ],
            {cancelable: true}
        )
    }

    render() {
        const {todo} = this.props;
        var iconName = todo.done ? "md-checkbox-outline" : "md-square-outline";
        var iconColor = todo.done ? "#a6acb6" : "#156e9a";
        return (
            <View style={{flexDirection:'row',alignItems:'center',paddingRight:10}}>
                <TouchableOpacity onPress={this.changeStatus} style={{paddingHorizontal: 20}}><Icon name={iconName}
                                                                                                    size={28}
                                                                                                    color={iconColor}/></TouchableOpacity>
                <Text
                    style={[styles.item, todo.done && styles.done]}
                    onPress={this.forDetail}
                    onLongPress={this.remove}
                >
                    {todo.title}
                </Text>
            </View>

        );
    }
}

@observer
export default class NewItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newItem: '',
            endDate: new Date(),
            // isOnFocus: false
        }
    }

    addItem() {
        if (this.state.newItem === '') return
        this.props.RWListStore.addItem(new Todo(this.state.newItem,this.state.endDate));
        this.setState({
            newItem: ''
        })
    }

    updateNewItem(text) {
        this.setState({
            newItem: text
        })
    }

    // onFocusHandler(){
    //     this.setState({
    //         isOnFocus: true
    //     })
    // }
    // onBlurHandler(){
    //     this.setState({
    //         isOnFocus: false
    //     })
    // }


    render() {
        const {item, RWListStore, navigator} = this.props;
        const {RWList} = this.props.RWListStore;
        return (
            <View style={{flex: 1,backgroundColor:'#ffffff'}}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>{item.name}</Text>
                    <Text
                        onPress={this.props.navigator.pop}
                        style={styles.closeButton}>&times;</Text>
                </View>
                {!RWList.length && <NoItems />}
                {RWList.length ?
                    <Items items={RWList} RWListStore={RWListStore} navigator={navigator} listName={item.name}/> :
                    <View />}
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        value={this.state.newItem}
                        onChangeText={(text) => this.updateNewItem(text)}
                        style={styles.input}
                        placeholder="准备做什么?"
                        placeholderTextColor="#a6acb6"
                    />
                    <TouchableHighlight
                        onPress={this.addItem.bind(this)}
                        style={styles.button}>
                        <Text>添加</Text>
                    </TouchableHighlight>
                </View>

                <View>
                    <DatePicker
                        style={{width: 200}}
                        date={this.state.endDate}
                        mode="date"
                        placeholder="请选择任务结束日期"
                        format="YYYY-MM-DD"
                        minDate={new Date()}
                        maxDate="2099-12-31"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                      dateInput: {
                              position:'absolute',
                              borderWidth:0,
                              left:50
                          },
                          dateTouchBody:{

                              alignItems:'center',
                              justifyContent:'flex-start'
                          }
                    }}
                        onDateChange={(date) => {this.setState({endDate: date})}}
                    />
                </View>
            </View>
        )
    }
}

const NoItems = () => (
    <View style={styles.noItem}>
        <Text style={styles.noItemText}>还没有任务,点击按钮添加</Text>
    </View>
)

const Items = ({items, store, RWListStore, navigator, listName}) => (
    <ScrollView style={{flex: 1, paddingTop: 10}}>
        {items.map((todo, i) => {

            return <TodoItem key={i} todo={todo} RWListStore={RWListStore} navigator={navigator} listName={listName}/>
        })
        }
    </ScrollView>
)


const styles = StyleSheet.create({
    heading: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#156e9a'
    },
    headingText: {
        color: '#156e9a',
        fontWeight: 'bold'
    },
    input: {
        height: 70,
        backgroundColor: '#ededed',
        padding: 20,
        flex: 1,
    },
    button: {
        width: 70,
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: '#ededed'
    },
    closeButton: {
        position: 'absolute',
        right: 17,
        top: 18,
        fontSize: 36
    },
    noItem: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noItemText: {
        fontSize: 22,
        color: '#156e9a'
    },
    item: {
        color: '#156e9a',
        fontSize: 20,
        paddingVertical: 10
    },
    done: {
        color: '#a6acb6',
        textDecorationLine: 'line-through',
    },
    remove: {
        color: '#a6acb6',
        padding: 10,
        fontSize: 15,
        paddingLeft: 20,

    },
})
