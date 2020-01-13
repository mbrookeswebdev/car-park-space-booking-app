import React, {Component} from 'react';
import './ParkingSpace.css';
import MakeReservation from "../MakeReservation/MakeReservation";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";

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
        this.displayMessage2 = this.displayMessage2.bind(this);
    }

    displayMessage(status) {
        if (status) {
            this.setState({reserved: true, message: "Thank you, your reservation was successful."});
        }
    }

    displayMessage2(status) {
        if (!status) {
            this.setState({reserved: false, message2: "Sorry, only one reservation in progress is allowed."});
        }
    }

    render() {
        return (
            <div>
                <div style={{textAlign: "center", marginBottom: "2%"}}>
                    {this.state.reserved ? this.state.message : this.state.message2}
                </div>
                <GridList style={{marginLeft: "3%", marginRight: "3%", marginBottom: "30%"}}
                          cellHeight={'auto'}
                          cols={3}
                          spacing={5}>
                    {this.props.items.map((parkingSpace) => (parkingSpace.status === 'available' &&
                        <GridListTile
                            key={parkingSpace.ref}
                            cols={1}>
                            <h4>Parking bay no: {parkingSpace.id}</h4>
                            <MakeReservation displayMessage={this.displayMessage}
                                             displayMessage2={this.displayMessage2}
                                             parkingSpaceId={parkingSpace.id}
                                             carParkId={parkingSpace.car_park_id}
                                            />

                        </GridListTile>
                    ))}
                </GridList>
            </div>
        );
    }
}

export default ParkingSpace;