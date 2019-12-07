import { StyleSheet } from 'react-native';




export default StyleSheet.create({

    container: {
        flex: 1,
        elevation: 5,
    },
    titleText: {
        color: 'rgba(106,167,211,1)',
        paddingTop: 10,
        paddingLeft: 10,
        fontFamily: 'Arial',
        fontSize: 20,
        fontWeight: 'bold',
    },
    title1Text: {
        paddingTop: 15,
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: 'bold',
    },
    subTitleText: {
        color: 'rgba(106,167,211,1)',
        paddingTop: 7,
        paddingLeft: 10,
        fontSize: 15,
        fontWeight: 'normal',

    },
    detailsContainer: {
        elevation: 10,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        padding: 10
    },
    map: {
        ...StyleSheet.absoluteFillObject,

    },
    mapContainer: {
        height: '70%'
    },
    bottomView: {
        width: '100%',
        height: '20%',
        flexDirection: 'column',
        padding:0,
    },
    btnView: {
        width: '100%',
        height: 50,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    calloutContainer: {
        height: 100,
        width: 200
    },

});




