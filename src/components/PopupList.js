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


state={
    shouldDisplay:false,
    selected:''
  };



const PopupList = (props) => {
    return (
        <View style ={styles.container}></View>
    )
}

export default PopupList;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'red',
    },
});
