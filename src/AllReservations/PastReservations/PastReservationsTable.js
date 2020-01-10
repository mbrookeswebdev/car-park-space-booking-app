import React, {Component} from 'react';
import '../Reservations.css';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import uuid from 'react-uuid';

/**
 * PastReservations Component
 *
 * Displays a table with information about three latest completed reservations.
 */

class PastReservationsTable extends Component {
    render() {
        return (
            <div style={{marginLeft: "2%", marginRight: "2%"}}>
                <div style={{textAlign: "center"}}><h4>Past reservations:</h4></div>
                <div className="smallTable">
                    <Table size="small" aria-label="a dense table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="left">Reservation ID</TableCell>
                                <TableCell align="left">Date</TableCell>
                                <TableCell align="left">Price charged</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.pastReservations.map(row => (
                                <TableRow key={uuid()}>
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
                                <TableCell align="left">Reservation ID</TableCell>
                                <TableCell align="left">Start date</TableCell>
                                <TableCell align="left">End date</TableCell>
                                <TableCell align="left">Car reg no</TableCell>
                                <TableCell align="left">Price charged</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {this.props.pastReservations.map(row => (
                                <TableRow key={uuid()}>
                                    <TableCell align="left">{row.car_park_id}</TableCell>
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