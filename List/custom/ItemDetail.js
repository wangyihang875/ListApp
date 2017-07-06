import React, {Component} from 'react';
import {View, Text, TextInput, TouchableHighlight, ScrollView, StyleSheet, Alert} from 'react-native';
import {observer} from 'mobx-react/native';
import DatePicker from 'react-native-datepicker';

@observer
export default class ItemDetail extends Component {
    constructor(props) {
        super(props)
        this.state = {
            endDate: props.todo.endDate,
        }
    }

    updateTitle = (text) => {
        const {todo} = this.props;
        todo.title = text;
    }

    updateRemark = (text) => {
        const {todo} = this.props;
        todo.remark = text;
    }

    onDateChangeHandler = (date)=>{
        const {todo} = this.props;
        this.setState({endDate:date});
        todo.endDate = date;
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

                <View style={styles.date}>
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
                        onDateChange={this.onDateChangeHandler}
                    />
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

    date:{
        borderColor: '#bbbbbb',
        borderBottomWidth: 1,
        marginLeft: 20,
        paddingVertical:10,

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

