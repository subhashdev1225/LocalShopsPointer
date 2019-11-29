
import React, { Component } from 'react';
import { View, Alert, Platform } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import Geolocation from '@react-native-community/geolocation';

import { request_device_location_runtime_permission,request_CAMERA_runtime_permission } from '../utils/RuntimePermission'

const googleApiKey = 'AIzaSyD6rtpWfWY40e7vakiQ4XNH8vMelE32COk';


export default class MapScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            country: null,
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
            addressComponent: ''
        }
    }

    componentDidMount() {
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
                        this.getLocationDetails(position.coords.latitude, position.coords.longitude)
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
        this.getLocationDetails(position.coords.latitude, position.coords.longitude)
    }

    // get user location
    getLocationDetails(latitude, longitude) {
        Geocoder.init(googleApiKey);
        Geocoder.from(latitude, longitude)
            .then(json => {
                var addressComponent = json.results[0].address_components[0];
                console.log(addressComponent);
            })
            .catch(error => console.warn(error));
    }

    render() {
        return (
            <View>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={{ height: '100%' }}
                    showsUserLocation={true}
                    showsTraffic={true}
                    scrollEnabled={true}
                    region={{
                        latitude: this.state.latitude,
                        longitude: this.state.longitude,
                        latitudeDelta: 0.015,
                        longitudeDelta: 0.0121,
                    }}>
                    <Marker
                        coordinate={{
                            latitude: this.state.latitude,
                            longitude: this.state.longitude
                        }}
                        title={"AGREEYA"}
                        description={"OFFICE"}
                    />
                </MapView>
            </View>
        )
    }
}