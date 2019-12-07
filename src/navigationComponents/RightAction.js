
import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';


export default class RightAction extends Component {

  render() {

    const { onRightPress, state } = this.props
    return (
      <TouchableOpacity style={{ padding: 10, marginBottom: 5 }}
        onPress={() => onRightPress(state)}>
        <Image
          style={{ width: 40, height: 40, padding: 0 }}
          source={require('../assets/mapicons/filter.png')}
        />
      </TouchableOpacity>
    );
  }
}


