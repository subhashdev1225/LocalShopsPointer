

import React from 'react';
import {createStackNavigator} from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation';
import DetailScreen from '../screens/DetailScreen';
import MapScreen from '../screens/MapScreen';
import DashboardScreen from '../screens/DashboardScreen'
import MultiSelectDropDown from '../components/MultiSelectDropDown'

class Navigator extends React.Component {
  render(){
    return(
      <AppContainer/>
    )
  }
}
const HomeStack =  createStackNavigator ({
  DashboardScreen: {
    screen: DashboardScreen,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'Local Shops',
      };
    }
  },
  DetailScreen: {
    screen: DetailScreen,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'Detail',
      };
    }
  },
  MapScreen: {
    screen: MapScreen,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'MapScreen',
      };
    }
  },
  MultiSelectDropDown: {
    screen: MultiSelectDropDown,
    navigationOptions : ({navigation}) => {
      return {
        headerTitle : 'Select Shop',
      };
    }
  },
  


});

const AppContainer = createAppContainer(HomeStack)

export default Navigator;
 

