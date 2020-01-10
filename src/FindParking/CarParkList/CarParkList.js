import React, {Component} from 'react';
import ParkingSpaceList from "../ParkingSpaceList/ParkingSpaceList";

/**
 * ParkingSpacesList Component
 *
 * Displays a car park that matches the entered post code.
 * On click displays a list of available parking spaces.
 */

class CarParkList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parkingSpacesSearchRun: false,
            parkingSpaces: [],
            selectedCarParkId: null,
            selectedCarParkAddress: null
        };
        this.handleLinkClick = this.handleLinkClick.bind(this);
        this.findParkingSpaces = this.findParkingSpaces.bind(this);
    }

    handleLinkClick(id) {
        this.setState({
            parkingSpacesSearchRun: true,
            selectedCarParkId: id
        });
        this.findParkingSpaces(id);
    }

    findParkingSpaces(id) {
        let selectedCarPark = this.props.results.filter(carPark => carPark.id === id);
        let selectedSpaces = selectedCarPark[0].parking_spaces;
        this.setState({
            selectedCarParkAddress: selectedCarPark[0].address,
            parkingSpaces: selectedSpaces,
        });
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>

                {!this.state.parkingSpacesSearchRun &&
                <div>
                    {this.props.results.map((location) => (
                        <h3 key={location.id} onClick={() => this.handleLinkClick(location.id)}>{location.address}</h3>
                    ))}</div>}

                <div style={{textAlign: "center", marginTop: "3%"}}>
                    {this.state.parkingSpacesSearchRun && (
                        <ParkingSpaceList carParkAddress={this.state.selectedCarParkAddress}
                                          results={this.state.parkingSpaces}/>)}</div>
            </div>
        );
    }
}

export default CarParkList;