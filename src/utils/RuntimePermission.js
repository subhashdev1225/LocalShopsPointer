

import Geolocation from '@react-native-community/geolocation';
import { PermissionsAndroid, Alert} from 'react-native';



export async function request_device_location_runtime_permission(callback) {

    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                'title': 'LocalShop Location Permission',
                'message': 'LocalShop App needs access to your location '
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // Alert.alert("Location Permission Granted.");
            Geolocation.getCurrentPosition(
                (position) => {
                    callback(position)
                },
                (error) => { console.log(error); },
                { enableHighAccuracy: true, timeout: 30000 }
            )
        }
        else {
            Alert.alert("Location Permission Not Granted");
        }
    } catch (err) {
        console.warn(err)
    }
}
