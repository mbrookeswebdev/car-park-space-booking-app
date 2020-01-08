import React, {Component} from 'react';
import './ParkingSpace.css';
import MakeReservation from "../MakeReservation/MakeReservation";

class ParkingSpace extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Thank you, your reservation was successful.",
            reserved: null
        };
        this.displayMessage = this.displayMessage.bind(this);
    }

    displayMessage(status) {
        if (status) {
            this.setState({reserved: true});
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
                            <MakeReservation displayMessage={this.displayMessage} parkingSpaceId={parkingSpace.id}/>
                        </div>))}
                </div>
            </div>
        );
    }
}

export default ParkingSpace;