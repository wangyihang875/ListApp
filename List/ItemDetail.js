import React, {Component} from 'react'
import {View, Text, TextInput, TouchableHighlight, ScrollView, StyleSheet, Alert} from 'react-native'
import {observer} from 'mobx-react/native'

@observer
export default class ItemDetail extends Component {
    constructor() {
        super()
        this.state = {}
    }

    render() {
        const {listName, todo} = this.props
        return (
            <View style={{flex:1,backgroundColor:'#ffffff'}}>
                <View style={styles.heading}>
                    <Text style={styles.headingText}>{listName}</Text>
                    <Text
                        onPress={this.props.navigator.pop}
                        style={styles.closeButton}>&times;</Text>
                </View>

                <View>
                    <Text>标题</Text>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}>{todo.title}</TextInput>
                </View>

                <View>
                    <Text>描述</Text>
                    <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1}}>{todo.remark}</TextInput>
                </View>


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
        borderBottomWidth: 1,
        borderBottomColor: '#ededed',
        flexDirection: 'row'
    },
    item: {
        color: '#156e9a',
        fontSize: 18,
        flex: 3,
        padding: 20
    },
    deleteItem: {
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
    closeButton: {
        position: 'absolute',
        right: 17,
        top: 18,
        fontSize: 36
    },
})

