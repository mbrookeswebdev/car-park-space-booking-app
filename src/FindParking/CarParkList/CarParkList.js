import React, {Component} from 'react';
import ParkingSpaceList from "../ParkingSpaceList/ParkingSpaceList";

class ParkingSpacesList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            parkingSpacesSearchRun: false,
            parkingSpaces: []
        };
        this.handleLinkClick = this.handleLinkClick.bind(this);
    }

    handleLinkClick() {
        this.setState({parkingSpacesSearchRun: true, parkingSpaces: this.props.results[0].parking_spaces});
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                {this.props.results.map((location) => (
                    <h3 key={location.id} onClick={this.handleLinkClick}>{location.address}</h3>
                ))}

                <div style={{textAlign: "center", marginTop: "3%"}}>
                    {this.state.parkingSpacesSearchRun && (
                        <ParkingSpaceList results={this.state.parkingSpaces}/>)}</div>
            </div>
        );
    }
}

export default ParkingSpacesList;