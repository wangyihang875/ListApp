import React, {Component} from 'react'
import {View, Text, TextInput, TouchableHighlight,TouchableOpacity, ScrollView, StyleSheet, Alert, Image} from 'react-native'
import {observer} from 'mobx-react/native'
import NewItem from './NewItem'
import ObservableRWListStore from './mobx/RWListStore';

@observer
class TodoList extends Component {
    constructor() {
        super()
        this.state = {
            text: '',
            showInput: false
        }
    }

    toggleInput() {
        this.setState({showInput: !this.state.showInput})
    }

    addListItem() {
        var name = this.state.text;
        var listItemNo = Date.now();
        var createDate = Date.now();
        this.props.store.addListItemUseStore(name, new ObservableRWListStore(), listItemNo, createDate);
        this.setState({
            text: '',
            showInput: !this.state.showInput
        })
    }

    removeListItem(listItem) {
        Alert.alert(
            '提示',
            '确定要删除 ' + listItem.name + ' 吗？',
            [
                {
                    text: '取消', onPress: () => {
                    return false
                }
                },
                {text: '删除', onPress: () => this.props.store.removeListItem(listItem)},
            ],
            {cancelable: true}
        )

    }

    updateText(text) {
        this.setState({text})
    }

    addItemToList(item) {
        this.props.navigator.push({
            component: NewItem,
            type: 'Modal',
            params: {
                item,
                store: this.props.store,
                RWListStore: item.items
            }
        })
    }

    render() {
        const {showInput} = this.state
        const {QDList} = this.props.store
        return (
            <View style={{flex:1,backgroundColor:'#ffffff'}}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>日常清单</Text>
                </View>
                {!QDList.length ? <NoList /> : null}
                <ScrollView style={{flex:1}}>
                    {QDList.map((l, i) => {
                        return <TouchableOpacity key={i} style={styles.itemContainer} onPress={this.addItemToList.bind(this, l)}
                                     onLongPress={this.removeListItem.bind(this, l)}>
                            <Image source={require('./images/list.png')} style={{width:20,height:20}}/>
                            <Text style={styles.item}>{l.name}</Text>
                            <Text style={styles.sumItem}>{l.items.RWList.length}</Text>
                        </TouchableOpacity>
                    })}
                </ScrollView>
                <TouchableHighlight
                    underlayColor='transparent'
                    onPress={
            this.state.text === '' ? this.toggleInput.bind(this)
            : this.addListItem.bind(this, this.state.text)
          }
                    style={styles.button}>
                    <Text style={styles.buttonText}>
                        {this.state.text === '' && '+ 新建清单'}
                        {this.state.text !== '' && '+ 添加清单'}
                    </Text>
                </TouchableHighlight>
                {showInput && <TextInput
                    style={styles.input}
                    onChangeText={(text) => this.updateText(text)}/>}
            </View>
        );
    }
}

const NoList = () => (
    <View style={styles.noList}>
        <Text style={styles.noListText}>还有没清单,点击按钮添加</Text>
    </View>
)

const styles = StyleSheet.create({
    itemContainer: {
        paddingLeft: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        flexDirection: 'row',
        alignItems: 'center'
    },
    item: {
        color: '#156e9a',
        fontSize: 18,
        flex: 3,
        padding: 20
    },
    sumItem: {
        flex: 1,
        padding: 20,
        color: '#a3a3a3',
        fontWeight: 'bold',
        marginTop: 3
    },
    button: {
        height: 70,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderTopColor: '#156e9a'
    },
    buttonText: {
        color: '#156e9a',
        fontWeight: 'bold'
    },
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
        backgroundColor: '#f2f2f2',
        padding: 20,
        color: '#156e9a'
    },
    noList: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    noListText: {
        fontSize: 22,
        color: '#156e9a'
    },
})

export default TodoList
