


import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import HeaderInput from '../components/HeaderInput'

export default class DetailScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      index: props.navigation.state.params.index,
      inputValue: props.navigation.state.params.listData.text
    }
  }

  static navigationOptions = {
    title: 'Detail Page',
  };


  onChangeText = (params) => {
    this.setState({
      inputValue: params
    })

  }


  updateListData = () => {

    const { goBack, state } = this.props.navigation;
    const { inputValue, index } = this.state

    if (inputValue.trim() === '') {
      Alert.alert('Please enter updated text')
    }
    else {
      state.params.updateList(inputValue, index)
      goBack()
    }
  }



  render() {

    return (
      <HeaderInput heading='Edit TODO: LIST' onChangeText={this.onChangeText} inputValue={this.state.inputValue} btn={<Icon.Button
        name="check-circle"
        backgroundColor="#3b5998"
        onPress={this.updateListData}
      ></Icon.Button>} />
    );

  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center'
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
    marginBottom: 15
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
    padding: 20
  }
});

