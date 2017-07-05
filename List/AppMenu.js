import React, {Component,PropTypes} from 'react';
import {
    Dimensions,
    StyleSheet,
    ScrollView,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native';
const window = Dimensions.get('window');
const uri = 'https://pickaface.net/gallery/avatar/Opi51c74d0125fd4.png';

export default class AppMenu extends Component {
    static propTypes = {
        onItemSelected: React.PropTypes.func.isRequired,
    };

    render() {
        return (
            <ScrollView scrollsToTop={false} style={styles.menu}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={{ uri, }}/>
                    <Text style={styles.name}>YG2405</Text>
                </View>

                <TouchableOpacity style={styles.btnView} onPress={() => this.props.onItemSelected('Default')}>
                    <Text style={styles.btn}>
                        默认清单
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnView} onPress={() => this.props.onItemSelected('Custom')}>
                    <Text style={styles.btn}>
                        自定义清单
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.btnView}>
                    <Text style={styles.btn}>
                        状态清单
                    </Text>
                </TouchableOpacity>

                <View style={[styles.btnView,{borderBottomWidth:0}]}>
                    <Text style={styles.btn}>
                        固定清单
                    </Text>
                </View>

                <TouchableOpacity style={styles.itemView}>
                    <Text
                        style={styles.item}>
                        沙龙 2017.07.15
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemView}>
                    <Text
                        style={styles.item}>
                        店内会 2017.07.01
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.itemView}>
                    <Text
                        style={styles.item}>
                        学习会 2017.06.29
                    </Text>
                </TouchableOpacity>


                <TouchableOpacity style={styles.itemView}>
                    <Text
                        style={styles.item}>
                        店内会 2017.06.05
                    </Text>
                </TouchableOpacity>



            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: 'gray',
        padding: 20,
    },
    avatarContainer: {
        marginBottom: 20,
        marginTop: 20,
    },
    avatar: {
        width: 48,
        height: 48,
        borderRadius: 24,
        flex: 1,
    },
    name: {
        position: 'absolute',
        left: 70,
        top: 20,
    },

    btnView:{
        paddingTop:20,
        borderBottomWidth:1
    },

    btn:{
        fontSize: 25,
        fontWeight: '400',
    },

    itemView: {
        paddingTop: 15,
    },
    item: {
        fontSize: 20,
        fontWeight: '300',
    },
});

