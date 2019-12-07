import React, { Component } from 'react';
import {View, Text} from 'react-native';


class CalloutComponent extends Component {


    render() {
        return (
            <div>
                
            </div>
        )
    }



    renderIcon() {
        if (this.props.event.type === 'Event') {
            return (
                <Image
                    source={this.markerIcon(this.props.event.interest[0])}
                />
            )
        }
    }




}



export default CalloutComponent;
