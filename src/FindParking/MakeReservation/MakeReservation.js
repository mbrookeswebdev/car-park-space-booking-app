import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import moment from 'moment';

class MakeReservation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regNo: null,
            user_id: null,
            parking_space_id: this.props.parkingSpaceId,
            car_park_id: this.props.carParkId,
            status: null,
            redirect: false
        };

        this.handleReservation = this.handleReservation.bind(this);
        this.reserveParkingSpace = this.reserveParkingSpace.bind(this);
        this.checkIncompleteReservations = this.checkIncompleteReservations.bind(this);
        this.getDetails = this.getDetails.bind(this);
    }

    componentDidMount() {
        let id = localStorage.getItem('id');
        this.getDetails(id);
        this.setState({user_id: id});
    }

    async checkIncompleteReservations(user_id) {
        let response = await axios.get('http://localhost:8000/api/reservations/check/' + user_id);
        if (response.data.length !== 0) {
            this.props.displayMessage2(false);
            setTimeout(() => this.setState({redirect: true}), 2000);
        } else {
            this.reserveParkingSpace();
        }
    }

    handleReservation() {
        this.checkIncompleteReservations(this.state.user_id);
    }

    async reserveParkingSpace() {
        let response = await axios.post('http://localhost:8000/api/reservations',
            {
                startDate: moment().format('DD-MM-YYYY'),
                endDate: null,
                startTime: moment().format("HH:mm:ss"),
                endTime: null,
                parking_space_id: this.props.parkingSpaceId,
                car_park_id: this.props.carParkId,
                user_id: this.state.user_id,
                regNo: this.state.regNo,
                priceCharged: null
            });
        if (response.request.status === 201) {
            this.props.displayMessage(true);
            setTimeout(() => this.setState({redirect: true}), 2000);
        } else {
            console.log('error');
        }
    }

    async getDetails(user_id) {
        try {
            const response = await axios.get('http://localhost:8000/api/users/' + user_id);
            this.setState(
                {
                    regNo: response.data[0].vehicles[0].regNo
                });
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to={'/reservations'}/>
        }
        return (
            <div>
                <div style={{textAlign: "center", marginBottom: "5%"}}>
                    <Button size="small" variant="contained" color="primary"
                            onClick={this.handleReservation}>Reserve</Button>
                </div>
            </div>
        );
    }
}

export default MakeReservation;

