import React, {Component} from 'react';
import '../Reservations.css';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

class PastReservationsTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null
        };
    }

    componentDidMount() {
        let id = localStorage.getItem('id');
        this.setState({user_id: id});
    }

    render() {
        return (
            <div style={{marginLeft: "2%", marginRight: "2%"}}>
                <div style={{textAlign: "center"}}><h4>Past reservations:</h4></div>
                <div className="smallTable">
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Price</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.pastReservations.map(row => (
                                <TableRow key={row.startDate}>
                                    <TableCell align="left">{row.id}</TableCell>
                                    <TableCell align="left">{row.endDate}</TableCell>
                                    <TableCell align="left">{row.priceCharged}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="largeTable">
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Car park</TableCell>
                                <TableCell align="left">Parking space</TableCell>
                                <TableCell align="left">ID</TableCell>
                                <TableCell align="left">Start date</TableCell>
                                <TableCell align="left">End date</TableCell>
                                <TableCell align="left">Car reg no</TableCell>
                                <TableCell align="left">Price charged</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.pastReservations.map(row => (
                                <TableRow key={row.startDate}>
                                    <TableCell align="left">{row.carPark}</TableCell>
                                    <TableCell align="left">{row.parking_space_id}</TableCell>
                                    <TableCell align="left">{row.id}</TableCell>
                                    <TableCell align="left">{row.startDate}</TableCell>
                                    <TableCell align="left">{row.endDate}</TableCell>
                                    <TableCell align="left">{row.regNo}</TableCell>
                                    <TableCell align="left">{row.priceCharged}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        );
    }
}

export default PastReservationsTable;