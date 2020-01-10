import React, {Component} from 'react';
import axios from "axios";
import SimpleBottomNavigation from "../Main/SimpleBottomNavigation/SimpleBottomNavigation";
import CurrentReservationsTable from "./CurrentReservations/CurrentReservationsTable";
import PastReservationsTable from "./PastReservations/PastReservationsTable";
import Header from "../Main/Header/Header";
import moment from 'moment';
import Grid from "@material-ui/core/Grid";

/**
 * AllReservations Component
 *
 * Requests and sorts reservation data and passes it to it's children components - Current and Past Reservations.
 */

class AllReservations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_id: null,
            allReservations: [],
            currentReservations: [],
            pastReservations: [],
            paid: null,
            message: ''
        };
        this.getReservations = this.getReservations.bind(this);
        this.sortReservations = this.sortReservations.bind(this);
        this.handlePayment = this.handlePayment.bind(this);
    }

    componentDidMount() {
        let id = localStorage.getItem('id');
        this.getReservations(id);
        this.setState({user_id: id});
    }

    async getReservations(user_id) {
        try {
            const response = await axios.get('http://localhost:8000/api/reservations/' + user_id);
            const sortedData = this.sortReservations(response.data);
            this.setState({currentReservations: sortedData[0], pastReservations: sortedData[1]});
        } catch (error) {
            console.error(error);
        }
    }

    sortReservations(data) {
        const currentReservations = data.filter(reservation => reservation.endTime === null);
        const pReservations = data.filter(reservation => reservation.endTime !== null);
        const pastReservations = (pReservations.reverse()).slice(0, 3);
        const sortedReservations = [currentReservations, pastReservations];
        return sortedReservations;
    }

    async handlePayment(id) {
        try {
            let response = await axios.patch('http://localhost:8000/api/reservations/' + id + '/makePayment',
                {
                    id: id,
                    endDate: moment().format('DD-MM-YYYY'),
                    endTime: moment().format("HH:mm:ss"),
                    //hard-coded total price to simplify the application for the time being.
                    totalPrice: "2.00"
                });
            if (response.request.status === 200) {
                this.getReservations(this.state.user_id);
                this.setState({paid: true, message: "Thank you, your payment was processed successfully."});
                setTimeout(() => this.setState({message: ''}), 3000);
            }
        } catch (error) {
            this.setState({paid: false});
            console.error(error);
        }
    }

    render() {
        return (
            <div>
                <Header/>
                <div style={{marginTop: "2%"}}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={12} lg={12}>
                            {this.state.currentReservations.length > 0 &&
                            <div>
                                <CurrentReservationsTable onHandlePay={this.handlePayment}
                                                          currentReservations={this.state.currentReservations}/>
                            </div>
                            }

                            <div style={{textAlign: "center", marginTop: "3%", marginBottom: "3%"}}>
                                {this.state.currentReservations.length === 0 &&
                                <h4>No current reservations found.</h4>}
                            </div>

                            <div style={{textAlign: "center", marginTop: "3%", marginBottom: "3%"}}>
                                {this.state.paid &&
                                this.state.message}
                            </div>

                        </Grid>
                        <Grid item xs={12} sm={12} lg={12}>
                            {this.state.pastReservations.length > 0 &&
                            <div><PastReservationsTable
                                pastReservations={this.state.pastReservations}/></div>
                            }
                            <div style={{textAlign: "center", marginBottom: "3%"}}>
                                {(this.state.pastReservations.length === 0) &&
                                <h4>No past reservations found.</h4>}
                            </div>
                        </Grid>
                    </Grid>
                    <SimpleBottomNavigation/>
                </div>
            </div>
        )
    }
}

export default AllReservations;