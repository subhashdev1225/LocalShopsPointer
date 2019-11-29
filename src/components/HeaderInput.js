import React from 'react';
import {
    Text,
    View,
    TextInput,
    StyleSheet,
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


const HeaderInput = ({ onChangeText, inputValue, heading, btn }) => {
    return (
        <View style={styles.container}>
            <View style={styles.headingWrap}>
                <Text style={styles.heading}>{heading}</Text>
            </View>

            <View style={styles.imputWrap}>
                <TextInput style={styles.input}
                    placeholder='Enter Text'
                    placeholderTextColor='red'
                    onChangeText={onChangeText}
                    value={inputValue}
                />
                {btn}
            </View>
        </View>
    )
}

export default HeaderInput;



const styles = StyleSheet.create({
    container: {
        width: '100%'
    },
    listWrap: {
        flex: 1,
        paddingTop: 22,
        width: '100%'
    },
    headingWrap: {
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        width: '100%',
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,

        elevation: 9
    },
    heading: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        padding: 10,
    },
    input: {
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        fontSize: 20,
        height: 40,
        padding: 10,
        width: '75%',
        marginRight: 5
    },
    imputWrap: {
        flexDirection: 'row',
        width: '100%',
        marginBottom: 15,
        padding: 20,

    }

});


