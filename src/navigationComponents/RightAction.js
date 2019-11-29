
import React, { Component } from 'react';

import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


export default class RightAction extends Component {

  render() {

    const { onRightPress, imgName, state } = this.props
    return (
      <Icon.Button
      style = {{height:40, width : 40}}
        name='filter'
        backgroundColor="#3b5998"
        onPress={() => onRightPress(state)}
      >      </Icon.Button>


    );
  }
}


