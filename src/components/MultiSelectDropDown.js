import React, { Component } from 'react';
import { View, Text, Picker, StyleSheet, SafeAreaView } from 'react-native';
import MultiSelect from 'react-native-multiple-select';


  export default class MultiSelectDropDown extends Component {

      constructor(props) {
        super(props)
        this.state = {
            selectedItems: [],
            items: props.navigation.state.params.items,
        }
      }


      onSelectedItemsChange = selectedItems => {
        this.setState({ selectedItems});
      };
     
      render() {
        const { selectedItems,items } = this.state;
        console.log('------->>>',items);
        
        return (
          <SafeAreaView style={{ flex: 1 }}>
            <View style={{ flex: 1, padding: 30 }}>
              <MultiSelect
                hideTags
                items={items}
                uniqueKey="id"
                ref={component => {
                  this.multiSelect = component;
                }}
                onSelectedItemsChange={this.onSelectedItemsChange}
                selectedItems={selectedItems}
                selectText="Pick Items"
                searchInputPlaceholderText="Search Items..."
                onChangeInput={text => console.log(text)}
                tagRemoveIconColor="#CCC"
                tagBorderColor="#CCC"
                tagTextColor="#CCC"
                selectedItemTextColor="blue"
                selectedItemIconColor="#CCC"
                itemTextColor="#000"
                displayKey="name"
                searchInputStyle={{ color: '#CCC' }}
                submitButtonColor="#48d22b"
                submitButtonText="Submit"

              />
            </View>
          </SafeAreaView>
        );
      }



      updateListData = () => {

        const { goBack, state } = this.props.navigation;
        const { selectedItems } = this.state
    
        if (inputValue.trim() === '') {
          Alert.alert('Please enter updated text')
        }
        else {
          state.params.updateList(selectedItems)
          goBack()
        }
      }



  }
