import React, {PropTypes, Component} from 'react'
import {View, Text, StyleSheet, TextInput, TouchableHighlight, TouchableOpacity, ScrollView,Alert} from 'react-native'
import {observable} from 'mobx';
import {observer} from 'mobx-react/native';

class Todo {
    id = `todo_${Date.now()}${Math.floor(Math.random()*10)}`;

    @observable
    title = '';

    @observable
    done = false;

    constructor(title) {
        this.title = title;
    }
}

@observer
class TodoItem extends Component {
    static propTypes = {
        data: PropTypes.instanceOf(Todo),
    };
    constructor(props) {
        super(props);
    }

    changeStatus = () => {
        const {data} = this.props;
        data.done = !data.done;
    };

    remove = () => {
        const {data,itemNo,store} = this.props;
        Alert.alert(
            '提示',
            '确定要删除吗？',
            [
                {text: '取消', onPress: () => {return false}},
                {text: '删除', onPress: () => store.removeItem(itemNo,data.id)},
            ],
            { cancelable: true }
        )
    }

    render() {
        const {data} = this.props;
        return (
            <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                <Text
                    style={[styles.item, data.done && styles.done]}
                    onPress={this.changeStatus}
                    onLongPress={this.remove}
                >
                    • {data.title}
                </Text>
            </View>

        );
    }
}

@observer
class NewItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            newItem: ''
        }
    }

    addItem() {
        if (this.state.newItem === '') return
        this.props.store.addItem(this.props.item, new Todo(this.state.newItem))
        this.setState({
            newItem: ''
        })
    }

    updateNewItem(text) {
        this.setState({
            newItem: text
        })
    }

    render() {
        const {item,store} = this.props
        return (
            <View style={{flex: 1,backgroundColor:'#ffffff'}}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>{item.name}</Text>
                    <Text
                        onPress={this.props.navigator.pop}
                        style={styles.closeButton}>&times;</Text>
                </View>
                {!item.items.length && <NoItems />}
                {item.items.length ? <Items items={item.items} itemNo={item.index} store={store}/> : <View />}
                <View style={{flexDirection: 'row'}}>
                    <TextInput
                        value={this.state.newItem}
                        onChangeText={(text) => this.updateNewItem(text)}
                        style={styles.input}/>
                    <TouchableHighlight
                        onPress={this.addItem.bind(this)}
                        style={styles.button}>
                        <Text>添加</Text>
                    </TouchableHighlight>
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
const Items = ({items,itemNo,store}) => (
    <ScrollView style={{flex: 1, paddingTop: 10}}>
        {items.map((todo, i) => {
            {/*return <TouchableOpacity><Text style={styles.item} key={i}>• {item}</Text></TouchableOpacity>*/
            }
            return <TodoItem key={i} data={todo} itemNo={itemNo} store={store}/>
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
        flex: 1
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
        padding: 10,
        fontSize: 20,
        paddingLeft: 20
    },
    done: {
        color: 'gray',
        textDecorationLine: 'line-through',
    },
    remove: {
        color: '#a6acb6',
        padding: 10,
        fontSize: 15,
        paddingLeft: 20,

    },
})

export default NewItem
