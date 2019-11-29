import React, { Component } from 'react'
import { View, TouchableOpacity, StyleSheet, FlatList, Text } from 'react-native'

export default class Dropdown extends Component {
    state = {
        open: false
    }
    handleDropdownClick = () => {
        this.setState(oldSate => {
            return {
                open: !oldSate.open
            }
        })
    }

    renderItem = item => {
        console.log('dd', item);
        
        return <Text>{item.item}</Text>
    }
    render() {
        const { children, data, renderItem } = this.props
        const { open } = this.state
        return (
            <View style={styles.dropdownContainer}>
                <TouchableOpacity onPress={this.handleDropdownClick}>{children}
                {open && <View style={styles.dropdown}>
                    <FlatList data={data} renderItem={renderItem || this.renderItem} ></FlatList>
                </View>}
                </TouchableOpacity>
            </View>
        )
    }
}




const styles = StyleSheet.create({
    dropdownContainer: {
        position: 'relative'
    },
    dropdown: {
        maxHeight: 300,
        position: 'absolute',
        width: '100%',
        minWidth: 300,
        backgroundColor: 'red',
        right: 15,
        top: '100%',
        padding: 15
    }
})