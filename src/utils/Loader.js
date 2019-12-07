import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  ActivityIndicator
} from 'react-native';

const Loader = props => {
  const {
    loading,
    ...attributes
  } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator color = 'red'
          style = {{alignSelf : 'center'}}
            animating={loading} />
            <Text style={{color : 'white',padding:5, fontSize:15}}>Loading</Text>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
  },
  activityIndicatorWrapper: {
    backgroundColor: 'rgba(67,167,211,1)',
    height: 100,
    width: 100,
    borderRadius: 15,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Loader;