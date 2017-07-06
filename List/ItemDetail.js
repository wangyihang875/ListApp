import React, {Component} from 'react'
import {View, Text, TextInput, TouchableHighlight, ScrollView, StyleSheet, Alert} from 'react-native'
import {observer} from 'mobx-react/native'

@observer
export default class ItemDetail extends Component {
    constructor() {
        super()

    }

    updateTitle = (text) => {
        const {todo} = this.props;
        todo.title = text;
    }

    updateRemark = (text) => {
        const {todo} = this.props;
        todo.remark = text;
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

                    <TextInput style={styles.input} placeholder="添加标题" placeholderTextColor="#bbbbbb"
                               onChangeText={(text) => this.updateTitle(text)}>{todo.title}</TextInput>
                </View>

                <View>

                    <TextInput style={styles.inputMulti} multiline={true}
                               numberOfLines={10} placeholder="添加备注" placeholderTextColor="#bbbbbb"
                               onChangeText={(text) => this.updateRemark(text)}>{todo.remark}</TextInput>
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
    input: {
        height: 50,
        borderColor: '#bbbbbb',
        borderBottomWidth: 1,
        marginLeft: 20,
        fontSize: 20,
        color: '#666666'
    },

    inputMulti: {
        marginTop: 10,
        textAlignVertical: 'top',
        marginLeft: 20,
        fontSize: 20,
        color: '#666666'
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
    closeButton: {
        position: 'absolute',
        right: 17,
        top: 18,
        fontSize: 36
    },
})

