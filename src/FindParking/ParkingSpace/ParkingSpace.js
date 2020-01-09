import React, {Component} from 'react';
import './ParkingSpace.css';
import MakeReservation from "../MakeReservation/MakeReservation";

/**
 * ParkingSpace Component
 *
 * Displays a div with a parking space number, status and Make Reservation button.
 */

class ParkingSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: '',
            message2: '',
            reserved: null
        };
        this.displayMessage = this.displayMessage.bind(this);
    }

    displayMessage(status) {
        if (status) {
            this.setState({reserved: true, message: "Thank you, your reservation was successful."});
        }
    }

    displayMessage2(status) {
        if (status) {
            this.setState({
                reserved: false,
                message: "Sorry, cannot reserve until the reservation in progress is paid for."
            });
        }
    }

    render() {
        return (
            <div>
                <div style={{textAlign: "center", marginBottom: "2%"}}>{this.state.reserved && this.state.message}</div>
                <div className="grid-container">
                    {this.props.items.map((parkingSpace) => (parkingSpace.status === 'available' &&
                        <div className="grid-item" key={parkingSpace.ref}>
                            <h4>Parking bay no: {parkingSpace.id}</h4>
                            <MakeReservation displayMessage={this.displayMessage} displayMessage2={this.displayMessage2}
                                             parkingSpaceId={parkingSpace.id} carParkId={parkingSpace.car_park_id}/>
                        </div>))}
                </div>
            </div>
        );
    }
}

export default ParkingSpace;