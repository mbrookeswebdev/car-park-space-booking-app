import React, {Component} from 'react';
import ParkingSpace from "../ParkingSpace/ParkingSpace";

class ParkingSpaceList extends Component {

    render() {
        return (
            <div style={{textAlign: "center", marginTop: "3%"}}>
                {this.props.results.length === 0 && (
                    <h4>Sorry, this car park does not have any parking spaces available. Try again later.</h4>
                )}

                <div style={{textAlign: "center", marginTop: "3%"}}>
                    {this.props.results.length > 0 &&
                    <ParkingSpace items={this.props.results}/>
                    }</div>
            </div>
        );
    }
}

export default ParkingSpaceList;