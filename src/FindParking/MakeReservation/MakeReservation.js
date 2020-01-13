import React, {Component} from 'react';
import Button from "@material-ui/core/Button";
import axios from "axios";
import {Redirect} from 'react-router-dom';
import moment from 'moment';
import {connect} from 'react-redux';

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
        this.getDetails(this.props.id);
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
        this.checkIncompleteReservations(this.props.id);
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
                user_id: this.props.id,
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
                    regNo: response.data.vehicle_reg_no
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

const mapStateToProps = (state) => {
    return {
        id: state.id
    }
};

export default connect(mapStateToProps)(MakeReservation);

