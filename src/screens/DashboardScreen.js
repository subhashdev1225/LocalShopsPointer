import React from 'react';
import CustomStyles from '../styles/CustomStyles'
import MapView, { PROVIDER_GOOGLE, Marker, Polygon, Circle, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { request_device_location_runtime_permission } from '../utils/RuntimePermission'
import Icon from 'react-native-vector-icons/FontAwesome';

import { View, Alert, Text, Platform, Image, TouchableOpacity, Dimensions, SafeAreaView } from 'react-native';
import RightAction from '../navigationComponents/RightAction';
import { MultiPickerMaterialDialog } from 'react-native-material-dialog';
import Loader from '../utils/Loader';

const screen = Dimensions.get('window');
const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = (screen.width - 200) / screen.height;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
import Global from '../utils/Global'

export default class DashboardScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            multiPickerVisible: false,
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
            addressComponent: '',
            opens_at: '',
            closes_at: '',
            titleName: '',
            markers: [],
            multiPickerSelectedItems: [],
            updatedArr: [],
            isloading: true,
            category: [],
            coordinates: [],
            region: {
                latitude: 37.779386,
                longitude: -122.4594065,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
            },
            selectedIndex: 0
        }
    }


    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
            headerTintColor: 'orange',
            headerStyle: {
                backgroundColor: 'white'
            },
            headerRight: () => <RightAction onRightPress={params._openRightPress} state={params.state} />,
        }
    };


    componentWillMount() {
        this.setState({
            category: Global.category,
            coordinates: Global.coordinates
        })
        this.showIndicator()
    }

    showIndicator() {
        setTimeout(() => {
            this.setState({
                isloading: false
            })
        }, 4000)
    }

    componentDidMount() {

        this.props.navigation.setParams({ _openRightPress: this._openRightPress, state: this.state });
        if (this.state.multiPickerSelectedItems.length > 0) {
            this.setState({ updatedArr: this.state.multiPickerSelectedItems })
        }

        else {
            this.setState({
                isloading: true
            });
            this.setState({ updatedArr: this.state.coordinates, selectedIndex: 0 })
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
        let marker = this.state.updatedArr[index]
        console.log('location', marker)
        this.setState({ titleName: marker.attributes.name, closes_at: marker.attributes.closes_at, opens_at: marker.attributes.opens_at })

        this._map.animateToRegion({
            latitude: marker.attributes.coordinates.latitude,
            longitude: marker.attributes.coordinates.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
        })
        this.state.markers[index].showCallout()
    }

    _onReset = () => {
        this.setState({ selectedIndex: 0 })
        let index = this.state.selectedIndex
        let marker = this.state.updatedArr[index]
        this._map.animateToRegion({
            latitude: marker.attributes.coordinates.latitude,
            longitude: marker.attributes.coordinates.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
        })
        this.state.markers[index].showCallout()
    }

    _onRefreshPress = () => {

        this.showIndicator()
        this.setState({ updatedArr: this.state.coordinates, multiPickerSelectedItems: [], isloading: true })
        this.setState({ selectedIndex: 0 })
        let index = this.state.selectedIndex
        let marker = this.state.coordinates[index]
        console.log('--->', this.state.multiPickerSelectedItems);
        this.setState({ titleName: marker.attributes.name, closes_at: marker.attributes.closes_at, opens_at: marker.attributes.opens_at })


        this._map.animateToRegion({
            latitude: marker.attributes.coordinates.latitude,
            longitude: marker.attributes.coordinates.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
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

        let marker = this.state.updatedArr[index]
        console.log('location', marker)
        this.setState({ titleName: marker.attributes.name, closes_at: marker.attributes.closes_at, opens_at: marker.attributes.opens_at })

        this._map.animateToRegion({
            latitude: marker.attributes.coordinates.latitude,
            longitude: marker.attributes.coordinates.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,

        })
        this.state.markers[index].showCallout()
    }


    _onMarkerPress = (marker, index) => {

        this.setState({ selectedIndex: index })

        this.setState({ titleName: marker.attributes.name, closes_at: marker.attributes.closes_at, opens_at: marker.attributes.opens_at })

        this._map.animateToRegion({
            latitude: marker.attributes.coordinates.latitude,
            longitude: marker.attributes.coordinates.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
        })
        this.state.markers[index].showCallout()
    }



    _onCurrentLocationPress = () => {

        this._map.animateToRegion({
            latitude: this.state.latitude,
            longitude: this.state.longitude,
            latitudeDelta: 0.09,
            longitudeDelta: 0.035,
        })
    }



    render() {

        return (
                <View style={CustomStyles.container}>
                    <Loader
                        loading={this.state.isloading} />

                    <MultiPickerMaterialDialog
                        title={'Select Category to display on Map'}
                        colorAccent={this.props.colorAccent}

                        items={this.state.category.map((row, index) => {
                            return { value: row, label: row.attributes.title + "\n" + row.attributes.description };
                        })}
                        visible={this.state.multiPickerVisible}
                        selectedItems={this.state.multiPickerSelectedItems}

                        onCancel={() => this.setState({ multiPickerVisible: false })}
                        onOk={result => {
                            var pinArr = []
                            for (i = 0; i < result.selectedItems.length; i++) {
                                pinArr.push(result.selectedItems[i]['value'])
                            }

                            var filteredPinArr = []
                            filteredPinArr = this.filterData(pinArr)

                            console.log('filtered data--->>', filteredPinArr);

                            if (filteredPinArr.length > 0) {
                                this.setState({ updatedArr: filteredPinArr })
                            } else {
                                this.setState({ updatedArr: this.state.coordinates })
                            }
                            this.setState({ multiPickerVisible: false, selectedIndex: 0 });
                            this._onReset()
                        }}
                    />

                    <View style={CustomStyles.mapContainer}>
                        <MapView
                            provider={PROVIDER_GOOGLE}
                            ref={map => this._map = map}
                            showsUserLocation={true}
                            style={CustomStyles.map}
                            zoomEnabled={true}
                            scrollEnabled={true}
                            zoomControlEnabled={true}
                            initialRegion={this.state.region}
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
                                        <Text>{this.state.coordinates.length > 0 ? `My home distance : ${this.state.coordinates.length} km` : 'Not hello'}</Text>
                                        <Text>ADDRESS: HOME</Text>
                                    </View>

                                </Callout>
                            </Marker>


                            {/* MARKER POint */}
                            {
                                this.state.updatedArr.map((marker, index) => (
                                    <MapView.Marker
                                        onPress={() => this._onMarkerPress(marker, index)}
                                        key={marker.attributes.name}
                                        ref={ref => this.state.markers[index] = ref}
                                        coordinate={{ latitude: marker.attributes.coordinates.latitude, longitude: marker.attributes.coordinates.longitude }}
                                        title={marker.attributes.name}
                                    // description={marker.attributes.opens_at}
                                    >
                                        <Image
                                            style={{ width: 45, height: 45 }}
                                            source={this.renderIcon(marker)}
                                        />
                                    </MapView.Marker>
                                ))
                            }
                        </MapView>
                        <View style={{ position: 'absolute', right: 10, bottom: 10, }}>
                            <TouchableOpacity style={{}}
                                onPress={this._onCurrentLocationPress}>
                                <Image
                                    style={{ width: 40, height: 40, padding: 0 }}
                                    source={require('../assets/mapicons/markercurrent.png')}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>



                    <View style={CustomStyles.bottomView}>

                        <View style={CustomStyles.btnView}>

                            <TouchableOpacity style={{ padding: 10, marginBottom: 5 }}
                                onPress={this._onPrevPress}>
                                <Image
                                    style={{ width: 40, height: 40, padding: 0 }}
                                    source={require('../assets/mapicons/leftarrow.png')}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ padding: 10, marginBottom: 5 }}
                                onPress={this._onRefreshPress}>
                                <Image
                                    style={{ width: 40, height: 40, padding: 0 }}
                                    source={require('../assets/mapicons/reseticon.png')}
                                />
                            </TouchableOpacity>

                            <TouchableOpacity style={{ padding: 10, marginBottom: 5 }}
                                onPress={this._onNextPress}>
                                <Image
                                    style={{ width: 40, height: 40, padding: 0 }}
                                    source={require('../assets/mapicons/rightarrow.png')}
                                />
                            </TouchableOpacity>

                        </View>
                        <View style={CustomStyles.detailsContainer}>
                            <Text style={CustomStyles.titleText}>Address</Text>

                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <Text style={CustomStyles.title1Text}>Shop name:</Text>
                                <Text style={CustomStyles.title1Text}>{this.state.titleName}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <Text style={CustomStyles.title1Text}>Open time:</Text>
                                <Text style={CustomStyles.title1Text}> {this.state.opens_at}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', width: '100%' }}>
                                <Text style={CustomStyles.title1Text}>Close time:</Text>
                                <Text style={CustomStyles.title1Text}> {this.state.closes_at}</Text>
                            </View>

                        </View>
                    </View>
                </View>

        )
    }


    //----
    renderIcon(marker) {

        if (marker.type === 'Bookshops') {
            return require('../assets/mapicons/markerbook.png')
        } else if (marker.type === 'MedicineShop') {
            return require('../assets/mapicons/markermedicine.png')
        }
        else {
            return require('../assets/mapicons/flowerShop.png')
        }
    }


    filterData(pinArr) {
        var filteredLocArray = []

        for (index = 0; index < pinArr.length; index++) {
            let category = pinArr[index]

            for (innerindex = 0; innerindex < this.state.coordinates.length; innerindex++) {
                let location = this.state.coordinates[innerindex]
                if (location.attributes.category_id === category.id) {
                    filteredLocArray.push(location)
                }
            }
        }
        return filteredLocArray
    }

}

