import React from 'react';
import CustomStyles from '../styles/CustomStyles'
import MapView, { PROVIDER_GOOGLE, Marker, Polygon, Circle, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request_device_location_runtime_permission } from '../utils/RuntimePermission'
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Alert, Text, Platform } from 'react-native';

import RightAction from '../navigationComponents/RightAction';

import { MultiPickerMaterialDialog } from 'react-native-material-dialog';



export default class DashboardScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            multiPickerVisible: false,
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            addressComponent: '',
            markers: [],
            multiPickerSelectedItems: [],
            updatedArr: [],
            coordinates: [
                {
                    id: '1',
                    name: 'Shop1 TIG',
                    latitude: 37.8025259,
                    longitude: -122.4351431,
                    description: 'hey 1',
                },
                {
                    id: '2',
                    name: 'Shop2 TIG',
                    latitude: 37.7896386,
                    longitude: -122.421646,
                    description: 'hey 2',
                },
                {
                    id: '3',
                    name: 'Shop3 TIG',
                    latitude: 37.7665248,
                    longitude: -122.4161628,
                    description: 'hey 3',
                },
                {
                    id: '4',
                    name: 'Shop4 TIG',
                    latitude: 37.7948605,
                    longitude: -122.4596065,
                    description: 'hey 4',
                },
                {
                    id: '5',
                    name: 'Shop5 TIG',
                    latitude: 37.8025259,
                    longitude: -122.4596065,
                    description: 'hey 5',
                }
            ],
            selectedIndex: 0
        }
    }


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTintColor: 'white',
            headerStyle: {
                backgroundColor: 'rgba(59, 89, 152,1.0)'
            },
            headerRight: () => <RightAction img={'filter'} onRightPress={params._openRightPress} state={params.state} />,
        }
    };





    componentDidMount() {

        this.props.navigation.setParams({ _openRightPress: this._openRightPress, state: this.state });

        
        if (this.state.multiPickerSelectedItems.length > 0) {
            this.setState({ updatedArr: this.state.multiPickerSelectedItems })
        }
        else {
            this.setState({ updatedArr: this.state.coordinates })
        }


        if (Platform.OS === 'android') {
            request_device_location_runtime_permission(this.getLocation);
        } else {
            if (Platform.OS === 'ios') {
                Geolocation.getCurrentPosition(
                    (position) => {
                        this.setState({
                            latitude: position.coords.latitude,
                            longitude: position.coords.longitude,
                        })
                    },
                    (error) => { console.log(error); },
                    { enableHighAccuracy: true, timeout: 30000 }
                )
            }
        }
    }

    getLocation = position => {
        this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
        })
    }


    // button Click


    _markerClick = () => {
        Alert.alert('Test')
    }

    _callOutClick = () => {
        Alert.alert(
            'Welcome Home',
            'food is good here',
            [
                {
                    text: 'Dismiss',
                    style: 'cancel'
                },
                {
                    text: 'Proceed',
                }
            ]
        )
    }

    _openRightPress = () => {
        this.setState({ multiPickerVisible: true })
    }



    _onPrevPress = () => {
        console.log('state', this.state.selectedIndex)
        let index = this.state.selectedIndex

        if (index > -1) {
            this.setState({ selectedIndex: this.state.selectedIndex - 1 });
        } else {
            index = this.state.updatedArr.length - 1
            this.setState({ selectedIndex: index })
        }

        console.log('select', index)

        let location = this.state.updatedArr[index]
        console.log('location', location)

        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
        })
        this.state.markers[index].showCallout()

    }

    _onReset=() =>{
        this.setState({ selectedIndex: 0 })
        let index = this.state.selectedIndex

        let location = this.state.updatedArr[index]

        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
        })
        this.state.markers[index].showCallout()
    }

    _onRefreshPress = () => {

        var pinArr = []
        this.setState({updatedArr:this.state.coordinates, multiPickerSelectedItems:pinArr})
        this.setState({ selectedIndex: 0 })
        let index = this.state.selectedIndex

        let location = this.state.coordinates[index]

        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
        })
        this.state.markers[index].showCallout()
    }

    _onNextPress = () => {
        console.log('state', this.state.selectedIndex)
        let index = this.state.selectedIndex

        if (index > this.state.updatedArr.length - 1) {
            index = 0
            this.setState({ selectedIndex: index })

        } else {
            this.setState({ selectedIndex: this.state.selectedIndex + 1 });
        }

        console.log('select', index)

        let location = this.state.updatedArr[index]
        console.log('location', location)

        this._map.animateToRegion({
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
        })
        this.state.markers[index].showCallout()
    }


    _onMarkerPress = (marker, index) => {
        console.log('button clicked', index, marker)
        this.setState({ selectedIndex: index })

        let loc = this.state.updatedArr[index]
        this._map.animateToRegion({
            latitude: loc.latitude,
            longitude: loc.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
        })

        this.state.markers[index].showCallout()
    }



    _onCurrentLocationPress = () => {

        this._map.animateToRegion({
            latitude: this.state.latitude,
            longitude: this.state.longitude,

            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
        })
    }



    render() {

        return (
            <View style={CustomStyles.container}>


                <MultiPickerMaterialDialog
                    title={'Select Shops'}
                    colorAccent={this.props.colorAccent}
                    items={this.state.coordinates.map((row, index) => {
                        return { value: row, label: row.name+"\n"+row.description};
                    })}
                    visible={this.state.multiPickerVisible}
                    selectedItems={this.state.multiPickerSelectedItems}
                    onCancel={() => this.setState({ multiPickerVisible: false })}
                    onOk={result => {

                        var pinArr = []
                        for (i = 0; i < result.selectedItems.length; i++) {
                            pinArr.push(result.selectedItems[i]['value'])
                          }

                        this.setState({multiPickerVisible: false  ,selectedIndex: 0 }); 

                        if (pinArr.length >0){
                            this.setState({updatedArr:pinArr,multiPickerSelectedItems: pinArr})
                            this._onReset
                        }else{
                            this.setState({updatedArr:this.state.coordinates})
                            this._onReset
                        }

                    }}
                />
                
                <MapView
                    provider={PROVIDER_GOOGLE}
                    ref={map => this._map = map}
                    showsUserLocation={true}
                    style={CustomStyles.map}
                    zoomEnabled={true}
                    scrollEnabled={true}
                    moveOnMarkerPress={true}
                    zoomControlEnabled={true}

                    initialRegion={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.035,
                    }}
                >

                    <Marker
                        coordinate={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude
                        }}
                        title={"Home"}
                        description={"My home Address-----"}
                    >
                        <Icon name="home" size={30} color="#900" />

                        <Callout
                            onPress={this._callOutClick}
                        >
                            <View style={CustomStyles.calloutContainer}>
                                <Icon name="home" size={30} color="#900" />
                                <Text>INteresting PLACE</Text>
                                <Text>ADDRESS: HOME</Text>
                            </View>

                        </Callout>
                    </Marker>


                    {/* MARKER POint */}

                    {
                        this.state.updatedArr.map((marker, index) => (

                            <Marker
                                onPress={() => this._onMarkerPress(marker, index)}
                                key={marker.name}
                                ref={ref => this.state.markers[index] = ref}
                                coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
                                title={marker.name}
                                description={marker.description}
                            >
                                <Callout>
                                    <Icon name="map-marker" size={30} color="#900" />
                                    <Text>Name: {marker.name}</Text>
                                    <Text>Address: {marker.description}</Text>

                                </Callout>

                            </Marker>
                        ))
                    }
                </MapView>


                <View style={CustomStyles.bottomView}>

                    <Icon.Button
                        name="arrow-circle-left"
                        backgroundColor="#3b5998"
                        onPress={this._onPrevPress}
                    >Prev</Icon.Button>
                    <Icon.Button
                        name="refresh"
                        backgroundColor="#3b5998"
                        onPress={this._onRefreshPress}
                    >Reset</Icon.Button>

                    <Icon.Button
                        name="arrow-circle-right"
                        backgroundColor="#3b5998"
                        onPress={this._onNextPress}
                    >Next</Icon.Button>

                    <Icon.Button
                        name="location-arrow"
                        backgroundColor="#3b5998"
                        onPress={this._onCurrentLocationPress}
                    ></Icon.Button>
                </View>
            </View>
        )

    }


}
