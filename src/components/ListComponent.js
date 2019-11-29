import React from 'react';
import {
    Text,
    View,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';



const renderItem = (item, markedCheckAndUncheck) => {
    console.log('itemn', item);
    return (
        <View style={styles.component}>

            <View>
                <Text style={styles.item}>{item.index + 1} {item.item.text} </Text>
            </View>

            <View style={styles.buttonWrap}>
                <Icon.Button style={styles.button}
                    name="edit"
                    backgroundColor="#fff"
                    color='#333'
                    onPress={() => markedCheckAndUncheck(item.index, 'edit')}
                />

                <Icon.Button
                    name="check"
                    backgroundColor="#fff"
                    color={item.item.checked ? '#0f0' : '#ccc'}
                    onPress={() => markedCheckAndUncheck(item.index, 'check')}
                />

                <Icon.Button
                    name="trash"
                    backgroundColor="#fff"
                    color='#f00'
                    onPress={() => markedCheckAndUncheck(item.index, 'delete')}
                />

            </View>

        </View>


    )
}

_onPress = () => {
    Alert.alert('hi')
};

const ListView = (props) => {
    return (
        <View>
            <View style={styles.headerWrap}>
                <Text style={styles.headerItem}> List</Text>
            </View>
            <View style={styles.listWrap}>
            {/* FlatList inherits ScrollView's props, so solution for ScrollView will work: */}
            <FlatList  contentContainerStyle ={{ flexGrow: 1 }} data={props.list} renderItem={item => renderItem(item, props.markedCheckAndUncheck)} keyExtractor={(item, index) => index} />
       </View>
       
        </View>
    )
}


const styles = StyleSheet.create({
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
    headerItem: {
        fontSize: 30,
        height: 44,
    },
    headerWrap: {
        width: '100%',
        backgroundColor: 'gray',
    },
    list: {
       padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9
    },
listWrap:{
    flex: 1,
    padding: 10,
    marginBottom:10,
    width: '100%',
    height: 500,
    backgroundColor:'red',
    // overflow:'scroll'
},
    buttonWrap: {
        flexDirection: 'row',
        padding: 10,
        marginLeft: 'auto'
    },
    component: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 5,
        backgroundColor: '#FFF',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9
    },


    button: {
        padding: 10
    }

})




export default ListView